import React from 'react';
import { Typography, GridListTile }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    groupBar: {
        background: '#52781e',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));

const GroupDetail = (props) => {
    const classes = useStyles();
    const { group } = props;
    console.log("props", props)

    return (
        <>
            <br />
                <GridListTile className={classes.groupBar} cellHeight={'auto'}>
                    <Typography variant="h6" style={{color: '#fff'}}>{group.groupName}</Typography>
                    <Typography style={{color: '#fff'}}>{group.groupDescription}</Typography>
                </GridListTile>
            <br />
        </>
    )
}

export default GroupDetail;