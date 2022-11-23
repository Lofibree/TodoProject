import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginWithGoogle from '../../firebase/LoginWithGoogle';
import useAuth from '../../firebase/useAuth';

const InitPage = () => {
    const navigate = useNavigate()
    const { user, loading, logout } = useAuth()
    if (loading) {
        return 'Loading, please wait'
    } else if (user) {
        navigate('/home')
    }
    return (
        <div>
            <h1>Hello</h1>
            <h4>Login to continue</h4>
            <LoginWithGoogle />
            <NavLink to={'/home'} ><button type='button' >Go to home page</button></NavLink>
            <NavLink to={'/profile'} ><button type='button' >Go to Profile page</button></NavLink>
        </div>
    );
};

export default InitPage;