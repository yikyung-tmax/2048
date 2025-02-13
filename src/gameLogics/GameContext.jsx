// import { createContext, useReducer } from 'react'
// import {Tile} from './components/Tile'
// import {gameReducer, initialState} from './Move'

// const direction = {
//     UP : "up",
//     DOWN : "down",
//     LEFT : "left",
//     RIGHT : "right"
// };
// Object.freeze(direction);

// export const GameContext = createContext({
//     score : 0,
//     isGameOver : false,
//     move : (direction) => {},
//     getTiles : () => [],
//     startGame : () => {}
// });

// export default function Game(){

//     const [gameState, dispatch] = useReducer(gameReducer, initialState);

//     const initializeGrid = () => {
//         let initialGrid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
//         for (let i = 0; i < INITIAL_TILES; i++) {
//           initialGrid = addRandomCell(initialGrid);
//         }
//         return initialGrid;
//       }
    
//     const findEmptyCells = (grid) => {
//     const emptyCells = [];
//     for (let r = 0; r < SIZE; r++) {
//         for (let c = 0; c < SIZE; c++) {
//         if (grid[r][c] == 0) emptyCells.push([r, c]);
//         }
//     }
//     return emptyCells;
//     }
    
//     const addRandomCell = (grid) => {
//         const emptyCells = findEmptyCells(grid);
//         if (emptyCells.length > 0) {
//             const idx = Math.floor(Math.random() * emptyCells.length);
//             const [row, col] = emptyCells[idx];
//             const newTile = Tile(idx, [row, col],Math.random() < 0.9 ? 2 : 4 );
//             dispatch("CREATE", newTile);
//         }
//     }

//     const move = 
// }