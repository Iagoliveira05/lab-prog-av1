const API_URL = "/api";

export async function listarTarefas() {
  const resposta = await fetch(`${API_URL}/tarefas`);

  if (!resposta.ok) {
    throw new Error("Não foi possível listar as tarefas");
  }

  return resposta.json();
}

export async function cadastrarTarefa(tarefa) {
  const resposta = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();

    console.log("Erro ao cadastrar:", erro);

    throw new Error("Não foi possível cadastrar a tarefa");
  }

  return resposta.json();
}

export async function atualizarTarefa(id, tarefa) {
  const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    console.log("Erro da API:", erro);

    throw new Error("Não foi possível atualizar a tarefa");
  }

  return resposta.json();
}

export async function atualizarStatusTarefa(id, status) {
  const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();

    console.log("Erro ao atualizar status:", erro);

    throw new Error("Não foi possível atualizar a tarefa");
  }

  return resposta.json();
}

export async function excluirTarefa(id) {
  const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir a tarefa");
  }

  if (resposta.status === 204) {
    return;
  }

  return resposta.json();
}
