import React from 'react';
import SharingCard from "./SharingCard/SharingCard";
import LibraryCard from "./LibraryCard/LibraryCard";
import GroupsCard from "./GroupsCard/GroupsCard";
import NotificationsCard from "./NotificationsCard/NotificationsCard";
import './Profile.css';
import LogoutButton from '../Auth0/LogoutButton';

const Profile = () => {
    return (
        <>
            <h1>Profile</h1>
            <LogoutButton />
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