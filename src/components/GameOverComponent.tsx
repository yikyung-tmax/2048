import "../styles/GameOverStyle.css"


export default function GameOver(){
    return (
        <div className="game-over">
            <p>Game Over!</p>
            <div className="lower">
                <div className="retry-button">Try again</div>
            </div>
        </div>
    )
}