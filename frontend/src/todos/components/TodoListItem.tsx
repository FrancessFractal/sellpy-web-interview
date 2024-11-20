import { TextField, Button, Typography, debounce, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useUpdateTodoListItemText } from '../api/useUpdateTodoListItemText'
import { useDeleteTodoItem } from '../api/useDeleteTodoItem'
import { useCallback, useMemo, useState, type ChangeEventHandler, type MouseEventHandler } from 'react'
import type { TodoListItemType } from '../models/TodoListItem'
import { useChangeTodoListItemCompletion } from '../api/useChangeTodoListItemCompletion'

export const TodoListItem = ({ todoItem, index, listId }: { todoItem: TodoListItemType, index: number, listId: string }) => {
    const { mutate: changeTodoListItemCompletion, isPending: checkboxPending } = useChangeTodoListItemCompletion(listId, todoItem.id)
    const changeCompletionHandler: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
        changeTodoListItemCompletion(!todoItem.completed)
    }, [changeTodoListItemCompletion, todoItem.completed])

    const { mutate: updateTodoListItem } = useUpdateTodoListItemText(listId, todoItem.id)
    const [text, setText] = useState<string>(todoItem.text);
    const debouncedUpdate = useMemo(() => debounce(updateTodoListItem, 300), [updateTodoListItem])
    const updateTodoListItemHandler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setText(event.target.value)
        debouncedUpdate(event.target.value)
    }, [debouncedUpdate]);

    const { mutate: deleteTodoItem, isPending: deletePending } = useDeleteTodoItem(listId, todoItem.id);
    const deleteTodoItemHandler: MouseEventHandler = useCallback(() => {
        deleteTodoItem()
    }, [deleteTodoItem]);

    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ margin: '8px' }} variant='h6'>
            {index + 1}
        </Typography>
        <Checkbox disabled={checkboxPending} checked={todoItem.completed} onChange={changeCompletionHandler} />
        <TextField
            sx={{ flexGrow: 1, marginTop: '1rem' }}
            label='What to do?'
            value={text}
            onChange={updateTodoListItemHandler}
        />
        <Button
            sx={{ margin: '8px' }}
            size='small'
            color='secondary'
            disabled={deletePending}
            onClick={deleteTodoItemHandler}
        >
            <DeleteIcon />
        </Button>
    </div>
}