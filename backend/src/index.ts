import express from 'express'
import cors from 'cors'
import { currentState } from './state'

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

todoListRouter.put('/:id/todos', async (req, res) => {
    const list = currentState.listsState[req.params.id];
    if (!list) {
        throw Error('List does not exist')
    }

    list.todos = await req.body
    res.send()
})

app.use('/todo-lists', todoListRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
