import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'

/** Базовый компонент страниц */
export const PageContainer: React.FC = ({ children }) => {
    return (
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
            <header>
                <Typography component="h4" variant="h4">
                    Dns проекты
                </Typography>
            </header>
            <Box flexGrow={1}>{children}</Box>
        </Box>
    )
}
