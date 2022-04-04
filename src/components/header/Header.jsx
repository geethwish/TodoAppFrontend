import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"


import { logout, reset } from '../../features/auth/authSlice';

import { CgLogIn, CgLogOut } from 'react-icons/cg';
import { FaUserAlt } from 'react-icons/fa';

import styles from './Header.module.scss'


const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    const navigateToLogin = () => {

        navigate("/login");

    }

    const navigateToRegister = () => {

        navigate("/register");

    }

    const onLogout = () => {

        dispatch(logout());

        dispatch(reset());

        navigateToLogin()

    }

    return (
        <AppBar position="static">

            <Container maxWidth="xl">

                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        TODO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >

                            <MenuIcon />

                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {pages.map((page) => (

                                <MenuItem key={page} onClick={handleCloseNavMenu}>

                                    <Typography textAlign="center">{page}</Typography>

                                </MenuItem>

                            ))}

                        </Menu>

                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Todo
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    {user && <Box sx={{ flexGrow: 0 }}>

                        <Button color="inherit" onClick={onLogout} startIcon={<CgLogOut />}>
                            Logout
                        </Button>

                    </Box>
                    }

                    {!user && (
                        <>

                            <Button
                                color="inherit"
                                onClick={navigateToLogin}
                                startIcon={<CgLogIn />}>
                                Login
                            </Button>

                            <Button
                                color="inherit"
                                onClick={navigateToRegister}
                                startIcon={<FaUserAlt />}
                            >
                                Register
                            </Button>

                        </>
                    )}

                </Toolbar>

            </Container>

        </AppBar>
    );
};
export default Header;
