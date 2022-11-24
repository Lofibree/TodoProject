import { Form, Field } from 'react-final-form'


export const TodoItemEditTitleForm = (props) => {
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
export const TodoItemEditDescriptionForm = (props) => {
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
export const TodoItemEditIsCompletedForm = (props) => {
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
