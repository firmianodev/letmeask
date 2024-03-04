import ilustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg";
import googleIconImg from  "../assets/images/google-icon.svg";

import "../styles/auth.scss"

export function Home() {
    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className="create-room">
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                        />
                        <button type="submit">
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}