import { useState, useEffect } from 'react'

import { TbSearch, TbSearchOff } from "react-icons/tb";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import logo from "../assets/wolflix-logo.svg";
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    //actvar menu de navegacion con la dimension de pantalla y el position de header
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(screen.width);
    };
    const controlScreen = () => {
        if (window.innerWidth > 768) {
            setMobileMenu(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        window.addEventListener("resize", controlScreen);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event: any) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type: string) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
        setShowSearch(false);
    };

    return (
        <header className={`header fixed translate-y-0 w-full h-16 z-20 flex items-center  ${mobileMenu ? "mobileView bg-gray-800" : ""} ${show}`}>
            <div className='ContentWrapper flex justify-between items-center w-full px-4 md:px-10'>
                <div className="logo cursor-pointer" onClick={() => navigate("/")}>
                    <img src={logo} alt="" className='h-10' />
                </div>
                <ul className={`menuItems ${mobileMenu ? "flex absolute top-16 left-0 bg-gray-800 flex-col w-full py-5 px-0 border-t-2 border-gray-950 animate-mobile-menu" : "list-none hidden items-center md:flex"}`}>
                    <li
                        className={`menuItem cursor-pointer  ${mobileMenu ? "text-xl w-full h-auto py-4 px-5 m-0 flex flex-col items-start" : "h-16 flex items-center my-0 mx-4 text-white hover:text-red-600 font-medium relative"}`}
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className={`menuItem cursor-pointer  ${mobileMenu ? "text-xl w-full h-auto py-4 px-5 m-0 flex flex-col items-start" : "h-16 flex items-center my-0 mx-4 text-white hover:text-red-600 font-medium relative"}`}
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    {!mobileMenu && (
                        <li className="menuItem cursor-pointer h-16 flex items-center my-0 mx-4 text-white hover:text-red-600 font-medium relative">
                            {showSearch ? (
                                <TbSearchOff className="mr-0 cursor-pointer hover:text-red-600 text-2xl" onClick={() => setShowSearch(false)} />
                            ) : (
                                <TbSearch className="mr-0 cursor-pointer hover:text-red-600 text-2xl" onClick={openSearch} />
                            )}
                        </li>
                    )}
                </ul>

                <div className="mobileMenuItems flex items-center gap-5 md:hidden px-5">
                    {showSearch ? (
                        <TbSearchOff className="text-2xl text-white" onClick={() => setShowSearch(false)} />
                    ) : (
                        <TbSearch className="text-2xl text-white" onClick={openSearch} />
                    )}

                    {mobileMenu ? (
                        <VscChromeClose className="text-2xl text-white" onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu className="text-2xl text-white" onClick={openMobileMenu} />
                    )}
                </div>
            </div>
            {showSearch && (
                <div className="searchBar w-full h-16 bg-white absolute top-16 animate-mobile-menu">
                    <div className='contentWrapper'>
                        <div className="searchInput flex items-center h-10 mt-3 w-full">
                            <input
                                className='w-full h-14 bg-white text-black outline-0 border-0 rounded-input-search py-0 px-4 md:h-16 md:text-xl md:py-0 md:px-8'
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose className="text-xl shrink-0 left-3 cursor-pointer"
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header
