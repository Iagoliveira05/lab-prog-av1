import { useEffect, useState } from "react";
import { loginCliente } from "../services/clienteService";
import { useNavigate, Link } from "react-router";
import { FiArrowRight, FiArrowUpRight, FiMail, FiUser } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("cliente"))
      navigate("/produtos", { replace: true });
  }, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const cliente = await loginCliente(email.trim(), nome.trim());
      localStorage.setItem("cliente", JSON.stringify(cliente));
      navigate("/produtos");
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthLayout>
      <span className="eyebrow">
        <span /> BOM TER VOCÊ POR AQUI
      </span>
      <h1>
        Entre no
        <br />
        seu <span className="text-accent">fluxo.</span>
      </h1>
      <p className="auth-description">
        Seu dia mais leve começa com tudo organizado.
      </p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="field">
          E-mail
          <div className="input-icon">
            <FiMail />
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              required
            />
          </div>
        </label>
        <label className="field">
          Nome
          <div className="input-icon">
            <FiUser />
            <input
              autoComplete="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como você se cadastrou"
              required
            />
          </div>
        </label>
        {erro && (
          <div className="notice error" role="alert">
            {erro}
          </div>
        )}
        <button
          className="button button-primary auth-submit"
          disabled={loading}
        >
          {loading ? "Entrando…" : "Entrar na minha conta"}
          <FiArrowRight />
        </button>
      </form>
      <div className="auth-divider">
        <span>SEU PRÓXIMO PASSO COMEÇA AQUI</span>
      </div>
      <p className="auth-switch">
        Ainda não tem uma conta?{" "}
        <Link to="/register">
          Comece agora <FiArrowUpRight />
        </Link>
      </p>
    </AuthLayout>
  );
}
