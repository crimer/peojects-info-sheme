import { Position } from "models/position"
import React, { FC, useMemo } from "react"

interface ICircle {
    text: string
    x: string
    y: string
    size: string
}

export const SvgCircle: FC<ICircle> = (params) => {
    const textPos: Position = useMemo(() => {
        const pos: Position = {
            x: +params.x,
            y: +params.y + +params.size + 20,
        }
        return pos
    }, [params])

    return (
        <g
            onClick={() => console.log('1')}
            stroke="green"
            fill="white"
            strokeWidth="5">
            <circle cx={params.x} cy={params.y} r={params.size} />
            <text x={textPos.x} y={textPos.y} fontSize="32">
                {params.text}
            </text>
        </g>
    )
}

interface ILink {
    x1: string
    x2: string
    y1: string
    y2: string
}

export const SvgLine: FC<ILink> = ({ x1, y1, x2, y2 }) => {
    return <line x1={x1} x2={x2} y1={y1} y2={y2} stroke="black" />
}
