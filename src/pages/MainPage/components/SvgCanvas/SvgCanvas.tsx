import { Project } from '../../../../models/project'
import React, { FC } from 'react'

interface ISvgCanvas {
    svgCanvasRef: React.MutableRefObject<null>
    viewBoxString: string
}

export const SvgCanvas: FC<ISvgCanvas> = ({
    children,
    svgCanvasRef,
    viewBoxString,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svgCanvas"
            width="100%"
            viewBox={viewBoxString}
            preserveAspectRatio="xMidYMid meet"
            ref={svgCanvasRef}>
            <g>{children}</g>
        </svg>
    )
}
