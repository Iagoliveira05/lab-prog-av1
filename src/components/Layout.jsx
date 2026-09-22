import { Outlet, useLocation } from "react-router";
import { FiChevronRight, FiCalendar } from "react-icons/fi";
import TopBar from "./TopBar";
export default function Layout() {
  const { pathname } = useLocation();
  const date = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <TopBar />
      <div className="workspace">
        <header className="workspace-header">
          <span>
            Meu espaço <FiChevronRight />
            <strong>{pathname === "/tarefas" ? "Tarefas" : "Produtos"}</strong>
          </span>
          <span className="workspace-date">
            <FiCalendar />
            {date}
          </span>
        </header>
        <main id="main-content" className="workspace-main">
          <Outlet />
        </main>
        <footer className="workspace-footer">
          <span>
            fluxo. <span>Mais clareza, todos os dias.</span>
          </span>
          <span>DO SEU JEITO. NO SEU RITMO.</span>
        </footer>
      </div>
    </div>
  );
}
