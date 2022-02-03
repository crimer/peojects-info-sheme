import { CssBaseline } from '@mui/material'
import { PageContainer } from 'pages/PageContainer'
import React, { FC } from 'react'
import { MainPage } from './pages/MainPage/MainPage'
import { AppContextProvider } from './context/AppContext'

export const App: FC = () => {
    return (
        <>
            <AppContextProvider>
                <PageContainer>
                    <MainPage />
                    <CssBaseline />
                </PageContainer>
            </AppContextProvider>
        </>
    )
}
