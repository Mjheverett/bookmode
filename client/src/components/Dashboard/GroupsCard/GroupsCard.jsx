import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Typography, GridListTile }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dashboardDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        boxShadow: 'inset -12px -12px 30px #A5C3CB, inset 12px 12px 30px #475357',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
    },
    link: {
        color: '#002B36',
    },
}));

const GroupsCard = () => {
    const classes = useStyles();
    const [groups, setGroups] = useState(null);
    const { user } = useAuth0();

    useEffect(() => {
        axios.get(`http://localhost:3000/groups/${user.sub}`)
            .then(res => {
                const data = res.data;
                setGroups(data);
            })
            .catch(err => console.log(err));
    },[user.sub]);

    if (groups === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }

    return (
        <>
            <div className={classes.dashboardDiv}>
                <Typography variant="h6" className={classes.typography}><Link className={classes.link} to="/groups">Your Groups</Link></Typography>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                    {(groups.length !== 0) ? (groups.map((group) => (
                        <GridListTile cellHeight={'auto'} key={group.id}>
                            <br />
                            <Link to={`/groups/${group.id}`}><Typography variant="h6">{group.groupName}</Typography></Link>
                            <br/>
                            <Typography>{group.groupDescription}</Typography>
                            <br />
                        </GridListTile>
                    ))) : (
                    <Typography>You're not part of any groups!</Typography>
                    )}
                    </GridList>
            </div>
        </>
    )
}

export default GroupsCard;