import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ProdutosPage from "./pages/ProdutosPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/produtos" element={<ProdutosPage />} />
    </Routes>
  );
}

export default App;
