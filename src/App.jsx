import { useState, useEffect } from 'react';
import './App.css'
import { GameBoard } from './components/GameBoard'
import { GameInfo } from './components/GameInfo'
import { GameOver } from './components/GameOver'

function App() {

  // 2/12 TODO
  // [ ] 코드 분리 (진행중)
  // [ ] 움직이는 effect 추가
  // [ ] 반응형 (emotion 사용)
  // 디버깅 -> 콘솔 로그, 상태관리 라이브러리 


  // 초기화

  const SIZE = 4;
  const INITIAL_TILES = 2;

  const initializeGrid = () => {
    let initialGrid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    for (let i = 0; i < INITIAL_TILES; i++) {
      initialGrid = addRandomCell(initialGrid);
    }
    return initialGrid;
  }

  const findRandomCells = (grid) => {
    const emptyCells = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (grid[r][c] == 0) emptyCells.push([r, c]);
      }
    }
    return emptyCells;
  }

  const chooseRandomCell = (max) => {
    return Math.floor(Math.random() * max);
  }
  
  const addRandomCell = (grid) => {
    const emptyCells = findRandomCells(grid);
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[chooseRandomCell(emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
    return grid;
  }

  // 게임 로직

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(score);
  const [isGameOver, setIsGameOver] = useState(false);
  const [grid, setGrid] = useState(initializeGrid());

  useEffect(() => {
    let initialGrid = initializeGrid();
    setGrid(initialGrid);
  }, []);

  const checkGameOver = (grid) => {
    const emptyCells = findRandomCells(grid);
    if (emptyCells.length == 0) return true;
    return false;
  }

  const moveUp = (grid, score) => {
    let nextGrid = [...grid];
    let nextScore = score;
    let movedTiles = [];
    shiftUp(nextGrid);
    for (let col = 0; col < SIZE; col++) {
      for (let row = 0; row < SIZE - 1; row++) {
        if (nextGrid[row][col] == nextGrid[row + 1][col]) {
          nextGrid[row][col] += nextGrid[row + 1][col];
          nextGrid[row + 1][col] = 0;
          nextScore += nextGrid[row][col];
          movedTiles.push({before : [row+1, col] , after : [row, col]});
        }
      }
    }
    shiftUp(nextGrid);
    return [nextGrid, nextScore, movedTiles];
  }
  
  const moveDown = (grid, score) => {
    let nextGrid = [...grid];
    let nextScore = score;
    let movedTiles = [];
    shiftDown(nextGrid);
    for (let col = 0; col < SIZE; col++) {
      for (let row = SIZE - 1; row > 0; row--) {
        if (nextGrid[row][col] == nextGrid[row - 1][col]) {
          nextGrid[row][col] += nextGrid[row - 1][col];
          nextGrid[row - 1][col] = 0;
          nextScore += nextGrid[row][col];
          movedTiles.push({before : [row-1, col] , after : [row, col]});
        }
      }
    }
    shiftDown(nextGrid);
    return [nextGrid, nextScore, movedTiles];
  }
  
  const moveLeft = (grid, score) => {
    let nextGrid = [...grid];
    let nextScore = score;
    let movedTiles = [];
    shiftLeft(nextGrid);
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE - 1; col++) {
        if (nextGrid[row][col] == nextGrid[row][col + 1]) {
          nextGrid[row][col] += nextGrid[row][col + 1];
          nextGrid[row][col + 1] = 0;
          nextScore += nextGrid[row][col];
          movedTiles.push({before : [row, col+1] , after : [row, col]});
        }
      }
    }
    shiftLeft(nextGrid);
    return [nextGrid, nextScore, movedTiles];
  }
  
  const moveRight = (grid, score) => {
    let nextGrid = [...grid];
    let nextScore = score;
    let movedTiles = [];
    shiftRight(nextGrid);
    for (let row = 0; row < SIZE; row++) {
      for (let col = SIZE - 1; col > 0; col--) {
        if (nextGrid[row][col] == nextGrid[row][col - 1]) {
          nextGrid[row][col] += nextGrid[row][col - 1];
          nextGrid[row][col - 1] = 0;
          nextScore += nextGrid[row][col];
          movedTiles.push({before : [row, col-1] , after : [row, col]});
        }
      }
    }
    shiftRight(nextGrid);
    return [nextGrid, nextScore, movedTiles];
  }
  
  const shiftUp = (grid) => {
    for (let col = 0; col < SIZE; col++) {
      let cnt = 0;
      for (let row = 0; row < SIZE; row++) {
        if (grid[row][col] != 0) {
          grid[cnt][col] = grid[row][col];
          if (cnt != row) grid[row][col] = 0;
          cnt++;
        }
      }
    }
    return grid;
  }
  
  const shiftDown = (grid) => {
    for (let col = 0; col < SIZE; col++) {
      let cnt = SIZE - 1;
      for (let row = SIZE - 1; row >= 0; row--) {
        if (grid[row][col] != 0) {
          grid[cnt][col] = grid[row][col];
          if (cnt != row) grid[row][col] = 0;
          cnt--;
        }
      }
    }
    return grid;
  }
  
  const shiftLeft = (grid) => {
    for (let row = 0; row < SIZE; row++) {
      let cnt = 0;
      for (let col = 0; col < SIZE; col++) {
        if (grid[row][col] != 0) {
          grid[row][cnt] = grid[row][col];
          if (cnt != col) grid[row][col] = 0;
          cnt++;
        }
      }
    }
    return grid;
  }
  
  const shiftRight = (grid) => {
    for (let row = 0; row < SIZE; row++) {
      let cnt = SIZE - 1;
      for (let col = SIZE - 1; col >= 0; col--) {
        if (grid[row][col] != 0) {
          grid[row][cnt] = grid[row][col];
          if (cnt != col) grid[row][col] = 0;
          cnt--;
        }
      }
    }
    return grid;
  }

  const getOriginal = (grid) => {
    let original = Array.from({ length: SIZE }, () => Array(SIZE));
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        original[r][c] = grid[r][c];
      }
    }
    return original;
  }

  let startX = 0, startY = 0, endX = 0, endY = 0;

  const move = (e, method) => {

    let originalGrid = getOriginal(grid);
    let nextGrid = [...grid];
    let nextScore = score;

    if (method === 'keyboard'){
      handleKeyDown(e, originalGrid, nextGrid, nextScore);
    }
    else if (method === 'swipe'){
      

      startX, startY = handleStart(e);
      endX, endY = handleMove(e);
      handleEnd(originalGrid, nextGrid, nextScore);
    }

  }

  const handleEvent = (e) => {
    if (isGameOver) return;

    if (e.type === 'keydown'){
      move(e, 'keyboard');
    }
    else if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
      move(e, 'swipe');
    }
  }

  const [moved, setMoved] = useState([]);

  let movedTiles = [];

  const handleKeyDown = (e, originalGrid, nextGrid, nextScore) => {
    if (e.key == 'ArrowUp') {
      [nextGrid, nextScore, movedTiles] = moveUp(nextGrid, nextScore);
      setMoved(movedTiles)
    }
    else if (e.key == 'ArrowDown') {
      [nextGrid, nextScore, movedTiles] = moveDown(nextGrid, nextScore);
      setMoved(movedTiles)
    }
    else if (e.key == 'ArrowLeft') {
      [nextGrid, nextScore, movedTiles] = moveLeft(nextGrid, nextScore);
      setMoved(movedTiles)
    }
    else if (e.key == 'ArrowRight') {
      [nextGrid, nextScore, movedTiles]= moveRight(nextGrid, nextScore);
      setMoved(movedTiles)
      console.log(movedTiles);
    }
    setScore(nextScore);
    if (JSON.stringify(originalGrid) !== JSON.stringify(nextGrid)) {
      nextGrid = addRandomCell(nextGrid);
      setGrid(nextGrid);
    }
    else if (checkGameOver(nextGrid)) {
      setGrid(nextGrid);
      setIsGameOver(true);
      if (bestScore < nextScore) setBestScore(nextScore);
    }
  }

  console.log(movedTiles);

  const handleStart = (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    return [startX, startY];
  }

  const handleMove = (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;

    return [endX, endY];
  }

  const handleEnd = (originalGrid, nextGrid, nextScore) => {
    const diffX = endX - startX;
    const diffY = endY - startY;

    // sideways
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0){
        [nextGrid, nextScore, movedTiles]= moveRight(nextGrid, nextScore);
        setMoved(movedTiles)
      }
      else {
        [nextGrid, nextScore, movedTiles] = moveLeft(nextGrid, nextScore);
        setMoved(movedTiles)
      }
    }
    else {
      if (diffY > 0){
        [nextGrid, nextScore, movedTiles] = moveDown(nextGrid, nextScore);
        setMoved(movedTiles)
      }
      else{
        [nextGrid, nextScore, movedTiles] = moveUp(nextGrid, nextScore);
        setMoved(movedTiles)
      }
    }

    setScore(nextScore);
    console.log("score : " + score + ", nextScore : " + nextScore);

    if (JSON.stringify(originalGrid) !== JSON.stringify(nextGrid)) {
      nextGrid = addRandomCell(nextGrid);
      setGrid(nextGrid);
    }
    else if (checkGameOver(nextGrid)) {
      setGrid(nextGrid);
      setIsGameOver(true);
      if (bestScore < nextScore) setBestScore(nextScore);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleEvent(e));
    window.addEventListener('touchstart', handleEvent);
    window.addEventListener('touchmove', handleEvent);
    window.addEventListener('touchend', handleEvent);

    return () => {
      window.removeEventListener('keydown', handleEvent);
      window.removeEventListener('touchstart', handleEvent);
      window.removeEventListener('touchmove', handleEvent);
      window.removeEventListener('touchend', handleEvent);

    }
  }, [grid]);


  console.log(moved);

  const resetGame = () => {
    setIsGameOver(false);
    setScore(0);
    setGrid(initializeGrid());
  }

  return (
    <div>
      <GameInfo score = {score} bestScore={bestScore} resetGame={resetGame}/>
      <GameBoard grid = {grid} movedTiles = {moved}/>
      <GameOver isGameOver={isGameOver} resetGame={resetGame}/>
    </div>

  )
}

export default App