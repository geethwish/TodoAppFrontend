import React, { useEffect, } from 'react'
import {
    Card,
    Avatar,
    IconButton,
    Typography,
    Box,
    Divider,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { blue, red } from '@mui/material/colors';

import { getTodoList, updateTodo } from '../../features/todo/todoSlice';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import styles from './Todo.module.scss'

function TodoList(props) {

    const dispatch = useDispatch();

    const { isError, message, } = useSelector((state) => state.todo);

    const { edit, handleRemove, todo } = props;

    useEffect(() => {

        if (isError) {

            toast.error(JSON.stringify(message))
        }

    }, [isError, message, dispatch, todo])

    const handleStatusChange = (event, newStatus) => {

        const bodyFormData = new FormData();

        bodyFormData.append("task", todo.task);
        bodyFormData.append("description", todo.description);
        bodyFormData.append("status", newStatus);

        dispatch(updateTodo([todo.id, bodyFormData]));

        setTimeout(() => {

            dispatch(getTodoList());

        }, 200);


    }

    return (
        <Card sx={{ mb: 2 }}>

            <Box sx={{ pl: 1, pb: 1, pt: 1 }} className={styles.todoWrapper}>


                <Box className={styles.titleSection}>

                    <Avatar
                        sx={{ bgcolor: blue[600], width: 80, height: 80 }}
                        aria-label="image"
                        src={todo.image}>

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
                                {new Date(todo.createdAt).toLocaleString('en-US')}

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
                        size="small"
                    >
                        <ToggleButton value="Todo" color="error">Todo</ToggleButton>

                        <ToggleButton value="In Progress" color="info">In Progress</ToggleButton>

                        <ToggleButton value="Done" color="success">Done</ToggleButton>

                    </ToggleButtonGroup>

                    <Box sx={{ ml: 1 }}>

                        <IconButton aria-label="share" onClick={() => edit(todo)}>
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