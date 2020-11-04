import React from 'react';
import styled from "styled-components";

const FooterDiv = styled.div`
    margin-top: calc(5% + 60px);
    bottom: 0;
    position: absolute;
`;

const Footer = () => {
    return (
        <FooterDiv>
            Made with <span className="fa fa-heart" /> by Team Lee
        </FooterDiv>
    )
};

export default Footer;