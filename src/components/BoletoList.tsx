import axios from "axios";
import { Download, Eye, FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Boleto {
  id: string;
  customername: string;
  cpfcpnj: string;
  amount: number;
  duedate: string;
  description: string;
  status: "PENDENTE" | "PAGO" | "VENCIDO";
}

export default function BoletoList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [boletos, setBoletos] = useState<Boleto[]>([]);

  useEffect(() => {
    axios
      .get<Boleto[]>(import.meta.env.VITE_API_BASE_URL! + "/boleto")
      .then((response) => setBoletos(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const filteredBoletos = boletos.filter((boleto) => {
    const matchesSearch =
      boleto.customername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boleto.cpfcpnj.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || boleto.status === statusFilter;
    const matchesDate = !dateFilter || boleto.duedate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  function parseDateBR(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Ajusta o mês para o padrão zero-based do JavaScript
  }

  function somarBoletosAVencer(boletos: Boleto[]): number {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const total = boletos
      .filter((boleto) => {
        const dueDate = parseDateBR(boleto.duedate);
        dueDate.setHours(0, 0, 0, 0);

        const isDueDateValid = dueDate >= hoje;
        const isStatusPending = boleto.status === "PENDENTE";

        return isDueDateValid && isStatusPending;
      })
      .reduce((acc, boleto) => {
        const amountString = String(boleto.amount)
          .replace(/[.,]/g, "")
          .replace(/(\d+)(\d{2})$/, "$1.$2");
        const amount = parseFloat(amountString);

        return acc + (isNaN(amount) ? 0 : amount);
      }, 0);

    return total; // Retorna como número
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAGO":
        return "bg-green-100 text-green-800";
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      case "VENCIDO":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Boletos</h2>
        <Link
          to="/admin/boletos/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FileText size={20} />
          Novo Boleto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              className="pl-10 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="overdue">Vencido</option>
          </select>

          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF ou CNPJ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBoletos.map((boleto) => (
                <tr key={boleto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {boleto.customername}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {boleto.cpfcpnj}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(boleto.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {boleto.duedate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        boleto.status
                      )}`}
                    >
                      {boleto.status === "PAGO"
                        ? "Pago"
                        : boleto.status === "PENDENTE"
                        ? "Pendente"
                        : "Vencido"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Visualizar"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Download"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          Total dos boletos a vencer: R${" "}
          {somarBoletosAVencer(boletos).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
}
