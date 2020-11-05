import React from 'react';
import GroupsList from './GroupsList';

import { Container, Typography, Button }  from '@material-ui/core';


const Groups = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h2">Groups</Typography>
                <br />
                <Button color="secondary" variant="contained" size="large">Create new group</Button>
                <br />
                <br />
                <GroupsList list={"User"} />
                <GroupsList list={"All"} />
            </Container>
        </>
    )
}

export default Groups;
