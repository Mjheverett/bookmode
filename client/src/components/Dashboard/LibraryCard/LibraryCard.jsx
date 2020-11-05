import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@material-ui/core";
import './LibraryCard.css';

const LibraryCard = () => {
    return (
        <>
            
            <Card className='libraryCard' style={{backgroundColor: '#2AA198', color: '#93A1A1'}}>
                <Link to="/library">Your Library</Link>
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