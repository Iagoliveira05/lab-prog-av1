import { useState } from "react";
import { cadastrarCliente } from "../services/clienteService";
import { useNavigate, Link } from "react-router";

function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setLoading(true);

    const cliente = {
      nome,
      email,
      telefone,
      cidade,
      estado,
    };

    try {
      const clienteCriado = await cadastrarCliente(cliente);

      console.log("Cliente criado:", clienteCriado);

      navigate("/");
    } catch (error) {
      console.error(error);
      setErro("Não foi possível criar sua conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Criar conta</h1>

          <p className="text-gray-500 mt-2">Preencha seus dados para começar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              required
              className="
                w-full px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Email */}
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
                w-full px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>

            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="24999999999"
              className="
                w-full px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>

            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite sua cidade"
              className="
                w-full px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>

            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              placeholder="RJ"
              maxLength={2}
              className="
                w-full px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
              {erro}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              font-medium
              py-3
              rounded-lg
              hover:bg-blue-700
              active:bg-blue-800
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já possui uma conta?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
