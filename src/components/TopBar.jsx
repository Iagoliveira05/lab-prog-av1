import { NavLink, useNavigate } from "react-router";
import { FiBox, FiCheckSquare, FiLogOut, FiArrowUpRight } from "react-icons/fi";
import Brand from "./Brand";
export default function TopBar() {
  const navigate = useNavigate();
  let cliente;
  try {
    cliente = JSON.parse(localStorage.getItem("cliente"));
  } catch {
    cliente = null;
  }
  const nome = cliente?.nome || "Visitante";
  function sair() {
    localStorage.removeItem("cliente");
    navigate("/");
  }
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Brand to="/produtos" light />
        <span className="workspace-label">WORKSPACE</span>
      </div>
      <nav aria-label="Navegação principal" className="main-nav">
        <span className="nav-caption">SEU DIA A DIA</span>
        <NavLink to="/produtos">
          <FiBox />
          <span>Produtos</span>
          <FiArrowUpRight className="nav-arrow" />
        </NavLink>
        <NavLink to="/tarefas">
          <FiCheckSquare />
          <span>Tarefas</span>
          <FiArrowUpRight className="nav-arrow" />
        </NavLink>
      </nav>
      <div className="sidebar-note">
        <span className="note-asterisk">✳</span>
        <p>
          Pequenos passos.
          <br />
          <strong>Grandes movimentos.</strong>
        </p>
        <span>Encontre o seu fluxo.</span>
      </div>
      <div className="sidebar-user">
        <span className="avatar">{nome.charAt(0).toUpperCase()}</span>
        <div>
          <strong>{nome}</strong>
          <span>Meu espaço</span>
        </div>
        <button
          onClick={sair}
          className="icon-button"
          aria-label="Sair da conta"
          title="Sair da conta"
        >
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}
