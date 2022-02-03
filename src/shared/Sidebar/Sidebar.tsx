import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Drawer,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Project } from 'models/project'
import React, { FC, useMemo } from 'react'

interface IProps {
    isOpen: boolean
    toggleSidebar: (project: Project | null) => void
    project?: Project | null
}

export const Sidebar: FC<IProps> = ({ isOpen, toggleSidebar, project }) => {
	const isReadOnly = useMemo(() => !!project, [project])

    return (
        <Drawer
            variant="temporary"
            open={isOpen}
            anchor="left"
            onClose={() => toggleSidebar(null)}>
            <>
				<div>
					<Card variant="outlined">
						<CardContent>
							<Stack direction="column" spacing={2}>
									<Typography
										variant="h4"
										component="h4"
										color="text.secondary">
										{!isReadOnly && "Создание проекта"}
										{isReadOnly && `Проект ${project?.name}`}
									</Typography>
								<TextField
									label="Имя"
									value={project?.name}
									disabled ={isReadOnly}
									variant="standard"
								/>
								<TextField
									label="Репозиторий"
									value={project?.repo}
									disabled ={isReadOnly}
									variant="standard"
								/>
							</Stack>
						</CardContent>
						<CardActions>
							<Button variant="contained" size="small">
								Создать
							</Button>
						</CardActions>
					</Card>
				</div>
            </>
        </Drawer>
    )
}
