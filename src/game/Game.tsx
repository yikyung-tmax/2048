import { createTile, initializeGame } from "./SetGame";
import { processMove } from "./MoveTiles";
import { Size, InitialTiles, GameInfo, GameStatus, MoveDirection } from '../Settings'
import { Tile } from "../Settings";

export const getTiles = (gameInfo : GameInfo) : Tile[] => {
    const result: Tile[] = [];
    Object.values(gameInfo.tiles).forEach((tile) => {
      result.push(tile);
    });
    return result;
  };

const getEmptyCells = (gameInfo: GameInfo) => {
    const results: [number, number][] = [];
    for (let x = 0; x < Size; x++) {
      for (let y = 0; y < Size; y++) {
        if (gameInfo.board[x][y] == null) results.push([x, y]);
      }
    }
    return results;
  };

export const addRandomTile = (gameInfo: GameInfo): GameInfo => {
  const emptyCells : [number, number][] = getEmptyCells(gameInfo);
  if (emptyCells.length > 0) {
    const cellIndex : number = Math.floor(Math.random() * emptyCells.length);
    const newTile : Tile = {
      position: emptyCells[cellIndex],
      value: Math.random() < 0.9 ? 2 : 4
    };
    console.log("newTile : " + JSON.stringify(newTile));
    return createTile(newTile, gameInfo);
  }
  return gameInfo;
};

export const move = (direction: MoveDirection, gameInfo: GameInfo): GameInfo => {
    const newGameInfo : GameInfo = processMove(direction, gameInfo);
    console.log("check : " + JSON.stringify(newGameInfo));
    return newGameInfo;
  }

export const startGame = () : GameInfo => {
    let gameInfo : GameInfo = initializeGame();
    console.log("game Info at start game : " + JSON.stringify(gameInfo));
    for (let i = 0; i < InitialTiles; i++) gameInfo = addRandomTile(gameInfo);
    return gameInfo;
};
export const checkStatus = (gameInfo: GameInfo) => {
  const board = gameInfo.board;
  const tiles = gameInfo.tiles;

  if (!board || !tiles) return gameInfo; 

  console.log(board);
  for (let i = 0; i < Size - 1; i++) {
    for (let j = 0; j < Size - 1; j++) {
      if (board[i] === undefined || board[i][j] === null || board[i][j] === undefined ||
        board[i + 1] === undefined || board[i + 1][j] === null || board[i + 1][j] === undefined ||
        board[i][j + 1] === null || board[i][j + 1] === undefined) return gameInfo;
      if (tiles[board[i][j]].value === tiles[board[i + 1][j]].value) return gameInfo; 
      if (tiles[board[i][j]].value === tiles[board[i][j + 1]].value) return gameInfo; 
    }
  }

  return {
    ...gameInfo,
    status : 'GAME_OVER' as GameStatus
  };
};

