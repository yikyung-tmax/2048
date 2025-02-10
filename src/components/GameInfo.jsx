import '../App.css';
// import {resetGame} from '../utils/GameOverUtils'

export const GameInfo = ({score, bestScore, resetGame}) => {
    return (
        <div className='gameContainer'>
            <div className='info'>
                <h1 className='title'>2048</h1>
                <div className='scores'>
                    {/* score 길이에 따라 다른 css 적용하거나 emotion 써보기 */}
                    <div className='score'>
                        <p>SCORE</p>
                        <span>{score}</span>
                    </div><div className='best'>
                        <p>BEST</p>
                        <span>{bestScore}</span>
                    </div>
                </div>
            </div>
            <div className='gameIntro'>
                <div className='intro'>
                    <h2 className='intro'>
                        Play 2048 Game Online
                    </h2>
                    <p className='intro'>Join the numbers and get to the
                        <strong> 2018 tile!</strong>
                    </p>
                </div>

                <button className='restartButton' onClick={resetGame}>New Game</button>
            </div>
        </div>

    )
}

export default GameInfo;