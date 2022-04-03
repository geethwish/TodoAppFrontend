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

import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskDialog(props) {

    const { open, setOpen, handleSubmit, mode, data, imageCleaner, setImageCleaner } = props;

    const imageFile = useRef(null);

    const [imageURL, setImageURL] = useState(null);


    const handleClose = () => {

        setOpen(false);

    };


    const handleCreate = (e) => {

        handleSubmit(e);

    }

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


    return (
        <Dialog open={open} onClose={handleClose}>

            <Box component="form" onSubmit={(e) => handleCreate(e)}>

                <DialogTitle>{mode ? `Update Task ${data.task}` : "Add New Task"}</DialogTitle>


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