import { Tile, Tiles, GameInfo, MoveDirection, Size } from '../Settings'
import { createBoard } from './SetGame'


export const processMove = (direction : MoveDirection, gameInfo : GameInfo ) => {
    console.log("========== GAME INFO ========\n" + JSON.stringify(gameInfo));
    switch (direction){
        case 'UP' : {
            const newBoard = createBoard();
            const newTiles : Tiles = {};
            let newScore = gameInfo.score;
            let flag = false;

            for(let j = 0; j < Size; j++){
                let ni = 0;
                let previous : Tile | null = null;

                for (let i = 0; i < Size; i++){
                    const id = gameInfo.board[i][j];
                    if (id === null) continue;
                    
                    const now = gameInfo.tiles[id];
                    if (!now) continue;

                    if (id != null){
                        if (previous != null && previous.id != null && previous.value == now.value){
                            newScore += previous.value * 2;
                            newTiles[previous.id] = { ...previous, value : previous.value*2};
                            previous = null;
                            flag = true;
                            continue;
                        }
                    }

                    newBoard[ni][j] = id;
                    newTiles[id] = {...now, position : [ni, j]};
                    const [nowI, nowJ] = now.position;
                    if (nowI != ni || nowJ != j) flag = true;
                    previous = newTiles[id];
                    ni++;
                }
            }


            return {
                ...gameInfo,
                board: newBoard,
                tiles: newTiles,
                score: newScore,
                isChanged: flag,
              };
        }
        case 'DOWN' : {
            const newBoard = createBoard();
            const newTiles : Tiles = {};
            let newScore = gameInfo.score;
            let flag = false;

            for(let j = 0; j < Size; j++){
                let ni = Size-1;
                let previous : Tile | null = null;

                for (let i = Size-1; i >=0 ; i--){
                    const id = gameInfo.board[i][j];
                    if (id === null) continue;
                    
                    const now = gameInfo.tiles[id];
                    if (!now) continue;

                    if (id != null){
                        if (previous != null && previous.id != null && previous.value == now.value){
                            newScore += previous.value * 2;
                            newTiles[previous.id] = { ...previous, value : previous.value*2};
                            previous = null;
                            flag = true;
                            continue;
                        }
                    }

                    newBoard[ni][j] = id;
                    newTiles[id] = {...now, position : [ni, j]};
                    const [nowI, nowJ] = now.position;
                    if (nowI != ni || nowJ != j) flag = true;
                    previous = newTiles[id];
                    ni--;
                }
            }

            return {
                ...gameInfo,
                board: newBoard,
                tiles: newTiles,
                score: newScore,
                isChanged: flag,
              };
        }
        case 'LEFT' : {
            const newBoard = createBoard();
            const newTiles : Tiles = {};
            let newScore = gameInfo.score;
            let flag = false;

            for(let i = 0; i < Size; i++){
                let nj = 0;
                let previous : Tile | null = null;

                for (let j = 0; j < Size; j++){
                    const id = gameInfo.board[i][j];
                    if (id === null) continue;
                    
                    const now = gameInfo.tiles[id];
                    if (!now) continue;

                    if (id != null){
                        if (previous != null && previous.id != null && previous.value == now.value){
                            newScore += previous.value * 2;
                            newTiles[previous.id] = { ...previous, value : previous.value*2};
                            previous = null;
                            flag = true;
                            continue;
                        }
                    }

                    newBoard[i][nj] = id;
                    newTiles[id] = {...now, position : [i, nj]};
                    const [nowI, nowJ] = now.position;
                    if (nowI != i || nowJ != nj) flag = true;
                    previous = newTiles[id];
                    nj++;
                }
            }

            return {
                ...gameInfo,
                board: newBoard,
                tiles: newTiles,
                score: newScore,
                isChanged: flag,
              };
        }
        case 'RIGHT' : {
            const newBoard = createBoard();
            const newTiles : Tiles = {};
            let newScore = gameInfo.score;
            let flag = false;

            for(let i = 0; i < Size; i++){
                let nj = Size-1;
                let previous : Tile | null = null;

                for (let j = Size-1; j >= 0; j--){
                    const id = gameInfo.board[i][j];
                    if (id === null) continue;
                    
                    const now = gameInfo.tiles[id];
                    if (!now) continue;

                    if (id != null){
                        if (previous != null && previous.id != null && previous.value == now.value){
                            newScore += previous.value * 2;
                            newTiles[previous.id] = { ...previous, value : previous.value*2};
                            previous = null;
                            flag = true;
                            continue;
                        }
                    }

                    
                    newBoard[i][nj] = id;
                    newTiles[id] = {...now, position : [i, nj]};
                    const [nowI, nowJ] = [now.position[0], now.position[1]];
                    if (nowI != i || nowJ != nj) flag = true;
                    previous = newTiles[id];
                    nj--;
                }
            }

            return {
                ...gameInfo,
                board: newBoard,
                tiles: newTiles,
                score: newScore,
                isChanged: flag,
              };
        }
        default : return gameInfo;
    }
}
