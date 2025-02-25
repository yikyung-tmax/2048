// import { GameInfo } from "../Settings";
import "../styles/ScoreStyle.css";

export default function ScoreComponent() {
  // GameInfo 수정 필요
  // 더해진 점수 더하는 애니메이션

  return (
    <>
      <div className="score">
        <p>SCORE</p>
      </div>
      <div className="bestScore">
        <p>BEST</p>
      </div>
    </>
  );
}
