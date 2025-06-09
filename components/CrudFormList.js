import { useRouter } from 'next/router';

export default function CrudFormList({
  titulo,
  campos,
  form,
  setForm,
  editId,
  salvar,
  setEditId,
  cancelarEdicao,
  dados,
  editar,
  excluir,
  renderItem,
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">{titulo}</h2>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {campos.map((c) => (
            <input
              key={c}
              type="text"
              placeholder={c.charAt(0).toUpperCase() + c.slice(1)}
              value={form[c]}
              onChange={(e) => setForm({ ...form, [c]: e.target.value })}
              className="border p-2 rounded text-gray-700"
            />
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={salvar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editId ? 'Atualizar' : 'Cadastrar'}
          </button>
          {editId && (
            <button
              onClick={cancelarEdicao}
              className="bg-red-500 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="grid gap-4">
          {dados.map((item) => (
            <div
              key={item.id}
              className="border border-green-200 p-4 rounded-md shadow-sm flex justify-between items-start"
            >
              <div>{renderItem(item)}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => editar(item)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(item.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de retorno */}
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
