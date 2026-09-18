import { useEffect, useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa6";

import {
  listarProdutos,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
} from "../services/produtoService";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidadeEstoque, setQuantidadeEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [cor, setCor] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [largura, setLargura] = useState("");
  const [profundidade, setProfundidade] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch (erro) {
      alert(erro.message);
    }
  }

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidadeEstoque("");
    setCategoria("");
    setMarca("");
    setCor("");
    setPeso("");
    setAltura("");
    setLargura("");
    setProfundidade("");
    setCodigoBarras("");
    setFabricante("");
    setAtivo(true);

    setIdEditando(null);
  }

  function abrirCadastro() {
    limparFormulario();
    setMostrarFormulario(true);
  }

  function editarProduto(produto) {
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setQuantidadeEstoque(produto.quantidadeEstoque);
    setCategoria(produto.categoria);
    setMarca(produto.marca);
    setCor(produto.cor);
    setPeso(produto.peso);
    setAltura(produto.altura);
    setLargura(produto.largura);
    setProfundidade(produto.profundidade);
    setCodigoBarras(produto.codigoBarras);
    setFabricante(produto.fabricante);
    setAtivo(produto.ativo);

    setIdEditando(produto.id);
    setMostrarFormulario(true);
  }

  async function salvarProduto(e) {
    e.preventDefault();

    const produto = {
      nome,
      descricao,
      preco: Number(preco),
      quantidadeEstoque: Number(quantidadeEstoque),
      categoria,
      marca,
      cor,
      peso: Number(peso),
      altura: Number(altura),
      largura: Number(largura),
      profundidade: Number(profundidade),
      codigoBarras,
      fabricante,
      ativo,
    };

    try {
      if (idEditando) {
        await atualizarProduto(idEditando, produto);
      } else {
        await cadastrarProduto(produto);
      }

      limparFormulario();
      setMostrarFormulario(false);

      carregarProdutos();
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function removerProduto(id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    try {
      await excluirProduto(id);
      carregarProdutos();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* TÍTULO */}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>

            <p className="text-gray-500 mt-1">Gerencie seus produtos</p>
          </div>

          <button
            onClick={abrirCadastro}
            className="
              flex items-center gap-2
              bg-blue-600 text-white
              px-5 py-2.5
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            <FaPlus />
            Novo produto
          </button>
        </div>

        {/* FORMULÁRIO */}

        {mostrarFormulario && (
          <form
            onSubmit={salvarProduto}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              {idEditando ? "Editar produto" : "Cadastrar produto"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                placeholder="Quantidade em estoque"
                value={quantidadeEstoque}
                onChange={(e) => setQuantidadeEstoque(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Cor"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Fabricante"
                value={fabricante}
                onChange={(e) => setFabricante(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Peso"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Altura"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Largura"
                value={largura}
                onChange={(e) => setLargura(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Profundidade"
                value={profundidade}
                onChange={(e) => setProfundidade(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Código de barras"
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ATIVO */}

            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.checked)}
                className="w-4 h-4"
              />

              <span className="text-gray-700">Produto ativo</span>
            </div>

            {/* BOTÕES */}

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="
                  bg-blue-600
                  text-white
                  px-5 py-2.5
                  rounded-lg
                  hover:bg-blue-700
                  transition
                "
              >
                {idEditando ? "Salvar alterações" : "Cadastrar"}
              </button>

              <button
                type="button"
                onClick={() => {
                  limparFormulario();
                  setMostrarFormulario(false);
                }}
                className="
                  bg-gray-200
                  text-gray-700
                  px-5 py-2.5
                  rounded-lg
                  hover:bg-gray-300
                  transition
                "
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* TABELA */}

        <div
          className="
          bg-white
          rounded-xl
          shadow-sm
          border border-gray-200
          overflow-hidden
        "
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">
              Produtos cadastrados
            </h2>

            <p className="text-sm text-gray-500">
              {produtos.length} produto(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-sm text-gray-600">
                  <th className="text-left px-6 py-4 font-semibold">Produto</th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Categoria
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">Preço</th>

                  <th className="text-center px-6 py-4 font-semibold">
                    Estoque
                  </th>

                  <th className="text-center px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="text-center px-6 py-4 font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {produtos.map((produto) => (
                  <tr key={produto.id} className="hover:bg-gray-50 transition">
                    {/* PRODUTO */}

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {produto.nome}
                      </p>

                      <p className="text-sm text-gray-500">{produto.marca}</p>
                    </td>

                    {/* CATEGORIA */}

                    <td className="px-6 py-4 text-gray-600">
                      {produto.categoria}
                    </td>

                    {/* PREÇO */}

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {Number(produto.preco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    {/* ESTOQUE */}

                    <td className="px-6 py-4 text-center text-gray-600">
                      {produto.quantidadeEstoque}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4 text-center">
                      {produto.ativo ? (
                        <span
                          className="
                          bg-green-100
                          text-green-700
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-medium
                        "
                        >
                          Ativo
                        </span>
                      ) : (
                        <span
                          className="
                          bg-red-100
                          text-red-700
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-medium
                        "
                        >
                          Inativo
                        </span>
                      )}
                    </td>

                    {/* AÇÕES */}

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editarProduto(produto)}
                          title="Editar"
                          className="
                            p-2
                            rounded-lg
                            text-blue-600
                            hover:bg-blue-50
                            transition
                          "
                        >
                          <FaPen />
                        </button>

                        <button
                          onClick={() => removerProduto(produto.id)}
                          title="Excluir"
                          className="
                            p-2
                            rounded-lg
                            text-red-600
                            hover:bg-red-50
                            transition
                          "
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {produtos.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              Nenhum produto cadastrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Produtos;
