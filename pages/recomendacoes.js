import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Parse from '@/lib/parseConfig';

export default function Recomendacoes() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  const recomendados = [
    {
      nome: "Bacillus thuringiensis",
      categoria: "controle biológico",
      descricao: "Bactéria eficaz contra lagartas em cultivos de milho e soja.",
    },
    {
      nome: "Extrato de Neem",
      categoria: "defensivo orgânico",
      descricao: "Inseticida natural com amplo espectro e baixa toxicidade.",
    },
    {
      nome: "Composto Orgânico NutriSolo",
      categoria: "fertilizante natural",
      descricao: "Melhora a estrutura do solo e fornece nutrientes orgânicos.",
    },
  ];

  useEffect(() => {
    const verificarLogin = async () => {
      const user = await Parse.User.currentAsync();
      if (!user) {
        router.push('/login');
      } else {
        setUsuario(user);
      }
    };
    verificarLogin();
  }, [router]);

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Recomendações de Bioinsumos</h2>

        <p className="text-gray-600 mb-6">
          Veja abaixo alguns bioinsumos recomendados com base em boas práticas sustentáveis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recomendados.map((item, index) => (
            <div
              key={index}
              className="border border-green-200 rounded-md p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-green-700">{item.nome}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.descricao}</p>
              <p className="text-sm text-gray-600"><strong>Categoria:</strong> {item.category || item.categoria}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="mt-6 text-sm text-green-600 hover:underline"
        >
          ← Voltar ao dashboard
        </button>
      </div>
    </div>
  );
}
