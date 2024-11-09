import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import axios from "axios";
import { Product } from "../types";

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  dimensions: string;
  weight: string;
  stock: number;
}

const initialFormData: ProductFormData = {
  name: "",
  price: 0,
  description: "",
  category: "",
  images: [] as string[],
  dimensions: "",
  weight: "",
  stock: 0,
};

const categories = [
  "Eletrônicos",
  "Roupas",
  "Acessórios",
  "Livros",
  "Casa e Decoração",
];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const [produtos, setProdutos] = useState<Product>();

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`${import.meta.env.VITE_API_BASE_URL}/${id}`)
        .then((response) => {
          setProdutos(response.data);
          console.log("response.data", response.data);
        })
        .catch((error) => console.error("Erro ao buscar produtos:", error));
    }
  }, [id]);

  useEffect(() => {
    if (produtos) {
      setFormData({
        name: produtos.name,
        price: produtos.price,
        category: produtos.category,
        dimensions: produtos.dimensions,
        description: produtos.description,
        images: Array.isArray(produtos.images)
          ? produtos.images
          : [produtos.images], // Garantir que seja sempre um array
        stock: produtos.stock,
        weight: produtos.weight,
      });
    }
  }, [produtos]);

  console.log("produtos", produtos);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = id
      ? `${import.meta.env.VITE_API_BASE_URL}/${id}`
      : import.meta.env.VITE_API_BASE_URL;
    const method = id ? "put" : "post";

    axios[method](endpoint!, formData)
      .then((response) => {
        console.log("Produto salvo com sucesso:", response.data);
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {id ? "Editar Produto" : "Cadastro de Produtos"}
        </h2>
        <button
          onClick={() => navigate("/admin/products")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preço (R$)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL da Imagem
            </label>
            <input
              type="url"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dimensões
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Ex: 10x20x30 cm"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peso
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Ex: 1.5 kg"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estoque
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
