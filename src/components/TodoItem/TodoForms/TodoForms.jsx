import { Form, Field } from 'react-final-form'
import s from './TodoForms.module.css'

export const TodoItemEditTitleForm = (props) => {
    return (
        <Form onSubmit={(values) => {props.handleTitleUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={handleSubmit}>
                        <Field name='editTitle' type='text' placeholder='edit title' component='input' />
                        <button>Подтвердить изменение</button>
                    </form>
                )}}
        ></Form>
    )
}
export const TodoItemEditDescriptionForm = (props) => {
    return (
        <Form onSubmit={(values) => {props.handleDescriptionUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={event => {handleSubmit(event)}} className={s.description} >
                        <Field name='editDescription' type='text' placeholder='edit description' component='textarea' />
                        <button>Подтвердить изменение</button>
                    </form>
                )}}
        ></Form>
    )
}
export const TodoItemEditIsCompletedForm = (props) => {
    return (
        <Form onSubmit={(values) => {props.handleIsCompletedUpdate(values)}}
            render={renderProps => {
                const { handleSubmit } = renderProps;
                return (
                    <form onSubmit={event => {handleSubmit(event)}}>
                        <div>Завершить задачу</div>
                        <Field name='editIsCompleted' type="checkbox" component='input' />
                        <button>Завершить</button>
                    </form>
                )}}
        ></Form>
    )
}
