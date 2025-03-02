/** @jsxImportSource @emotion/react */

import '../styles/TileStyle.css'
import { css, CSSObject, keyframes } from '@emotion/react'
import { Tile } from '../Settings'

interface TileComponentProps extends Tile {
    style?: React.CSSProperties;
    isWide: boolean;
  }

export default function TileComponent({ id, value, style, isWide }: TileComponentProps) {
    const position : [number, number] = style?.position
        ? style.position.split(',').map(Number) as [number, number]
        : [0, 0];
    
    const tileSize = isWide ? 107 : 58;
    const spacing = isWide ? 15 : 10;

    const fadeIn = keyframes`
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    `;
    const tileAnimation = css`
        position: absolute;
        top: ${position[0] * (tileSize + spacing)}px;
        left: ${position[1] * (tileSize + spacing)}px;
        transition: top 0.15s ease-in-out, left 0.15s ease-in-out;
        animation : ${fadeIn} 0.2s ease-out;
    `;

    const emotionStyle: CSSObject = {
        ...style,
    };

    
    return (
        <div
            key={id}
            className={`tile tile${value}`}
            css={[tileAnimation, emotionStyle]}
        >
            {value}
        </div>
    );
}
