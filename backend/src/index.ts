import express from 'express'
import cors from 'cors'
import { currentState } from './state'
import { v4 as uuidV4 } from 'uuid';
import { body, matchedData, param, validationResult } from 'express-validator';

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todoListRouter = express.Router()
todoListRouter.get('/', (req, res) => {
    res.send({ data: currentState.listsState })
})

todoListRouter.get('/:listId/todos',
    param('listId').isString().notEmpty(),
    async (req, res) => {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(400).send({ errors: validation.array() })
            return
        }
        const args = matchedData(req)

        const list = currentState.listsState[args.listId];
        if (!list) {
            res.status(404).send({ error: 'List does not exist' })
            return
        }

        res.send({ data: Object.values(list.todos) })
    })

todoListRouter.post('/:listId/todos/new',
    param('listId').isString().notEmpty(),
    async (req, res) => {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(400).send({ errors: validation.array() })
            return
        }
        const args = matchedData(req)
        const list = currentState.listsState[args.listId];
        if (!list) {
            res.status(404).send({ error: 'List does not exist' })
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
todoListRouter.delete('/:listId/todos/:todoId',
    param('listId').isString().notEmpty(),
    param('todoId').isString().notEmpty(),
    async (req, res) => {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(400).send({ errors: validation.array() })
            return
        }
        const args = matchedData(req)
        const list = currentState.listsState[args.listId];
        if (!list) {
            res.status(404).send({ error: 'List does not exist' })
            return
        }

        delete list.todos[args.todoId]
        res.send()
    })
todoListRouter.patch(
    '/:listId/todos/:todoId',
    param('listId').isString().notEmpty(),
    param('todoId').isString().notEmpty(),
    body('text').isString().optional(),
    body('completed').isBoolean().optional(),
    async (req, res) => {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(400).send({ errors: validation.array() })
            return
        }
        const args = matchedData(req)

        const list = currentState.listsState[args.listId];
        if (!list) {
            res.status(404).send({ error: 'List does not exist' })
            return
        }

        const todo = list.todos[args.todoId]
        if (!todo) {
            res.status(404).send({ error: 'Todo does not exist' })
            return
        }

        todo.text = args.text ?? todo.text
        todo.completed = args.completed ?? todo.completed

        res.send()
    })

app.use('/todo-lists', todoListRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
