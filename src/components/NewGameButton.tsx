import '../styles/NewGameButtonStyle.css'
import { GameInfo } from '../Settings';
import { startGame } from '../game/Game';

interface Props {
    gameInfo: GameInfo;
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}
export default function NewGame({ gameInfo, setGameInfo } : Props) {

    const handleNewGame = () =>{
        const initialize : GameInfo = startGame();
        setGameInfo({
            ...initialize,
            score:0,
            add:0,
            bestScore: Math.max(gameInfo.score, gameInfo.bestScore)
        })
        
    }
    return <div className='new-game-button' onClick={handleNewGame}>
        New Game
    </div>
}
