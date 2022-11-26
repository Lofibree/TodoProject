import React, { useRef, useState } from 'react';
import s from './Upload.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { uploadTC } from '../../redux/todoReducer';
import { deleteFileTC } from '../../redux/todoReducer';
import Preloader from '../common/Preloader';

const Upload = (props) => {
// debugger
    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    // const isFetchingFile = useSelector(state => state.todoPage.isFetchingFile)
    const [isFileUploading, setIsFileUploading] = useState(false)

    /**
     * Активирует кнопку input с type="file"
     */
    const handlePick = () => {
        filePicker.current.click()
    }

    /**
     * Сохраняет выбранный файл
     * @param {object} e список выбранных файлов
     */
    const handleChange = (e) => {
        console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    }

    /**
     * Вызывает Thunk для загрузки файлов 
     * @returns alert если ничего не выбрано
     */
    const handleUpload = async () => {
        // debugger
        if (!selectedFile) {
            alert('Пожалуйста выберите файл');
            return;
        }
        setIsFileUploading(true)
        dispatch(uploadTC(selectedFile, props.uid))
        setIsFileUploading(false)
        setSelectedFile(null)
    }

    /**
     * Вызывает Thunk для удаления файла
     * @param {string} fileName имя файла
     * @param {string} fileUid id файла
     */
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
            {isFileUploading
                ? <Preloader />
                : <> {props.filesUrl !== (null || undefined)
                    ? Object.values(props.filesUrl).map(i => {
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