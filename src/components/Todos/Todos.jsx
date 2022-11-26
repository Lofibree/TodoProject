import React, { useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux';
import { createTodoTC, setTodosTC, isCreatingTodoAC } from '../../redux/todoReducer';
import s from './Todos.module.css'
import Preloader from '../common/Preloader';

const Todos = () => {

  const dispatch = useDispatch();
  const todosArr = useSelector(state => state.todoPage.todosArr)
  const isCreatingTodo = useSelector(state => state.todoPage.isCreatingTodo)

  useEffect(() => {
    dispatch(setTodosTC())
  }, [])

  const handleCreateTodo = (formData) => {
    if (Object.keys(formData).length !== 0) {
      const { newTodoTitle, newTodoDescription, newTodoTime } = formData
      dispatch(createTodoTC(newTodoTitle, newTodoDescription, newTodoTime))
    }
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
      <div className={s.title} >Ваши задачи</div>
      <CreateTodoForm handleCreateTodo={handleCreateTodo} />
      <div>
        <div>Всего задач: {todosArr.length}</div>
        <div>
          {isCreatingTodo
            ? <>Loading, please wait <div><Preloader /></div></>
            : <>{ todosEl }</>
          }
        </div>
      </div>
    </div>
  );
};



const CreateTodoForm = (props) => {
  return (
    <Form
      onSubmit={values => props.handleCreateTodo(values)}
      render={({ handleSubmit }) => (
        <form
          onSubmit={event => { handleSubmit(event) }}
          className={s.form}
        >
          <div className={s.formTitle} >Создать новую задачу</div>
          <div>
            <div>Заголовок</div>
            <Field name='newTodoTitle' type='text' placeholder='заголовок' component='input' className={s.field} />
          </div>
          <div>
            <div>Описание</div>
            <Field name='newTodoDescription' type='text' placeholder='описание' component='textarea' className={s.field} />
          </div>
          <div>
            <div>Дата завершения</div>
            <Field name='newTodoTime' type='date' component='input' className={s.field} />
          </div>
          <button type='submit'>Создать</button>
        </form>
      )}
    >
    </Form>
  )
}




export default Todos;