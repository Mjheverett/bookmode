import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, InputBase }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'primary',
    },
    inputInput: {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        marginLeft: 0,
        [theme.breakpoints.up('md')]: {
            width: '100ch',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
            marginLeft: 0,
        },
    },
    margin: {
        margin: theme.spacing(2),
    },
}));

const GroupPage = () => {
    const classes = useStyles();
    const [group, setGroup] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/groups/${id}`)
            .then(res => {
                console.log("individual group", res);
                const data = res.data;
                setGroup(data);
            })
            .catch(err => console.log(err));
    }, []);

    // return while waiting on axios, then render updated page
    if (group === null) {
        return 'Loading...';
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">{group.name}</Typography>
            <Typography variant="h6">This should show info for the selected group but it doesn't!</Typography>
        </Container>
    )
}

export default GroupPage;