import React, { useState } from 'react'

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
import ImageUploader from 'react-images-upload';

function TaskDialog(props) {

    const { open, setOpen, handleSubmit, mode, data } = props;
    const [pictures, setPictures] = useState([]);
    const [imageURL, setImageURL] = useState("")

    const handleClose = () => {

        setOpen(false);

    };

    const onDrop = (pictureFiles, pictureDataURLs) => {
        setPictures(pictureFiles);
        setImageURL(pictureDataURLs);
        console.log(pictureFiles);
        console.log(pictureDataURLs);
    };


    return (
        <Dialog open={open} onClose={handleClose}>

            <Box component="form" onSubmit={(e) => handleSubmit(e)}>

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
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                defaultImage={imageURL}
                            />

                            {imageURL && (<img src={imageURL} alt="" width="100" />)}


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