import ScoreComponent from "./ScoreComponent";
import NewGame from "./NewGameButton";
import '../styles/GameIntroStyle.css'
import { GameInfo } from "../Settings";


interface Props {
    gameInfo: GameInfo;
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}

export default function GameIntro({gameInfo, setGameInfo} : Props){

    return (
        <div className="gameIntro">
            <div className="heading">
                <div className="title">2048</div>
                <ScoreComponent gameInfo={gameInfo} setGameInfo={setGameInfo} />
            </div>
            <div className="intro">
                <div className="content">
                    <h2>Play 2048 Game Online</h2>
                    <p>Join the numbers and get to the
                        <strong> 2048 tile</strong>
                    </p>
                </div>
                <NewGame gameInfo={gameInfo} setGameInfo={setGameInfo}/>
            </div>
        </div>
    )
}