import dynamic from 'next/dynamic';
import { withAuth } from '@/hoc/withAuth';
import { useRouter } from 'next/router';
import ProtectedLayout from '@/components/ProtectedLayout';

const MapaLeaflet = dynamic(() => import('@/components/MapaLeaflet'), { ssr: false });

function MapaPage() {
  const router = useRouter();

  return (
    <ProtectedLayout>
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Mapeamento e Alertas Locais</h2>

        <p className="text-gray-600 mb-4">
          Visualize regiões com possíveis focos de pragas. As informações são simuladas, mas ilustram o potencial de monitoramento via sensores ou denúncias futuras.
        </p>

        <MapaLeaflet />

        <button
          onClick={() => router.push('/dashboard')}
          className="mt-6 text-sm text-green-600 hover:underline"
        >
          ← Voltar ao dashboard
        </button>
      </div>
    </div>
    </ProtectedLayout>
  );
}

export default withAuth(MapaPage);
