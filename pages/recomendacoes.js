import { useEffect } from 'react';
import { useCrud } from '@/hooks/useCrud';
import CrudFormList from '@/components/CrudFormList';
import { withAuth } from '@/hoc/withAuth';
import ProtectedLayout from '@/components/ProtectedLayout';

function RecomendacoesPage() {
  const campos = ['nome', 'descricao', 'categoria'];

  const {
    dados,
    form,
    setForm,
    editId,
    setEditId,
    buscar,
    salvar,
    excluir,
  } = useCrud('Recomendacao', campos);

  useEffect(() => {
    buscar();
  }, []);

  return (
    <ProtectedLayout>
    <CrudFormList
      titulo="Recomendações de Bioinsumos"
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
      editar={(item) => {
        setForm(item);
        setEditId(item.id);
      }}
      excluir={excluir}
      renderItem={(item) => (
        <>
          <h3 className="text-lg font-semibold text-green-700">{item.nome}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.descricao}</p>
          <p className="text-sm text-gray-600">
            <strong>Categoria:</strong> {item.categoria}
          </p>
        </>
      )}
    />
    </ProtectedLayout>
  );
}

export default withAuth(RecomendacoesPage);
