import { Project } from 'models/project'
import React, { FC } from 'react'
import { Sidebar } from './Sidebar'

interface IProps {
    isOpen: boolean
    toggleSidebar: (project: Project | null) => void
    project?: Project | null
}

export const SidebarContainer: FC<IProps> = ({
    isOpen,
    toggleSidebar,
    project,
}) => {
    return (
        <Sidebar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            project={project}
        />
    )
}
