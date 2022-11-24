import React, { useRef, useState } from 'react';
import s from './Upload.module.css'
import { useDispatch } from 'react-redux';
import { uploadTC } from '../../redux/todoReducer';


const Upload = (props) => {
// debugger
    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);
    const [percent, setPercent] = useState(0);
    const dispatch = useDispatch();

    const handlePick = () => {
        filePicker.current.click()
    }
    const handleChange = (e) => {
        console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    }
    const handleUpload = () => {
        if (!selectedFile) {
            alert('Пожалуйста выберите файл');
            return;
        }
        dispatch(uploadTC(selectedFile, props.uid))
        setSelectedFile(null)
    }

    return (
        <div>
            <button onClick={handlePick} >Выбрать файл</button>
            <input type='file' onChange={handleChange} accept='image/*' ref={filePicker} className={s.hidden} />
            <button onClick={handleUpload} >Загрузить</button>
            {selectedFile &&
                <>
                    <p>{percent} % загружено</p>
                    <div>Имя фото: {selectedFile.name}</div>
                </>
            }
            <div>Добавленные фото</div>
            {props.filesUrl !== (null || undefined)
                ? Object.values(props.filesUrl).map(i => <img src={i.fileUrl} className={s.img} />)
                : 'Пока нет фото'
            }
        </div>
    );
};

export default Upload;