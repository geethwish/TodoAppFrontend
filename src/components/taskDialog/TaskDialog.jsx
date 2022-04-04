import React, { useEffect, useRef, useState } from 'react'

import {
    Grid,
    Button,
    Box,
    DialogTitle,
    Dialog,
    TextField,
    DialogActions,
    DialogContent
} from '@mui/material';

import { createTodo, reset, getTodoList, updateTodo } from '../../features/todo/todoSlice';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function TaskDialog(props) {

    const dispatch = useDispatch();

    const { todos, isError, message, isSuccess, } = useSelector((state) => state.todo);

    const { open, setOpen, mode, todo, setMode, imageCleaner, setImageCleaner } = props;

    const imageFile = useRef(null);

    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {

        if (mode && todo) {

            setImageURL(todo.image);

        }

        if (isError) {

            toast.error(JSON.stringify(message))
        }


        return () => {
            dispatch(reset());
        }

    }, [isError, message, dispatch, todo])


    const handleClose = () => {

        dispatch(getTodoList());

        setOpen(false);

    };


    const imageUploadHandle = (e) => {

        const selected = e.target.files[0];
        const objectUrl = URL.createObjectURL(selected)

        setImageURL(objectUrl)

    }

    const clearImage = () => {

        imageFile.value = "";

        setImageURL(null)
    }

    useEffect(() => {

        if (imageCleaner) {

            clearImage();

            setImageCleaner(false)

        }

    }, [imageCleaner])


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

        if (mode) {

            dispatch(updateTodo([todo.id, bodyFormData]));

            setMode(false);
            //setSelectedTodo(null)


        } else {

            dispatch(createTodo(bodyFormData));

        }

        setTimeout(() => {

            setOpen(false);

            dispatch(getTodoList());

        }, 200);

    };


    return (
        <Dialog open={open} onClose={handleClose}>

            <Box component="form" onSubmit={(e) => handleSubmit(e)}>

                <DialogTitle>{mode ? `Update Task ${todo.task}` : "Add New Task"}</DialogTitle>


                <DialogContent>

                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={12}>

                            <TextField
                                autoComplete="task"
                                name="task"
                                required
                                fullWidth
                                id="task"
                                label="Task"
                                autoFocus
                                defaultValue={todo.task}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                defaultValue={todo.description}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            {imageURL && (<img src={imageURL} alt="" width="100" />)}

                        </Grid>

                        <Grid item xs={12}>


                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<FileUploadIcon />}
                            >
                                Upload File
                                <input
                                    type="file"
                                    name='image'
                                    hidden
                                    onChange={imageUploadHandle}
                                    ref={imageFile}
                                />
                            </Button>

                            {imageURL && <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                sx={{ ml: 1 }}
                                onClick={clearImage}
                            >
                                Delete
                            </Button>}

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions sx={{ mr: 2, mb: 1 }}>

                    <Button onClick={handleClose}>Cancel</Button>

                    <Button
                        type="submit"
                        variant="contained">
                        {mode ? "Update Task" : "Create Account"}
                    </Button>

                </DialogActions>

            </Box>

        </Dialog>
    )
}

export default TaskDialog