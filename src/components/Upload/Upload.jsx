import React, { useRef, useState } from 'react';
import s from './Upload.module.css'
import { storage } from '../../firebase/firebaseInit';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { uploadTC } from '../../redux/todoReducer';
import { auth } from '../../firebase/firebaseInit';

const Upload = (props) => {
// debugger
    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);
    const [percent, setPercent] = useState(0);
    const dispatch = useDispatch();
    // const todosArr = use

    const handleChange = (e) => {
        console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    }
    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }
        console.log(selectedFile)
        const storageRef = ref(storage, `${auth.currentUser.uid}/${props.uid}/files/${selectedFile.name}`)
        console.log(storageRef)
        // selectedFile.map(f => {
            const uploadTask = uploadBytesResumable(storageRef, selectedFile)
            uploadTask.on('state_changed', (snapshot) => {
                const persent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                // update progress
                setPercent(persent)
            },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url)
                        setImgUrl((oldArr) => [...oldArr, url])
                        dispatch(uploadTC(url, selectedFile[0].name, props.uid))
                        setSelectedFile(null)
                    })
                })
        // })
    }
    const handlePick = () => {
        filePicker.current.click()
    }
    const imgUrlEl = imgUrl.map(i => <img src={i} className={s.img} />)
    return (
        <div>
            <button onClick={handlePick} >Pick file</button>
            <input type='file' onChange={handleChange} accept='image/*' ref={filePicker} className={s.hidden} />
            <button onClick={handleUpload} >Upload</button>
            {/* <p>{percent} % done</p> */}
            {selectedFile &&
                <>
                    <p>{percent} % done</p>
                    <div>Selected photo's name: {selectedFile.name}</div>
                </>
            }
            <div>Added photos</div>
            {props.filesUrl !== (null || undefined)
                ? Object.values(props.filesUrl).map(i => <img src={i.fileUrl} className={s.img} />)
                : 'No photos yet'
            }
        </div>
    );
};

export default Upload;