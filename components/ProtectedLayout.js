import Footer from '@/components/Footer';

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Conteúdo principal cresce para ocupar o espaço disponível */}
      <main className="flex-grow">{children}</main>

      {/* Footer sempre no fim da tela */}
      <Footer />
    </div>
  );
}
