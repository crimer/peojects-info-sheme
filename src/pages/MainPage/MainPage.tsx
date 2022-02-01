import { SvgCanvasContainer } from './components/SvgCanvas/SvgCanvasContainer'
import React, { FC, useRef, useState } from 'react'
import { allProjects } from '../../models/project'
import { Box, Paper, Typography } from '@mui/material'
import { Sidebar } from 'shared/Sidebar/Sidebar'

/**
 * https://greensock.com/docs/v2/NPMUsage
 * https://greensock.com/react/
 * https://greensock.com/3-migration
 * https://codepen.io/osublake/pen/oGoyYb
 * https://developer.mozilla.org/ru/docs/Web/SVG/Element/line
 * https://stackoverflow.com/questions/38253804/how-to-make-a-circular-slider-in-react-native/39041997#39041997
 * https://blog.logrocket.com/how-to-use-svgs-in-react/
 * https://github.com/kmkzt/react-hooks-svgdrawing
 * https://datalanguage.com/blog/graphical-uis-with-svg-and-react-part-1-declarative-graphics
 * https://datalanguage.com/blog/graphical-uis-with-svg-and-react-part-2-arcs-angles-and-transformations
 */

interface IProps {}

export const MainPage: FC<IProps> = () => {
    const [projects, setProjects] = useState(allProjects)
    const [isSidebar, setIsSidebar] = React.useState<boolean>(false)
    const toggleSidebar = () => setIsSidebar(!isSidebar)

    return (
        <>
            <Box style={{ height: '100%' }}>
                <SvgCanvasContainer projects={projects} />
            </Box>

            {isSidebar && (
                <Sidebar isOpen={isSidebar} toggleSidebar={toggleSidebar} />
            )}
        </>
    )
}
