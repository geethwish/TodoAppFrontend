import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../../components/spinner/Spinner';

import { register, reset } from '../../features/auth/authSlice';

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, message, isLoading, isSuccess, } = useSelector((state) => state.auth);

    useEffect(() => {

        if (isError) {

            toast.error(JSON.stringify(message))
        }

        if (isSuccess || (user && user.data)) {

            navigate('/');

        }

        dispatch(reset());

    }, [user, isError, message, isLoading, isSuccess, navigate, dispatch])


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const name = data.get('name');
        const email = data.get('email');

        if (password !== confirmPassword) {

            toast.error("password do not Match");

        } else {

            const userData = {
                name,
                email,
                password,
                confirmPassword
            }

            console.log(userData);

            dispatch(register(userData))
        }

    };

    if (isLoading) {

        return <Spinner />

    }

    return (
        <Paper
            className="mt-10"
            elevation={0}
            sx={{
                p: 3,
                margin: 'auto',
                maxWidth: 540,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >

            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Create an Account
                    </Typography>

                    <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>

                            <Grid item xs={12}>

                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirmPassword"
                                />

                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >

                            Create Account

                        </Button>

                        <Grid container justifyContent="flex-end">

                            <Grid item>

                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>

                            </Grid>

                        </Grid>

                    </Box>

                </Box>

            </Container>

        </Paper>
    )
}

export default Register