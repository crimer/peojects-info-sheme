import { Position } from '../../../../models/position'
import { Project } from '../../../../models/project'
import React, { FC, useMemo } from 'react'

interface ISvgCanvas {
    projects: Project[]
    svgCanvas: React.MutableRefObject<null>
    zoomValue: number
}

export const SvgCanvas: FC<ISvgCanvas> = ({
    projects,
    svgCanvas,
    zoomValue,
}) => {
    return (
        <svg
			xmlns="http://www.w3.org/2000/svg"
            className="svgCanvas"
			viewBox="0 0 500 500"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            ref={svgCanvas}>
            <g style={{ transform: `scale(${zoomValue})` }}>
                {projects.map((p, i) => {
                    return (
                        <ProjectCircle
                            size={'20'}
                            x={`${20 + i * 100}`}
                            y={`20`}
                            text={p.name}
                            key={p.id}
                        />
                    )
                })}
            </g>
        </svg>
    )
}

interface ICircle {
    text: string
    x: string
    y: string
    size: string
}

export const ProjectCircle: FC<ICircle> = (params) => {
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

export const ProjectLink: FC<ILink> = ({ x1, y1, x2, y2 }) => {
    return <line x1={x1} x2={x2} y1={y1} y2={y2} stroke="black" />
}

