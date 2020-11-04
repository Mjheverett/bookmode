import React from 'react';
import GroupsList from './GroupsList';

const Groups = () => {
    return (
        <>
            <h1>Groups</h1>
            <button>Create new group</button>
            <GroupsList list={"User"} />
            <GroupsList list={"All"} />
        </>
    )
}

export default Groups;
