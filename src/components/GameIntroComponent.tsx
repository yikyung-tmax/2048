import ScoreComponent from "./ScoreComponent";
import '../styles/GameIntroStyle.css'

export default function GameIntro(){

    return (
        <div className="gameIntro">
            {/* <div className="intro"> */}
                <div className="title">2048</div>
                <ScoreComponent/>
            {/* </div> */}
            <div className="intro">
                <h2>Play 2048 Game Online</h2>
                <p>Join the numbers and get to the
                    <strong> 2048 tile</strong>
                </p>
            </div>
        </div>
    )
}