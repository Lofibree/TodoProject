import React from 'react';
import useAuth from '../../firebase/useAuth';
import { NavLink } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import { getDatabase, set, ref } from 'firebase/database';

const ProfilePage = () => {

    const { user, loading, logout } = useAuth()
    if (loading) {
        return 'Loading, please wait'
    }
    const userRef = `users/${user.uid}`;
    const database = getDatabase();

    const handleProfileUpdate = (formData) => {
        try {
            console.log(formData.newBio)
            console.log(formData.newAddress)
            set(ref(database, userRef), {
                bio: formData.newBio,
                address: formData.newAddress
            })
            console.log('success')
            console.log(formData.newBio)
            console.log(formData.newAddress)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>I'm from Profile page</h1>
            <button type='button' onClick={logout} >Logout</button>
            <div>
                <NavLink to={'/home'} ><button>Go to home page</button></NavLink>
                <NavLink to={'/'} ><button>Go to init page</button></NavLink>
            </div>
            <div>
                <div>{user.displayName}</div>
                <img src={user.photoURL} alt={user.displayName} />
            </div>
            <div>
                <Form
                    onSubmit={(values) => {
                        handleProfileUpdate(values)
                    }}
                    render={renderProps => {
                        const { handleSubmit } = renderProps;
                        return (
                            <form onSubmit={handleSubmit}>
                                <Field name='newBio' type='text' placeholder='new bio' component='input' />
                                <Field name='newAddress' type='text' placeholder='new address' component='input' />
                                <button type='submit'>Update Profile</button>
                            </form>
                        )
                    }}
                >
                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;