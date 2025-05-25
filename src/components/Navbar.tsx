import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ChevronRight } from "react-feather";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.produto.preco * item.quantidade,
    0
  );

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    clearCart();
    setTimeout(() => setShowCheckoutModal(false), 3000);
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

            <div className="relative group">
              <button className="uppercase font-thin hover:underline hover:text-gray-200">
                Carrinho ({cart.reduce((total, item) => total + item.quantidade, 0)})
              </button>

              {/* modal do carrinho c a área de conexão */}
              <div className="absolute top-full -right-10 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="h-5 w-full absolute -top-3"></div>
                
                {/* modal real */}
                <div className="bg-white text-black p-4 rounded shadow-md w-[420px] z-50 border border-gray-100">
                  {cart.length === 0 ? (
                    <p className="text-sm">Seu carrinho está vazio.</p>
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
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span>{item.quantidade}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item.produto);
                                }}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
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
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all w-full"
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

      {/* modal da finalização da compra */}
      {showCheckoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Compra realizada com sucesso!</h3>
            <p className="mb-4">Obrigado por sua compra. Seu pedido será processado em breve.</p>
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
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