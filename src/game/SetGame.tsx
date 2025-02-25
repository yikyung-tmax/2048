import { GameInfo, GameStatus, Size, Tile, Tiles, unique } from "../Settings";

export const createBoard = () => {
  const board: number[][] = [];
  for (let i = 0; i < Size; i++) {
    board.push(new Array(Size).fill(null));
  }
  return board;
};

export const apply = (infoParam : GameInfo): GameInfo => {
  const keys = [];
  for (let i = 0; i < Size; i++) {
    for (let j = 0; j < Size; j++) keys.push(infoParam.board[i][j]);
  }

  const newTiles : Tiles = keys.reduce((result, tileId: number) => {
    if (tileId == null) return result;
    return { ...result, [tileId]: infoParam.tiles[tileId] };
  }, {});

  return {
    ...infoParam,
    tiles: newTiles,
  };
};

export const addScore = (infoParam : GameInfo) : GameInfo => {
    const newScore = infoParam.score + infoParam.add;
    return {
      ...infoParam,
      score : newScore
    };
};

export const createTile = (tile: Tile, infoParam: GameInfo): GameInfo => {
  const tileId : number = unique();
  const [i, j] : [number, number]= tile.position;

  const newBoard = infoParam.board.map((row, rowIndex) =>
    rowIndex === i ? row.map((cell, colIndex) => (colIndex === j ? tileId : cell)) : row
  );

  console.log(newBoard);
  return {
    ...infoParam,
    board: newBoard,
    tiles: { ...infoParam.tiles, [tileId]: { id: tileId, ...tile } },
  };
};


export const initializeGame = () => {
  const gameInfo: GameInfo = {
    board: createBoard(),
    tiles: {},
    status: "START" as GameStatus,
    isChanged: false,
    score: 0,
    add: 0,
    bestScore: 0,
  };
  return gameInfo;
};

export const resetGame = () => {
  const info: GameInfo = initializeGame();
  return {
    ...info,
    bestScore: Math.max(info.score, info.bestScore),
  };
};
