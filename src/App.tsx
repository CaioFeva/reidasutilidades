import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ServiceCard from './components/ServiceCard';
import TestimonialCard from './components/TestimonialCard';
import ContactSection from './components/ContactSection';
import { Product, Service, Testimonial } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Conjunto de Panelas Antiaderentes',
    description: 'Kit completo com 5 peças, ideal para sua cozinha. Material de alta qualidade e durabilidade.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584990347449-a8f11206c9e7?auto=format&fit=crop&q=80'],
    dimensions: '45x30x20 cm',
    weight: '3.5 kg',
    stock: 15,
    category: 'Cozinha'
  },
  {
    id: '2',
    name: 'Liquidificador Profissional',
    description: 'Potência de 1200W, copo de vidro resistente, 12 velocidades.',
    price: 199.99,
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80'],
    dimensions: '20x20x40 cm',
    weight: '2.8 kg',
    stock: 8,
    category: 'Eletrodomésticos'
  },
  {
    id: '3',
    name: 'Kit Utensílios de Silicone',
    description: 'Conjunto com 8 peças, resistente ao calor, fácil de limpar.',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80'],
    dimensions: '35x10x5 cm',
    weight: '0.8 kg',
    stock: 20,
    category: 'Utensílios'
  }
];

const services: Service[] = [
  {
    id: '1',
    name: 'Conserto de Panelas',
    description: 'Recuperamos suas panelas com problemas no cabo, revestimento ou tampa.',
    icon: '🔧'
  },
  {
    id: '2',
    name: 'Manutenção de Liquidificadores',
    description: 'Reparo completo do seu liquidificador, troca de peças e revisão geral.',
    icon: '⚡'
  },
  {
    id: '3',
    name: 'Assistência Técnica',
    description: 'Suporte especializado para todos os produtos da nossa loja.',
    icon: '🛠️'
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    content: 'Excelente atendimento! Comprei um conjunto de panelas e estou muito satisfeita com a qualidade.',
    rating: 5,
    date: '15/03/2024'
  },
  {
    id: '2',
    name: 'João Santos',
    content: 'O serviço de conserto de liquidificador foi rápido e eficiente. Recomendo!',
    rating: 5,
    date: '10/03/2024'
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    content: 'Ótimos produtos e preços justos. A loja tem tudo o que precisamos para a cozinha.',
    rating: 4,
    date: '05/03/2024'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />

      {/* Products Section */}
      <section id="produtos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Produtos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Rei das Utilidades. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;