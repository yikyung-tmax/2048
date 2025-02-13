import { css, keyframes } from "@emotion/css";

const TILE_SIZE = 107;

export const moveTileAnimation = (fromX, fromY, toX, toY) => {
    console.log("move tile animation");

    const dx = (toX - fromX) * TILE_SIZE;
    const dy = (toY - fromY) * TILE_SIZE;

    const moveAnimation = keyframes`
        transform: translate(${dx}px, ${dy}px);
    `;
    return css`
        animation: ${moveAnimation} 2s ease-in-out;
    `;
};

export const filledCellStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 107px;
  width: 107px;
  text-align: center;
  font-weight: bold;
  border-radius: 3px;
`;
