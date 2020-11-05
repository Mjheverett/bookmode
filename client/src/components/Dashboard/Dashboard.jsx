import React from 'react';
import SharingCard from "./SharingCard/SharingCard";
import LibraryCard from "./LibraryCard/LibraryCard";
import GroupsCard from "./GroupsCard/GroupsCard";
import NotificationsCard from "./NotificationsCard/NotificationsCard";
import './Dashboard.css';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
    const { user } = useAuth0();
    console.log(user);
    
    return (
        <>
            <h1>Dashboard</h1>
            <p>{user.name}</p>
            <div className='contentCards'>
                <LibraryCard />
                <GroupsCard />
                <SharingCard />
                <NotificationsCard />
            </div>
        </>
    )
}

export default Dashboard;