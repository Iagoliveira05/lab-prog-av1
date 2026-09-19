import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/register";

import Produtos from "./pages/Produtos";
import Tarefas from "./pages/Tarefas";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/tarefas" element={<Tarefas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
