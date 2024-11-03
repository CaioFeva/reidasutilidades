import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80"
          alt="Kitchen utensils background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sua Casa Merece o
            <span className="text-red-600"> Melhor</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Há mais de 20 anos sendo referência em utensílios domésticos e ferramentas para o seu lar. Qualidade, variedade e o melhor atendimento você só encontra aqui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#produtos"
              className="bg-red-600 text-white px-8 py-4 rounded-full flex items-center justify-center space-x-2 hover:bg-red-700 transition group"
            >
              <span>Ver Produtos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#contato"
              className="border-2 border-white text-white px-8 py-4 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}