import { Drawer } from '@mui/material'
import React, { FC } from 'react'

interface IProps {
    isOpen: boolean
    toggleSidebar: () => void
}

export const Sidebar: FC<IProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <Drawer
            variant="temporary"
            open={isOpen}
            anchor="right"
            onClose={toggleSidebar}>
            asdasd as d asd
        </Drawer>
    )
}
