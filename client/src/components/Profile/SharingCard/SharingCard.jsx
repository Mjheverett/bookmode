import React from 'react';
import { Card } from "@material-ui/core";
import './SharingCard.css';


const SharingCard = () => {
    return (
        <>
            
            <Card className='sharingCard' style={{backgroundColor: '#EBEBEB', color: '#93A1A1', boxShadow: '-12px -12px 30px #ffffff, inset 12px 12px 30px #c8c8c8'}}>
                
            <h3>Sharing</h3>
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