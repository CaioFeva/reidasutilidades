import axios from "axios";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import RandomProductList from "./components/RandomProductList";
import ServiceCard from "./components/ServiceCard";
import TestimonialCard from "./components/TestimonialCard";
import { AdminProvider } from "./context/AdminContext";
import { GiftRegistry } from "./page/GiftRegistry";
import { Product, Service, Testimonial } from "./types";

// Dados mockados para serviços e depoimentos
const services: Service[] = [
  {
    id: "1",
    name: "Conserto de Panelas",
    description:
      "Recuperamos suas panelas com problemas no cabo, revestimento ou tampa.",
    icon: "🔧",
  },
  {
    id: "2",
    name: "Manutenção de Liquidificadores",
    description:
      "Reparo completo do seu liquidificador, troca de peças e revisão geral.",
    icon: "⚡",
  },
  {
    id: "3",
    name: "Assistência Técnica",
    description: "Suporte especializado para todos os produtos da nossa loja.",
    icon: "🛠️",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria Silva",
    content:
      "Excelente atendimento! Comprei um conjunto de panelas e estou muito satisfeita com a qualidade.",
    rating: 5,
    date: "15/03/2024",
  },
  {
    id: "2",
    name: "João Santos",
    content:
      "O serviço de conserto de liquidificador foi rápido e eficiente. Recomendo!",
    rating: 5,
    date: "10/03/2024",
  },
  {
    id: "3",
    name: "Ana Oliveira",
    content:
      "Ótimos produtos e preços justos. A loja tem tudo o que precisamos para a cozinha.",
    rating: 4,
    date: "05/03/2024",
  },
];

// Componente HomePage que utiliza useState e useEffect para buscar produtos
const HomePage = () => {
  // Definindo o estado dos produtos dentro do componente
  const [products, setProducts] = useState<Product[]>([]);

  // Buscando produtos do backend quando o componente monta
  useEffect(() => {
    axios
      .get<Product[]>("https://reidasutilidadesbackend.onrender.com/api/produtos")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <>
      <Header />
      <Hero />

      {/* Seção de Produtos */}
      <section id="produtos" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Produtos
          </h2>
          <RandomProductList products={products} />
        </div>
      </section>

      {/* Seção de Serviços */}
      <section id="servicos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section id="depoimentos" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que dizem nossos clientes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <ContactSection />
    </>
  );
};

// Componente ProductCatalog utilizando o estado e map de produtos
const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("https://reidasutilidadesbackend.onrender.com/api/produtos")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-3xl font-bold text-center mt-20">
        Catálogo de Produtos
      </h2>
      <section className="container mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductCatalog />} />
          <Route path="/lista-presentes" element={<GiftRegistry />} />

          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}
