import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Produto } from "../models/produtos";
import type { CartItem } from "../models/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (produtoId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (produto: Produto) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.produto.id === produto.id);
      if (existing) {
        return prevCart.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevCart, { produto, quantidade: 1 }];
      }
    });
  };

  const removeFromCart = (produtoId: number) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.produto.id === produtoId);
      if (existing && existing.quantidade > 1) {
        return prevCart.map(item =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.produto.id !== produtoId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};