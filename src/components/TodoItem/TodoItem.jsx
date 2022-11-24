import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoTC, updateTodoTC } from '../../redux/todoReducer';
import s from '../TodoItem/TodoItem.module.css'
import { Form, Field } from 'react-final-form'
import Upload from '../Upload/Upload';

const TodoItem = (props) => {

    const dispatch = useDispatch();
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isEditIsCompleted, setIsEditIsCompleted] = useState(false)

    // DELETE
    const handleDeleteTodo = (uid) => {
        dispatch(deleteTodoTC(uid))
    }
    // EDIT TITLE
    const titleUpdateInit = () => {
        setIsEditTitle(true)
    }
    // EDIT DESCRIPTION
    const descriptionUpdateInit = () => {
        setIsEditDescription(true)
    }
    const handleSubmit = (formData) => {
        if (formData.editTitle) { // EDIT TITLE
            setIsEditTitle(false)
        } else if (formData.editDescription) { // EDIT DESCRIPTION
            setIsEditDescription(false)
        } else if (formData.editIsCompleted !== (null || undefined)) { // EDIT ISCOMPLETED
            setIsEditIsCompleted(false)
        }
        dispatch(updateTodoTC(formData, props.uid))
    }
    return (
        <div className={s.todoItem}>
            <div className={s.header} >
                <div>Заголовок: {props.title}</div>
                <div>
                    {isEditTitle
                        ? <TodoItemEditTitleForm handleTitleUpdate={handleSubmit} />
                        : <button onClick={titleUpdateInit} >Edit Title</button>
                    }
                </div>
                <div>{props.date}</div>
            </div>
            <div className={s.main}>
                <div>
                    <div>{props.isCompleted ? 'Completed' : 'Not Completed'}</div>
                    <TodoItemEditIsCompletedForm handleIsCompletedUpdate={handleSubmit} />
                </div>
                <div className={s.todoBody}>
                    <div>
                        <div className={s.description}>{props.description}</div>
                        <div>
                            {isEditDescription
                                ? <TodoItemEditDescriptionForm handleDescriptionUpdate={handleSubmit} />
                                : <button onClick={descriptionUpdateInit} >Edit Description</button>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => handleDeleteTodo(props.uid)}>Delete</button>
                    <Upload uid={props.uid} filesUrl={props.filesUrl} />
                </div>
            </div>
        </div>
    );
};



const TodoItemEditTitleForm = (props) => {
    return (
        <Form onSubmit={(values) => {props.handleTitleUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={handleSubmit}>
                        <Field name='editTitle' type='text' placeholder='edit title' component='input' />
                        <button>Confirm edit Title</button>
                    </form>
                )}}
        ></Form>
    )
}
const TodoItemEditDescriptionForm = (props) => {
    return (
        <Form onSubmit={(values) => {props.handleDescriptionUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={event => {handleSubmit(event)}}>
                        <Field name='editDescription' type='text' placeholder='edit description' component='textarea' />
                        <button>Confirm edit Description</button>
                    </form>
                )}}
        ></Form>
    )
}
const TodoItemEditIsCompletedForm = (props) => {
    return (
        <Form onSubmit={(values) => {props.handleIsCompletedUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={event => {handleSubmit(event)}}>
                        <Field name='editIsCompleted' type="checkbox" component='input' />
                        <button>Confirm edit Completed</button>
                    </form>
                )}}
        ></Form>
    )
}





export default TodoItem;