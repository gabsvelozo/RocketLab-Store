import { useParams, useNavigate } from "react-router-dom";
import { produtos } from "../db/fake-produtos-db";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { ArrowLeft } from "react-feather";


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [mainImage, setMainImage] = useState(0);

  const produto = produtos.find(p => p.id === Number(id));

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#f2f6ef] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
          <button 
            onClick={() => navigate('/produtos')}
            className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Voltar para a loja
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(produto);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/produtos'); 
  };

  return (
    <div className="min-h-screen bg-[#889e86] py-16">
      {/* Botão Voltar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-800 hover:text-white transition-colors underline"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </button>
      </div>

      {/* Notificação */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
          {quantity > 1 
            ? `${quantity} ${produto.nome}s adicionados ao carrinho!`
            : `${produto.nome} adicionado ao carrinho!`}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Galeria de imagens */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center h-96">
              <img
                src={produto.imagens[mainImage]}
                alt={produto.nome}
                className="max-h-full max-w-full object-fill"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {produto.imagens.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`bg-gray-50 rounded-md overflow-hidden cursor-pointer h-20 ${mainImage === index ? 'ring-2 ring-green-600' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${produto.nome} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-ivymode font-bold text-gray-900">{produto.nome}</h1>
              <div className="text-2xl font-semibold text-green-800 mt-2">
                R${produto.preco.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 text-lg hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 border-x text-center w-12">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1 text-lg hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#889e86] hover:bg-[#6a8268] text-white px-6 py-2 rounded transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {produto.descricao && (
              <div className="pt-6 border-t">
                <h2 className="text-xl font-semibold mb-3">Informações</h2>
                <p className="text-gray-700 whitespace-pre-line">{produto.descricao}</p>
              </div>
            )}
            {produto.detalhes && produto.detalhes.length > 0 ? (
            <div className="pt-6 border-t">
                <h2 className="text-xl font-semibold mb-3">Detalhes</h2>
                <ul className="space-y-2 text-gray-700">
                {produto.detalhes.map((detalhe, index) => (
                    <li key={index} className="flex">
                    <span className="mr-2">•</span>
                    <span>{detalhe}</span>
                    </li>
                ))}
                </ul>
            </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;