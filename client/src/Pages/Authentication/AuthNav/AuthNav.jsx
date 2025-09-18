import React from 'react';
import { Link } from 'react-router';
import navLogo from '../../../assets/WebLogo.png';
const AuthNav = () => {
    return (
        <div className='bg-base-100 sticky top-0 z-50'>
            <div className='flex justify-between items-center container mx-auto  py-5  '>
           <img className='w-50' src={navLogo} alt="" />
           <Link to={'/'} className='btn btn-primary border cursor-pointer'>Back to Home</Link>
        </div>
        </div>
    );
};

export default AuthNav;