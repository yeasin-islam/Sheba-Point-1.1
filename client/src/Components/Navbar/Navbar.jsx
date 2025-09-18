import React from 'react';
import { NavLink } from 'react-router';
import '../../../src/App.css'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-16 h-16'>
            <h1 className='text-2xl font-bold'>Navbar</h1>
            <ul className='navlink flex gap-4 text-xl font-semibold'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
            </ul>
        </div>
    );
};

export default Navbar;