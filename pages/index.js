import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/userStore';

export default function HomePage() {
  const router = useRouter();
  const { verificarLogin } = useUserStore();

  useEffect(() => {
    (async () => {
      const user = await verificarLogin();
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    })();
  }, [router, verificarLogin]);

  return null; // Não mostra nada na tela enquanto redireciona
}
