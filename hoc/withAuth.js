import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const { user, verificarLogin } = useUserStore();

    useEffect(() => {
      (async () => {
        const u = await verificarLogin();
        if (!u) router.replace('/login');
      })();
    }, [verificarLogin, router]);

    if (user === undefined) {
      return <div className="p-6 text-center">Verificando autenticação...</div>;
    }

    if (!user) return null; // evita piscar a tela antes do redirect

    return <Component {...props} />;
  };
}
