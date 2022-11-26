import React from 'react';
import preloader from '../../accets/loading-gif.gif';
import s from './Preloader.module.css';

const Preloader = () => {
    // debugger;
    return (
        <div>
            <img src={preloader} className={s.preloaderGif}/>
        </div>
    );
};

export default Preloader;