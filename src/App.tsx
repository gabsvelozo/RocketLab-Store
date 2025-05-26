import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProdutosPage from "./pages/ProdutosPage";
import ProdutoDetailsPage from "./pages/ProdutoDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<ProdutosPage />} />
      <Route path="/produto/:id" element={<ProdutoDetailsPage />} />
    </Routes>
  );
}

export default App;