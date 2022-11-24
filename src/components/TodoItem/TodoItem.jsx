import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoTC, updateTodoTC } from '../../redux/todoReducer';
import s from '../TodoItem/TodoItem.module.css'
import { Form, Field } from 'react-final-form'

const TodoItem = (props) => {

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)

    const handleDeleteTodo = (uid) => {
        dispatch(deleteTodoTC(uid))
    }
    const titleUpdateInit = () => {
        // debugger
        console.log(isEdit)
        setIsEdit(false)
        console.log(isEdit)
    }
    const handleTitleUpdate = (formData) => {
        dispatch(updateTodoTC(formData, props.uid))
    }
    return (
        <div className={s.todoItem}>
            <div>Заголовок: {props.title}</div>
            {/* <div>Id: {props.uid}</div> */}
            <div>
                <button onClick={() => handleDeleteTodo(props.uid)}>Delete</button>
                <button onClick={() => setIsEdit(true)} >Edit</button>
                {isEdit
                    ? <TodoItemForm handleTitleUpdate={handleTitleUpdate} />
                    : <div>dfgdfgdf</div>
                }
            </div>
        </div>
    );
};



const TodoItemForm = (props) => {
    return (
        <Form
            onSubmit={(values) => {props.handleTitleUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={event => {
                        handleSubmit(event)
                    }}>
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