// src/pages/Home.tsx
import Hero from "../components/Hero";
import { produtos } from "../db/fake-produtos-db";
// import type { Produto } from "../db/fake-produtos-db";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

const Home = () => {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState('');

  const featuredProducts = produtos.slice(0, 3);

  const handleAddToCart = (produto: any) => {
    addToCart(produto);
    setNotificationProduct(produto.nome);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="font-aileron">
      {/* Notificação */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-800/50 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
          {notificationProduct} adicionado ao carrinho!
        </div>
      )}

      {/* Hero */}
      <Hero />

      {/* Produtos */}
      <section className="bg-[#f2f6ef] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-ivymode text-[#5d6d5c] mb-4">
              Nossos Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra nossa seleção de produtos naturais e orgânicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((produto) => (
              <Card 
                key={produto.id} 
                produto={produto}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/produtos"
              className="inline-block bg-[#6a8268] hover:bg-[#889e86] text-white px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-ivymode text-[#5d6d5c] mb-8">
            Sobre Nós
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Velvety combina tradição e inovação para criar produtos de cuidados com a pele 100% naturais.
          </p>
          <p className="text-lg text-gray-700">
            Nossas fórmulas são desenvolvidas com ingredientes orgânicos selecionados para máxima eficácia.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;