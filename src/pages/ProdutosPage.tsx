import { useState } from "react";
import Card from "../components/Card";
import { produtos } from "../db/fake-produtos-db";
import type { Produto } from "../models/produtos";
import { useCart } from "../contexts/CartContext";

const ProdutosPage = () => {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState('');

  const handleAddToCart = (produto: Produto) => {
    addToCart(produto);
    setNotificationProduct(produto.nome);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="p-10 bg-green min-h-screen w-full flex flex-col items-center relative">
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-800/50 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
          {notificationProduct} adicionado ao carrinho!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-center font-ivymode text-gray-200">
        Nossos Produtos
      </h1>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {produtos.map((produto) => (
            <Card
              key={produto.id}
              produto={produto}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;