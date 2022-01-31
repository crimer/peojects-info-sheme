import { CssBaseline } from '@mui/material'
import React, { FC } from 'react'
import './App.css'
import { MainPage } from './pages/MainPage'

export const App: FC = () => {
    return (
        <>
            <MainPage />
            <CssBaseline />
        </>
    )
}
