import { useEffect } from 'react';
import { useCrud } from '@/hooks/useCrud';
import CrudFormList from '@/components/CrudFormList';
import { withAuth } from '@/hoc/withAuth';

function Produtos() {
  const campos = ['nome', 'descricao', 'preco', 'categoria', 'fornecedor'];
  const {
    dados,
    form,
    setForm,
    editId,
    setEditId,
    buscar,
    salvar,
    excluir,
  } = useCrud('Produto', campos);

  useEffect(() => {
    buscar();
  }, []);

  return (
    <CrudFormList
      titulo="Marketplace de Bioinsumos"
      campos={campos}
      form={form}
      setForm={setForm}
      editId={editId}
      salvar={salvar}
      setEditId={setEditId}
      cancelarEdicao={() => {
        setForm(Object.fromEntries(campos.map((c) => [c, ''])));
        setEditId(null);
      }}
      dados={dados}
      editar={(p) => {
        setForm(p);
        setEditId(p.id);
      }}
      excluir={excluir}
      renderItem={(p) => (
        <>
          <h3 className="text-lg font-semibold text-green-700">{p.nome}</h3>
          <p className="text-sm text-gray-600 mb-1">{p.descricao}</p>
          <p className="text-sm text-gray-600">Categoria: {p.categoria}</p>
          <p className="text-sm text-gray-600">Fornecedor: {p.fornecedor}</p>
          <p className="text-green-800 font-bold mt-1">R$ {Number(p.preco).toFixed(2)}</p>
        </>
      )}
    />
  );
}

export default withAuth(Produtos);
