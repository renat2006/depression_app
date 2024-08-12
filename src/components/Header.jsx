import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, useMediaQuery } from '@mui/material';
import { AuthContext } from '../providers/AuthProvider';

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { accessToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
            <List>
                {!accessToken ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login">
                                <ListItemText primary="Вход" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/signup">
                                <ListItemText primary="Регистрация" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Выйти" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DP APP
                    </Typography>
                    {isMobile ? (
                        <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <>
                            {!accessToken ? (
                                <>
                                    <Button color="inherit" component={Link} to="/login">
                                        Вход
                                    </Button>
                                    <Button color="inherit" component={Link} to="/signup">
                                        Регистрация
                                    </Button>
                                </>
                            ) : (
                                <Button color="inherit" onClick={handleLogout}>
                                    Выйти
                                </Button>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} sx={{ display: { xs: 'block', sm: 'none' } }}>
                {drawer}
            </Drawer>
        </Box>
    );
}

export default Header;
