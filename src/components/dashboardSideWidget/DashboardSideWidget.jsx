import React from 'react'
import { styled } from '@mui/material/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    Divider,
    Chip
} from '@mui/material';

import { red } from '@mui/material/colors';

import { Box } from '@mui/system';

function DashboardSideWidget({ user }) {


    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {(user.data.name.slice()[0]).toUpperCase() || "A"}
                    </Avatar>
                }
                // action={
                // }
                title={user.data.name}
                subheader={user.data.email}
            />

            <Divider />


            <CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>


                    <Chip label="12" color="error" />

                    <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>
                        Todo
                    </Typography>


                </Box>

                <Divider />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>

                    <Chip label="12" color="info" />

                    <Typography variant="h6" color="text.info" sx={{ ml: 2 }}>
                        Inprogress
                    </Typography>

                </Box>

                <Divider />

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>

                    <Chip label="12" color="success" />

                    <Typography variant="h6" color="text.success" sx={{ ml: 2 }}>
                        Done
                    </Typography>

                </Box>

            </CardContent>

        </Card >
    );
}

export default DashboardSideWidget