import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <div className='flex flex-row-reverse gap-5 
                        p-3 font-mono 
                        text-xl text-white
                        bg-linear-to-r from-blue-300 to-violet-600
                        w-full h-18 border-b-2
                        border-white'>
            <NavLink 
            to="research"
            className="cursor-pointer rounded-full content-center
            hover:text-2xl hover:bg-white hover:text-violet-500 hover:rounded-full hover:p-2
            transition delay-150 duration-1000 ease-in-out hover:-translate-y-1">
                Rechercher une Zone
            </NavLink>
            <NavLink to="/"
            className="cursor-pointer rounded-full content-center
            hover:text-2xl hover:bg-white hover:text-violet-500 hover:rounded-full hover:p-2
            transition delay-150 duration-1000 ease-in-out hover:-translate-y-1">
                Acceuil
            </NavLink>
        </div>
    );
};

export default Header;