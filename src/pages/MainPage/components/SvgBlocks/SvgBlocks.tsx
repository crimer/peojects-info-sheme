import { Position } from "models/position"
import { Project } from "models/project"
import React, { FC, useMemo } from "react"

interface IProps {
	project: Project
	onClick: (project: Project | null) => void
	text: string
    x: string
    y: string
    size: string
}

export const SvgCircle: FC<IProps> = (params) => {
    const textPos: Position = useMemo(() => {
        const pos: Position = {
            x: +params.x,
            y: +params.y + +params.size + 20,
        }
        return pos
    }, [params])

    return (
        <g
            onClick={() => params.onClick(params.project)}
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
