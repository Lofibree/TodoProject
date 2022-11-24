import React, { useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Form, Field } from 'react-final-form'
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { createTodoTC, setTodosTC } from '../../redux/todoReducer';
import s from './Todos.module.css'

const Todos = () => {

  const dispatch = useDispatch();
  const todosArr = useSelector(state => state.todoPage.todosArr)

  useEffect(() => {
    dispatch(setTodosTC())
  }, [])

  const handleCreateTodo = (formData) => {
    const { newTodoTitle, newTodoDescription, newTodoTime } = formData
    dispatch(createTodoTC(newTodoTitle, newTodoDescription, newTodoTime))

  }

  const todosEl = todosArr.map(t => <TodoItem
    uid={t.uid}
    title={t.title}
    description={t.description}
    date={t.date}
    isCompleted={t.isCompleted}
    filesUrl={t.filesUrl}
  />)
    console.log(todosArr)
  return (
    <div className={s.todosBox} >
      <Form
        onSubmit={values => handleCreateTodo(values)}
        initialValues={{ employed: true }}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form
            onSubmit={event => {
              handleSubmit(event);
            }}
            className={s.form}
          >
            <div>
              <div>Заголовок</div>
              <Field name='newTodoTitle' type='text' placeholder='new todo title' component='input' className={s.field} />
            </div>
            <div>
              <div>Описание</div>
              <Field name='newTodoDescription' type='text' placeholder='new todo describtion' component='textarea' className={s.field} />
            </div>
            <div>
              <div>Дата завершения</div>
              <Field name='newTodoTime' type='date' placeholder='new todo describtion' component='input' className={s.field} />
            </div>
            <button type='submit'>Create</button>
          </form>
        )}
      >
      </Form>
      <div>
        <div> You have {todosArr.length} todos</div>
        <div>{todosEl}</div>
      </div>
    </div>
  );
};

export default Todos;