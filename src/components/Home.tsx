import Hero from "../components/Hero";
import { produtos } from "../db/fake-produtos-db";
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
      {/* notificacao p mobile */}
      {showNotification && (
        <div className="fixed top-16 md:top-20 right-2 md:right-4 bg-green-800/50 text-white px-3 py-1 md:px-4 md:py-2 rounded shadow-lg z-50 animate-fade-in-out text-sm md:text-base">
          {notificationProduct} adicionado ao carrinho!
        </div>
      )}

      {/* hero */}
      <Hero />

      {/* produtos */}
      <section className="bg-[#f2f6ef] py-10 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-ivymode text-[#5d6d5c] mb-2 md:mb-4">
              Nossos Produtos em Destaque
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra nossa seleção de produtos naturais e orgânicos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {featuredProducts.map((produto) => (
              <Card 
                key={produto.id} 
                produto={produto}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-16">
            <Link
              to="/produtos"
              className="inline-block bg-[#6a8268] hover:bg-[#889e86] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-lg"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* sobre */}
      <section className="bg-white py-10 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-ivymode text-[#5d6d5c] mb-4 md:mb-8">
            Sobre Nós
          </h2>
          <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6">
            Velvety combina tradição e inovação para criar produtos de cuidados com a pele 100% naturais.
          </p>
          <p className="text-sm md:text-lg text-gray-700">
            Nossas fórmulas são desenvolvidas com ingredientes orgânicos selecionados para máxima eficácia.
          </p>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;