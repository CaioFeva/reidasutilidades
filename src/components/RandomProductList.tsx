import { useEffect, useState } from "react";
import { Product } from "../types"; // Certifique-se de que a tipagem do produto está correta
import ProductCard from "./ProductCard"; // Importa o componente original para reutilizar o layout

interface RandomProductListProps {
  products: Product[]; // Recebe a lista completa de produtos como prop
}

export default function RandomProductList({ products }: RandomProductListProps) {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Função para selecionar 3 produtos aleatórios
    const selectRandomProducts = (productList: Product[]) => {
      const shuffled = productList.sort(() => 0.5 - Math.random()); // Embaralha os produtos
      return shuffled.slice(0, 3); // Retorna os primeiros 3 produtos
    };

    if (products.length > 0) {
      setRandomProducts(selectRandomProducts(products)); // Seleciona e define os produtos aleatórios
    }
  }, [products]); // Executa quando a lista de produtos muda

  return (
    <div className="flex justify-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full px-4">
        {randomProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}