const API_URL = "/api";

export async function listarProdutos(nome = "", categoria = "", ativo = "") {
  const parametros = new URLSearchParams();

  if (nome) {
    parametros.append("nome", nome);
  }

  if (categoria) {
    parametros.append("categoria", categoria);
  }

  if (ativo !== "") {
    parametros.append("ativo", ativo);
  }

  const url = parametros.toString()
    ? `${API_URL}/produtos?${parametros.toString()}`
    : `${API_URL}/produtos`;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Não foi possível listar os produtos");
  }

  return resposta.json();
}

export async function buscarProduto(id) {
  const resposta = await fetch(`${API_URL}/produtos/${id}`);

  if (!resposta.ok) {
    const erro = await lerErro(resposta);
    throw new Error(erro);
  }

  return resposta.json();
}

export async function cadastrarProduto(produto) {
  const resposta = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!resposta.ok) {
    const erro = await lerErro(resposta);
    throw new Error(erro);
  }

  return resposta.json();
}

export async function atualizarProduto(id, produto) {
  const resposta = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!resposta.ok) {
    const erro = await lerErro(resposta);
    throw new Error(erro);
  }

  return resposta.json();
}

export async function excluirProduto(id) {
  const resposta = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    const erro = await lerErro(resposta);
    throw new Error(erro);
  }

  if (resposta.status === 204) {
    return;
  }

  return resposta.json();
}

async function lerErro(resposta) {
  try {
    const dados = await resposta.json();

    return dados.mensagem || dados.message || "Ocorreu um erro na requisição";
  } catch {
    return "Ocorreu um erro na requisição";
  }
}
