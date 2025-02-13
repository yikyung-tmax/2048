// /** @jsx jsx */

import '../App.css';
import { getCellColour } from '../utils/CellUIUtils'
import { filledCellStyle, moveTileAnimation } from "../style";

export const GameBoard = ({ grid, movedTiles}) => {

    console.log("Game Board");
    console.log(grid);
    console.log(movedTiles);

    return (
        <div className='game'>
            <div className='grid'>{
                grid.map((row, rowIdx) => (
                    <div key={rowIdx} className='row'>{
                        row.map((value, colIdx) => {
                            const { background, font, size } = getCellColour(value);

                            const movedTile = (movedTiles || []).find(
                                (tile) => tile.before[0] === rowIdx && tile.before[1] === colIdx
                            );

                            console.log(movedTile);

                            const animationClass = movedTile 
                            ? moveTileAnimation(movedTile.before[0], movedTile.before[1], movedTile.after[0], movedTile.after[1]) 
                            : "";

                            console.log(animationClass);

                            return value == 0
                                ? <div key = {`${rowIdx}-${colIdx}`} className = 'emptyCell'></div>
                                : (
                                    <div
                                        key = {`${rowIdx}-${colIdx}`}
                                        css= {[filledCellStyle, animationClass]}
                                        // className = {filledCellStyle} 
                                        style = {{
                                            backgroundColor: background,
                                            color: font,
                                            fontSize: size
                                        }}>{value}
                                    </div>
                                );
                        })
                    }</div>
                ))
            }</div>
        </div>
    )
}

export default GameBoard;