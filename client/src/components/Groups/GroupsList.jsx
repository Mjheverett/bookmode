import React, { useEffect, useState } from 'react'
import GroupDetail from './GroupDetail';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, Typography, Button }  from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    groupsDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        boxShadow: 'inset -12px -12px 30px #A5C3CB, inset 12px 12px 30px #475357',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
    },
    div: {
        display: 'flex-inline',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
}));

const GroupsList = (props) => {
    const classes = useStyles();
    const { list } = props;
    const [groups, setGroups] = useState([]);
    
    const { user } = useAuth0();

    useEffect(() => {
        (async function (){
            let url = ``;
            if (list === 'All') {
                url = `http://localhost:3000/groups/`
            } else {
                url = `http://localhost:3000/groups/${user.sub}`
            }
            console.log(url);
            axios.get('http://localhost:3000/groups/')
                .then(res => {
                    const groups = res.data;
                    setGroups(groups)
                })
            })();
    }, []);  

    const renderGroups = () => {
        if (groups.length !== 0) {
            return (groups.map((group) => {
                <GroupDetail group={group} />
            }))
        } else {
            return <Typography varient="p">You're not part of any groups!</Typography>
        }
    }

    return (
        <>
            <div className={classes.groupsDiv}>
                <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                    <GridListTile cellHeight={'auto'}>
                    <Typography variant="h6" >Render List of {list} Groups Here</Typography>
                    {renderGroups()}
                    </GridListTile>
                </GridList> 
            </div>
        </>
    )
}

export default GroupsList;