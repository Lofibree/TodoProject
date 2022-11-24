import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoTC, updateTodoTC } from '../../redux/todoReducer';
import s from '../TodoItem/TodoItem.module.css'
import Upload from '../Upload/Upload';
import { TodoItemEditDescriptionForm, TodoItemEditTitleForm, TodoItemEditIsCompletedForm } from './TodoForms/TodoForms';

const TodoItem = (props) => {

    const dispatch = useDispatch();
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isEditIsCompleted, setIsEditIsCompleted] = useState(false)
    const [styleCompleted, setStyleCompleted] = useState(s.title)

    useEffect(() => {
        if (props.isCompleted) {
            setStyleCompleted(s.title + ' ' + s.active)
        } else { setStyleCompleted(s.title) }
    }, [props.isCompleted])
    // DELETE
    const handleDeleteTodo = (uid) => {
        // debugger
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
                <div className={styleCompleted} >Заголовок: {props.title}</div>
                <div>
                    <div>
                        {isEditTitle
                            ? <TodoItemEditTitleForm handleTitleUpdate={handleSubmit} />
                            : <button onClick={titleUpdateInit} >Edit Title</button>
                        }
                    </div>
                    <div>Deadline: {props.date}</div>
                </div>
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
                        <Upload uid={props.uid} filesUrl={props.filesUrl} />
                    </div>
                </div>
                <div>
                    <button onClick={() => handleDeleteTodo(props.uid)}>Delete Todo</button>
                    {/* <Upload uid={props.uid} filesUrl={props.filesUrl} /> */}
                </div>
            </div>
        </div>
    );
};








export default TodoItem;