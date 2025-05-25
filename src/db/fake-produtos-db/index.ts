import type { Produto } from "../../models/produtos";

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Sabonete Natural",
    preco: 19.99,
    imagens: ["/src/assets/produtos/produto1.png"],
  },
  {
    id: 2,
    nome: "Creme Orgânico",
    preco: 29.99,
    imagens: ["/src/assets/produtos/produto2.png"],
  },
  {
    id: 3,
    nome: "Óleo Essencial",
    preco: 39.99,
    imagens: ["/src/assets/produtos/produto3.png"],
  },
  {
    id: 4,
    nome: "Sérum Essencial",
    preco: 45.00,
    imagens: ["/src/assets/produtos/produto4.png"]
  },
  {
    id: 5,
    nome: "Hidratante Corporal",
    preco: 72.00,
    imagens: ["/src/assets/produtos/produto5.png"]
  },
  {
    id: 6,
    nome: "Creme para Olhos",
    preco: 59.99,
    imagens: ["/src/assets/produtos/produto6.png"]
  },
];
