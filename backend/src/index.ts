import express from 'express'
import cors from 'cors'
import { currentState } from './state'
import { v4 as uuidV4 } from 'uuid';

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const todoListRouter = express.Router()
todoListRouter.get('/', (req, res) => {
    res.send({ data: currentState.listsState })
})

todoListRouter.get('/:id', async (req, res) => {
    res.send({ data: currentState.listsState[req.params.id] })
})


todoListRouter.get('/:id/todos', async (req, res) => {
    const list = currentState.listsState[req.params.id];
    if (!list) {
        throw Error('List does not exist')
    }

    res.send({ data: Object.values(list.todos) })
})

todoListRouter.post('/:id/todos/new', async (req, res) => {
    const list = currentState.listsState[req.params.id];
    if (!list) {
        throw Error('List does not exist')
    }

    const id = uuidV4()

    list.todos = {
        ...list.todos,
        [id]: {
            id,
            text: ''
        }
    }
    res.send()
})
todoListRouter.delete('/:listid/todos/:todoid', async (req, res) => {
    const list = currentState.listsState[req.params.listid];
    if (!list) {
        throw Error('List does not exist')
    }

    delete list.todos[req.params.todoid]
    res.send()
})
todoListRouter.patch('/:listId/todos/:todoId', async (req, res) => {
    const list = currentState.listsState[req.params.listId];
    if (!list) {
        throw Error('List does not exist')
    }

    const todo = list.todos[req.params.todoId]
    if (!todo) {
        throw Error('Todo does not exist')
    }

    todo.text = req.body.text ?? todo.text

    res.send()
})

app.use('/todo-lists', todoListRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
