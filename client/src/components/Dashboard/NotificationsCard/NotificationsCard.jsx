import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@material-ui/core";
import './NotificationsCard.css';


const NotificationsCard = () => {
    return (
        <>
            <Card className='notificationsCard' style={{backgroundColor: '#EBEBEB', color: '#93A1A1'}}>
                <Link to="/notifications">Your Notifications</Link>
                <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur</li>
                        <li>Lorem ipsum dolor sit amet, consectetur</li>
                        <li>Lorem ipsum dolor sit amet, consectetur</li>
                        <li>Lorem ipsum dolor sit amet, consectetur</li>
                </ul>
            </Card>
        </>
    )
}

export default NotificationsCard;