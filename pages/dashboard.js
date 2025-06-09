import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/userStore';

export default function Dashboard() {
  const router = useRouter();
  const { user, verificarLogin, logout } = useUserStore();

  useEffect(() => {
    (async () => {
      const u = await verificarLogin();
      if (!u) router.push('/login');
    })();
  }, [router, verificarLogin]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-green-700">
            Bem-vindo(a), {user.get('username')}!
          </h2>
         <button
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
          >
            Sair
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div
            onClick={() => router.push('/diagnostico')}
            className="cursor-pointer border border-green-200 hover:border-green-500 p-4 rounded-lg shadow-sm transition"
          >
            <h3 className="text-lg font-semibold text-green-600 mb-1">Diagnóstico de Pragas</h3>
            <p className="text-gray-600 text-sm">Simule o envio de uma imagem e veja o resultado (mock).</p>
          </div>

          <div
            onClick={() => router.push('/recomendacoes')}
            className="cursor-pointer border border-green-200 hover:border-green-500 p-4 rounded-lg shadow-sm transition"
          >
            <h3 className="text-lg font-semibold text-green-600 mb-1">Recomendações de Bioinsumos</h3>
            <p className="text-gray-600 text-sm">Veja sugestões de produtos adequados para seu cultivo.</p>
          </div>

          <div
            onClick={() => router.push('/produtos')}
            className="cursor-pointer border border-green-200 hover:border-green-500 p-4 rounded-lg shadow-sm transition"
          >
            <h3 className="text-lg font-semibold text-green-600 mb-1">Marketplace de Bioinsumos</h3>
            <p className="text-gray-600 text-sm">Catálogo de produtos com nome, descrição e preço.</p>
          </div>

            <div
            onClick={() => router.push('/parcerias')}
            className="cursor-pointer border border-green-200 hover:border-green-500 p-4 rounded-lg shadow-sm transition"
            >
            <h3 className="text-lg font-semibold text-green-600 mb-1">Parcerias com Universidades</h3>
            <p className="text-gray-600 text-sm">Conheça os centros de pesquisa que apoiam o projeto.</p>
            </div>

            <div
            onClick={() => router.push('/mapa')}
            className="cursor-pointer border border-green-200 hover:border-green-500 p-4 rounded-lg shadow-sm transition"
            >
            <h3 className="text-lg font-semibold text-green-600 mb-1">Mapeamento e Alertas Locais</h3>
            <p className="text-gray-600 text-sm">Veja possíveis focos de pragas em sua região.</p>
            </div>

          <div className="border border-yellow-300 p-4 rounded-lg shadow-sm bg-yellow-50">
            <h3 className="text-lg font-semibold text-yellow-700 mb-1">+ Futuro</h3>
            <p className="text-sm text-yellow-800">Rede de apoio, alertas, sensores, gamificação e mais.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
