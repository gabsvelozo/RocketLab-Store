import type { Produto } from "./produtos";

export interface CartItem {
  produto: Produto;
  quantidade: number;
}
