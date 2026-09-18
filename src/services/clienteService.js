const API_URL = "/api";

export async function listarClientes() {
  const resposta = await fetch(`${API_URL}/clientes`);

  if (!resposta.ok) {
    throw new Error("Não foi possível listar os clientes");
  }

  return resposta.json();
}

export async function buscarCliente(id) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar o cliente");
  }

  return resposta.json();
}

export async function cadastrarCliente(cliente) {
  const resposta = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar o cliente");
  }

  return resposta.json();
}

export async function atualizarCliente(id, cliente) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível atualizar o cliente");
  }

  return resposta.json();
}

export async function excluirCliente(id) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir o cliente");
  }

  if (resposta.status === 204) {
    return;
  }

  return resposta.json();
}

export async function loginCliente(email, nome) {
  const resposta = await fetch(`${API_URL}/clientes`);

  if (!resposta.ok) {
    throw new Error("Não foi possível realizar o login");
  }

  const clientes = await resposta.json();

  const cliente = clientes.find(
    (cliente) => cliente.email === email && cliente.nome === nome,
  );

  if (!cliente) {
    throw new Error("Email ou nome incorretos");
  }

  return cliente;
}
