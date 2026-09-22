import { useState } from "react";
import { cadastrarCliente } from "../services/clienteService";
import { useNavigate, Link } from "react-router";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
export default function Register() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  function change(e) {
    setDados({
      ...dados,
      [e.target.name]:
        e.target.name === "estado"
          ? e.target.value.toUpperCase()
          : e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await cadastrarCliente(dados);
      navigate("/");
    } catch {
      setErro("Não foi possível criar sua conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthLayout register>
      <Link className="back-link" to="/">
        <FiArrowLeft /> Voltar para entrar
      </Link>
      <span className="eyebrow">
        <span /> UM NOVO COMEÇO
      </span>
      <h1>
        Abra espaço
        <br />
        para o <span className="text-accent">novo.</span>
      </h1>
      <p className="auth-description">Crie sua conta e encontre seu ritmo.</p>
      <form className="auth-form register-form" onSubmit={handleSubmit}>
        <label className="field">
          Nome completo
          <input
            name="nome"
            autoComplete="name"
            value={dados.nome}
            onChange={change}
            placeholder="Como podemos chamar você?"
            required
          />
        </label>
        <label className="field">
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={dados.email}
            onChange={change}
            placeholder="voce@exemplo.com"
            required
          />
        </label>
        <label className="field">
          Telefone <span className="optional">opcional</span>
          <input
            name="telefone"
            type="tel"
            autoComplete="tel"
            value={dados.telefone}
            onChange={change}
            placeholder="(00) 00000-0000"
          />
        </label>
        <div className="city-fields">
          <label className="field">
            Cidade <span className="optional">opcional</span>
            <input
              name="cidade"
              autoComplete="address-level2"
              value={dados.cidade}
              onChange={change}
              placeholder="Sua cidade"
            />
          </label>
          <label className="field">
            Estado
            <input
              name="estado"
              autoComplete="address-level1"
              value={dados.estado}
              onChange={change}
              placeholder="UF"
              maxLength={2}
            />
          </label>
        </div>
        {erro && (
          <div className="notice error" role="alert">
            {erro}
          </div>
        )}
        <button
          className="button button-primary auth-submit"
          disabled={loading}
        >
          {loading ? "Criando sua conta…" : "Criar minha conta"}
          <FiArrowRight />
        </button>
      </form>
      <p className="auth-switch">
        Já faz parte?{" "}
        <Link to="/">
          Entre na sua conta <FiArrowRight />
        </Link>
      </p>
    </AuthLayout>
  );
}
