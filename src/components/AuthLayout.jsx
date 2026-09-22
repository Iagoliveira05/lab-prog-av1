import { FiArrowUpRight, FiBox, FiCheck, FiCommand } from "react-icons/fi";
import Brand from "./Brand";
export default function AuthLayout({ children, register = false }) {
  return (
    <main className="auth-layout">
      <section className="auth-main">
        <div className="auth-top">
          <Brand />
          <span className="small-label">SEU ESPAÇO DE GESTÃO</span>
        </div>
        <div className={`auth-content ${register ? "auth-register" : ""}`}>
          {children}
        </div>
        <footer className="auth-footer">
          <span>Menos ruído. Mais movimento.</span>
          <span>
            Feito para simplificar <FiArrowUpRight />
          </span>
        </footer>
      </section>
      <aside className="auth-story">
        <div className="story-top">
          <span className="story-tag">
            <FiCommand /> ORGANIZE. SIMPLIFIQUE. EVOLUA.
          </span>
          <span>01 — 02</span>
        </div>
        <div className="story-heading">
          <h2>
            Suas ideias.
            <br />
            Seu ritmo.
            <br />
            <span>Seu fluxo.</span>
          </h2>
          <p>
            Produtos no lugar. Tarefas em dia.
            <br />
            Mais espaço para o que vem a seguir.
          </p>
        </div>
        <div className="flow-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="art-core">
            <span className="core-arrow">↗</span>
          </div>
          <div className="floating-card card-products">
            <span className="floating-icon">
              <FiBox />
            </span>
            <div>
              <strong>Tudo conectado</strong>
              <span>Seus produtos, em um só lugar</span>
            </div>
            <FiArrowUpRight />
          </div>
          <div className="floating-card card-tasks">
            <span className="floating-icon green">
              <FiCheck />
            </span>
            <div>
              <strong>Um passo de cada vez</strong>
              <span>Cada tarefa faz a diferença</span>
            </div>
          </div>
          <span className="art-spark spark-one">✳</span>
          <span className="art-dot" />
        </div>
        <div className="story-bottom">
          <span>CLAREZA PARA O SEU DIA A DIA.</span>
          <span className="story-pagination">
            <i />
            <i />
            <i />
          </span>
        </div>
      </aside>
    </main>
  );
}
