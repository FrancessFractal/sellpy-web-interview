import express from 'express'
import cors from 'cors'
import { currentState } from './state'
import { v4 as uuidV4 } from 'uuid';

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

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
        res.status(400).send({ error: 'List does not exist' })
        return
    }

    res.send({ data: Object.values(list.todos) })
})

todoListRouter.post('/:id/todos/new', async (req, res) => {
    const list = currentState.listsState[req.params.id];
    if (!list) {
        res.status(400).send({ error: 'List does not exist' })
        return
    }

    const id = uuidV4()

    list.todos = {
        ...list.todos,
        [id]: {
            id,
            text: '',
            completed: false,
        }
    }
    res.send()
})
todoListRouter.delete('/:listid/todos/:todoid', async (req, res) => {
    const list = currentState.listsState[req.params.listid];
    if (!list) {
        res.status(400).send({ error: 'List does not exist' })
        return
    }

    delete list.todos[req.params.todoid]
    res.send()
})
todoListRouter.patch('/:listId/todos/:todoId', async (req, res) => {
    const list = currentState.listsState[req.params.listId];
    if (!list) {
        res.status(400).send({ error: 'List does not exist' })
        return
    }

    const todo = list.todos[req.params.todoId]
    if (!todo) {
        res.status(400).send({ error: 'Todo does not exist' })
        return
    }

    todo.text = req.body.text ?? todo.text
    todo.completed = req.body.completed ?? todo.completed

    res.send()
})

app.use('/todo-lists', todoListRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
