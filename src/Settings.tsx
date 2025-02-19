// constants
export const Size = 4;
export const InitialTiles = 2;
let init = 0;

// types
export type MoveDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;
export type GameStatus = 'START' | 'PLAY' | 'GAME_OVER' ;

// structures
export type Tile = {
    id? : number;
    position :[number, number];
    value : number;
}

export type Tiles = { [id : number] : Tile };

export type GameInfo = {
    board : number[][];
    tiles : Tiles;
    status : GameStatus;
    isChanged : boolean;
    score : number;
    bestScore : number;
}

export const unique = () => {
    return init++;
}