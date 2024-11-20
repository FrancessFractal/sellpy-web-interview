import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { TodoListType } from '../models/TodoList'
import { useSetTodos } from '../api/useSetTodos'
import { TodoListItem } from './TodoListItem'

export const TodoListForm = ({ todoList }: {
  todoList: TodoListType,
}) => {
  const { mutate: setTodos, isPending } = useSetTodos(todoList.id)

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todoList.todos.map((name, index) => (
            <TodoListItem key={index} name={name} index={index} listId={todoList.id} todos={todoList.todos} />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              disabled={isPending}
              onClick={() => {
                setTodos([...todoList.todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
