import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import SharingCard from "./SharingCard/SharingCard";
import LibraryCard from "./LibraryCard/LibraryCard";
import GroupsCard from "./GroupsCard/GroupsCard";
import NotificationsCard from "./NotificationsCard/NotificationsCard";

import { Container, GridList, GridListTile, Typography }  from '@material-ui/core';

const Dashboard = () => {
    const { user } = useAuth0();
    const [ userData, setUserData ] = useState(null);
    
    useEffect(() => {
        const data = {
            id: user.sub,
            name: user.name,
            email: user.email
        };
        axios.post(`http://localhost:3000/users/add`, data)
            .then(res => {
                const data = res.data;
                setUserData(data);
            })
            .catch(err => console.log(err));
    }, []);

    if (userData === null) {
        return 'Loading...';
    }

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Dashboard</Typography>
                <br />
                <br />
                <Typography variant="h6">Welcome, {userData.name}</Typography>
                <br />
                <GridList cols={2} cellHeight={'auto'}>
                    <GridListTile cellHeight={'auto'}>
                        <LibraryCard />
                    </GridListTile>
                    <GridListTile cellHeight={'auto'}>
                        <GroupsCard />
                    </GridListTile>
                </GridList>
                <GridList cols={2} cellHeight={'auto'}>
                    <GridListTile cellHeight={'auto'}>
                        <SharingCard />
                    </GridListTile>
                    <GridListTile cellHeight={'auto'}>
                        <NotificationsCard />
                    </GridListTile>
                </GridList>
            </Container>
        </>
    )
}

export default Dashboard;