import { useState } from 'react';
import Parse from '@/lib/parseConfig';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [modo, setModo] = useState('login');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const alternarModo = () => {
    setMensagem('');
    setModo(modo === 'login' ? 'cadastro' : 'login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      if (modo === 'cadastro') {
        const user = new Parse.User();
        user.set('username', nome);
        user.set('password', senha);
        user.set('email', email);

        await user.signUp();
        setMensagem('Cadastro realizado com sucesso!');
      } else {
        await Parse.User.logIn(nome, senha);
        setMensagem('Login realizado com sucesso!');
        router.push('/dashboard');
      }
    } catch (error) {
      setMensagem('Erro: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-600">
          {modo === 'login' ? 'Login' : 'Cadastro'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Usuário</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800" 
            />
          </div>

          {modo === 'cadastro' && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            {modo === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>

          <button
            type="button"
            onClick={alternarModo}
            className="w-full text-sm text-green-700 mt-2 hover:underline"
          >
            {modo === 'login' ? 'Criar nova conta' : 'Já tenho conta'}
          </button>

          {mensagem && (
            <p className="text-center mt-4 text-sm font-medium text-blue-600">{mensagem}</p>
          )}
        </form>
      </div>
    </div>
  );
}
