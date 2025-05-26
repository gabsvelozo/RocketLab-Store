import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ProdutosPage from "./pages/ProdutosPage";
import ProdutoDetailsPage from "./pages/ProdutoDetailsPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/produtos" element={<ProdutosPage />} />
      <Route path="/produto/:id" element={<ProdutoDetailsPage />} /> {/* Nova rota */}
    </Routes>
  );
}

export default App;
