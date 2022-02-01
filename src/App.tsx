import { CssBaseline } from '@mui/material'
import { PageContainer } from 'pages/PageContainer'
import React, { FC } from 'react'
import { MainPage } from './pages/MainPage/MainPage'

export const App: FC = () => {
    return (
        <>
            <PageContainer>
                <MainPage />
                <CssBaseline />
            </PageContainer>
        </>
    )
}
