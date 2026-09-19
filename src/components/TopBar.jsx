import { Link, useNavigate } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";

function TopBar() {
  const navigate = useNavigate();

  const cliente = JSON.parse(localStorage.getItem("cliente"));

  function sair() {
    localStorage.removeItem("cliente");
    navigate("/");
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">Sistema</h1>
        <div className="flex gap-6">
          <Link
            to="/produtos"
            className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
          >
            Produtos
          </Link>

          <Link
            to="/tarefas"
            className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
          >
            Tarefas
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-gray-700">
            Olá, <strong>{cliente?.nome}</strong>
          </span>

          <button
            onClick={sair}
            className="
              flex items-center gap-2
              text-gray-600
              hover:text-red-600
              transition
            "
          >
            <FaSignOutAlt />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
