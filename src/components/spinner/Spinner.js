import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Spinner() {
    return (
        <Box
            component="span"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Spinner