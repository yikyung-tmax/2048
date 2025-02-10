// import { useState, useEffect } from 'react';
// import { initializeGrid, moveUp, moveDown, moveLeft, moveRight } from './GridUtils';
// import { SIZE, IS_GAME_OVER } from './staticVariables'
// import { addRandomCell, findRandomCells } from './GridUtils'

// export const useGameLogic = () => {

//   const size = SIZE;

//   const [grid, setGrid] = useState(initializeGrid());
//   const [score, setScore] = useState(0);
//   const [bestScore, setBestScore] = useState(score);
//   const [isGameOver, setIsGameOver] = useState(IS_GAME_OVER);


//   useEffect(() => {
//     let initialGrid = initializeGrid();
//     console.log(initialGrid);
//     setGrid(initialGrid);
//   }, []);

//   useEffect(() => {
//     window.addEventListener('touchstart', handleStart);
//     window.addEventListener('touchmove', handleMove);
//     window.addEventListener('touchend', handleEnd);

//     return () => {
//       window.removeEventListener('touchstart', handleStart);
//       window.removeEventListener('touchmove', handleMove);
//       window.removeEventListener('touchend', handleEnd);

//     }
//   }, [grid]);

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [grid])

//   const handleKeyDown = (e) => {
//     if (isGameOver) return;

//     let originalGrid = getOriginal(grid);
//     let nextGrid = [...grid];
//     let nextScore = score;
//     if (e.key == 'ArrowUp') [nextGrid, nextScore] = moveUp(nextGrid, nextScore);
//     else if (e.key == 'ArrowDown') [nextGrid, nextScore] = moveDown(nextGrid, nextScore);
//     else if (e.key == 'ArrowLeft') [nextGrid, nextScore] = moveLeft(nextGrid, nextScore);
//     else if (e.key == 'ArrowRight') [nextGrid, nextScore] = moveRight(nextGrid, nextScore);
//     setScore(nextScore);
//     if (JSON.stringify(originalGrid) !== JSON.stringify(nextGrid)) {
//       nextGrid = addRandomCell(nextGrid);
//       setGrid(nextGrid);
//     }
//     else if (checkGameOver(nextGrid)) {
//       setGrid(nextGrid);
//       setIsGameOver(true);
//       if (bestScore < nextScore) setBestScore(nextScore);
//     }
//   }

//   // mobile swipe
//   let startX = 0, startY = 0, endX = 0, endY = 0;

//   const handleStart = (e) => {
//     startX = e.touches[0].clientX;
//     startY = e.touches[0].clientY;
//   }

//   const handleMove = (e) => {
//     endX = e.touches[0].clientX;
//     endY = e.touches[0].clientY;
//   }

//   const handleEnd = () => {
//     if (isGameOver) return;

//     let originalGrid = getOriginal(grid);
//     let nextGrid = [...grid];
//     let nextScore = score;

//     const diffX = endX - startX;
//     const diffY = endY - startY;

//     // sideways
//     if (Math.abs(diffX) > Math.abs(diffY)) {
//       if (diffX > 0) [nextGrid, nextScore] = moveRight(nextGrid, nextScore);
//       else[nextGrid, nextScore] = moveLeft(nextGrid, nextScore);
//     }
//     else {
//       if (diffY > 0) [nextGrid, nextScore] = moveDown(nextGrid, nextScore);
//       else[nextGrid, nextScore] = moveUp(nextGrid, nextScore);
//     }

//     setScore(nextScore);
//     console.log("score : " + score + ", nextScore : " + nextScore);

//     if (JSON.stringify(originalGrid) !== JSON.stringify(nextGrid)) {
//       nextGrid = addRandomCell(nextGrid);
//       setGrid(nextGrid);
//     }
//     else if (checkGameOver(nextGrid)) {
//       setGrid(nextGrid);
//       setIsGameOver(true);
//       if (bestScore < nextScore) setBestScore(nextScore);
//     }
//   }

//   const checkGameOver = (grid) => {
//     const emptyCells = findRandomCells(grid);
//     console.log("check");
//     if (emptyCells.length == 0) return true;
//     return false;
//   }

//   const getOriginal = (grid) => {
//     let original = Array.from({ length: size }, () => Array(size));
//     for (let r = 0; r < size; r++) {
//       for (let c = 0; c < size; c++) {
//         original[r][c] = grid[r][c];
//       }
//     }
//     return original;
//   }

//   return { grid, score, bestScore };
// }

// export default useGameLogic;

