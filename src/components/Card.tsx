import type { Produto } from "../models/produtos"

interface CardProps {
    produto: Produto;
}

const Card = ({ produto }: CardProps) => {
  return (
    <div className="bg-[#f2f6ef] max-w-[400px] shadow-lg p-4 border rounded-xl">
      <img
        src={produto.imagens[0]}
        alt={produto.nome}
        className="w-full h-[390px] object-contain rounded-xl mb-4 bg-[#e4ece0]"
      />
      <h2 className="text-xl font-semibold">{produto.nome}</h2>
      <p className="text-lg text-green-800 font-medium mt-2">
        R${produto.preco.toFixed(2)}
      </p>
    </div>
  );
};

export default Card;
