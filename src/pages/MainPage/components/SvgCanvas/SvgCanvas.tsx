import { Position } from '../../../../models/position'
import { Project } from '../../../../models/project'
import React, { useRef, useEffect, FC, useMemo } from 'react'
import { ReactSVGPanZoom, fitToViewer, Value } from 'react-svg-pan-zoom'
import { useState } from 'react'

interface ISvgCanvas {
    projects: Project[]
    canvasWrapperRef: React.MutableRefObject<HTMLDivElement | null>
	svgValue: Value
	sevSvgValue: (newSvgValue: Value) => void
}

type CanvasSize = {
    width: number
    height: number
}

export const SvgCanvas: FC<ISvgCanvas> = ({ projects, canvasWrapperRef, svgValue, sevSvgValue }) => {
    const Viewer = useRef(null)
    
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        height: 0,
        width: 0,
    })

    useEffect(() => {
		if (!canvasWrapperRef || !canvasWrapperRef.current || !Viewer.current) 
			return
		
		fitToViewer(Viewer.current)

        const canvasWrapperBounds = canvasWrapperRef.current.getBoundingClientRect()

		if(canvasWrapperRef.current.parentElement === null)
			return

        setCanvasSize({
            width: canvasWrapperBounds.width - 20,
            height: +canvasWrapperRef.current.parentElement.offsetHeight ?? 0,
        })
    }, [setCanvasSize, canvasWrapperRef])

    return (
        <ReactSVGPanZoom
            ref={Viewer}
            tool={'pan'}
            value={svgValue}
            width={canvasSize.width ?? 500}
            height={canvasSize.height ?? 500}
			background={'white'}
			detectWheel={true}
			scaleFactor={20}
            onChangeTool={() => null}
			customToolbar={() => null}
			customMiniature={() => null}
			detectPinchGesture={false}
            onChangeValue={sevSvgValue}>
            <svg className="svgCanvas" preserveAspectRatio="xMidYMid meet">
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
            </svg>
        </ReactSVGPanZoom>
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
