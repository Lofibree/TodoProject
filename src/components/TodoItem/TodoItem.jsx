import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoTC, onTitleEditChangeAC, updateTodoTC } from '../../redux/todoReducer';
import s from '../TodoItem/TodoItem.module.css'
import { Form, Field } from 'react-final-form'
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { getAuth } from 'firebase/auth';
// import { database } from '../../firebase/firebase';

const TodoItem = (props) => {

    const auth = getAuth()
    const database = getDatabase();
    // const [editTitle, setEditTitle] = useState(props.title)
    const [tempUidd, setTempUidd] = useState()
    const [isEdit, setIsEdit] = useState(false)

    const handleDeleteTodo = (uid) => {
        const todoRef = `/${auth.currentUser.uid}/${uid}`;
        console.log(todoRef)
        remove(ref(database, todoRef))
    }

    const titleUpdateInit = () => {
        setIsEdit(true)
        setTempUidd(props.uid)
    }
    const handleTitleUpdate = (formData) => {
        const database = getDatabase();
        const todoRef = `/${auth.currentUser.uid}/${props.uid}`;
        update(ref(database, todoRef), {
            title: formData.editTitle,
        })
    }
    return (
        <div className={s.todoItem}>
            <div>{props.title}</div>
            <button onClick={() => handleDeleteTodo(props.uid)}>Delete</button>
            <button type='button' onClick={titleUpdateInit} >Edit</button>
            {isEdit
                ?
                <TodoItemForm handleTitleUpdate={handleTitleUpdate} />
                : <div>dfgdfgdf</div>
            }
        </div>
    );
};



const TodoItemForm = (props) => {
    return (
        <Form
            onSubmit={(values) => {
                props.handleTitleUpdate(values)
            }}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={handleSubmit}>
                        <Field name='editTitle' type='text' placeholder='edit title' component='input' />
                        <button>Confirm edit</button>
                    </form>
                )
            }}
        >
        </Form>
    )
}




export default TodoItem;