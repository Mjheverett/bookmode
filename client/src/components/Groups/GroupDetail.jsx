import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, GridListTile, Button }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    groupBar: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));

const GroupDetail = (props) => {
    const classes = useStyles();
    const { group } = props;

    return (
        <>
            <br />
                <GridListTile className={classes.groupBar} cellHeight={'auto'}>
                    <Link to={`/groups/${group.id}`}><Typography variant="h6">{group.groupName}</Typography></Link>
                    <Typography>{group.groupDescription}</Typography>
                    <br />
                    <Button color="secondary" variant="contained" size="large">
                        Join Group
                    </Button>
                </GridListTile>
            <br />
        </>
    )
}

export default GroupDetail;