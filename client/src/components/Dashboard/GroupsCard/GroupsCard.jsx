import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@material-ui/core";
import './GroupsCard.css';

const GroupsCard = () => {
    return (
        <>
            
            <Card className='groupsCard' style={{backgroundColor: '#2AA198', color: '#93A1A1'}}>
                <Link to="/groups">Your Groups</Link>
                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                </ul>
            </Card>
            
            
        </>
    )
}

export default GroupsCard;