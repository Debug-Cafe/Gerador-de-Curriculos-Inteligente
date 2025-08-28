import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1>Bem Vindo ao Gerador de Curriculos Inteligente</h1>
      <p>
        Aqui você pode gerar seu currículo de forma simples, rápida e gratuita!
      </p>
      <Link to="generator">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Vamos Começar?
        </button>
      </Link>
    </div>
  );
}

export default Home;
