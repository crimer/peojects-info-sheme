import { useCallback, useState } from 'react'
import { useEventListener } from './useEventListener'

export const useZoom = <T extends HTMLElement | void = void>(
    svgCanvasRef: React.RefObject<T>,
) => {
    const [zoom, setZoom] = useState<number>(1)

	const resetZoom = useCallback(() => setZoom(1), [setZoom])

    const onScroll = useCallback((event: Event) => {
		const wheelEvent = event as unknown as WheelEvent
		if (wheelEvent.deltaY > 0) 
			setZoom((prev) => prev - 0.1)
		else 
			setZoom((prev) => prev + 0.1)
	},[setZoom])

    useEventListener('wheel', onScroll, svgCanvasRef)
	
	return {
		zoomValue: zoom,
		resetZoom,
	}
}
