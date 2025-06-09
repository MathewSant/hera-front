import { useEffect, useState } from 'react';
import Parse from '@/lib/parseConfig';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';

export default function Universidades() {
  const router = useRouter();
  const { user, verificarLogin } = useUserStore();

  const [universidades, setUniversidades] = useState([]);
  const [form, setForm] = useState({ nome: '', area: '', site: '', cidade: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const u = await verificarLogin();
      if (!u) router.push('/login');
      else buscarUniversidades();
    };
    init();
  }, [router, verificarLogin]);

  const buscarUniversidades = async () => {
    try {
      const Universidade = Parse.Object.extend('Universidade');
      const query = new Parse.Query(Universidade);
      query.ascending('nome');
      const results = await query.find();
      const lista = results.map((item) => ({
        id: item.id,
        nome: item.get('nome'),
        area: item.get('area'),
        site: item.get('site'),
        cidade: item.get('cidade'),
      }));
      setUniversidades(lista);
    } catch (e) {
      console.error('Erro ao buscar universidades:', e);
    }
  };

  const salvarUniversidade = async () => {
    try {
      const Universidade = Parse.Object.extend('Universidade');
      const universidade = editId
        ? await new Parse.Query(Universidade).get(editId)
        : new Universidade();

      universidade.set('nome', form.nome);
      universidade.set('area', form.area);
      universidade.set('site', form.site);
      universidade.set('cidade', form.cidade);

      await universidade.save();
      setForm({ nome: '', area: '', site: '', cidade: '' });
      setEditId(null);
      buscarUniversidades();
    } catch (e) {
      console.error('Erro ao salvar:', e);
    }
  };

  const editarUniversidade = (uni) => {
    setForm(uni);
    setEditId(uni.id);
  };

  const excluirUniversidade = async (id) => {
    try {
      const query = new Parse.Query('Universidade');
      const obj = await query.get(id);
      await obj.destroy();
      buscarUniversidades();
    } catch (e) {
      console.error('Erro ao excluir:', e);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Gerenciar Parcerias com Universidades
        </h2>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {['nome', 'area', 'site', 'cidade'].map((campo) => (
            <input
              key={campo}
              type="text"
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={form[campo]}
              onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
              className="border p-2 rounded text-gray-700"
            />
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={salvarUniversidade}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editId ? 'Atualizar' : 'Cadastrar'}
          </button>
          {editId && (
            <button
              onClick={() => {
                setForm({ nome: '', area: '', site: '', cidade: '' });
                setEditId(null);
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="grid gap-4">
          {universidades.map((uni) => (
            <div
              key={uni.id}
              className="border border-green-200 p-4 rounded-md shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-green-700">{uni.nome}</h3>
                <p className="text-sm text-gray-600">{uni.area} – {uni.cidade}</p>
                <a href={uni.site} className="text-green-600 text-sm underline" target="_blank" rel="noreferrer">
                  {uni.site}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarUniversidade(uni)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirUniversidade(uni.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Excluir
                </button>
              </div>
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
