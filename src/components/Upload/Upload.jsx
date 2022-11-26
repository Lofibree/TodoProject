import React, { useRef, useState } from 'react';
import s from './Upload.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { uploadTC } from '../../redux/todoReducer';
import docImg from '../../accets/icons8-microsoft-word-2019-48.png'
import { deleteFileTC } from '../../redux/todoReducer';
import Preloader from '../common/Preloader';

const Upload = (props) => {
// debugger
    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const isFetchingFile = useSelector(state => state.todoPage.isFetchingFile)

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
    const deleteFile= (fileName, fileUid) => {
        dispatch(deleteFileTC(props.uid, fileName, fileUid))
    }

    return (
        <div>
            <button onClick={handlePick} >Выбрать файл</button>
            <input type='file' onChange={handleChange} accept='image/*, .doc, .docx' ref={filePicker} className={s.hidden} />
            <button onClick={handleUpload} >Загрузить</button>
            {selectedFile &&
                <>
                    <div>Имя файла: {selectedFile.name}</div>
                </>
            }
            <div>Прикрепленные файлы</div>
            {isFetchingFile
                ? <Preloader />
                : <> {props.filesUrl !== (null || undefined)
                    ? Object.values(props.filesUrl).map(i => {
                        // debugger;
                        return (
                            <div  className={s.fileBox}>
                                <div>
                                    {i.fileType.indexOf('image') !== -1
                                        ? <a href={i.fileUrl}  ><img src={i.fileUrl} className={s.img} title='Скачать' /></a>
                                        : <a href={i.fileUrl} >Скачать файл</a>
                                    }
                                </div>
                                <div >
                                    <div className={s.fileName} >{i.fileName}</div>
                                    <button onClick={() => deleteFile(i.fileName, i.fileUid)} >Удалить файл</button>
                                </div>
                            </div>
                        )
                    })
                    : 'Пока нет файлов'
                }
                </>
            }
        </div>
    );
};

export default Upload;