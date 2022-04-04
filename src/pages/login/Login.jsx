import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Spinner from '../../components/spinner/Spinner';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, message, isLoading, isSuccess, } = useSelector((state) => state.auth);

    useEffect(() => {

        if (isError) {

            toast.error(JSON.stringify(message))
        }

        if (user && user.data) {

            toast.success('Successfully Login')

            navigate('/');

        }

        dispatch(reset());

    }, [user, isError, message, isLoading, isSuccess, navigate, dispatch])


    const handleSubmit = (event) => {

        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const password = data.get('password');
        const email = data.get('email');

        const userData = {
            email,
            password,
        }

        console.log(userData);

        dispatch(login(userData))

    };

    if (isLoading) {

        return <Spinner />

    }

    return (
        <ThemeProvider theme={theme}>
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
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <Grid container>

                                <Grid item xs>

                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>

                                </Grid>

                                <Grid item>

                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>

                                </Grid>

                            </Grid>

                        </Box>

                    </Box>

                </Container>

            </Paper>

        </ThemeProvider>
    );
}