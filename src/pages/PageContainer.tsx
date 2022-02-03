import { Box, Divider, IconButton, Stack, Typography, Paper } from '@mui/material'
import React, { useContext } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AppContext } from 'context/AppContext'

/** Базовый компонент страниц */
export const PageContainer: React.FC = ({ children }) => {
    const { toggleSidebar } = useContext(AppContext)

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            padding={'1.5em'}
            height={'100%'}>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}>
                <div>
                    <IconButton
                        color="primary"
                        onClick={() => toggleSidebar(null)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    <Typography component="h4" variant="h4">
                        Dns схема проектов
                    </Typography>
                </div>
            </Stack>

            <Box flexGrow={1} marginTop={'20px'}>{children}</Box>
        </Box>
    )
}
