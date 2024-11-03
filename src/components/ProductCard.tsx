import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="font-semibold mb-2">Dimensões: {product.dimensions}</p>
            <p className="font-semibold">Peso: {product.weight}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-red-600">
            R$ {product.price.toFixed(2)}
          </span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
          </span>
        </div>
        <a
          href={`https://wa.me/5561999999999?text=Olá! Gostaria de saber mais sobre o produto: ${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-black text-white py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Consultar</span>
        </a>
      </div>
    </div>
  );
}