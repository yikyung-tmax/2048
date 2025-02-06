import { useState, useEffect } from 'react';
import './App.css'

function App() {

  // TODO 1 refresh 버튼, 기능 추가
  // TODO 2 gameover, score 집계
  // TODO 3 움직이는 이펙트 추가

  const SIZE = 4;
  const INITIAL_TILES = 2;
  const [SCORE, setScore] = useState(0);
  const [BEST_SCORE, setBestScore] = useState(SCORE);
  const [isGameOver, setIsGameOver] = useState(false);
  const [GRID, setGrid] = useState(initialize());


  function initialize() {
    let initialGrid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    for (let i = 0; i < INITIAL_TILES; i++) {
      initialGrid = addRandomCell(initialGrid);
    }
    return initialGrid;
  }

  function findRandomCells(grid) {
    const emptyCells = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (grid[r][c] == 0) emptyCells.push([r, c]);
      }
    }
    return emptyCells;
  }

  function chooseRandomCell(max) {
    return Math.floor(Math.random() * max);
  }

  function addRandomCell(grid) {
    const emptyCells = findRandomCells(grid);
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[chooseRandomCell(emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
    return grid;
  }

  useEffect(() => {
    let initialGrid = initialize();
    setGrid(initialGrid);
  }, []);

  function checkGameOver(grid) {
    const emptyCells = findRandomCells(grid);
    if (emptyCells.length == 0) return true;
    return false;
  }

  function moveUp(grid, score) {
    let nextGrid = [...grid];
    let nextScore = score;
    shiftUp(nextGrid);
    for (let col = 0; col < SIZE; col++) {
      for (let row = 0; row < SIZE - 1; row++) {
        if (nextGrid[row][col] == nextGrid[row + 1][col]) {
          nextGrid[row][col] += nextGrid[row + 1][col];
          nextGrid[row + 1][col] = 0;
          nextScore += nextGrid[row][col];
        }
      }
    }
    shiftUp(nextGrid);
    return [nextGrid, nextScore];
  }

  function moveDown(grid, score) {
    let nextGrid = [...grid];
    let nextScore = score;
    shiftDown(nextGrid);
    for (let col = 0; col < SIZE; col++) {
      for (let row = SIZE - 1; row > 0; row--) {
        if (nextGrid[row][col] == nextGrid[row - 1][col]) {
          nextGrid[row][col] += nextGrid[row - 1][col];
          nextGrid[row - 1][col] = 0;
          nextScore += nextGrid[row][col];
        }
      }
    }
    shiftDown(nextGrid);
    return [nextGrid, nextScore];
  }

  function moveLeft(grid, score) {
    let nextGrid = [...grid];
    let nextScore = score;
    shiftLeft(nextGrid);
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE - 1; col++) {
        if (nextGrid[row][col] == nextGrid[row][col + 1]) {
          nextGrid[row][col] += nextGrid[row][col + 1];
          nextGrid[row][col + 1] = 0;
          nextScore += nextGrid[row][col];
        }
      }
    }
    shiftLeft(nextGrid);
    return [nextGrid, nextScore];
  }

  function moveRight(grid, score) {
    let nextGrid = [...grid];
    let nextScore = score;
    shiftRight(nextGrid);
    for (let row = 0; row < SIZE; row++) {
      for (let col = SIZE - 1; col > 0; col--) {
        if (nextGrid[row][col] == nextGrid[row][col - 1]) {
          nextGrid[row][col] += nextGrid[row][col - 1];
          nextGrid[row][col - 1] = 0;
          nextScore += nextGrid[row][col];
        }
      }
    }
    shiftRight(nextGrid);
    return [nextGrid, nextScore];
  }

  function shiftUp(grid) {
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

  function shiftDown(grid) {
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

  function shiftLeft(grid) {
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

  function shiftRight(grid) {
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

  function getOriginal(grid) {
    let original = Array.from({ length: SIZE }, () => Array(SIZE));
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        original[r][c] = grid[r][c];
      }
    }
    return original;
  }

  function handleKeyDown(e) {
    if (isGameOver) return;

    let originalGrid = getOriginal(GRID);
    let nextGrid = [...GRID];
    let nextScore = SCORE;
    if (e.key == 'ArrowUp') [nextGrid, nextScore] = moveUp(nextGrid, nextScore);
    else if (e.key == 'ArrowDown') [nextGrid, nextScore] = moveDown(nextGrid, nextScore);
    else if (e.key == 'ArrowLeft') [nextGrid, nextScore] = moveLeft(nextGrid, nextScore);
    else if (e.key == 'ArrowRight') [nextGrid, nextScore] = moveRight(nextGrid, nextScore);
    setScore(nextScore);
    if (JSON.stringify(originalGrid) !== JSON.stringify(nextGrid)) {
      nextGrid = addRandomCell(nextGrid);
      setGrid(nextGrid);
    }
    else if (checkGameOver(nextGrid)) {
      setGrid(nextGrid);
      setIsGameOver(true);
      if (BEST_SCORE < nextScore) setBestScore(nextScore);
    }
  }

  function reset() {
    setIsGameOver(false);
    setScore(0);
    setGrid(initialize());
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [GRID])


  // // mobile swipe
  // let startX = 0, startY = 0, endX = 0, endY = 0;

  // function handleStart(e) {
  //   startX = e.touches[0].clientX;
  //   startY = e.touches[0].clientY;
  // }

  // function handleMove(e) {
  //   endX = e.touches[0].clientX;
  //   endY = e.touches[0].clientY;
  // }

  // function handleEnd(){
  //   let originalGrid = getOriginal(GRID);
  //   let nextGrid = [...GRID];
  //   if (startX < endX) nextGrid = moveUp(nextGrid);
  //   else if (startX > endX) nextGrid = moveDown(nextGrid);
  //   else if (startY < endY) nextGrid = moveRight(nextGrid);
  //   else if (startX > endY) nextGrid = moveLeft(nextGrid);
  //   if (JSON.stringify(originalGrid) !== JSON.stringify(nextGrid)) nextGrid = addRandomCell(nextGrid);
  //   setGrid(nextGrid);
  // }

  // useEffect(() => {
  //   window.addEventListener('touchstart', handleStart);
  //   window.addEventListener('touchmove', handleMove);
  //   window.addEventListener('touchend', handleEnd);

  //   return () => {
  //     window.removeEventListener('touchstart', handleStart);
  //     window.removeEventListener('touchmove', handleMove);
  //     window.removeEventListener('touchend', handleEnd);

  //   }
  // }, []);

  function getCellColor(value) {
    switch (value) {
      case 2: return { background: "#EEE4DA", font: "#776E65", size: "55px" };
      case 4: return { background: "#EDE0C8", font: "#776E65", size: "55px" };
      case 8: return { background: "#F2B179", font: "#F9F6F2", size: "55px" };
      case 16: return { background: "#F59563", font: "#F9F6F2", size: "55px" };
      case 32: return { background: "#F67C5F", font: "#F9F6F2", size: "55px" };
      case 64: return { background: "#F65E3B", font: "#F9F6F2", size: "55px" };
      case 128: return { background: "#EDCF72", font: "#F9F6F2", size: "45px" };
      case 256: return { background: "#EDCC61", font: "#F9F6F2", size: "45px" };
      case 512: return { background: "#EDC850", font: "#F9F6F2", size: "45px" };
      case 1024: return { background: "#EDC53F", font: "#F9F6F2", size: "35px" };
      case 2048: return { background: "#EDC22E", font: "#F9F6F2", size: "35px" };
      default: return { background: "#EEE4DA59", font: "white", size: "55px" };

    }
  }

  return (
    <>
      <div className='info'>
        <h1 className='title'>2048</h1>
        <div className='scores'>
          <div className='score'>
            <p>SCORE</p>
            <span>{SCORE}</span>
          </div>
          <div className='best'>
            <p>BEST</p>
            <span>{BEST_SCORE}</span>
          </div>
        </div>
      </div>
      <div className='game'>
        {
          isGameOver && (
            <div className='gameOver'>
              <p>Game Over! </p>
              <buttion className='retryButton' onClick={reset}>Try again</buttion>
            </div>
          )
        }
        <div className='grid'>

          {
            GRID.map((row, rowIdx) => (
              <div key={rowIdx} className='row'>
                {
                  row.map((value, colIdx) => {
                    const { background, font, size } = getCellColor(value);
                    return value == 0
                      ? <div key={`${rowIdx}-${colIdx}`} className='emptyCell'></div>
                      : <div key={`${rowIdx}-${colIdx}`} className='filledCell' style={{ backgroundColor: background, color: font, fontSize: size }}>{value}</div>
                  })
                }
              </div>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default App
