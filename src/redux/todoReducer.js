
import { getDatabase, ref, set, remove, update, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { uid } from "uid";
import { deleteObject, getDownloadURL, ref as refStorage, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebaseInit";

const SET_TODOS = 'todoReducer/SET_TODOS'
const DELETE_TODO = 'todoReducer/DELETE_TODO'
const CREATE_TODO = 'todoReducer/CREATE_TODO'
const UPDATE_TODO = 'todoReducer/UPDATE_TODO'
const UPLOAD = 'todoReducer/UPLOAD'
const DELETE_FILE = 'todoReducer/DELETE_FILE'
const IS_FETCHING_FILE = 'todoReducer/IS_FETCHING_FILE'
const IS_CREATING_TODO = 'todoReducer/IS_CREATING_TODO'


let initialState = {
    todosArr: [], 
    isFetchingFile: false,
    isCreatingTodo: false
}


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS: {
            // debugger
            return {
                ...state,
                todosArr: [...action.todosArr],
            }
        }
        case DELETE_TODO: {
            // debugger
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr],
            }
            let neededIndex = stateCopy.todosArr.findIndex(t => t.uid === action.uid);
            if (neededIndex !== -1) {
                stateCopy.todosArr.splice(neededIndex, 1);
            }
            return stateCopy;
        }
        case CREATE_TODO: {
            // debugger
            let check = state.todosArr.some(t => t.uid === action.todoUid)
            if (!check) {
                let newTodo = {
                    uid: action.todoUid,
                    title: action.title,
                    description: action.description,
                    date: action.date,
                    isCompleted: false,
                    filesUrl: []
                }
                return {
                    ...state,
                    todosArr: [...state.todosArr, newTodo],
                }
            } else if (check) { return state }
        }
        case UPDATE_TODO: {
            // debugger
            let neededIndex = state.todosArr.findIndex(t => t.uid === action.todoUid);
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr]
            }
            stateCopy.todosArr[neededIndex] = { ...state.todosArr[neededIndex] }
            if (action.formData.editTitle) {
                stateCopy.todosArr[neededIndex].title = action.formData.editTitle;
            } else if (action.formData.editDescription) {
                stateCopy.todosArr[neededIndex].description = action.formData.editDescription;
            } else if (action.formData.editIsCompleted !== (null || undefined)) {
                stateCopy.todosArr[neededIndex].isCompleted = action.formData.editIsCompleted;
            }
            return stateCopy;
        }
        case UPLOAD: {
            let neededIndex = state.todosArr.findIndex(t => t.uid === action.todoUid);
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr]
            }
            stateCopy.todosArr[neededIndex] = { ...state.todosArr[neededIndex] }
            let filesArr = Object.values(stateCopy.todosArr[neededIndex].filesUrl)
            filesArr.push({ fileUrl: action.url, fileName: action.fileName, fileUid: action.fileUid, fileType: action.fileType })
            stateCopy.todosArr[neededIndex].filesUrl = filesArr
            return stateCopy;
        }
        case DELETE_FILE: {
            // debugger
            let neededTodoIndex = state.todosArr.findIndex(t => t.uid === action.todoUid);
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr]
            }
            stateCopy.todosArr[neededTodoIndex] = { ...state.todosArr[neededTodoIndex] }
            stateCopy.todosArr[neededTodoIndex].filesUrl = Object.values(state.todosArr[neededTodoIndex].filesUrl) 
            let neededFileIndex = stateCopy.todosArr[neededTodoIndex].filesUrl.findIndex(f => f.fileUid === action.fileUid)
            stateCopy.todosArr[neededTodoIndex].filesUrl[neededFileIndex] = {...Object.values(state.todosArr[neededTodoIndex].filesUrl)[neededFileIndex]}
            stateCopy.todosArr[neededTodoIndex].filesUrl.splice(neededFileIndex, 1)
            return stateCopy;
        }
        case IS_FETCHING_FILE: {
            return {
                ...state,
                isFetchingFile: action.isFetchingFile
            }
        }
        case IS_CREATING_TODO: {
            return {
                ...state,
                isCreatingTodo: action.isCreatingTodo
            }
        }
        default:
            return state;
    }
}

export const setTodos = (todosArr) => ({ type: SET_TODOS, todosArr })
export const deleteTodo = (uid) => ({ type: DELETE_TODO, uid })
export const createTodo = (todoUid, title, description, date) => ({ type: CREATE_TODO, todoUid, title, description, date })
export const updateTodo = (formData, todoUid) => ({ type: UPDATE_TODO, formData, todoUid })
export const upload = (url, fileName, todoUid, fileUid, fileType) => ({ type: UPLOAD, url, fileName, todoUid, fileUid, fileType })
export const deleteFile = (todoUid, fileUid) => ({ type: DELETE_FILE, todoUid, fileUid })
export const isFetchingFile = (isFetchingFile) => ({ type: IS_FETCHING_FILE, isFetchingFile })
export const isCreatingTodoAC = (isCreatingTodo) => ({ type: IS_CREATING_TODO, isCreatingTodo })


export const setTodosTC = () => async (dispatch) => {
    // debugger
    dispatch(setTodos([]))
    const auth = getAuth()
    const todosListRef = `/${auth.currentUser.uid}`;
    const database = getDatabase();

    get(child(ref(database), todosListRef)).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            if (data) {
                dispatch(setTodos(Object.values(data)))
            }
        }
    })
}
export const deleteTodoTC = (uid, filesUrl) => async (dispatch) => {
    // debugger
    const auth = getAuth()
    const database = getDatabase();

    const todoRef = `/${auth.currentUser.uid}/${uid}`;
    remove(ref(database, todoRef))
        .then(() => {
            filesUrl.map(f => {
                const storageRef = refStorage(storage, `${auth.currentUser.uid}/${uid}/files/${f.fileName}`)
                deleteObject(storageRef)
            })
        }).then(() => {
            dispatch(deleteTodo(uid))
        })
}
export const createTodoTC = (title, description, date) => async (dispatch) => {
    // debugger
    dispatch(isCreatingTodoAC(true))
    const auth = getAuth()
    let userUid = auth.currentUser.uid
    let todoUid = uid();
    const database = getDatabase();
    const todoRef = `${userUid}/${todoUid}`;
    set(ref(database, todoRef), {
        uid: todoUid,
        title: title,
        description: description,
        date: date,
        isCompleted: false,
    }).then(() => {
        dispatch(createTodo(todoUid, title, description, date))
    }).then(() => {
        dispatch(isCreatingTodoAC(false))
    })
}
export const updateTodoTC = (formData, todoUid) => async (dispatch) => {
    // debugger
    const auth = getAuth()
    const database = getDatabase();

    const todoRef = `/${auth.currentUser.uid}/${todoUid}`;
    if (formData.editTitle) {
        update(ref(database, todoRef), {
            title: formData.editTitle,
        })
    } else if (formData.editDescription) {
        update(ref(database, todoRef), {
            description: formData.editDescription,
        })
    } else if (formData.editIsCompleted !== (null || undefined)) {
        update(ref(database, todoRef), {
            isCompleted: formData.editIsCompleted,
        })
    }
    dispatch(updateTodo(formData, todoUid))
}
export const uploadTC = (file, todoUid) => async (dispatch) => {
    // debugger
    const auth = getAuth()
    const database = getDatabase();
    const fileUid = uid()
    const todoRef = `/${auth.currentUser.uid}/${todoUid}/filesUrl/${fileUid}`;
    const storageRef = refStorage(storage, `${auth.currentUser.uid}/${todoUid}/files/${file.name}`)
    dispatch(isFetchingFile(true))
    uploadBytes(storageRef, file).then((snapshot) => {
        // debugger
        let fileType = snapshot.metadata.contentType
        getDownloadURL(snapshot.ref).then((url) => {
            // debugger

            if (url) {
                set(ref(database, todoRef), {
                    fileUrl: url,
                    fileName: file.name,
                    fileUid: fileUid,
                    fileType: fileType
                })
                // debugger
                dispatch(upload(url, file.name, todoUid, fileUid, fileType))
            }
        }).then(() => {
            dispatch(isFetchingFile(false))
        })
    })
}
export const deleteFileTC = (todoUid, fileName, fileUid) => async (dispatch) => {
    const auth = getAuth()
    const database = getDatabase();
    // const fileUid = uid()
    const todoRef = `/${auth.currentUser.uid}/${todoUid}/filesUrl/${fileUid}`;
    remove(ref(database, todoRef)).then(() => {
        // debugger
        const storageRef = refStorage(storage, `${auth.currentUser.uid}/${todoUid}/files/${fileName}`)
        deleteObject(storageRef)    
    }).then(() => {
        // debugger
        dispatch(deleteFile(todoUid, fileUid))
    })
}



export default todoReducer;