import React, { useEffect } from 'react';
import { useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Form, Field } from 'react-final-form'
import { uid } from 'uid';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../../redux/todoReducer';

const Todos = () => {

  const auth = getAuth()
  const [todosList, setTodosList] = useState([])
  const [todo, setTodo] = useState([])
  // const dispatch = useDispatch();
  // const todosArr = useSelector(state => state.todoPage.todosArr)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUpdatedTodoList()
        // dispatch(setTodos(todosList))
      }
    })
  }, [])
  const todosListRef = `/${auth.currentUser.uid}`;
  console.log(auth.currentUser.uid)

  const getUpdatedTodoList = () => {
    try {
      const database = getDatabase();
      const todoListUpdateRef = ref(database, todosListRef)
      onValue(todoListUpdateRef, (snapshot) => {
        setTodosList([])
        let data = snapshot.val();
        if (data) {
          Object.values(data).map(todo => {
            setTodosList((oldArray) => [...oldArray, todo])
          })
        }
        console.log(todosList)
        console.log(Object.values(data))
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateTodo = (formData) => {
    try {
      let userUid = auth.currentUser.uid
      let uidd = uid();
      const database = getDatabase();
      const todoRef = `${userUid}/${uidd}`;
      set(ref(database, todoRef), {
        uid: uidd,
        title: formData.newTodoTitle,
        description: formData.newTodoDescription,
        timeAmount: formData.newTodoTime
      })
      console.log('success')
    } catch (err) {
      console.log(err)
    }
  }
  
  const todosEl = todosList.map(t => <TodoItem
    title={t.title}
    uid={t.uid}
    description={t.description}
    timeAmount={t.timeAmount}
  />)

  return (
    <div>
      <Form
        onSubmit={(values) => {
          handleCreateTodo(values)
        }}
        render={renderProps => {
          const { handleSubmit } = renderProps;
          return (
            <form onSubmit={handleSubmit}>
              <Field name='newTodoTitle' type='text' placeholder='new todo title' component='input' />
              <Field name='newTodoDescription' type='text' placeholder='new todo describtion' component='textarea' />
              <Field name='newTodoTime' type='time' placeholder='new todo describtion' component='input' />
              <button type='submit'>Create</button>
            </form>
          )
        }}
      >
      </Form>
      {todosEl}
    </div>
  );
};

export default Todos;