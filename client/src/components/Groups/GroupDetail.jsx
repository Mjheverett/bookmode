import React from 'react';
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
    console.log("props", props)

    return (
        <>
            <br />
                <GridListTile className={classes.groupBar} cellHeight={'auto'}>
                    <Typography variant="h6">{group.groupName}</Typography>
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