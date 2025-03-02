import { useEffect, useState } from "react";
import { GameInfo } from "../Settings";
import "../styles/ScoreStyle.css";

interface Props {
  gameInfo: GameInfo;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}

export default function ScoreComponent({ gameInfo, setGameInfo }: Props) {
  const [floatingScore, setFloatingScore] = useState<number | null>(null);

  useEffect(() => {
    if (gameInfo.add > 0) {
      setFloatingScore(gameInfo.add);

      setGameInfo((prev) => ({
        ...prev,
        score: prev.score + prev.add,
        add: 0,
      }));

      setTimeout(() => {
        setFloatingScore(null);
      }, 600);
    }
  }, [gameInfo?.add, setGameInfo]);

  return (
    <div className="scores-container">
      <div className="score">
        <p className="score-label">SCORE</p>
        <p className="score-value">{gameInfo?.score ?? 0}</p>
        {floatingScore !== null && (
          <span className="score-addition">+{floatingScore}</span>
        )}
      </div>
      <div className="bestScore">
        <p className="score-label">BEST</p>
        <p className="score-value">{gameInfo?.bestScore ?? 0}</p>
      </div>
    </div>
  );
}
