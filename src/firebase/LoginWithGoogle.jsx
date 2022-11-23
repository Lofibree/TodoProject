import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const LoginWithGoogle = () => {
    // debugger
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const handleLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            console.log(user)
            navigate('/home')
          }).catch((error) => {
            console.log(error)    
        });
    }

    return (
        <div>
            <button type='button' onClick={handleLogin} >Login with Google</button>
        </div>
    );
};

export default LoginWithGoogle;