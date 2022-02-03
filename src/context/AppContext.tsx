import { useFetch } from 'hooks/useFetch'
import { allProjects, Project } from 'models/project'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { SidebarContainer } from 'shared/Sidebar/SidebarContainer'

/** Интерфейс контекста сканирования */
interface IAppContext {
    projects: Project[]
	toggleSidebar: (project: Project | null) => void
}

/** Контекст сканирования */
export const AppContext = createContext<IAppContext>({
    projects: [],
	toggleSidebar: (project: Project | null) => {
		throw new Error("Не инициализирован")
	}
})

/** Провайдер контекста сканирования */
export const AppContextProvider: React.FC = ({ children }) => {
    const [projects, _] = useState(allProjects)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isSidebar, setIsSidebar] = useState<boolean>(true)

	const { sendRequestAsync: getProjectsAsync } = useFetch('/api/getProjects')
	const { sendRequestAsync: createProjectAsync } = useFetch('/api/createProject')
    
	const toggleSidebar = useCallback((project: Project | null) => {
		setIsSidebar(!isSidebar)
		setSelectedProject(project)
	}, [setIsSidebar, setSelectedProject, isSidebar])
	
	const createProject = useCallback(async (project: Project) => {
		console.log('createProject');
	}, [])
	
	const getAllProjects = useCallback(async () => {
		console.log('getAllProjects');
	}, [])

	useEffect(() => {
		getAllProjects()
	}, [getAllProjects])
	
    return (
        <AppContext.Provider value={{ projects, toggleSidebar }}>
            {children}
			<SidebarContainer
				isOpen={isSidebar}
				toggleSidebar={toggleSidebar}
				project={selectedProject}
			/>
        </AppContext.Provider>
    )
}
