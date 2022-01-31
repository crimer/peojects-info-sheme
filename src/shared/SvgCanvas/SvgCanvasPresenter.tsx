import { Position } from '../../models/position'
import { Project } from '../../models/project'
import React, { useRef, useEffect, FC, useMemo, useLayoutEffect } from 'react'
import { ReactSVGPanZoom, fitToViewer, Tool, Value } from 'react-svg-pan-zoom'
import { useState } from 'react'

interface ISvgCanvas {
    projects: Project[]
	canvasWrapperRef: React.MutableRefObject<HTMLDivElement | null>
}

export const SvgCanvasPresenter: FC<ISvgCanvas> = ({ projects, canvasWrapperRef }) => {
    const Viewer = useRef(null)
    const [tool, setTool] = useState<Tool>('none')
    const [value, setValue] = useState<Value>({} as Value)

    useEffect(() => {
        Viewer.current && fitToViewer(Viewer.current)
    }, [])

	useLayoutEffect(() => {
		if(canvasWrapperRef.current === null) return
	}, [])

    return (
        <>
            <ReactSVGPanZoom
                ref={Viewer}
                width={500}
                height={500}
                tool={tool}
                onChangeTool={setTool}
                value={value}
                onChangeValue={setValue}
                onZoom={() => console.log('zoom')}
                onPan={() => console.log('pan')}
                onClick={() => console.log('click')}>
                <svg className="svgCanvas" preserveAspectRatio="xMidYMid meet">
                    <g>
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
            </ReactSVGPanZoom>
        </>
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
        <g stroke="green" fill="white" strokeWidth="5">
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
