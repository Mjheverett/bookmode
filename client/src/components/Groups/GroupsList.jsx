import React, { useEffect, useState } from 'react'
import GroupDetail from './GroupDetail';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const GroupsList = (props) => {
    const { list } = props;
    const [groups, setGroups] = useState([]);
    
    const { user } = useAuth0();

    useEffect(() => {
        (async function (){
            let url = ``;
            if (list === 'All') {
                url = `http://localhost:3000/groups/all`
            } else {
                url = `http://localhost:3000/groups/${user.sub}`
            }
            console.log(url);
            await axios.get(url)
                .then(res => {
                    const groups = res.data;
                    setGroups(groups)
                })
            })();
    }, []);  

    const renderGroups = () => {
        if (groups.length !== 0) {
            return (groups.map((group) => {
                <GroupDetail group={group} />
            }))
        } else {
            return <p>You're not part of any groups!</p>
        }
    }

    return (
        <>
            <h2>Render List of {list} Groups Here</h2>
            {renderGroups()}
        </>
    )
}

export default GroupsList;