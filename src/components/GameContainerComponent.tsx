import Board from "./BoardComponent";
import GameIntro from "./GameIntroComponent";
import '../styles/GameContainerStyle.css'

export default function GameComponent(){

    return (
        <div className="gameContainer">
            <GameIntro/>
            <Board/>   
        </div>
    )
}