import { todoAPI } from "../api/api"

const SET_TODOS = 'todoReducer/SET_TODOS'
const DELETE_TODO = 'todoReducer/DELETE_TODO'
const CREATE_TODO = 'todoReducer/CREATE_TODO'
const UPDATE_TODO = 'todoReducer/UPDATE_TODO'
const ON_TITLE_CHANGE = 'todoReducer/ON_TITLE_CHANGE'
const ON_TITLE_EDIT_CHANGE = 'todoReducer/ON_TITLE_EDIT_CHANGE'

let initialState = {
    todosArr: [],
    newTodoText: 'text',
    editTodoText: 'edit text',
    totalTodosCount: 200,
}


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS: {
            debugger
            return {
                ...state,
                todosArr: [...action.todosArr],
                totalTodosCount: state.todosArr.length
            }
        }
        case DELETE_TODO: {
            // debugger
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr],
                totalTodosCount: state.todosArr.length
            }
            let neededIndex = stateCopy.todosArr.findIndex(t => t.id === action.id);
            stateCopy.todosArr.splice(neededIndex, 1);
            stateCopy.totalTodosCount = stateCopy.totalTodosCount - 1;
            return stateCopy;
        }
        case CREATE_TODO: {
            // debugger
            let newTodo = {
                userId: 1,
                id: state.todosArr.length + 1,
                title: action.title
            }
            return {
                ...state,
                todosArr: [...state.todosArr, newTodo],
                totalTodosCount: action.totalTodosCount + 1
            }
        }
        case UPDATE_TODO: {
            // debugger
            let neededIndex = state.todosArr.findIndex(t => t.id === action.id);
            let stateCopy = {
                ...state,
                todosArr: [...state.todosArr]
            }
            stateCopy.todosArr[neededIndex] = {...state.todosArr[neededIndex]}
            // debugger
            stateCopy.todosArr[neededIndex].title = action.title;
            // debugger
            return stateCopy;
        }
        case ON_TITLE_CHANGE: {
            // debugger
            return {
                ...state,
                todosArr: [...state.todosArr],
                newTodoText: action.title
            }
        }
        case ON_TITLE_EDIT_CHANGE: {
            // debugger
            return {
                ...state,
                todosArr: [...state.todosArr],
                editTodoText: action.title
            }
        }
        default: 
        return state;
    }
}

export const setTodos = (todosArr) => ({type: SET_TODOS, todosArr})
export const deleteTodo = (id) => ({type: DELETE_TODO, id})
export const createTodo = (title, totalTodosCount) => ({type: CREATE_TODO, title, totalTodosCount})
export const updateTodo = (title, id) => ({type: UPDATE_TODO, title, id})
export const onTitleChangeAC = (title) => ({type: ON_TITLE_CHANGE, title})
export const onTitleEditChangeAC = (title) => ({type: ON_TITLE_EDIT_CHANGE, title})


export const setTodosTC = () => async (dispatch) => {
    // debugger
    const todosArr = await todoAPI.setTodos();
    dispatch(setTodos(todosArr))
}
export const deleteTodoTC = (id) => async (dispatch) => {
    // debugger
    const response = await todoAPI.deleteTodo(id);
    response === {}
    ? dispatch(deleteTodo(id))
    : dispatch(deleteTodo(id))
}
export const createTodoTC = (title, totalTodosCount) => async (dispatch) => {
    // debugger
    const response = await todoAPI.createTodo(title, totalTodosCount);
    response === {}
    ? dispatch(createTodo(title, totalTodosCount))
    : dispatch(createTodo(title, totalTodosCount))
}
export const updateTodoTC = (title, id) => async (dispatch) => {
    // debugger
    const response = await todoAPI.updateTodo(title, id);
    response === {}
    ? dispatch(updateTodo(title, id))
    : dispatch(updateTodo(title, id))
}


export default todoReducer;