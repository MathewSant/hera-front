import { useState } from 'react';
import Parse from '@/lib/parseConfig';

export function useCrud(className, campos) {
  const [dados, setDados] = useState([]);
  const [form, setForm] = useState(Object.fromEntries(campos.map((c) => [c, ''])));
  const [editId, setEditId] = useState(null);

  const buscar = async () => {
    const Obj = Parse.Object.extend(className);
    const query = new Parse.Query(Obj);
    query.ascending(campos[0]);
    const res = await query.find();

    const lista = res.map((item) => {
      const obj = { id: item.id };
      campos.forEach((c) => (obj[c] = item.get(c)));
      return obj;
    });
    setDados(lista);
  };

  const salvar = async () => {
    const Obj = Parse.Object.extend(className);
    const obj = editId
      ? await new Parse.Query(Obj).get(editId)
      : new Obj();

    campos.forEach((c) => obj.set(c, form[c]));
    await obj.save();

    setForm(Object.fromEntries(campos.map((c) => [c, ''])));
    setEditId(null);
    buscar();
  };

  const excluir = async (id) => {
    const query = new Parse.Query(className);
    const obj = await query.get(id);
    await obj.destroy();
    buscar();
  };

  return {
    dados,
    form,
    setForm,
    editId,
    setEditId,
    buscar,
    salvar,
    excluir,
  };
}
