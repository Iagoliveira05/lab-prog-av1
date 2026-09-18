import { useEffect, useState } from "react";
import { loginCliente } from "../services/clienteService";
import { useNavigate, Link } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clienteSalvo = localStorage.getItem("cliente");

    if (clienteSalvo) {
      navigate("/produtos");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setLoading(true);

    try {
      const cliente = await loginCliente(email, nome);
      localStorage.setItem("cliente", JSON.stringify(cliente));

      console.log("Cliente logado:", cliente);

      navigate("/produtos");
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>

          <p className="text-gray-500 mt-2">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>

            <input
              type="tel"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="24999999999"
              required
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            />
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              font-medium
              hover:bg-blue-700
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não possui uma conta?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
