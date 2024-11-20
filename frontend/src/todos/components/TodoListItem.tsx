import { TextField, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useUpdateTodoListItem } from '../api/useUpdateTodoListItem'
import { useDeleteTodoItem } from '../api/useDeleteTodoItem'
import { useCallback, type ChangeEventHandler, type MouseEventHandler } from 'react'

export const TodoListItem = ({ name, index, listId }: { name: string, index: number, listId: string }) => {
    const { mutate: updateTodoListItem, isPending: updatePending } = useUpdateTodoListItem(listId, index)
    const { mutate: deleteTodoItem, isPending: deletePending } = useDeleteTodoItem(listId, index);
    const isPending = updatePending || deletePending;

    const updateTodoListItemHandler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        updateTodoListItem(event.target.value)
    }, [updateTodoListItem]);
    const deleteTodoItemHandler: MouseEventHandler = useCallback(() => {
        deleteTodoItem()
    }, [deleteTodoItem]);

    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ margin: '8px' }} variant='h6'>
            {index + 1}
        </Typography>
        <TextField
            sx={{ flexGrow: 1, marginTop: '1rem' }}
            label='What to do?'
            value={name}
            disabled={isPending}
            onChange={updateTodoListItemHandler}
        />
        <Button
            sx={{ margin: '8px' }}
            size='small'
            color='secondary'
            disabled={isPending}
            onClick={deleteTodoItemHandler}
        >
            <DeleteIcon />
        </Button>
    </div>
}