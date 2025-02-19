// /** @jsxImportSource @emotion/react */

// import '../styles/TileStyle.css'
// import { css } from '@emotion/react'
// import { Tile } from '../Settings'
// import emotionReact_isolatedHnrs from '@emotion/react/_isolated-hnrs';

// export default function TileComponent({ id, value, style }: Tile & { style?: React.CSSProperties }) 

//     const top = style.position[0];
//     const left = style.position[1];

//     const tileAnimation = css`
//     position: absolute;
//     top: ${position[0] * 116.25}px; /* 106.25 + 10px 간격 */
//     left: ${position[1] * 116.25}px;
//     transition: top 0.2s ease-in-out, left 0.2s ease-in-out;
//     `;
    



//     return (

//         <div key={id} className={`tile tile${value}`} css = {style} ? {tileAnimation} : null style={style}>
//             {value}
//         </div>
//     );
// }


/** @jsxImportSource @emotion/react */

import '../styles/TileStyle.css'
import { css, CSSObject } from '@emotion/react'
import { Tile } from '../Settings'

interface TileComponentProps extends Tile {
    style?: React.CSSProperties;
    isWide: boolean; // isWide 타입 추가
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
        ...style, // 스타일 객체를 spread로 확장
    };

    
    return (
        <div
            key={id}
            className={`tile tile${value}`}
            css={[tileAnimation, emotionStyle]} // tileAnimation과 style을 결합
        >
            {value}
        </div>
    );
}
