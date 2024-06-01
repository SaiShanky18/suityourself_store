import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import Image from 'next/image';

import './Footer.css';


const Footer = () => (
    <div className='app__footer section__padding' id='login'>

        <div className='app__footer-links'>
            <div className='app__footer-links_contact'>
                <h1 className='app__footer-headtext'>Contact Us</h1>
                <p className='p__opensans'>Phone: 1 (868) 684-4129</p>
                <p className='p__opensans' style={{ textTransform: 'lowercase' }}>
                    e-mail: <a href="mailto:suityourselftt@gmail.com">suityourselftt@gmail.com</a>
                </p>
            </div>
            <div className='app__footer-links_logo'>
                <Image src="/logo.png" alt='logo' width={260} height={100} />
            </div>
            <div className='app__footer-links_work'>
                <h1 className='app__footer-headtext'>Follow us on Socials</h1>
                <div className='app__footer-links_icons'>
                    <a href='https://www.instagram.com/suityourselftt/' target="_blank">
                        <FiInstagram />
                    </a>
                </div>
            </div>
        </div>
        <div className='footer__copyright'>
            <p className='p__opensans' style={{ color: 'gray' }}>© 2024 SuitYourselfTT. All Rights Reserved.</p>
        </div>
    </div>
);

export default Footer;
