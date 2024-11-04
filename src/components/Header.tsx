import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, Route } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-black/95 text-white z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-red-600" />
            <Link
              to="/"
              className="text-xl font-bold hover:text-red-500 transition"
            >
              Rei das Utilidades
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {/* <a href="#produtos" className="hover:text-red-500 transition">
              Produtos
            </a> */}
            <Link to="/produtos" className="hover:text-red-500 transition">
              Produtos
            </Link>
            <Link
              to="/lista-presentes"
              className="hover:text-red-500 transition"
            >
              Lista de Presentes
            </Link>
            <a href="#servicos" className="hover:text-red-500 transition">
              Serviços
            </a>
            <a href="#depoimentos" className="hover:text-red-500 transition">
              Depoimentos
            </a>
            <a href="#contato" className="hover:text-red-500 transition">
              Contato
            </a>
            <a
              href="tel:+5561999999999"
              className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              <Phone className="h-4 w-4" />
              <span>(61) 99999-9999</span>
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 absolute w-full">
          <nav className="flex flex-col space-y-4 p-4">
            {/* <a href="#produtos" className="hover:text-red-500 transition">
              Produtos
            </a> */}
            <Link to="/produtos" className="hover:text-red-500 transition">
              Produtos
            </Link>
            <Link
              to="/lista-presentes"
              className="hover:text-red-500 transition"
            >
              Lista de Presentes
            </Link>
            <a href="#servicos" className="hover:text-red-500 transition">
              Serviços
            </a>
            <a href="#depoimentos" className="hover:text-red-500 transition">
              Depoimentos
            </a>
            <a href="#contato" className="hover:text-red-500 transition">
              Contato
            </a>
            <a
              href="tel:+5561999999999"
              className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition justify-center"
            >
              <Phone className="h-4 w-4" />
              <span>(61) 99999-9999</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
