import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import { Container } from '@material-ui/core';
import {
    Grid,
    Button,
    Box,
    Alert,
} from '@mui/material';

import { FaPlus } from 'react-icons/fa';


import styles from "./Dashboard.module.scss"
import TodoList from '../../components/todoList/TodoList';
import TaskDialog from '../../components/taskDialog/TaskDialog';
import { toast } from 'react-toastify';
import { createTodo, reset, getTodoList } from '../../features/todo/todoSlice';
import Spinner from '../../components/spinner/Spinner';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { todos, isError, message, isLoading, isSuccess, } = useSelector((state) => state.todo);

    const [open, setOpen] = useState(false);

    const [mode, setMode] = useState(false);

    const [imageCleaner, setImageCleaner] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {

        if (!user) {
            navigate('/login')
        }

        if (isError) {

            toast.error(JSON.stringify(message))
        }

        if (isSuccess && todos[0] && todos[0]) {

            toast.success(todos[0].message);

            setOpen(false)
        }


        setImageCleaner(true);

        dispatch(getTodoList());

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, isError, message, dispatch])

    const taskRemove = () => {

        alert("delete")
    }

    const taskEdit = () => {

        setMode(true);

        setOpen(true);

    }

    console.log(todos);

    const handleSubmit = (event, file) => {

        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const bodyFormData = new FormData();

        const task = data.get('task');
        const description = data.get('description');
        const image = data.get('image');

        bodyFormData.append("task", task);
        bodyFormData.append("description", description);
        bodyFormData.append("status", "Todo");

        if (data.get('image')) {

            bodyFormData.append("image", image);

        }

        dispatch(createTodo(bodyFormData))

    };

    const handleStatusChange = (id, value) => {
        alert(id)
    }

    if (isLoading) {

        return <Spinner />

    }

    return (
        <>
            <Container maxWidth="xl">

                <section>

                    <Box sx={{ mt: 5, }} className={styles.heading}>

                        <Typography variant="h5" component="h5">
                            My Todos
                        </Typography>

                        <Button
                            variant="contained"
                            endIcon={<FaPlus size={15} />}
                            onClick={handleClickOpen}
                        >Add Task
                        </Button>

                    </Box>


                </section>

                <main>
                    <Grid container spacing={2} mt={3}>

                        <Grid item xs={12} sm={8}>

                            {todos && todos.length > 0 ? <>

                                {todos.map((todo, index) => <TodoList
                                    key={index}
                                    todo={todo}
                                    handleRemove={taskRemove}
                                    edit={taskEdit}
                                    handleStatusChange={(id, status) => handleStatusChange => (id, status)}
                                />
                                )}

                            </> : <Alert severity="info">
                                You Have not set any todos yet
                            </Alert>
                            }

                        </Grid>

                        <Grid item xs={12} sm={4}>
                            summary
                        </Grid>

                    </Grid>

                </main>

                <TaskDialog
                    open={open}
                    setOpen={setOpen}
                    mode={mode}
                    data={[]}
                    handleSubmit={(e, file) => handleSubmit(e, file)}
                    setImageCleaner={setImageCleaner}
                    imageCleaner={imageCleaner}

                />


            </Container>


        </>
    )
}

export default Dashboard