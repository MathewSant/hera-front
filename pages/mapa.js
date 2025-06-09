import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Parse from '@/lib/parseConfig';

const MapaLeaflet = dynamic(() => import('@/components/MapaLeaflet'), { ssr: false });

export default function MapaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const verificar = async () => {
      const user = await Parse.User.currentAsync();
      if (!user) router.push('/login');
      else setUsuario(user);
    };
    verificar();
  }, [router]);

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">Mapeamento e Alertas Locais</h2>
        <p className="text-gray-600 mb-4">
          Veja no mapa áreas com alertas simulados. Essa funcionalidade pode evoluir com dados reais ou sensores.
        </p>
        <MapaLeaflet />
      </div>
    </div>
    
  );
}
