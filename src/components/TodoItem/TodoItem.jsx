import dayjs from 'dayjs';
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
    const [styleCompleted, setStyleCompleted] = useState(s.title)
    const [styleExpired, setStyleExpired] = useState(s.date)
    const [date, setDate] = useState(props.date)

    useEffect(() => {
        if (props.isCompleted) {
            setStyleCompleted(s.title + ' ' + s.active)
        } else { setStyleCompleted(s.title) }

        checkDeadline(props.date)
    }, [props.isCompleted, props.date])

    // CHECK DATE
    /**
     * Сравнивает текущую дату с датой завершения задачи
     * @param {string} date дата завершения задачи
     */
    const checkDeadline = (date) => {
        let now = dayjs().locale('ru').format('YYYY-MM-DD')
        if (now > date) {
            setDate('Просрочено')
            setStyleExpired(s.date + ' ' + s.expired)
        } else if(now === date) {
            setDate('СЕГОДНЯ ПОСЛЕДНИЙ ДЕНЬ!!!')
            setStyleExpired(s.date + ' ' + s.almost)
        } else { setDate(date) }
    }

    // DELETE
    /**
     * Вызывает Thunk для удаления Todo
     * @param {string} uid id Todo'шки
     */
    const handleDeleteTodo = (uid) => {
        // debugger
        if (props.filesUrl) {
            let filesToDelete = Object.values(props.filesUrl)
            dispatch(deleteTodoTC(uid, filesToDelete))
        } else {
            dispatch(deleteTodoTC(uid, []))
        }
    }

    // EDIT TITLE
    const titleUpdateInit = () => {
        setIsEditTitle(true)
    }
    // EDIT DESCRIPTION
    const descriptionUpdateInit = () => {
        setIsEditDescription(true)
    }

    /**
     * Вызывает Thunk для изменения значения поля
     * @param {object} formData данные из формы редактирования поля
     */
    const handleSubmit = (formData) => {
        if (formData.editTitle) { // EDIT TITLE
            setIsEditTitle(false)
        } else if (formData.editDescription) { // EDIT DESCRIPTION
            setIsEditDescription(false)
        } 
        dispatch(updateTodoTC(formData, props.uid))
    }

    return (
        <div className={s.todoItem}>
            <div className={s.header} >
                {props.isCompleted
                    ? <div>
                        <div className={styleCompleted} >{props.title}</div>
                        <div className={s.completedTodo} >Задача завершена</div>
                    </div>
                    : <div>
                        <div>Заголовок:</div>
                        <div className={styleCompleted} >{props.title}</div>
                    </div>
                }
                <div>
                    <div>
                        {isEditTitle
                            ? <>
                                <TodoItemEditTitleForm handleTitleUpdate={handleSubmit} />
                                <button onClick={() => setIsEditTitle(false)}>Отмена</button>
                            </>
                            : <button onClick={titleUpdateInit} >Изменить заголовок</button>
                        }
                    </div>
                    <div className={styleExpired} >Дата завершения: {date}</div>
                </div>
            </div>
            <div className={s.main}>
                <div>
                    <TodoItemEditIsCompletedForm handleIsCompletedUpdate={handleSubmit} />
                </div>
                <div className={s.todoBody}>
                    <div>
                        <div className={s.descriptionBox} >
                            <div className={s.description}>{props.description}</div>
                            <div>
                                {isEditDescription
                                    ? <>
                                        <TodoItemEditDescriptionForm handleDescriptionUpdate={handleSubmit} />
                                        <button onClick={() => setIsEditDescription(false)}>Отмена</button>
                                    </>
                                    : <button onClick={descriptionUpdateInit} >Изменить описание</button>
                                }
                            </div>
                        </div>
                        <Upload uid={props.uid} filesUrl={props.filesUrl} />
                    </div>
                </div>
                <div>
                    <button onClick={() => handleDeleteTodo(props.uid)}>Удалить задачу</button>
                </div>
            </div>
        </div>
    );
};








export default TodoItem;