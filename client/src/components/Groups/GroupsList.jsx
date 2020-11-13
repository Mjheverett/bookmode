import React from 'react'
import GroupDetail from './GroupDetail';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Typography }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    groupsDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
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
    const { list, groups } = props;

    // return while waiting on axios, then render updated page
    if (groups === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }

    return (
        <>
            <Typography variant="h6" >List of {list} Groups</Typography>
            <br />
            <div className={classes.groupsDiv}>
                <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                    {(groups.length !== 0) ? (groups.map((group) => (
                        <GroupDetail group={group} list={list} />
                    ))) : (
                        <Typography>You're not part of any groups!</Typography>
                    )};
                </GridList> 
            </div>
        </>
    )
}

export default GroupsList;