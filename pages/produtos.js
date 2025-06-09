import { useEffect, useState } from 'react';
import Parse from '@/lib/parseConfig';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';

export default function Produtos() {
  const router = useRouter();
  const { user, verificarLogin } = useUserStore();

  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', categoria: '', fornecedor: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const u = await verificarLogin();
      if (!u) router.push('/login');
      else buscarProdutos();
    };
    init();
  }, [router, verificarLogin]);

  const buscarProdutos = async () => {
    try {
      const Produto = Parse.Object.extend('Produto');
      const query = new Parse.Query(Produto);
      query.ascending('nome');
      const resultados = await query.find();

      const lista = resultados.map((item) => ({
        id: item.id,
        nome: item.get('nome'),
        descricao: item.get('descricao'),
        preco: item.get('preco'),
        categoria: item.get('categoria'),
        fornecedor: item.get('fornecedor'),
      }));

      setProdutos(lista);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const salvarProduto = async () => {
    try {
      const Produto = Parse.Object.extend('Produto');
      const produto = editId
        ? await new Parse.Query(Produto).get(editId)
        : new Produto();

      produto.set('nome', form.nome);
      produto.set('descricao', form.descricao);
      produto.set('preco', Number(form.preco));
      produto.set('categoria', form.categoria);
      produto.set('fornecedor', form.fornecedor);

      await produto.save();

      setForm({ nome: '', descricao: '', preco: '', categoria: '', fornecedor: '' });
      setEditId(null);
      buscarProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const editarProduto = (produto) => {
    setForm(produto);
    setEditId(produto.id);
  };

  const excluirProduto = async (id) => {
    try {
      const query = new Parse.Query('Produto');
      const obj = await query.get(id);
      await obj.destroy();
      buscarProdutos();
    } catch (e) {
      console.error('Erro ao excluir produto:', e);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Marketplace de Bioinsumos</h2>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {['nome', 'descricao', 'categoria', 'fornecedor'].map((campo) => (
            <input
              key={campo}
              type="text"
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={form[campo]}
              onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
              className="border p-2 rounded text-gray-700"
            />
          ))}
          <input
            type="number"
            placeholder="Preço"
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
            className="border p-2 rounded text-gray-700"
          />
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={salvarProduto}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editId ? 'Atualizar' : 'Cadastrar'}
          </button>
          {editId && (
            <button
              onClick={() => {
                setForm({ nome: '', descricao: '', preco: '', categoria: '', fornecedor: '' });
                setEditId(null);
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="border border-green-200 rounded-md p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-green-700">{produto.nome}</h3>
              <p className="text-gray-600 text-sm mt-1 mb-1">{produto.descricao}</p>
              <p className="text-sm text-gray-600"><strong>Categoria:</strong> {produto.categoria}</p>
              <p className="text-sm text-gray-600"><strong>Fornecedor:</strong> {produto.fornecedor}</p>
              <p className="text-green-800 font-bold mt-2">R$ {Number(produto.preco).toFixed(2)}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editarProduto(produto)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirProduto(produto.id)}
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
