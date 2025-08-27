import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <h1>Bem Vindo ao Gerador de Curriculos Inteligente</h1>
            <p>Aqui você pode gerar seu currículo de forma simples, rápida e gratuita!</p>
            <Link to="generator">
            <button>
                Vamos Começar ?
            </button>
            </Link>
        </div>
    )
}

export default Home;