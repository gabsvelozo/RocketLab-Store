import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // controle do menu burguer
  const [isCartHovered, setIsCartHovered] = useState(false); 

  const navbarRef = useRef<HTMLDivElement>(null);
  const cartModalRef = useRef<HTMLDivElement>(null); 
  const mobileMenuRef = useRef<HTMLDivElement>(null); 

  const subtotal = cart.reduce(
    (sum, item) => sum + item.produto.preco * item.quantidade,
    0
  );

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    clearCart();
    setIsCartOpen(false); 
    setIsCartHovered(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // fechar carrinho mobile se clicar fora do modal e ele estiver aberto
      if (isCartOpen && cartModalRef.current && !cartModalRef.current.contains(event.target as Node) && window.innerWidth < 768) {
        setIsCartOpen(false);
      }
      
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && window.innerWidth < 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      // fechar ambos os menus se a tela for redimensionada para desktop
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsCartOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isCartOpen, isMobileMenuOpen]);

  return (
    <>
      {/* navbar principal */}
      <nav className={`fixed top-0 w-full bg-transparent text-white px-4 md:px-12 py-3 md:py-4 z-[99] ${
        // esconde a navbar em mobile quando o menu mobile ou carrinho mobile estiverem abertos
        (isCartOpen || isMobileMenuOpen) && window.innerWidth < 768 ? 'opacity-0 pointer-events-none' : ''
      }`} ref={navbarRef}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="z-[100]">
            <img
              src="/src/assets/Logo.png"
              alt="Logo"
              className="w-20 md:w-32 cursor-pointer"
            />
          </Link>

          <div className="hidden md:flex items-center gap-[150px] relative">
            <div className="flex gap-6 font-thin">
              <Link to="/" className="hover:text-gray-200 hover:underline">
                Home
              </Link>
              <Link to="/produtos" className="hover:text-gray-200 hover:underline">
                Comprar
              </Link>
              <Link to="/" className="hover:text-gray-200 hover:underline">
                Sobre
              </Link>
            </div>

            <div className="flex gap-3 items-center">
              <Link to="/" className="uppercase font-thin hover:underline hover:text-gray-200">
                Entrar
              </Link>

              {/* Carrinho desktop */}
              <div
                className="relative group"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
              >
                <button className="uppercase font-thin hover:underline hover:text-gray-200 flex items-center">
                  Carrinho ({cart.reduce((total, item) => total + item.quantidade, 0)})
                </button>

                {/* carrinho desktop */}
                <div className={`absolute top-full -right-10 pt-3 transition-all duration-200 ease-in-out ${
                  isCartHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                  <div className="h-5 w-full absolute -top-3"></div> 

                  <div className={`bg-white text-black rounded shadow-md z-50 border border-gray-100 transition-all ${
                    cart.length === 0 ? 'p-6 w-64' : 'p-4 w-[420px]'
                  }`}>
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                          {cart.map((item: any, idx: number) => (
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

          <div className="flex md:hidden gap-4 items-center">
            <button
              onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsMobileMenuOpen(false); // vai fechar o menu burguer se o carrinho for aberto
              }}
              className="relative flex items-center"
            >
              <span className="uppercase font-thin text-sm">
                ({cart.reduce((total, item) => total + item.quantidade, 0)})
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* menu burguer */}
            <button
              onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsCartOpen(false); 
              }}
              className="z-[100] p-2"
            >
              <div className={`w-6 flex flex-col gap-1 transition-all ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                <span className={`h-0.5 w-full bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* menu mobile aberto (modal fullscreen) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#5d6d5c] z-[110] pt-20 px-4 flex flex-col animate-slide-in-right" ref={mobileMenuRef}> {/* Z-index mais alto */}
          <div className="flex flex-col gap-6 text-lg">
            <Link
              to="/"
              className="hover:text-gray-200 hover:underline py-2 border-b border-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/produtos"
              className="hover:text-gray-200 hover:underline py-2 border-b border-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Comprar
            </Link>
            <Link
              to="/"
              className="hover:text-gray-200 hover:underline py-2 border-b border-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/"
              className="hover:text-gray-200 hover:underline py-2 border-b border-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Entrar
            </Link>
          </div>
        </div>
      )}

      {/* Carrinho mobile aberto */}
      {isCartOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[120] flex justify-end animate-fade-in"> {/* Z-index ainda mais alto */}
          <div
            ref={cartModalRef}
            className="bg-white text-black w-full max-w-sm h-full shadow-lg overflow-y-auto transform translate-x-0 transition-transform ease-out duration-300"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-bold">Seu Carrinho</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-black text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <CartContent
              cart={cart}
              subtotal={subtotal}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              handleCheckout={handleCheckout}
              mobile
              onClose={() => setIsCartOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal de compra finalizada */}
      {showCheckoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[130] bg-black bg-opacity-50"> 
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-3">Compra realizada com sucesso!</h3>
            <p className="mb-6 text-gray-600">Obrigado por sua compra. Seu pedido será processado em breve.</p>
            <button
              onClick={() => {
                setShowCheckoutModal(false);
                setIsMobileMenuOpen(false); 
              }}
              className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};


const CartContent = ({
  cart,
  subtotal,
  removeFromCart,
  addToCart,
  handleCheckout,
  mobile = false,
  onClose
}: {
  cart: any,
  subtotal: number,
  removeFromCart: (id: number) => void,
  addToCart: (produto: any) => void,
  handleCheckout: () => void,
  mobile?: boolean,
  onClose: () => void
}) => {
  return (
    <div className={`bg-white text-black rounded shadow-md z-50 border border-gray-100 ${mobile ? 'h-[calc(100%-0px)]' : ''}`}>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-3 p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-sm text-gray-600 text-center">Seu carrinho está vazio</p>
          <Link
            to="/produtos"
            className="text-sm text-green-800 hover:text-[#5d6d5c] hover:underline transition-colors duration-200"
            onClick={onClose}
          >
            Ver produtos disponíveis
          </Link>
        </div>
      ) : (
        <>
          <ul className={`overflow-y-auto p-4 ${mobile ? 'max-h-[calc(100vh-200px)]' : 'max-h-60'}`}>
            {cart.map((item: any, idx: number) => (
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
          <div className="mt-2 font-semibold text-right px-4 pb-2">
            Subtotal: R${subtotal.toFixed(2)}
          </div>
          <div className="p-4 pt-0">
            <button
              onClick={handleCheckout}
              className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors w-full"
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;