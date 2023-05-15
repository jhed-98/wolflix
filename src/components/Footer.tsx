/* import React from 'react' */
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import dayjs from 'dayjs';

const Footer = () => {
    return (
        <footer className="footer bg-gray-900 py-14 px-0 text-white relative">
            <div className='flex items-center flex-col'>
                <ul className="menuItems list-none flex items-center justify-center gap-4 mb-5 md:mb-8 md:gap-8">
                    <li className="menuItem transition cursor-pointer text-xs md:text-lg hover:text-red-700">Terms Of Use</li>
                    <li className="menuItem transition cursor-pointer text-xs md:text-lg hover:text-red-700">Privacy-Policy</li>
                    <li className="menuItem transition cursor-pointer text-xs md:text-lg hover:text-red-700">About</li>
                    <li className="menuItem transition cursor-pointer text-xs md:text-lg hover:text-red-700">Blog</li>
                    <li className="menuItem transition cursor-pointer text-xs md:text-lg hover:text-red-700">FAQ</li>
                </ul>
                <div className="infoText text-xs leading-5 opacity-60 text-center max-w-3xl mb-5 ">
                    @ JhEd {dayjs(new Date()).format('YYYY')}
                </div>
                <div className="socialIcons flex items-center justify-center gap-3">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
