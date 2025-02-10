// import {SIZE, INITIAL_TILES} from './staticVariables'


// const size = SIZE;
// const tiles = INITIAL_TILES;

// export const initializeGrid = () => {
//   let initialGrid = Array.from({ length: size }, () => Array(size).fill(0));
//   for (let i = 0; i < tiles; i++) {
//     initialGrid = addRandomCell(initialGrid);
//   }
//   return initialGrid;
// };

// export const findRandomCells = (grid) => {
//   const emptyCells = [];
//   for (let r = 0; r < size; r++) {
//     for (let c = 0; c < size; c++) {
//       if (grid[r][c] == 0) emptyCells.push([r, c]);
//     }
//   }
//   return emptyCells;
// };

// const chooseRandomCell = (max) => {
//   return Math.floor(Math.random() * max);
// }

// export const addRandomCell = (grid) => {
//   const emptyCells = findRandomCells(grid);
//   if (emptyCells.length > 0) {
//     const [row, col] = emptyCells[chooseRandomCell(emptyCells.length)];
//     grid[row][col] = Math.random() < 0.9 ? 2 : 4;
//   }
//   return grid;
// }

// export const moveUp = (grid, score) => {
//   let nextGrid = [...grid];
//   let nextScore = score;
//   shiftUp(nextGrid);
//   for (let col = 0; col < size; col++) {
//     for (let row = 0; row < size - 1; row++) {
//       if (nextGrid[row][col] == nextGrid[row + 1][col]) {
//         nextGrid[row][col] += nextGrid[row + 1][col];
//         nextGrid[row + 1][col] = 0;
//         nextScore += nextGrid[row][col];
//       }
//     }
//   }
//   shiftUp(nextGrid);
//   return [nextGrid, nextScore];
// }

// export const moveDown = (grid, score) => {
//   let nextGrid = [...grid];
//   let nextScore = score;
//   shiftDown(nextGrid);
//   for (let col = 0; col < size; col++) {
//     for (let row = size - 1; row > 0; row--) {
//       if (nextGrid[row][col] == nextGrid[row - 1][col]) {
//         nextGrid[row][col] += nextGrid[row - 1][col];
//         nextGrid[row - 1][col] = 0;
//         nextScore += nextGrid[row][col];
//       }
//     }
//   }
//   shiftDown(nextGrid);
//   return [nextGrid, nextScore];
// }

// export const moveLeft = (grid, score) => {
//   let nextGrid = [...grid];
//   let nextScore = score;
//   shiftLeft(nextGrid);
//   for (let row = 0; row < size; row++) {
//     for (let col = 0; col < size - 1; col++) {
//       if (nextGrid[row][col] == nextGrid[row][col + 1]) {
//         nextGrid[row][col] += nextGrid[row][col + 1];
//         nextGrid[row][col + 1] = 0;
//         nextScore += nextGrid[row][col];
//       }
//     }
//   }
//   shiftLeft(nextGrid);
//   return [nextGrid, nextScore];
// }

// export const moveRight = (grid, score) => {
//   let nextGrid = [...grid];
//   let nextScore = score;
//   shiftRight(nextGrid);
//   for (let row = 0; row < size; row++) {
//     for (let col = size - 1; col > 0; col--) {
//       if (nextGrid[row][col] == nextGrid[row][col - 1]) {
//         nextGrid[row][col] += nextGrid[row][col - 1];
//         nextGrid[row][col - 1] = 0;
//         nextScore += nextGrid[row][col];
//       }
//     }
//   }
//   shiftRight(nextGrid);
//   return [nextGrid, nextScore];
// }

// const shiftUp = (grid) => {
//   for (let col = 0; col < size; col++) {
//     let cnt = 0;
//     for (let row = 0; row < size; row++) {
//       if (grid[row][col] != 0) {
//         grid[cnt][col] = grid[row][col];
//         if (cnt != row) grid[row][col] = 0;
//         cnt++;
//       }
//     }
//   }
//   return grid;
// }

// const shiftDown = (grid) => {
//   for (let col = 0; col < size; col++) {
//     let cnt = size - 1;
//     for (let row = size - 1; row >= 0; row--) {
//       if (grid[row][col] != 0) {
//         grid[cnt][col] = grid[row][col];
//         if (cnt != row) grid[row][col] = 0;
//         cnt--;
//       }
//     }
//   }
//   return grid;
// }

// const shiftLeft = (grid) => {
//   for (let row = 0; row < size; row++) {
//     let cnt = 0;
//     for (let col = 0; col < size; col++) {
//       if (grid[row][col] != 0) {
//         grid[row][cnt] = grid[row][col];
//         if (cnt != col) grid[row][col] = 0;
//         cnt++;
//       }
//     }
//   }
//   return grid;
// }

// const shiftRight = (grid) => {
//   for (let row = 0; row < size; row++) {
//     let cnt = size - 1;
//     for (let col = size - 1; col >= 0; col--) {
//       if (grid[row][col] != 0) {
//         grid[row][cnt] = grid[row][col];
//         if (cnt != col) grid[row][col] = 0;
//         cnt--;
//       }
//     }
//   }
//   return grid;
// }