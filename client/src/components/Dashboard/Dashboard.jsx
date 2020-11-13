import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import SharingCard from "./SharingCard/SharingCard";
import LibraryCard from "./LibraryCard/LibraryCard";
import GroupsCard from "./GroupsCard/GroupsCard";
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
    }, [user.sub, user.name, user.email]);

    if (userData === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }


    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Dashboard</Typography>
                <br />
                <Typography variant="h6">Welcome, {userData.name}</Typography>
                <br />
                <GridList cols={1} cellHeight={'auto'}>
                    <GridListTile cols={1} cellHeight={'auto'}>
                        <LibraryCard />
                    </GridListTile>
                    <GridListTile cellHeight={'auto'}>
                        <GroupsCard />
                    </GridListTile>
                    <GridListTile cellHeight={'auto'}>
                        <SharingCard />
                    </GridListTile>
                </GridList>
                <Typography style={{textAlign: 'end'}}>Scroll for More <span class="fas fa-long-arrow-alt-right"></span></Typography>
            </Container>
        </>
    )
}

export default Dashboard;