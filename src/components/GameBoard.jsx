import '../App.css';
import {getCellColour} from '../utils/CellUIUtils'

export const GameBoard = ({grid}) => {
    return (
        <div className='game'>
            <div className='grid'>{
                grid.map((row, rowIdx) => (
                    <div key={rowIdx} className='row'>{
                        row.map((value, colIdx) => {
                        const { background, font, size } = getCellColour(value);
                        return value == 0
                            ? <div key={`${rowIdx}-${colIdx}`} className='emptyCell'></div>
                            : <div key={`${rowIdx}-${colIdx}`} className='filledCell' style={{ backgroundColor: background, color: font, fontSize: size }}>{value}</div>
                        })
                    }</div>
                ))
            }</div>
        </div>
    )
}

export default GameBoard;