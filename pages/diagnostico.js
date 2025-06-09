import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/userStore';

export default function Diagnostico() {
  const router = useRouter();
  const { user, verificarLogin } = useUserStore();
  const [imagem, setImagem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const init = async () => {
      const usuario = await verificarLogin();
      if (!usuario) router.push('/login');
    };
    init();
  }, [router, verificarLogin]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultado(null);
  };

  const handleEnviar = () => {
    if (!imagem) return;
    setCarregando(true);
    setResultado(null);

    // Simulação de IA
    setTimeout(() => {
      setResultado("⚠️ Lagarta do cartucho detectada!");
      setCarregando(false);
    }, 2000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Diagnóstico de Pragas</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Envie uma imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-green-100 file:text-green-700
              hover:file:bg-green-200"
          />
        </div>

        {previewUrl && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-2">Pré-visualização:</p>
            <img
              src={previewUrl}
              alt="Prévia da imagem"
              className="w-full max-h-64 object-contain border rounded-md"
            />
          </div>
        )}

        <button
          onClick={handleEnviar}
          disabled={!imagem || carregando}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          {carregando ? "Analisando imagem..." : "Realizar Diagnóstico"}
        </button>

        {resultado && (
          <div className="mt-6 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md p-4 text-center">
            <p className="text-lg font-medium">{resultado}</p>
          </div>
        )}

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
