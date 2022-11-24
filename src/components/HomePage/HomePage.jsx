import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../firebase/useAuth';
import Todos from '../Todos/Todos';

const HomePage = () => {

    const { user, loading, logout } = useAuth()
    if (loading) {
        return 'Loading, please wait'
    }
    return (
        <div>
            <h1>Hello, '{user.displayName}'</h1>
            <button type='button' onClick={logout}>Logout</button>
            <NavLink to={'/profile'} ><button>Go to profile</button></NavLink>
            <NavLink to={'/'} ><button>Go to init page</button></NavLink>
            {/* <div> */}
                <Todos />
                {/* </div> */}
        </div>
    );
};

export default HomePage;