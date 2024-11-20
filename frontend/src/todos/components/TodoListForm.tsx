import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { TodoListType } from '../models/TodoList'
import { TodoListItem } from './TodoListItem'
import { useAddTodoItem } from '../api/useAddTodoItem'
import { useCallback, type MouseEventHandler } from 'react'
import { useGetTodoListItems } from '../api/useGetTodoListItems'

export const TodoListForm = ({ todoList }: {
  todoList: TodoListType,
}) => {
  const { data: todos, isLoading, isError } = useGetTodoListItems(todoList.id);
  const { mutate: addTodo, isPending } = useAddTodoItem(todoList.id)
  const addTodoHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => addTodo(), [addTodo])


  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {isLoading ? 'Loading' : isError ? 'Error' : todos?.map((name, index) => (
            <TodoListItem key={index} name={name} index={index} listId={todoList.id} />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              disabled={isPending}
              onClick={addTodoHandler}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
