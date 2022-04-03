import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import { Container } from '@material-ui/core';
import {
    Grid,
    Button,
    Box,
} from '@mui/material';

import { FaPlus } from 'react-icons/fa';


import styles from "./Dashboard.module.scss"
import TodoList from '../../components/todoList/TodoList';
import TaskDialog from '../../components/taskDialog/TaskDialog';

function Dashboard() {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);

    const [mode, setMode] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {

        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const taskRemove = () => {

        alert("delete")
    }

    const taskEdit = () => {

        setMode(true);
        setOpen(true)
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

                            <TodoList handleRemove={taskRemove} edit={taskEdit} />

                        </Grid>

                        <Grid item xs={12} sm={4}>
                            summary
                        </Grid>

                    </Grid>

                </main>

                <TaskDialog open={open} setOpen={setOpen} mode={mode} data={[]} />


            </Container>


        </>
    )
}

export default Dashboard