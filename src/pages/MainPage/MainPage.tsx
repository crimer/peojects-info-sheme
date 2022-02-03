import { SvgCanvasContainer } from './components/SvgCanvas/SvgCanvasContainer'
import React, { FC, useContext } from 'react'
import { Box } from '@mui/material'
import { AppContext } from 'context/AppContext'

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
	const { projects, toggleSidebar } = useContext(AppContext)
	
    return (
        <>
            <Box style={{ height: '100%' }}>
                <SvgCanvasContainer openSidebar={toggleSidebar} projects={projects} />
            </Box>
        </>
    )
}
