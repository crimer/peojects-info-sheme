import { Project } from '../../models/project'
import React, { useRef, useEffect, FC } from 'react'
import {
    fitSelection,
    zoomOnViewerCenter,
    fitToViewer,
    Value,
} from 'react-svg-pan-zoom'
import { useState } from 'react'
import { SvgCanvasPresenter } from './SvgCanvasPresenter'
import { Button, Paper } from '@mui/material'

interface IProps {
    projects: Project[]
}

export const SvgCanvasContainer: FC<IProps> = ({ projects }) => {
    const Viewer = useRef(null)
	const canvasWrapperRef = useRef<HTMLDivElement | null>(null)

    const [value, setValue] = useState<Value>({} as Value)

    useEffect(() => {
        Viewer.current && fitToViewer(Viewer.current)
    }, [])

    const zoomOnViewerCenter2 = () => setValue(zoomOnViewerCenter(value, 1.1))
    const fitSelection2 = () => setValue(fitSelection(value, 40, 40, 200, 200))
    const fitToViewer2 = () => setValue(fitToViewer(value))

    return (
        <>
            <Button onClick={() => zoomOnViewerCenter2()} variant="contained">
                Zoom on center (mode 2)
            </Button>
            <Button onClick={() => fitSelection2()} variant="contained">
                Zoom area 200x200 (mode 2)
            </Button>
            <Button onClick={() => fitToViewer2()} variant="contained">
                Fit (mode 2)
            </Button>
            <Paper
                ref={canvasWrapperRef}
                style={{
                    padding: '1em',
                    width: '100%',
                    height: '100%',
                }}>
                <SvgCanvasPresenter canvasWrapperRef={canvasWrapperRef} projects={projects} />
            </Paper>
        </>
    )
}
