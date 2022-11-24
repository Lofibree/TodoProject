import { todoAPI } from "../api/api";
import { getDatabase, onValue, ref, set, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { uid } from "uid";

const SET_TODOS = 'todoReducer/SET_TODOS'
const DELETE_TODO = 'todoReducer/DELETE_TODO'
const CREATE_TODO = 'todoReducer/CREATE_TODO'
const UPDATE_TODO = 'todoReducer/UPDATE_TODO'


let initialState = {
    todosArr: [],
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
            stateCopy.todosArr.splice(neededIndex, 1);
            return stateCopy;
        }
        case CREATE_TODO: {
            // debugger
            let check = state.todosArr.some(t => t.uid === action.uid)
            if (!check) {
                let newTodo = {
                    uid: action.uid,
                    title: action.title,
                    description: action.description,
                    date: action.date,
                    isCompleted: false
                }
                return {
                    ...state,
                    todosArr: [...state.todosArr, newTodo],
                }
            } else if (check) { return state }
        }
        case UPDATE_TODO: {
            // debugger
            let neededIndex = state.todosArr.findIndex(t => t.uid === action.uid);
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr]
            }
            stateCopy.todosArr[neededIndex] = {...state.todosArr[neededIndex]}
            if (action.formData.editTitle) {
                stateCopy.todosArr[neededIndex].title = action.formData.editTitle;
            } else if (action.formData.editDescription) {
                stateCopy.todosArr[neededIndex].description = action.formData.editDescription;
            } else if (action.formData.editIsCompleted) {
                stateCopy.todosArr[neededIndex].isCompleted = action.formData.editIsCompleted;
            }
            return stateCopy;
        }
        default:
            return state;
    }
}

export const setTodos = (todosArr) => ({type: SET_TODOS, todosArr})
export const deleteTodo = (uid) => ({type: DELETE_TODO, uid})
export const createTodo = (uid, title, description, date) => ({type: CREATE_TODO, uid, title, description, date})
export const updateTodo = (formData, uid) => ({type: UPDATE_TODO, formData, uid})


export const setTodosTC = () => async (dispatch) => {
    // debugger
    dispatch(setTodos([])) 
    const auth = getAuth()
    const todosListRef = `/${auth.currentUser.uid}`;
    try {
        const database = getDatabase();
        const todoListUpdateRef = ref(database, todosListRef)
        onValue(todoListUpdateRef, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                dispatch(setTodos(Object.values(data)))
            }
        })
    } catch (err) { console.log(err) }
}
export const deleteTodoTC = (uid) => async (dispatch) => {
    // debugger
    const auth = getAuth()
    const database = getDatabase();

    const todoRef = `/${auth.currentUser.uid}/${uid}`;
    remove(ref(database, todoRef))
    dispatch(deleteTodo(uid))
    dispatch(setTodosTC()) 
}
export const createTodoTC = (title, description, date) => async (dispatch) => {
    // debugger
    const auth = getAuth()
    try {
        let userUid = auth.currentUser.uid
        let uidd = uid();
        const database = getDatabase();
        const todoRef = `${userUid}/${uidd}`;
        set(ref(database, todoRef), {
            uid: uidd,
            title: title,
            description: description,
            date: date,
            isCompleted: false
        })
        dispatch(createTodo(uidd, title, description, date))
        console.log('success')
    } catch (err) {
        console.log(err)
    }
    dispatch(setTodosTC()) 

}
export const updateTodoTC = (formData, uid) => async (dispatch) => {
    // debugger
    const auth = getAuth()
    const database = getDatabase();

    const todoRef = `/${auth.currentUser.uid}/${uid}`;
    if (formData.editTitle) {
        // debugger
        update(ref(database, todoRef), {
            title: formData.editTitle,
        })
        dispatch(updateTodo(formData, uid))
    } else if (formData.editDescription) {
        update(ref(database, todoRef), {
            description: formData.editDescription,
        })
        dispatch(updateTodo(formData, uid))
    } else if (formData.editIsCompleted !== (null || undefined)) {
        // debugger
        update(ref(database, todoRef), {
            isCompleted: formData.editIsCompleted,
        })
        dispatch(updateTodo(formData, uid))
    }
    dispatch(setTodosTC()) 
}


export default todoReducer;