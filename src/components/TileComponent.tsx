/** @jsxImportSource @emotion/react */

import '../styles/TileStyle.css'
import { css, CSSObject } from '@emotion/react'
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


    const tileAnimation = css`
        position: absolute;
        top: ${position[0] * (tileSize + spacing)}px;
        left: ${position[1] * (tileSize + spacing)}px;
        transition: top 0.15s ease-in-out, left 0.15s ease-in-out;
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
