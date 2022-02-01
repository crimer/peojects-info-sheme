import { Project } from '../../../../models/project'
import React, { FC, useRef } from 'react'
import { SvgCanvas } from './SvgCanvas'
import { Button, Paper } from '@mui/material'
import { useZoom } from 'hooks/useZoom'

interface IProps {
    projects: Project[]
}

export const SvgCanvasContainer: FC<IProps> = ({ projects }) => {
    const svgCanvas = useRef(null)
    const { resetZoom, zoomValue } = useZoom(svgCanvas)

    return (
        <>
            <Paper
                style={{
                    padding: '1em',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div style={{ marginBottom: '1em' }}>
                    <Button onClick={resetZoom} variant="contained">
                        Сброс
                    </Button>
                </div>
                <SvgCanvas projects={projects} svgCanvas={svgCanvas} zoomValue={zoomValue} />
            </Paper>
        </>
    )
}
