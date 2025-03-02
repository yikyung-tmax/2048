import Board from "./BoardComponent";
import GameIntro from "./GameIntroComponent";
import '../styles/GameContainerStyle.css'
import { useState } from "react";
import { GameInfo } from "../Settings";
import GameOver from "./GameOverComponent";

export default function GameComponent(){
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        board: [],
        tiles: {},
        status: "START",
        isChanged: false,
        score: 0,
        add : 0,
        bestScore: 0,
      });
    

    return (
        <div className="game-container">
            <GameIntro gameInfo = {gameInfo} setGameInfo = {setGameInfo}/>
            <Board gameInfo = {gameInfo} setGameInfo = {setGameInfo}/> 
            {gameInfo.status === 'GAME_OVER' && <GameOver/>}
        </div>
    )
}