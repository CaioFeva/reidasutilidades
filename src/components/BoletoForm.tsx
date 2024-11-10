import axios from "axios";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Boleto {
  customerName: string;
  cpfcnpj: string;
  amount: number;
  dueDate: string;
  description: string;
  status: string;
}

export default function BoletoForm() {
  const [boleto, setBoleto] = useState<Boleto>({
    customerName: "",
    cpfcnpj: "",
    amount: 0,
    dueDate: "",
    description: "",
    status: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const statusBoleto = ["PAGO", "PENDENTE", "VENCIDO"];

  function formatCPF_CNPJ(value: string): string {
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      return value.replace(
        /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
        (match, p1, p2, p3, p4) => {
          return `${p1}.${p2}.${p3}${p4 ? "-" + p4 : ""}`;
        }
      );
    } else if (value.length <= 14) {
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
        (match, p1, p2, p3, p4, p5) => {
          return `${p1}.${p2}.${p3}/${p4}${p5 ? "-" + p5 : ""}`;
        }
      );
    }

    return value;
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    value = formatCPF_CNPJ(value);

    if (value.replace(/\D/g, "").length <= 14) {
      event.target.value = value;
    } else {
      event.target.value = value.slice(0, 18);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Boleto data:", boleto);

      boleto.dueDate = formatDateToDDMMYYYY(boleto.dueDate);

      console.log("boleto.dueDate", boleto.dueDate);
      

      const endpoint = id
        ? `${import.meta.env.VITE_API_BASE_URL}/boleto/${id}`
        : import.meta.env.VITE_API_BASE_URL + "/boleto";
      const method = id ? "put" : "post";

      axios[method](endpoint, boleto)
        .then((response) => {
          console.log("Boleto salvo com sucesso:", response.data);
          navigate("/admin/boletos");
        })
        .catch((error) => {
          console.error("Erro ao salvar boleto:", error);
        });

      alert("Boleto registrado com sucesso!");

      setBoleto({
        customerName: "",
        cpfcnpj: "",
        amount: 0,
        dueDate: "",
        description: "",
        status: "",
      });
    } catch (error) {
      console.error("Erro ao registrar boleto:", error);
      alert("Erro ao registrar boleto. Tente novamente.");
    }
  };

  function formatDateToDDMMYYYY(dateString:string) {
    const data = new Date(dateString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }
  

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBoleto((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Boleto</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Cliente
          </label>
          <input
            type="text"
            value={boleto.customerName}
            onChange={(e) =>
              setBoleto({ ...boleto, customerName: e.target.value })
            }
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CPF/CNPJ
          </label>
          <input
            type="text"
            value={boleto.cpfcnpj}
            onChange={(e) => {
              const formattedValue = formatCPF_CNPJ(e.target.value);
              setBoleto({ ...boleto, cpfcnpj: formattedValue });
            }}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={boleto.amount}
            onChange={(e) =>
              setBoleto({ ...boleto, amount: parseFloat(e.target.value) })
            }
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de Vencimento
          </label>
          <input
            type="date"
            value={boleto.dueDate}
            onChange={(e) => setBoleto({ ...boleto, dueDate: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            STATUS DO BOLETO
          </label>
          <select
            name="status"
            value={boleto.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Selecione um estado</option>
            {statusBoleto.map((tipoEstado) => (
              <option key={tipoEstado} value={tipoEstado}>
                {tipoEstado}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            value={boleto.description}
            onChange={(e) =>
              setBoleto({ ...boleto, description: e.target.value })
            }
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Save size={20} />
          SALVAR BOLETO
        </button>
      </form>
    </div>
  );
}
