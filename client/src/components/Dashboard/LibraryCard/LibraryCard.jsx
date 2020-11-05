import React from 'react';
import { Card } from "@material-ui/core";
import './LibraryCard.css';

const LibraryCard = () => {
    return (
        <>
            
            <Card className='libraryCard' style={{backgroundColor: '#2AA198', color: '#93A1A1'}}>
                <h3>Your Libray</h3>
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

export default LibraryCard;