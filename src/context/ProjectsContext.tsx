import React, { createContext } from 'react'

/** Интерфейс контекста сканирования */
interface IProjectsContext {}

/** Контекст сканирования */
export const ProjectsContext = createContext<IProjectsContext>({})

/** Провайдер контекста сканирования */
export const ScanContextProvider: React.FC = ({ children }) => {
    return (
        <ProjectsContext.Provider value={{}}>
            {children}
        </ProjectsContext.Provider>
    )
}
