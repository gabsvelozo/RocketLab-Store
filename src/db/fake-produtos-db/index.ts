import type { Produto } from "../../models/produtos";

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Sabonete Natural",
    preco: 19.99,
    imagens: ["/src/assets/produtos/produto1.png", "/src/assets/produtos/produto1.png", "/src/assets/produtos/produto1.png", "/src/assets/produtos/produto1.png",],
    descricao: "Limpeza suave e eficaz, ideal para todos os tipos de pele. Enriquecido com extratos naturais, promove frescor e maciez.",
  },
  {
    id: 2,
    nome: "Creme Orgânico",
    preco: 29.99,
    imagens: ["/src/assets/produtos/produto2.png", "/src/assets/produtos/produto2.png", "/src/assets/produtos/produto2.png", "/src/assets/produtos/produto2.png"],
    descricao: "Um hidratante leve e nutritivo, desenvolvido com ingredientes 100% orgânicos. Restaura a vitalidade da pele com uso contínuo.",
  },
  {
    id: 3,
    nome: "Óleo Essencial",
    preco: 39.99,
    imagens: ["/src/assets/produtos/produto3.png", "/src/assets/produtos/produto3.png", "/src/assets/produtos/produto3.png", "/src/assets/produtos/produto3.png"],
    descricao: "Concentre os benefícios da aromaterapia com nosso óleo essencial, perfeito para massagens relaxantes ou uso em difusores.",
  },
  {
    id: 4,
    nome: "Sérum Essencial",
    preco: 45.00,
    imagens: ["/src/assets/produtos/produto4.png", "/src/assets/produtos/produto4.png", "/src/assets/produtos/produto4.png", "/src/assets/produtos/produto4.png"],
    descricao: "Potente aliado na rotina de cuidados com a pele. Hidrata profundamente, suaviza linhas finas e melhora a textura cutânea.",
  },
  {
    id: 5,
    nome: "Hidratante Corporal",
    preco: 72.00,
    imagens: ["/src/assets/produtos/produto5.png", "/src/assets/produtos/produto5.png", "/src/assets/produtos/produto5.png", "/src/assets/produtos/produto5.png"],
    descricao: "Textura rica e aveludada, proporciona hidratação intensa e prolongada, deixando a pele mais firme, luminosa e protegida.",
  },
  {
    id: 6,
    nome: "Creme para Olhos",
    preco: 59.99,
    imagens: ["/src/assets/produtos/produto6.png", "/src/assets/produtos/produto6.png", "/src/assets/produtos/produto6.png", "/src/assets/produtos/produto6.png"],
    descricao: "Fórmula delicada para a região dos olhos. Reduz sinais de cansaço, inchaço e olheiras, promovendo um olhar renovado.",
  },
];
