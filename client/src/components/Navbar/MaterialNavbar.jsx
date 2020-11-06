import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu, Typography } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import './Navbar.css';
import LightDarkToggle from '../LightDark/LightDarkToggle';
import bookmodeLogo from '../../images/bookmode.png';


const useStyles = makeStyles((theme) => ({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'primary',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    logo: {
        maxWidth: 160,
    },
}));

export default function PrimarySearchAppBar() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [fireRedirect, setRedirect] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isAuthenticated ? (
                <>
                    <MenuItem><Link to="/profile" className="menu-link">My account</Link></MenuItem>
                    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</MenuItem>
                </>
            ) : (
                <MenuItem onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>Login</MenuItem>
            )}
            
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="/dashboard" className="link">Dashboard</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/library" className="link">Library</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/groups" className="link">Groups</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/sharing" className="link">Sharing</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/notifications" className="link">Notifications</Link>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="secondary"
                >
                    <AccountCircle />
                </IconButton>
                <Link to="/profile" className="link">Profile</Link>
            </MenuItem>
        </Menu>
    );

    const _handleChange = (data) => {
        console.log(data)
        setData(data);
    };

    const _handleSubmit = (e) => {
        e.preventDefault();
        setRedirect(true)
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{backgroundColor: '#002B36'}}>
                <Toolbar>
                    <a href="/"><img src={bookmodeLogo} alt="bookmode logo" className={classes.logo} /></a>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon style={{color: '#93A1A1'}}/>
                        </div>
                        <form onSubmit={e => _handleSubmit(e)}>
                            <InputBase style={{color: '#fff'}}
                                placeholder="Search title, author, ISBN..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(event) => _handleChange(event.target.value)}
                                
                            />
                        </form>
                        {fireRedirect && data && (
                            <Redirect 
                                to={{
                                    pathname: '/results',
                                    state: {data: data}
                                }}
                            />
                        )}
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                    <Typography>
                        <Link to="/dashboard" className="link">Dashboard</Link>
                        <Link to="/library" className="link">Library</Link>
                        <Link to="/groups" className="link">Groups</Link>
                        <Link to="/sharing" className="link">Sharing</Link>
                        <Link to="/notifications" className="link">Notifications</Link>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="secondary"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Typography>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="secondary"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    <LightDarkToggle />
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
