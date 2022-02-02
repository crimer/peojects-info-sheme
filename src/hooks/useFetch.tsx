import { useCallback, useEffect, useReducer, useRef } from 'react'

interface State<T> {
    data?: T
    error?: Error
	isLoading: boolean
}

type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error }

interface useFetchState<T> extends State<T> {
	sendRequestAsync: () => Promise<void>
	cancelRequest: () => void
}

function useFetch<T = unknown>(url: string, options?: RequestInit): useFetchState<T> {
	const abortController = useRef<AbortController>(new AbortController())
	
    const initialState: State<T> = {
        error: undefined,
        data: undefined,
		isLoading: false
    }

	const [state, dispatch] = useReducer((state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, isLoading: true }
            case 'fetched':
                return { ...initialState, data: action.payload, isLoading: false }
            case 'error':
                return { ...initialState, error: action.payload, isLoading: false }
            default:
                return state
        }
    }, initialState)

	const fetchDataAsync = useCallback(async () => {
		dispatch({ type: 'loading' })

		try {
			const response = await fetch(url, {...options, signal: abortController.current.signal})
			if (!response.ok)
				throw new Error(response.statusText)

			const json = await response.json()
			const data = json as T

			dispatch({ type: 'fetched', payload: data })
		} catch (error) {
			dispatch({ type: 'error', payload: error as Error })
		}
	}, [dispatch])

	const cancelRequest = useCallback(() => abortController.current.abort(), [])
	const sendRequestAsync = useCallback(async () => await fetchDataAsync(), [fetchDataAsync])

    useEffect(() => {
        if (!url) return

        fetchDataAsync()

        return () => cancelRequest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, fetchDataAsync, cancelRequest])

    return {
		...state, 
		sendRequestAsync,
		cancelRequest,
	}
}

export { useFetch }
