import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import {
  listarTarefas,
  cadastrarTarefa,
  atualizarStatusTarefa,
  excluirTarefa,
} from "../services/tarefaService";

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const dados = await listarTarefas();
      setTarefas(dados);
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function adicionarTarefa(e) {
    e.preventDefault();

    if (!titulo.trim()) {
      return;
    }

    const tarefa = {
      titulo: titulo,
    };

    try {
      await cadastrarTarefa(tarefa);

      setTitulo("");
      carregarTarefas();
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function alterarStatus(tarefa) {
    const novoStatus = tarefa.status === "concluida" ? "pendente" : "concluida";

    try {
      await atualizarStatusTarefa(tarefa.id, novoStatus);

      carregarTarefas();
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function removerTarefa(id) {
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) {
      return;
    }

    try {
      await excluirTarefa(id);

      carregarTarefas();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* TÍTULO */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tarefas</h1>

          <p className="text-gray-500 mt-1">Organize suas tarefas</p>
        </div>

        {/* ADICIONAR TAREFA */}

        <form onSubmit={adicionarTarefa} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Digite uma tarefa..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="
              flex-1
              bg-white
              border border-gray-300
              rounded-lg
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-5
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Adicionar
          </button>
        </form>

        {/* LISTA DE TAREFAS */}

        <div
          className="
          bg-white
          rounded-xl
          shadow-sm
          border border-gray-200
          overflow-hidden
        "
        >
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="
                flex
                items-center
                gap-4
                px-5 py-4
                border-b
                border-gray-100
                last:border-0
                hover:bg-gray-50
                transition
              "
            >
              {/* CHECKBOX */}

              <input
                type="checkbox"
                checked={tarefa.status === "concluida"}
                onChange={() => alterarStatus(tarefa)}
                className="w-5 h-5 cursor-pointer"
              />

              {/* TÍTULO */}

              <p
                className={`
                  flex-1
                  ${
                    tarefa.status === "concluida"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }
                `}
              >
                {tarefa.titulo}
              </p>

              {/* EXCLUIR */}

              <button
                onClick={() => removerTarefa(tarefa.id)}
                title="Excluir"
                className="
                  text-red-500
                  p-2
                  rounded-lg
                  hover:bg-red-50
                  transition
                "
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {tarefas.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhuma tarefa cadastrada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tarefas;
