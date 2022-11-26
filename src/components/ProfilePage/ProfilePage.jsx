import React from 'react';
import useAuth from '../../firebase/useAuth';
import { NavLink } from 'react-router-dom';


const ProfilePage = () => {

    const { user, loading, logout } = useAuth()
    if (loading) {
        return 'Loading, please wait'
    }

    return (
        <div>
            <h1>Профиль</h1>
            <button type='button' onClick={logout} >Logout</button>
            <div>
                <NavLink to={'/home'} ><button>Go to home page</button></NavLink>
                <NavLink to={'/'} ><button>Go to init page</button></NavLink>
            </div>
            <div>
                <h2>{user.displayName}</h2>
                <div>{user.email}</div>
                <img src={user.photoURL} alt={user.displayName} />
            </div>
        </div>
    );
};

export default ProfilePage;