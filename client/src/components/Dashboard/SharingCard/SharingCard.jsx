import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@material-ui/core";
import './SharingCard.css';


const SharingCard = () => {
    return (
        <>
            <Card className='sharingCard' style={{backgroundColor: '#2AA198', color: '#93A1A1'}}>
                <Link to="/sharing">Sharing</Link>
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

export default SharingCard;