import { useEffect, useState, useCallback } from "react";
import {
  FiBox,
  FiLayers,
  FiDollarSign,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiArrowUpRight,
  FiPackage,
} from "react-icons/fi";
import {
  listarProdutos,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
} from "../services/produtoService";
import { EmptyState, Modal, Notice, Stat } from "../components/UI";

const inicial = {
  nome: "",
  descricao: "",
  preco: "",
  quantidadeEstoque: "",
  categoria: "",
  marca: "",
  cor: "",
  peso: "",
  altura: "",
  largura: "",
  profundidade: "",
  codigoBarras: "",
  fabricante: "",
  ativo: true,
};
const numericos = [
  "preco",
  "quantidadeEstoque",
  "peso",
  "altura",
  "largura",
  "profundidade",
];
const moeda = (value) =>
  Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
const campos = [
  ["nome", "Nome do produto", "Ex.: Caderno pontilhado", true],
  ["categoria", "Categoria", "Ex.: Papelaria"],
  ["preco", "Preço (R$)", "0,00", true],
  ["quantidadeEstoque", "Quantidade em estoque", "0", true],
  ["marca", "Marca", "Marca do produto"],
  ["fabricante", "Fabricante", "Nome do fabricante"],
  ["cor", "Cor", "Ex.: Preto"],
  ["codigoBarras", "Código de barras", "Código do produto"],
  ["peso", "Peso", "0"],
  ["altura", "Altura", "0"],
  ["largura", "Largura", "0"],
  ["profundidade", "Profundidade", "0"],
];

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [formulario, setFormulario] = useState(null);
  const [formErro, setFormErro] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [excluindo, setExcluindo] = useState(null);
  const [saving, setSaving] = useState(false);
  const carregarProdutos = useCallback(async () => {
    setLoading(true);
    setErro("");
    try {
      setProdutos(await listarProdutos());
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    let active = true;
    listarProdutos()
      .then((dados) => {
        if (active) setProdutos(dados);
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

  function abrirFormulario(produto) {
    setIdEditando(produto?.id ?? null);
    setFormErro("");
    setFormulario(
      produto
        ? Object.fromEntries(
            Object.keys(inicial).map((key) => [
              key,
              produto[key] ?? inicial[key],
            ]),
          )
        : { ...inicial },
    );
  }
  function fecharFormulario() {
    if (!saving) setFormulario(null);
  }
  async function salvar(e) {
    e.preventDefault();
    setSaving(true);
    setFormErro("");
    setSucesso("");
    const produto = { ...formulario };
    numericos.forEach((key) => {
      produto[key] = Number(produto[key]);
    });
    try {
      if (idEditando !== null) await atualizarProduto(idEditando, produto);
      else await cadastrarProduto(produto);
      setFormulario(null);
      setSucesso(
        idEditando !== null
          ? "Alterações salvas. Tudo atualizado!"
          : "Produto cadastrado. Seu catálogo está crescendo!",
      );
      await carregarProdutos();
    } catch (error) {
      setFormErro(error.message);
    } finally {
      setSaving(false);
    }
  }
  async function remover() {
    setSaving(true);
    setFormErro("");
    setSucesso("");
    try {
      await excluirProduto(excluindo.id);
      setExcluindo(null);
      setSucesso("Produto excluído.");
      await carregarProdutos();
    } catch (error) {
      setFormErro(error.message);
    } finally {
      setSaving(false);
    }
  }
  const unidades = produtos.reduce(
    (sum, p) => sum + Number(p.quantidadeEstoque || 0),
    0,
  );
  const valor = produtos.reduce(
    (sum, p) => sum + Number(p.preco || 0) * Number(p.quantidadeEstoque || 0),
    0,
  );
  const ativos = produtos.filter((p) => p.ativo).length;
  const statValue = (value) => (loading || erro ? "—" : value);

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">TUDO EM SEU LUGAR</span>
          <h1>
            Seus produtos<span className="text-accent">.</span>
          </h1>
          <p>Uma visão clara de tudo o que você tem.</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => abrirFormulario()}
        >
          <FiPlus /> Novo produto
        </button>
      </div>
      <div className="stats-grid">
        <Stat
          label="Produtos cadastrados"
          value={statValue(String(produtos.length).padStart(2, "0"))}
          icon={FiBox}
          detail={
            loading || erro
              ? "Seu catálogo de produtos"
              : `${ativos} ativos no catálogo`
          }
          accent
        />
        <Stat
          label="Unidades em estoque"
          value={statValue(unidades.toLocaleString("pt-BR"))}
          icon={FiLayers}
          detail="Soma de todos os produtos"
        />
        <Stat
          label="Valor do estoque"
          value={statValue(moeda(valor))}
          icon={FiDollarSign}
          detail="Preço × quantidade disponível"
        />
      </div>
      <Notice error={erro} success={sucesso} onRetry={carregarProdutos} />
      <section
        className="panel product-panel"
        aria-labelledby="catalogo-titulo"
      >
        <div className="panel-heading">
          <div>
            <span className="section-icon">
              <FiPackage />
            </span>
            <h2 id="catalogo-titulo">Seu catálogo</h2>
            <span className="count-badge">
              {loading || erro ? "—" : produtos.length}
            </span>
          </div>
          <span className="panel-caption">Os detalhes fazem a diferença.</span>
        </div>
        {loading ? (
          <div className="loading-state" role="status">
            <span className="spinner" /> Buscando seus produtos…
          </div>
        ) : erro ? (
          <EmptyState
            icon={FiBox}
            title="Não conseguimos carregar seu catálogo"
            description="Tente novamente para ver seus produtos."
          />
        ) : produtos.length === 0 ? (
          <EmptyState
            icon={FiBox}
            title="Grandes coisas começam com o primeiro produto."
            description="Adicione um produto e dê vida ao seu catálogo."
          >
            <button
              className="button button-secondary"
              onClick={() => abrirFormulario()}
            >
              Adicionar primeiro produto <FiArrowUpRight />
            </button>
          </EmptyState>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th className="align-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto, index) => (
                  <tr key={produto.id}>
                    <td>
                      <div className="product-name">
                        <span className={`product-symbol symbol-${index % 3}`}>
                          <FiBox />
                        </span>
                        <div>
                          <strong>{produto.nome}</strong>
                          <span>{produto.marca || "Sem marca"}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-label">
                        {produto.categoria || "Sem categoria"}
                      </span>
                    </td>
                    <td className="price-cell">{moeda(produto.preco)}</td>
                    <td>
                      <span
                        className={
                          Number(produto.quantidadeEstoque) === 0
                            ? "stock-zero"
                            : ""
                        }
                      >
                        {produto.quantidadeEstoque}{" "}
                        <span className="muted">un.</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${produto.ativo ? "is-active" : "is-inactive"}`}
                      >
                        {produto.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          onClick={() => abrirFormulario(produto)}
                          aria-label={`Editar ${produto.nome}`}
                          title="Editar produto"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="icon-button danger"
                          onClick={() => {
                            setFormErro("");
                            setExcluindo(produto);
                          }}
                          aria-label={`Excluir ${produto.nome}`}
                          title="Excluir produto"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="panel-footer">
          <span>
            {loading
              ? "Carregando catálogo"
              : erro
                ? "Catálogo indisponível"
                : `${produtos.length} produto${produtos.length === 1 ? "" : "s"} no seu espaço`}
          </span>
          <FiBox />
        </div>
      </section>
      {formulario && (
        <Modal
          title={idEditando !== null ? "Editar produto" : "Um novo produto."}
          onClose={fecharFormulario}
          wide
        >
          <form onSubmit={salvar} className="product-form">
            <p className="form-intro">
              Preencha os detalhes. Campos com * são obrigatórios.
            </p>
            <div className="form-grid">
              {campos.map(([key, label, placeholder, required]) => (
                <label className="field" key={key}>
                  {label}
                  {required ? " *" : ""}
                  <input
                    name={key}
                    type={numericos.includes(key) ? "number" : "text"}
                    min={numericos.includes(key) ? "0" : undefined}
                    step={
                      key === "quantidadeEstoque"
                        ? "1"
                        : numericos.includes(key)
                          ? "0.01"
                          : undefined
                    }
                    required={required}
                    placeholder={placeholder}
                    value={formulario[key]}
                    onChange={(e) =>
                      setFormulario({ ...formulario, [key]: e.target.value })
                    }
                  />
                </label>
              ))}
            </div>
            <label className="field description-field">
              Descrição
              <textarea
                rows={3}
                value={formulario.descricao}
                onChange={(e) =>
                  setFormulario({ ...formulario, descricao: e.target.value })
                }
                placeholder="O que torna esse produto especial?"
              />
            </label>
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={formulario.ativo}
                onChange={(e) =>
                  setFormulario({ ...formulario, ativo: e.target.checked })
                }
              />
              <span>Produto ativo no catálogo</span>
            </label>
            <Notice error={formErro} />
            <div className="modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={fecharFormulario}
                disabled={saving}
              >
                Cancelar
              </button>
              <button className="button button-primary" disabled={saving}>
                {saving
                  ? "Salvando…"
                  : idEditando !== null
                    ? "Salvar alterações"
                    : "Cadastrar produto"}
                <FiArrowUpRight />
              </button>
            </div>
          </form>
        </Modal>
      )}
      {excluindo && (
        <Modal
          title="Excluir produto?"
          onClose={() => {
            if (!saving) setExcluindo(null);
          }}
        >
          <div className="confirm-body">
            <p>
              O produto <strong>{excluindo.nome}</strong> será removido do
              catálogo. Essa ação não pode ser desfeita.
            </p>
            <Notice error={formErro} />
            <div className="modal-actions">
              <button
                className="button button-secondary"
                disabled={saving}
                onClick={() => setExcluindo(null)}
              >
                Manter produto
              </button>
              <button
                className="button button-danger"
                disabled={saving}
                onClick={remover}
              >
                {saving ? "Excluindo…" : "Sim, excluir"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
