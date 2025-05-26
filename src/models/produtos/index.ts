export interface Produto {
    id: number;
    nome: string;
    preco: number;
    imagens: string[];
    descricao?: string;
    detalhes?: string[];
}