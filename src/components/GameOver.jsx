import '../App.css';

export const GameOver = ({ isGameOver, resetGame }) => {
  return (
    isGameOver && (
      <div className="gameOver">
        <p>Game Over!</p>
        <button className="retryButton" onClick={resetGame}>Try again</button>
      </div>
    )
  );
};

export default GameOver;