import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, GridListTile, Button }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    groupBar: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
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

const GroupDetail = (props) => {
    const classes = useStyles();
    const { group, list } = props;

    return (
        <>
            <br />
                <GridListTile className={classes.groupBar} cellHeight={'auto'}>
                    <Typography variant="h6" className={classes.typography}><Link className={classes.link} to={`/groups/${group.id}`}>{group.groupName}</Link></Typography>
                    <Typography>{group.groupDescription}</Typography>
                    <br />
                    {/* {(list !== 'User') ? (
                        <Button color="secondary" variant="contained" size="large">
                            Join Group
                        </Button> */}
                    ) : null
                    }
                </GridListTile>
            <br />
        </>
    )
}

export default GroupDetail;