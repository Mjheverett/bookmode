import React, { useState } from "react";
import { Card } from "@material-ui/core";
import './LibraryCard.css';
import { Link } from 'react-router-dom';
import { ThemeProvider } from "styled-components";

const LibraryCard = () => {
    const [theme, setTheme] = useState({ mode: "light" });
    return (
        <>
            
            <Card className='libraryCard' style={{backgroundColor: '#EBEBEB', color: '#93A1A1', boxShadow: '-12px -12px 30px #ffffff, inset 12px 12px 30px #c8c8c8'}}>
                <h3><Link to='/library' className='yourLibrary'>Your Libray</Link></h3>
                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                    
                </ul>
            </Card>
            
            
        </>
    )
}

export default LibraryCard;