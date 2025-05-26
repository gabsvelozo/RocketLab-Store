import { Link } from "react-router-dom";
import type { Produto } from "../models/produtos";

interface CardProps {
  produto: Produto;
  onAddToCart?: (produto: Produto) => void;
}

const Card = ({ produto, onAddToCart }: CardProps) => {
  return (
    <div className="bg-[#f2f6ef] max-w-[400px] shadow-lg p-4 border rounded-xl flex flex-col justify-between hover:shadow-xl transition-shadow">
      <Link 
        to={`/produto/${produto.id}`}
        state={{ produto }} 
        className="block"
      >
        <img
          src={produto.imagens[0]}
          alt={produto.nome}
          className="w-full h-[390px] object-contain rounded-xl mb-4 bg-[#e4ece0] hover:opacity-90 transition-opacity"
        />
      </Link>
      
      <div className="flex justify-between items-center">
        <div>
          <Link 
            to={`/produto/${produto.id}`}
            state={{ produto }} 
            className="hover:underline"
          >
            <h2 className="text-xl font-ivymode font-regular text-black hover:text-gray-700">
              {produto.nome}
            </h2>
          </Link>
          <p className="text-lg text-green-800 font-medium mt-1">
            R${produto.preco.toFixed(2)}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.(produto);
          }}
          className="bg-[#6a8268] hover:bg-[#889e86] text-white text-sm font-aileron px-4 py-2 rounded transition-all"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default Card;