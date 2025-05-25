import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Navbar from './components/Navbar.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <div className="font-aileron">
          <Navbar />
          <App />
        </div>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);