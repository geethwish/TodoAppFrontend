import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import {
    Card,
    Avatar,
    IconButton,
    Typography,
    Box,
    Divider,
    Chip,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';

import { blue, red } from '@mui/material/colors';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import styles from './Todo.module.scss'


function TodoList(props) {

    const { edit, handleRemove, todo, handleStatusChange } = props

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ mb: 2 }}>

            <Box sx={{ pl: 1, pb: 1, pt: 1 }} className={styles.todoWrapper}>


                <Box className={styles.titleSection}>

                    <Avatar sx={{ bgcolor: blue[600], width: 80, height: 80 }} aria-label="recipe" src={todo.image}>

                    </Avatar>

                    <Box>

                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ marginLeft: 2, width: "100%" }}
                        >
                            {todo.task}
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ marginLeft: 2, width: "100%" }}
                        >
                            {todo.description}

                        </Typography>

                        <Box sx={{ ml: 2, display: "flex", alignItems: 'center' }}>

                            <Typography
                                variant="caption"
                                component="block"
                                sx={{ width: "100%" }}
                            >
                                {todo.createdAt}

                            </Typography>

                        </Box>

                    </Box>


                </Box>

                <Divider className={styles.divider} />

                <Box className={styles.actionSection}>

                    <ToggleButtonGroup
                        color="primary"
                        value={todo.status}
                        exclusive
                        onChange={handleStatusChange}
                    >
                        <ToggleButton value="Todo" color="error">Todo</ToggleButton>
                        <ToggleButton value="In Progress" color="success">In Progress</ToggleButton>
                        <ToggleButton value="Done" color="success">Done</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ ml: 1 }}>

                        <IconButton aria-label="share" onClick={() => edit(todo.id)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="add to favorites" onClick={() => handleRemove(todo.id)}>
                            <DeleteIcon />
                        </IconButton>


                    </Box>

                </Box>

            </Box>

        </Card>
    );
}
export default TodoList