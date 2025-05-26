import { useParams, useNavigate } from "react-router-dom";
import { produtos } from "../db/fake-produtos-db";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { ArrowLeft } from "react-feather";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [mainImage, setMainImage] = useState(0);

  const produto = produtos.find(p => p.id === Number(id));

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#f2f6ef] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
          <button 
            onClick={() => navigate('/produtos')}
            className="bg-green-800 text-white px-6 py-2 rounded transition-colors"
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
    // Limpa o carrinho antes de adicionar o novo item
    clearCart();
    // Adiciona a quantidade selecionada do produto
    for (let i = 0; i < quantity; i++) {
      addToCart(produto);
    }
    // Mostra o modal de confirmação
    setShowCheckoutModal(true);
  };

  return (
    <div className="min-h-screen bg-[#889e86] flex flex-col items-center justify-center py-16 px-4">
      {/* Botão Voltar */}
      <div className="w-full max-w-7xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-white transition-colors underline"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </button>
      </div>

      {/* Notificação do carrinho */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-800/50 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
          {quantity > 1 
            ? `${quantity} ${produto.nome}s adicionados ao carrinho!`
            : `${produto.nome} adicionado ao carrinho!`}
        </div>
      )}

      {/* Container principal centralizado */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-lg shadow-md">
          {/* Galeria de imagens */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center h-96">
              <img
                src={produto.imagens[mainImage]}
                alt={produto.nome}
                className="max-h-full max-w-full object-contain"
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
                  className="bg-[#6a8268] hover:bg-[#889e86] text-white px-6 py-2 rounded transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-[#6a8268] hover:bg-[#889e86] text-white px-6 py-2 rounded transition-colors"
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

      {/* Modal de compra finalizada */}
      {showCheckoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-3">Compra realizada com sucesso!</h3>
            <p className="mb-6 text-green-800">Obrigado por sua compra. Seu pedido será processado em breve.</p>
            <button
              onClick={() => {
                setShowCheckoutModal(false);
                navigate('/produtos');
              }}
              className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;