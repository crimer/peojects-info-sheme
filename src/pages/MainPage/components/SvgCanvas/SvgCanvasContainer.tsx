import { Project } from '../../../../models/project'
import React, { FC, useRef } from 'react'
import { SvgCanvas } from './SvgCanvas'
import { Button, Paper } from '@mui/material'
import { useSvgViewBox } from 'hooks/useSvgViewBox'
import { SvgCircle } from '../SvgBlocks/SvgBlocks'

interface IProps {
    projects: Project[]
}

export const SvgCanvasContainer: FC<IProps> = ({ projects }) => {
    const svgCanvasRef = useRef(null)
    const wrapperRef = useRef(null)
    const { reset, viewBoxString } = useSvgViewBox(svgCanvasRef)

    return (
        <>
            <Paper
                ref={wrapperRef}
                style={{
                    padding: '1em',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div style={{ marginBottom: '1em' }}>
                    <Button onClick={reset} variant="contained">
                        Сброс
                    </Button>
                </div>
				
                <SvgCanvas
                    viewBoxString={viewBoxString}
                    svgCanvasRef={svgCanvasRef}>
                    {projects.map((p, i) => {
                        return (
                            <SvgCircle
                                size={'20'}
                                x={`${20 + i * 100}`}
                                y={`20`}
                                text={p.name}
                                key={p.id}
                            />
                        )
                    })}
                </SvgCanvas>
            </Paper>
        </>
    )
}
