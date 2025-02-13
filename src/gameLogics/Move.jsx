// import {Tile} from './components/Tile';
// import {SIZE} from '../Constants'

// class State {
//     constructor(grid, score, isChanged, isGameOver){
//         this.grid = grid;
//         this.score = score;
//         this.isChanged = isChanged;
//         this.isGameOver = isGameOver;
//     }
// }


// export default function gameReducer(state, action){
//     const nextGrid = [...state.grid];
//     let nextScore = state.score;
//     switch (action){
//         case "up" : {
//             shiftUp(nextGrid);
//             for (let col = 0; col < SIZE; col++) {
//                 for (let row = 0; row < SIZE - 1; row++) {
//                   if (nextGrid[row][col] == nextGrid[row + 1][col]) {
//                     nextGrid[row][col] += nextGrid[row + 1][col];
//                     nextGrid[row + 1][col] = 0;
//                     nextScore += nextGrid[row][col];
//                   }
//                 }
//             }
//             shiftUp(nextGrid);
//             break;
//         }
//         case "down" : {
//             shiftDown(nextGrid);
//             for (let col = 0; col < SIZE; col++) {
//               for (let row = SIZE - 1; row > 0; row--) {
//                 if (nextGrid[row][col] == nextGrid[row - 1][col]) {
//                   nextGrid[row][col] += nextGrid[row - 1][col];
//                   nextGrid[row - 1][col] = 0;
//                   nextScore += nextGrid[row][col];
//                 }
//               }
//             }
//             break;
//         }
//         case "left" : {
//             shiftLeft(nextGrid);
//             for (let row = 0; row < SIZE; row++) {
//               for (let col = 0; col < SIZE - 1; col++) {
//                 if (nextGrid[row][col] == nextGrid[row][col + 1]) {
//                   nextGrid[row][col] += nextGrid[row][col + 1];
//                   nextGrid[row][col + 1] = 0;
//                   nextScore += nextGrid[row][col];
//                 }
//               }
//             }
//             shiftLeft(nextGrid);
//             break;
//         }
//         case "right" : {
//             shiftRight(nextGrid);
//             for (let row = 0; row < SIZE; row++) {
//               for (let col = SIZE - 1; col > 0; col--) {
//                 if (nextGrid[row][col] == nextGrid[row][col - 1]) {
//                   nextGrid[row][col] += nextGrid[row][col - 1];
//                   nextGrid[row][col - 1] = 0;
//                   nextScore += nextGrid[row][col];
//                 }
//               }
//             }
//             shiftRight(nextGrid);
//         }
//     }
//     return new State(nextGrid, nextScore, state.isChanged, state.isGameOver);
// }

// const shiftUp = (grid) => {
//     for (let col = 0; col < SIZE; col++) {
//       let cnt = 0;
//       for (let row = 0; row < SIZE; row++) {
//         if (grid[row][col] != 0) {
//           grid[cnt][col] = grid[row][col];
//           if (cnt != row) grid[row][col] = 0;
//           cnt++;
//         }
//       }
//     }
//     return grid;
//   }
  
//   const shiftDown = (grid) => {
//     for (let col = 0; col < SIZE; col++) {
//       let cnt = SIZE - 1;
//       for (let row = SIZE - 1; row >= 0; row--) {
//         if (grid[row][col] != 0) {
//           grid[cnt][col] = grid[row][col];
//           if (cnt != row) grid[row][col] = 0;
//           cnt--;
//         }
//       }
//     }
//     return grid;
//   }
  
//   const shiftLeft = (grid) => {
//     for (let row = 0; row < SIZE; row++) {
//       let cnt = 0;
//       for (let col = 0; col < SIZE; col++) {
//         if (grid[row][col] != 0) {
//           grid[row][cnt] = grid[row][col];
//           if (cnt != col) grid[row][col] = 0;
//           cnt++;
//         }
//       }
//     }
//     return grid;
//   }
  
//   const shiftRight = (grid) => {
//     for (let row = 0; row < SIZE; row++) {
//       let cnt = SIZE - 1;
//       for (let col = SIZE - 1; col >= 0; col--) {
//         if (grid[row][col] != 0) {
//           grid[row][cnt] = grid[row][col];
//           if (cnt != col) grid[row][col] = 0;
//           cnt--;
//         }
//       }
//     }
//     return grid;
//   }