import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import { CardContent, Container } from '@material-ui/core';
import {
    Grid,
    Button,
    Box,
    Alert,
    Card,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Stack,
} from '@mui/material';

//redux
import { reset, getTodoList, deleteTodo } from '../../features/todo/todoSlice';

// components
import TodoList from '../../components/todoList/TodoList';
import TaskDialog from '../../components/taskDialog/TaskDialog';
import DashboardSideWidget from '../../components/dashboardSideWidget/DashboardSideWidget';

// icons
import { FaPlus } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

//styles
import styles from "./Dashboard.module.scss"


function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { todos, isError, message } = useSelector((state) => state.todo);

    const [open, setOpen] = useState(false);

    const [mode, setMode] = useState(false);

    const [imageCleaner, setImageCleaner] = useState(false);

    const [selectedTodo, setSelectedTodo] = useState(null);

    const [filterStatus, setFilterStatus] = useState({
        status: null,
        startDate: null,
        endDate: null
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {

        if (isError) {

            toast.error(JSON.stringify(message))
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getTodoList());

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, isError, message, dispatch])

    // Remove tasks
    const taskRemove = (id) => {

        dispatch(deleteTodo(id));

        setTimeout(() => {

            dispatch(getTodoList());

            toast.success("Task Deleted");

        }, 300);

    }

    // Edit todo Task
    const taskEdit = (todo) => {

        setMode(true);

        setOpen(true);

        setSelectedTodo(todo)

    }

    const handleStatusChange = async (e, status) => {

        setFilterStatus({ ...filterStatus, status });

        dispatch(getTodoList({ ...filterStatus, status }));

    }

    const dateFieldsHandle = (e) => {

        setFilterStatus({ ...filterStatus, [e.target.name]: e.target.value })

    }

    const filterRequest = () => {

        dispatch(getTodoList(filterStatus));

        console.log(filterStatus);

    }

    const clearFilters = () => {

        setFilterStatus({
            status: null,
            startDate: null,
            endDate: null
        });

        dispatch(getTodoList());

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

                <section>
                    <Card sx={{ mt: 4 }}>

                        <CardContent>


                            <Grid container spacing={2} sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>


                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={filterStatus}
                                            exclusive
                                            onChange={handleStatusChange}
                                            size="small"
                                            sx={{ width: '100%' }}
                                        >
                                            <ToggleButton value="Todo" color="error">Todo</ToggleButton>

                                            <ToggleButton value="In Progress" color="info">In Progress</ToggleButton>

                                            <ToggleButton value="Done" color="success">Done</ToggleButton>

                                        </ToggleButtonGroup>

                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={3}>

                                    <TextField
                                        size='small' i
                                        id="date"
                                        name="startDate"
                                        label="Filter Start Date"
                                        type="date"
                                        defaultValue="2022-04-03"
                                        sx={{ width: '100%' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={dateFieldsHandle}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={3}>

                                    <TextField
                                        size='small' i
                                        id="date"
                                        label="Filter End Date"
                                        type="date"
                                        name="endDate"
                                        defaultValue="2022-04-03"
                                        sx={{ width: '100%' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={dateFieldsHandle}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={3}>

                                    <Stack direction="row" spacing={2}>

                                        <Button variant="contained" fullWidth endIcon={<SearchIcon />} onClick={filterRequest}>
                                            Filter
                                        </Button>

                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={clearFilters}>
                                            Clear
                                        </Button>

                                    </Stack>

                                </Grid>

                            </Grid>


                        </CardContent>


                    </Card>


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
                                />
                                )}

                            </> : <Alert severity="info">
                                You Have not set any todos yet
                            </Alert>
                            }

                        </Grid>

                        <Grid item xs={12} sm={4}>

                            {user && <DashboardSideWidget user={user} />}

                        </Grid>

                    </Grid>

                </main>

                {open && <TaskDialog
                    open={open}
                    setOpen={setOpen}
                    mode={mode}
                    setMode={setMode}
                    todo={mode ? selectedTodo : {}}
                    setImageCleaner={setImageCleaner}
                    imageCleaner={imageCleaner}
                />
                }

            </Container>

        </>
    )
}

export default Dashboard