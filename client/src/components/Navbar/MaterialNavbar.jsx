import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AppBar, Toolbar, IconButton, InputBase, Select, MenuItem, Menu, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import './Navbar.css';


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
            marginLeft: theme.spacing(1),
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
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '20ch',
        },
    },
    select: {
        color: '#93A1A1',
        position: 'relative',
        height: "35px",
        padding: theme.spacing(1),
        paddingRight: '0px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '25%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
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
    
}));

export default function PrimarySearchAppBar() {

    const classes = useStyles(); 
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [data, setData] = useState('');
    const [search, setSearch] = useState('');
    const [fireRedirect, setRedirect] = useState(false);
    const [query, setQuery] = useState('all');

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

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
    const handleSelect = (event) => {
        setQuery(event.target.value);
        };
        
    // Material UI - Menu
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
                <div>
                    <MenuItem><Link to="/profile" className="menu-link">My account</Link></MenuItem>
                    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</MenuItem>
                </div>
            ) : (
                <MenuItem onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>Login</MenuItem>
            )}
            
        </Menu>
    );

    // Material UI - Mobile Menu
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
        setData(data);
    };

    const _handleSubmit = (e) => {
        e.preventDefault();
        const newSearch = data.replace(/\s+/g, '+');
        setSearch(newSearch);
        setRedirect(true)
    };
    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{backgroundColor: '#002B36'}}>
                <Toolbar>
                        <Select 
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={query}
                            onChange={handleSelect}
                            className={classes.select}
                            autoWidth
                            >
                            <MenuItem style={{color: 'rgb(147, 161, 161)'}} value="all">All</MenuItem>
                            <MenuItem style={{color: 'rgb(147, 161, 161)'}} value="title">Title</MenuItem>
                            <MenuItem style={{color: 'rgb(147, 161, 161)'}} value="author">Author</MenuItem>
                            <MenuItem style={{color: 'rgb(147, 161, 161)'}} value="subject">Subject</MenuItem>
                            <MenuItem style={{color: 'rgb(147, 161, 161)'}} value="ISBN">ISBN</MenuItem>
                        </Select>
                        <div className={classes.search}>
                        <form onSubmit={e => _handleSubmit(e)}>
                            <InputBase style={{color: '#fff', paddingLeft: '6px'}}
                                placeholder="Search title, author, ISBN..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={data}
                                endAdornment={<InputAdornment position="end">
                                <SearchIcon style={{color: '#93A1A1'}}/>
                            </InputAdornment>}
                                inputProps={{ 'aria-label': 'search'}}
                                onChange={(event) => _handleChange(event.target.value)}
                                
                            />
                            
                        </form>
                        {fireRedirect && data && (
                            <Redirect 
                                to={{
                                    pathname: '/results',
                                    data: search, 
                                    query: query
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
                      
                </Toolbar>
                
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
