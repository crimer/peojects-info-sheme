import { useCallback, useState } from 'react'
import { useEventListener } from './useEventListener'

type Coords = {
    x: number
    y: number
}

// https://css-tricks.com/creating-a-panning-effect-for-svg/
export const useSvgViewBox = <T extends HTMLElement | void = void>(svgCanvasRef: React.RefObject<T>) => {

    const [pointerCoords, setPointerCoords] = useState<Coords>({ x: 0, y: 0 })
    const [isPointerDown, setIsPointerDown] = useState<boolean>(false)
	const [zoom, setZoom] = useState<number>(1)

	const resetZoom = useCallback(() => setZoom(1), [setZoom])
    const onPointerUp = useCallback(() => setIsPointerDown(false), [setIsPointerDown])

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

		const viewBox = (svgCanvasRef.current as unknown as SVGSVGElement).viewBox.baseVal;
		viewBox.x -= (domPoint.x  - pointerCoords.x)
		viewBox.y -= (domPoint.y  - pointerCoords.y)
		
	},[isPointerDown, pointerCoords, getPointFromEvent])


	const onScroll = useCallback((event: Event) => {
		const wheelEvent = event as unknown as WheelEvent
		if (wheelEvent.deltaY > 0) {
			if(zoom > 0.1) setZoom((prev) => prev - 0.1)
			else setZoom(0.1)
		}
		else 
			setZoom((prev) => prev + 0.1)
	},[setZoom, zoom])

    useEventListener('mousedown', onPointerDown, svgCanvasRef)
    useEventListener('mouseup', onPointerUp, svgCanvasRef)
    useEventListener('mouseleave', onPointerUp, svgCanvasRef)
    useEventListener('mousemove', onPointerMove, svgCanvasRef)
	useEventListener('wheel', onScroll, svgCanvasRef)

	return {
		zoomValue: zoom,
		resetZoom,
	}
}
