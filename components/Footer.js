import { SiGithub } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="w-full text-center text-sm text-green-700 py-6 mt-10 bg-green-50 border-t border-green-200">
      <div className="max-w-4xl mx-auto px-4">
        <p className="mb-1">
          Projeto <span className="font-bold">Hera</span> — desenvolvido na disciplina
          <span className="italic"> Projeto Integrador em Sistemas</span> da <span className="font-bold">Unicap</span>.
        </p>
        <p className="flex items-center justify-center gap-1 mt-1 text-green-800">
          Feito com 💚 pelo <span className="font-semibold">Grupo 11</span>{' '}
          <a
            href="https://github.com/MathewSant/Hera"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hover:text-green-600 transition"
          >
            <SiGithub size={24} />
          </a>
        </p>
      </div>
    </footer>
  );
}
