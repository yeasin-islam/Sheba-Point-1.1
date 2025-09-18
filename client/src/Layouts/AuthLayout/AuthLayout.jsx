import React from 'react';
import AuthHome from '../../pages/Authentication/AuthHome/AuthHome';
import { Outlet } from 'react-router';
import AuthNav from '../../pages/Authentication/AuthNav/AuthNav';

const AuthLayout = () => {
    return (
        <div>
            <AuthNav></AuthNav>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;