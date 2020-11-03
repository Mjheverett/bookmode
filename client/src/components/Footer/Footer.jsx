import React from 'react'

const Footer = () => {
    return (
        <div className="footer">
            <p>Find us on social media:  <a className="footer-link" href="https://instagram.com"><icon className="fab fa-instagram fa-lg"></icon></a>  <a className="footer-link" href="https://www.facebook.com/EverettBeachProperties" target="_blank" rel="noreferrer"><icon className="fab fa-facebook fa-lg"></icon></a>
            </p>
            <p>
                Made with <icon hasTextColor="danger" className="fa fa-heart"></icon> by <a href="#" className="footer-link">Team Lee</a>
            </p>
        </div>
    )
};

export default Footer;