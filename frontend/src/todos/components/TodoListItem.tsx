import { TextField, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSetTodos } from '../api/useSetTodos'

export const TodoListItem = ({ name, index, listId, todos }: { name: string, index: number, listId: string, todos: string[] }) => {
    const { mutate: setTodos, isPending } = useSetTodos(listId)

    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ margin: '8px' }} variant='h6'>
            {index + 1}
        </Typography>
        <TextField
            sx={{ flexGrow: 1, marginTop: '1rem' }}
            label='What to do?'
            value={name}
            disabled={isPending}
            onChange={(event) => {
                setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1),
                ])
            }}
        />
        <Button
            sx={{ margin: '8px' }}
            size='small'
            color='secondary'
            disabled={isPending}
            onClick={() => {
                setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                ])
            }}
        >
            <DeleteIcon />
        </Button>
    </div>
}