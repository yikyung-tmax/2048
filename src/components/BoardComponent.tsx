import { useCallback, useEffect, useRef, useState } from "react";
import { GameInfo, MoveDirection, Tile, Size } from "../Settings";
import {
  getTiles,
  startGame,
  checkStatus,
  move,
  addRandomTile,
} from "../game/Game";
import { apply } from "../game/SetGame";
import "../styles/BoardStyle.css";
import TileComponent from "./TileComponent";

interface Props {
  gameInfo: GameInfo;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}

const Board = ({ gameInfo, setGameInfo }: Props) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let direction: MoveDirection = null;
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          direction = "UP";
          break;
        case "ArrowDown":
          direction = "DOWN";
          break;
        case "ArrowLeft":
          direction = "LEFT";
          break;
        case "ArrowRight":
          direction = "RIGHT";
          break;
      }
      if (direction != null) {
        const newGameInfo = move(direction, gameInfo);
        setGameInfo(newGameInfo);
      }
    },
    [gameInfo]
  );

  const startX = useRef(0);
  const startY = useRef(0);

  const handleStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleEnd = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const diffX = e.changedTouches[0].clientX - startX.current;
      const diffY = e.changedTouches[0].clientY - startY.current;

      const direction =
        Math.abs(diffX) > Math.abs(diffY)
          ? diffX > 0
            ? "RIGHT"
            : "LEFT"
          : diffY > 0
          ? "DOWN"
          : "UP";
      const newGameInfo = move(direction, gameInfo);
      setGameInfo(newGameInfo);
    },
    [gameInfo]
  );

  const [isWide, setIsWide] = useState(window.innerWidth > 520);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 520);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderGrid = () => {
    const cells = [];
    const total = Size * Size;

    for (let i = 0; i < total; i++) {
      cells.push(<div className="cell" key={i} />);
    }

    return cells;
  };

  const renderTiles = () => {
    return getTiles(gameInfo).map((tile: Tile) => {
      const tileSize = isWide ? 107 : 58;
      const spacing = isWide ? 15 : 10;
      const top = tile.position[0] * (tileSize + spacing);
      const left = tile.position[1] * (tileSize + spacing);
      return (
        <TileComponent
          key={tile.id}
          {...tile}
          style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}
          isWide={isWide}
        />
      );
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleStart);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [handleKeyDown, handleStart, handleEnd]);

  useEffect(() => {
    if (gameInfo.status === "START") {
      const initialize: GameInfo = startGame();
      setGameInfo((prev) => ({
        ...prev,
        tiles: initialize.tiles,
        board: initialize.board,
        status: "PLAY",
      }));

      // console.log("result => " + JSON.stringify(gameInfo));
    }
  }, [gameInfo]);

  useEffect(() => {
    if (!gameInfo.isChanged) {
      const updatedGameInfo: GameInfo = checkStatus(gameInfo);
      if (updatedGameInfo.status === "GAME_OVER") {
        setGameInfo(updatedGameInfo);
        // update bestScore
      }
    }
  }, [gameInfo]);

  useEffect(() => {
    if (gameInfo.isChanged) {
      setTimeout(() => updateGameInfo(), 100);
    }
  }, [gameInfo]);

  const updateGameInfo = () => {
    setGameInfo((prevGameInfo) => {
      if (!prevGameInfo) return prevGameInfo;
      const updatedGameInfo = apply(prevGameInfo);
      const newGameInfo = addRandomTile(updatedGameInfo);
      console.log(JSON.stringify(newGameInfo));
      return { ...newGameInfo, isChanged: false };
    });
  };

  return (
    <div className="board">
      <div className="grid">{renderGrid()}</div>
      <div className="tile">{renderTiles()}</div>
    </div>
  );
};

export default Board;
