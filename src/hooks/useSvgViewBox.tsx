import { useCallback, useLayoutEffect, useState } from 'react'
import { useEventListener } from './useEventListener'

type Coords = {
    x: number
    y: number
}

type ViewBox = {
    minX: number
    minY: number
    width: number
    height: number
}

const zoomScale = 100

// https://css-tricks.com/creating-a-panning-effect-for-svg/
export const useSvgViewBox = <T extends HTMLElement | void = void>(svgCanvasRef: React.RefObject<T>) => {
    const [pointerCoords, setPointerCoords] = useState<Coords>({ x: 0, y: 0 })
    const [isPointerDown, setIsPointerDown] = useState<boolean>(false)
    const [svgViewBox, setSvgViewBox] = useState<ViewBox>({ minX: 0, minY: 0, height: 0, width: 0 })

	const onPointerUp = useCallback(() => setIsPointerDown(false), [setIsPointerDown])

	const reset = useCallback(() => {
		if (!svgCanvasRef.current) return
		
		const svgPatent = svgCanvasRef.current.parentElement
		const svgInnerGroup = svgCanvasRef.current.children[0]

		if(!svgPatent) return
		const svgPatentSizes = svgPatent.getBoundingClientRect()
		const svgInnerGroupSizes = svgInnerGroup.getBoundingClientRect()
		const svgSizes = svgCanvasRef.current.getBoundingClientRect()
		
		setSvgViewBox({
			minX: -((svgSizes.width / 2) - (svgInnerGroupSizes.width / 2)),
			minY: -((svgSizes.height / 2) - (svgInnerGroupSizes.height / 2)),
			width: svgPatentSizes.width,
			height: svgPatentSizes.height,
		})
	}, [setSvgViewBox])
	
	const getPointFromEvent = useCallback((event: MouseEvent) => {
		if(!svgCanvasRef.current) return

		const svg = (svgCanvasRef.current as unknown as SVGSVGElement)
		const point = svg.createSVGPoint()

		point.x = event.clientX;
		point.y = event.clientY;
	   
		const invertedSVGMatrix = (svg as unknown as SVGGraphicsElement).getScreenCTM()?.inverse()
		const { x, y } = point.matrixTransform(invertedSVGMatrix)

		return { x, y }
	}, [])

    const onPointerDown = useCallback((event: Event) => {
		setIsPointerDown(true)
		const domPoint = getPointFromEvent(event as MouseEvent)
		if(!domPoint) return
		setPointerCoords({ x: domPoint.x, y: domPoint.y })
	}, [setIsPointerDown, setPointerCoords, getPointFromEvent])

    const onPointerMove = useCallback((event: Event) => {
		if (!svgCanvasRef.current || !isPointerDown) return

		event.preventDefault()

		const domPoint = getPointFromEvent(event as MouseEvent)
		if(!domPoint) return

		setSvgViewBox(prev => ({ ...prev,
			minX: prev.minX - (domPoint.x  - pointerCoords.x),
			minY: prev.minY - (domPoint.y  - pointerCoords.y)
		}))
		
	},[isPointerDown, pointerCoords, getPointFromEvent])

	const onScroll = useCallback((event: Event) => {
		if (!svgCanvasRef.current) return
		
		const mouseEvent = event as MouseEvent
		const wheelEvent = event as unknown as WheelEvent
		console.log(mouseEvent.clientX);
		console.log(mouseEvent.clientY);
		
		
		if (wheelEvent.deltaY > 0) {
			setSvgViewBox(prev => ({
				minX: prev.minX + mouseEvent.clientX,
				minY: prev.minY + mouseEvent.clientY,
				width: prev.width > zoomScale ? prev.width - zoomScale : prev.width,
				height: prev.height > zoomScale ? prev.height - zoomScale : prev.height,
			}))
		} else {
			setSvgViewBox(prev => ({ 
				minX: prev.minX - mouseEvent.clientX,
				minY: prev.minY - mouseEvent.clientY,
				width: prev.width + zoomScale,
				height: prev.height + zoomScale,
			}))
		}
	},[setSvgViewBox, svgViewBox])

	useLayoutEffect(() => {
		reset()
	}, [reset])

    useEventListener('mousedown', onPointerDown, svgCanvasRef)
    useEventListener('mouseup', onPointerUp, svgCanvasRef)
    useEventListener('mouseleave', onPointerUp, svgCanvasRef)
    useEventListener('mousemove', onPointerMove, svgCanvasRef)
	useEventListener('wheel', onScroll, svgCanvasRef)

	return {
		reset,
		viewBoxString: `${svgViewBox.minX} ${svgViewBox.minY} ${svgViewBox.width} ${svgViewBox.height}`
	}
}
