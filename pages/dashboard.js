import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/userStore';
import { withAuth } from '@/hoc/withAuth';
import { LogOut, ChevronRight, Leaf, MapPin, Package, Users, Search } from 'lucide-react';

function Dashboard() {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const cards = [
    {
      title: "Diagnóstico de Pragas",
      description: "Simule o envio de uma imagem e veja o resultado (mock).",
      icon: <Search className="text-green-600 w-6 h-6" />,
      path: "/diagnostico",
    },
    {
      title: "Recomendações de Bioinsumos",
      description: "Veja sugestões de produtos adequados para seu cultivo.",
      icon: <Leaf className="text-green-600 w-6 h-6" />,
      path: "/recomendacoes",
    },
    {
      title: "Marketplace de Bioinsumos",
      description: "Catálogo de produtos com nome, descrição e preço.",
      icon: <Package className="text-green-600 w-6 h-6" />,
      path: "/produtos",
    },
    {
      title: "Parcerias com Universidades",
      description: "Conheça os centros de pesquisa que apoiam o projeto.",
      icon: <Users className="text-green-600 w-6 h-6" />,
      path: "/parcerias",
    },
    {
      title: "Mapeamento e Alertas Locais",
      description: "Veja possíveis focos de pragas em sua região.",
      icon: <MapPin className="text-green-600 w-6 h-6" />,
      path: "/mapa",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-700">Bem-vindo(a), {user.get('username')}!</h1>
            <p className="text-gray-500 mt-1 text-sm">Explore os recursos disponíveis abaixo.</p>
          </div>

          <button
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => router.push(card.path)}
              className="cursor-pointer border border-green-200 hover:border-green-500 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <h3 className="text-lg font-semibold text-green-700 group-hover:underline">
                    {card.title}
                  </h3>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-green-500 w-5 h-5" />
              </div>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}

          <div className="border border-yellow-300 p-5 rounded-xl bg-yellow-50 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-yellow-700 mb-1">+ Futuro</h3>
            <p className="text-sm text-yellow-800">
              Rede de apoio, alertas, sensores, gamificação e muito mais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
