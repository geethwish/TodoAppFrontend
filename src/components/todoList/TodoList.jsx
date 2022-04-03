import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import {
    Card,
    Avatar,
    IconButton,
    Typography,
    Box,
    Divider,
    Chip
} from '@mui/material';

import { blue, red } from '@mui/material/colors';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import styles from './Todo.module.scss'


function TodoList(props) {

    const { edit, handleRemove } = props

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>

            <Box sx={{ pl: 1, pb: 1, pt: 1 }} className={styles.todoWrapper}>


                <Box className={styles.titleSection}>

                    <Avatar sx={{ bgcolor: blue[600], width: 50, height: 50 }} aria-label="recipe">
                        R
                    </Avatar>

                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{ marginLeft: 2, width: "100%" }}
                    >
                        Create new Project proposal
                    </Typography>

                </Box>

                <Divider className={styles.divider} />

                <Box className={styles.actionSection}>

                    <Chip label="Todo" color="error" />

                    <Box sx={{ ml: 1 }}>

                        <IconButton aria-label="share" onClick={edit}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="add to favorites" onClick={handleRemove}>
                            <DeleteIcon />
                        </IconButton>


                    </Box>

                </Box>

            </Box>

        </Card>
    );
}
export default TodoList