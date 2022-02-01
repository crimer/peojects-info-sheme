import { useCallback, useState } from 'react'
import { useEventListener } from './useEventListener'

type Offset = {
	x: number,
	y: number
}

export const useDrag = <T extends HTMLElement | void = void>(
    svgCanvasRef: React.RefObject<T>,
) => {
    const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
    const [selectedElement, setSelectedElement] = useState<EventTarget | null>(null)

	const onStartDrag = useCallback((event: Event) => {
		if(event.target === null) 
			return

		const element = event.target
		setSelectedElement(element)

		const poss = getMousePosition(event as MouseEvent)
		poss.x -= parseFloat((element as Element).getAttributeNS(null, "x") ?? '0')
		poss.y -= parseFloat((element as Element).getAttributeNS(null, "y") ?? '0')
		setOffset(poss)

	}, [setSelectedElement, setOffset])

    const onEndDrag = useCallback(() => setSelectedElement(null), [setSelectedElement])

	const onDrag = useCallback((event: Event) => {
		if (!selectedElement) return
		
		event.preventDefault()
		const element = selectedElement as Element
		const coord = getMousePosition(event as MouseEvent)
		element.setAttributeNS(null, "x", `${coord.x - offset.x}`)
		element.setAttributeNS(null, "y", `${coord.y - offset.y}`)
		
	},[selectedElement, offset])

	function getMousePosition(event: MouseEvent) {
		if(selectedElement === null) return {x: 0, y: 0}

		var CTM = (selectedElement as SVGGraphicsElement).getScreenCTM();
		if(CTM === null)
			return {x: 0, y: 0}

		return {
		  x: (event.clientX - CTM.e) / CTM.a,
		  y: (event.clientY - CTM.f) / CTM.d
		};
	  }


	// https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
	
    useEventListener('mousemove', onDrag, svgCanvasRef)
    useEventListener('mousedown', onStartDrag, svgCanvasRef)
    useEventListener('mouseup', onEndDrag, svgCanvasRef)
    useEventListener('mouseleave', onEndDrag, svgCanvasRef)
}
