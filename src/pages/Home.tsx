import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#f1daae] text-[#422718] px-4">
      <h1 className="text-3xl font-bold text-center">
        Bem-vindo ao{" "}
        <span className="text-[#A56734]">Gerador de Currículos Inteligente</span>
      </h1>

      <p className="text-lg text-center max-w-md">
        Gere seu currículo de forma{" "}
        <span className="font-semibold">simples</span>,{" "}
        <span className="font-semibold">rápida</span> e{" "}
        <span className="font-semibold">gratuita</span>!
      </p>

      <Link to="generator">
        <button className="bg-[#422718] hover:bg-[#A05135] text-[#D9B9A0] font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
          ☕ Vamos Começar?
        </button>
      </Link>
    </div>
  );
}

export default Home;
