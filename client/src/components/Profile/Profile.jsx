import React from 'react';
import SharingCard from "./SharingCard/SharingCard";
import LibraryCard from "./LibraryCard/LibraryCard";
import GroupsCard from "./GroupsCard/GroupsCard";
import NotificationsCard from "./NotificationsCard/NotificationsCard";
import './Profile.css';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user } = useAuth0();
    console.log(user);
    
    return (
        <>
            <h1>Profile</h1>
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

export default Profile;