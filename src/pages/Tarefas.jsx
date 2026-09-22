import { useCallback, useEffect, useState } from "react";
import {
  FiTrash2,
  FiPlus,
  FiCheckSquare,
  FiCheck,
  FiCircle,
  FiArrowUpRight,
  FiList,
  FiClock,
} from "react-icons/fi";
import {
  listarTarefas,
  cadastrarTarefa,
  atualizarStatusTarefa,
  excluirTarefa,
} from "../services/tarefaService";
import { EmptyState, Modal, Notice, Stat } from "../components/UI";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [excluindo, setExcluindo] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const carregar = useCallback(async () => {
    setLoading(true);
    setErro("");
    try {
      setTarefas(await listarTarefas());
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    let active = true;
    listarTarefas()
      .then((dados) => {
        if (active) setTarefas(dados);
      })
      .catch((error) => {
        if (active) setErro(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  async function adicionar(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    setSaving(true);
    setErro("");
    setSucesso("");
    try {
      await cadastrarTarefa({ titulo: titulo.trim() });
      setTitulo("");
      await carregar();
      setSucesso("Tarefa adicionada. Um novo passo no seu dia!");
    } catch (error) {
      setErro(error.message);
    } finally {
      setSaving(false);
    }
  }
  async function alterar(tarefa) {
    setBusyId(tarefa.id);
    setErro("");
    setSucesso("");
    try {
      await atualizarStatusTarefa(
        tarefa.id,
        tarefa.status === "concluida" ? "pendente" : "concluida",
      );
      await carregar();
    } catch (error) {
      setErro(error.message);
    } finally {
      setBusyId(null);
    }
  }
  async function remover() {
    setBusyId(excluindo.id);
    setDeleteError("");
    setSucesso("");
    try {
      await excluirTarefa(excluindo.id);
      setExcluindo(null);
      await carregar();
      setSucesso("Tarefa excluída.");
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setBusyId(null);
    }
  }
  const concluidas = tarefas.filter((t) => t.status === "concluida").length;
  const pendentes = tarefas.length - concluidas;
  const percentual = tarefas.length
    ? Math.round((concluidas / tarefas.length) * 100)
    : 0;
  const statValue = (value) =>
    loading || erro ? "—" : String(value).padStart(2, "0");
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">UMA COISA DE CADA VEZ</span>
          <h1>
            Suas tarefas<span className="text-accent">.</span>
          </h1>
          <p>Libere a mente. Coloque seus planos em movimento.</p>
        </div>
        <span className="heading-stamp">
          <FiCheckSquare /> FOCO NO QUE IMPORTA
        </span>
      </div>
      <div className="stats-grid">
        <Stat
          label="Tarefas no seu radar"
          value={statValue(tarefas.length)}
          icon={FiList}
          detail="Tudo o que você planejou"
          accent
        />
        <Stat
          label="Em andamento"
          value={statValue(pendentes)}
          icon={FiClock}
          detail="Seu próximo passo está aqui"
        />
        <Stat
          label="Concluídas"
          value={statValue(concluidas)}
          icon={FiCheckSquare}
          detail="Cada conquista conta"
        />
      </div>
      <Notice error={erro} success={sucesso} onRetry={carregar} />
      <div className="tasks-layout">
        <section className="panel tasks-panel" aria-labelledby="tarefas-titulo">
          <div className="panel-heading">
            <div>
              <span className="section-icon">
                <FiCheckSquare />
              </span>
              <h2 id="tarefas-titulo">Seu plano de ação</h2>
            </div>
            <span className="count-badge">
              {loading || erro ? "—" : tarefas.length}
            </span>
          </div>
          <form className="task-form" onSubmit={adicionar}>
            <label className="sr-only" htmlFor="nova-tarefa">
              Nova tarefa
            </label>
            <FiPlus />
            <input
              id="nova-tarefa"
              placeholder="O que vamos tirar do papel?"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              maxLength={250}
              required
            />
            <button
              className="button button-primary"
              disabled={saving || !titulo.trim()}
            >
              {saving ? "Adicionando…" : "Adicionar"}
              <FiArrowUpRight />
            </button>
          </form>
          {loading ? (
            <div className="loading-state" role="status">
              <span className="spinner" /> Organizando suas tarefas…
            </div>
          ) : erro && tarefas.length === 0 ? (
            <EmptyState
              icon={FiList}
              title="Suas tarefas estão indisponíveis"
              description="Tente carregar novamente em instantes."
            />
          ) : tarefas.length === 0 ? (
            <EmptyState
              icon={FiCheckSquare}
              title="Uma página em branco. Muitas possibilidades."
              description="Escreva sua primeira tarefa acima e dê o próximo passo."
            />
          ) : (
            <div className="task-list">
              {tarefas.map((tarefa) => (
                <div
                  className={`task-row ${tarefa.status === "concluida" ? "task-done" : ""}`}
                  key={tarefa.id}
                >
                  <label className="task-check">
                    <input
                      type="checkbox"
                      checked={tarefa.status === "concluida"}
                      disabled={busyId !== null || loading}
                      onChange={() => alterar(tarefa)}
                      aria-label={`Marcar ${tarefa.titulo} como ${tarefa.status === "concluida" ? "pendente" : "concluída"}`}
                    />
                    <span>
                      <FiCheck />
                    </span>
                  </label>
                  <div className="task-text">
                    <strong>{tarefa.titulo}</strong>
                    <span>
                      {tarefa.status === "concluida"
                        ? "Concluída. Mais um passo dado!"
                        : "Pronta para acontecer"}
                    </span>
                  </div>
                  <span
                    className={`status-badge ${tarefa.status === "concluida" ? "is-active" : "is-pending"}`}
                  >
                    {tarefa.status === "concluida" ? "Concluída" : "Pendente"}
                  </span>
                  <button
                    className="icon-button danger"
                    disabled={busyId !== null}
                    onClick={() => {
                      setDeleteError("");
                      setExcluindo(tarefa);
                    }}
                    aria-label={`Excluir ${tarefa.titulo}`}
                    title="Excluir tarefa"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="panel-footer">
            <span>Um passo de cada vez também é progresso.</span>
            <FiCheckSquare />
          </div>
        </section>
        <aside className="progress-panel">
          <span className="eyebrow">SEU MOVIMENTO</span>
          <h2>
            Cada passo
            <br />
            conta<span className="text-accent">.</span>
          </h2>
          <div
            className="progress-ring"
            style={{ "--progress": `${loading || erro ? 0 : percentual}%` }}
            role="img"
            aria-label={
              loading || erro
                ? "Progresso indisponível"
                : `${percentual}% das tarefas concluídas`
            }
          >
            <div>
              <strong>
                {loading || erro ? "—" : percentual}
                <span>{!loading && !erro && "%"}</span>
              </strong>
              <span>concluído</span>
            </div>
          </div>
          <div className="progress-legend">
            <span>
              <FiCircle /> Pendentes
            </span>
            <strong>{statValue(pendentes)}</strong>
          </div>
          <div className="progress-legend">
            <span>
              <FiCheckSquare /> Concluídas
            </span>
            <strong>{statValue(concluidas)}</strong>
          </div>
          <p>
            {!loading && !erro && tarefas.length > 0 && pendentes === 0
              ? "Tudo em dia. Aproveite essa sensação!"
              : "Você não precisa fazer tudo de uma vez. Só precisa começar."}
          </p>
          <span className="progress-spark" aria-hidden="true">
            ✳
          </span>
        </aside>
      </div>
      {excluindo && (
        <Modal
          title="Excluir tarefa?"
          onClose={() => {
            if (busyId === null) setExcluindo(null);
          }}
        >
          <div className="confirm-body">
            <p>
              A tarefa <strong>{excluindo.titulo}</strong> será removida. Essa
              ação não pode ser desfeita.
            </p>
            <Notice error={deleteError} />
            <div className="modal-actions">
              <button
                className="button button-secondary"
                disabled={busyId !== null}
                onClick={() => setExcluindo(null)}
              >
                Manter tarefa
              </button>
              <button
                className="button button-danger"
                disabled={busyId !== null}
                onClick={remover}
              >
                {busyId !== null ? "Excluindo…" : "Sim, excluir"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
