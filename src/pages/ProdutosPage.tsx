import Card from "../components/Card";
import { produtos } from "../db/fake-produtos-db";

const ProdutosPage = () => {
  return (
    <div className="p-10 bg-green min-h-screen w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center font-ivymode text-gray-200">Nossos Produtos</h1>
      
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {produtos.map((produto) => (
            <Card key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;
