import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ChevronRight } from "react-feather";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.produto.preco * item.quantidade,
    0
  );

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    clearCart();
  };

  return (
    <nav className="fixed top-0 w-full bg-transparent text-white px-12 py-4 z-[99]">
      <div className="flex justify-between items-center uppercase">
        <img
          src="/src/assets/Logo.png"
          alt="Logo"
          className="w-32 cursor-pointer"
        />

        <div className="flex items-center gap-[150px] relative">
          <div className="flex gap-6 font-thin">
            <Link to="/" className='flex flex-row gap-1 items-center hover:text-gray-200 hover:underline'>
              Páginas <span><ChevronRight size={16} strokeWidth={2}/></span>
            </Link>
            <Link to="/produtos" className="hover:text-gray-200 hover:underline">
              Comprar
            </Link>
            <Link to="/" className="hover:text-gray-200 hover:underline">
              Sobre
            </Link>
          </div>

          <div className="flex gap-3 items-center">
            <button className="uppercase font-thin hover:underline hover:text-gray-200">
              Entrar
            </button>

            <div 
              className="relative group"
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
            >
              <button className="uppercase font-thin hover:underline hover:text-gray-200">
                Carrinho ({cart.reduce((total, item) => total + item.quantidade, 0)})
              </button>

              {/* Modal do carrinho */}
              <div className={`absolute top-full -right-10 pt-3 transition-all duration-200 ease-in-out ${
                isCartHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="h-5 w-full absolute -top-3"></div>
                
                <div className={`bg-white text-black rounded shadow-md z-50 border border-gray-100 transition-all ${
                  cart.length === 0 ? 'p-6 w-64' : 'p-4 w-[420px]'
                }`}>
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <svg xmlns="http://www.w3.org/  2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-sm text-gray-600 text-center">Seu carrinho está vazio</p>
                      <Link 
                        to="/produtos" 
                        className="text-sm text-green-800 hover:text-[#5d6d5c] hover:underline transition-colors duration-200"
                        onClick={() => setIsCartHovered(false)}
                      >
                        Ver produtos disponíveis
                      </Link>
                    </div>
                  ) : (
                    <>
                      <ul className="max-h-60 overflow-y-auto">
                        {cart.map((item, idx) => (
                          <li key={idx} className="mb-4 pb-2 border-b flex justify-between items-center">
                            <div className="flex-1">
                              <span className="block">{item.produto.nome}</span>
                              <span className="text-xs text-gray-500">R${item.produto.preco.toFixed(2)} cada</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromCart(item.produto.id);
                                }}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                              >
                                -
                              </button>
                              <span>{item.quantidade}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item.produto);
                                }}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="w-20 text-right">
                              R${(item.produto.preco * item.quantidade).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 font-semibold text-right">
                        Subtotal: R${subtotal.toFixed(2)}
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors w-full"
                      >
                        Finalizar compra
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
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
              onClick={() => setShowCheckoutModal(false)}
              className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;