import { useEffect } from 'react';
import { useCrud } from '@/hooks/useCrud';
import CrudFormList from '@/components/CrudFormList';
import { withAuth } from '@/hoc/withAuth';

function ParceriasPage() {
  const campos = ['nome', 'area', 'site', 'cidade'];

  const {
    dados,
    form,
    setForm,
    editId,
    setEditId,
    buscar,
    salvar,
    excluir,
  } = useCrud('Universidade', campos);

  useEffect(() => {
    buscar();
  }, []);

  return (
    <CrudFormList
      titulo="Gerenciar Parcerias com Universidades"
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
      renderItem={(uni) => (
        <>
          <h3 className="text-lg font-semibold text-green-700">{uni.nome}</h3>
          <p className="text-sm text-gray-600">{uni.area} – {uni.cidade}</p>
          <a
            href={uni.site}
            className="text-green-600 text-sm underline"
            target="_blank"
            rel="noreferrer"
          >
            {uni.site}
          </a>
        </>
      )}
    />
  );
}

export default withAuth(ParceriasPage);
