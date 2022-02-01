import { useRef, useEffect, RefObject } from 'react'

// function useEventListener<K extends keyof WindowEventMap>(
//     eventName: K,
//     handler: (event: WindowEventMap[K] | Event) => void,
// ): void
function useEventListener<K extends keyof WindowEventMap, T extends HTMLElement | void = void>(
    eventName: K,
    handler: (event: WindowEventMap[K] | Event) => void,
    element?: RefObject<T>,
): void {
    const savedHandler = useRef<typeof handler>()

    useEffect(() => {
		const targetElement: T | Window = element?.current || window
        if (!(targetElement && targetElement.addEventListener)) return

        if (savedHandler.current !== handler) savedHandler.current = handler

        const eventListener: typeof handler = (event) => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!savedHandler?.current) savedHandler.current(event)
        }

        targetElement.addEventListener(eventName, eventListener)
        return () => targetElement.removeEventListener(eventName, eventListener)
    }, [eventName, element, handler])
}
export { useEventListener }