import { Save } from 'lucide-react';
import React, { useState } from 'react';

interface Boleto {
  customerName: string;
  cpf: string;
  amount: number;
  dueDate: string;
  description: string;
}

export default function BoletoForm() {
  const [boleto, setBoleto] = useState<Boleto>({
    customerName: '',
    cpf: '',
    amount: 0,
    dueDate: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Implement your boleto registration logic here
      console.log('Boleto data:', boleto);
      alert('Boleto registrado com sucesso!');
      
      // Reset form
      setBoleto({
        customerName: '',
        cpf: '',
        amount: 0,
        dueDate: '',
        description: '',
      });
    } catch (error) {
      console.error('Erro ao registrar boleto:', error);
      alert('Erro ao registrar boleto. Tente novamente.');
    }
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
            value={boleto.cpf}
            onChange={(e) => setBoleto({ ...boleto, cpf: e.target.value })}
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
          Gerar Boleto
        </button>
      </form>
    </div>
  );
}