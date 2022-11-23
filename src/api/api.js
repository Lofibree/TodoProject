import axios from 'axios'

const instanceJSONPLACE = axios.create({
    withCredentials: true,
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const todoAPI = {
    async setTodos() {
        const response = await instanceJSONPLACE.get('todos');
        return response.data;
    },
    async deleteTodo(id) {
        // debugger;
        const response = await instanceJSONPLACE.delete(`todos/${id}`);
        // debugger;
        return response.data;
    },
    async createTodo(title, totalTodosCount) {
        // debugger;
        let todoData = {
            userId: 1,
            id: totalTodosCount + 1,
            title: title,
            completed: false
        }
        const response = await instanceJSONPLACE.post(`todos`, todoData);
        // debugger;
        return response.data;
    },
    async updateTodo(title, id) {
        // debugger;
        let todoData = {
            title: title,
        }
        const response = await instanceJSONPLACE.put(`todos/${id}`, todoData);
        // debugger;
        return response.data;
    },
}