import { Save } from "lucide-react";
import React, { useState } from "react";
import type { Product } from "../types";
import axios from "axios";

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um app real, esta seria uma autenticação segura
    if (password === "admin123") {
      setIsAdmin(true);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-6">Área Administrativa</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <ProductForm />;
}

function ProductForm() {
  // Usamos Partial<Product> para que os campos possam ser preenchidos gradualmente
  const [product, setProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    images: [""],
    dimensions: "",
    weight: "",
    stock: 0,
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envia o produto ao backend
      const response = await axios.post("http://localhost:3000/api/produtos", product);
      console.log("Produto salvo:", response.data);
      alert("Produto salvo com sucesso!");

      // Limpar o formulário após o envio bem-sucedido
      setProduct({
        name: "",
        price: 0,
        description: "",
        category: "",
        images: [""],
        dimensions: "",
        weight: "",
        stock: 0,
      });
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      alert("Erro ao salvar o produto. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Cadastro de Produtos</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto
              </label>
              <input
                type="text"
                value={product.name || ""}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={product.price || 0}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={product.description || ""}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={product.category || ""}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="kitchen">Utensílios de Cozinha</option>
                <option value="pans">Panelas</option>
                <option value="appliances">Eletrodomésticos</option>
                <option value="organization">Organização</option>
                <option value="cleaning">Limpeza</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                value={product.images?.[0] || ""}
                onChange={(e) =>
                  setProduct({ ...product, images: [e.target.value] })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensões
                </label>
                <input
                  type="text"
                  value={product.dimensions || ""}
                  onChange={(e) =>
                    setProduct({ ...product, dimensions: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Peso
                </label>
                <input
                  type="text"
                  value={product.weight || ""}
                  onChange={(e) =>
                    setProduct({ ...product, weight: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque
                </label>
                <input
                  type="number"
                  value={product.stock || 0}
                  onChange={(e) =>
                    setProduct({ ...product, stock: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              Salvar Produto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
