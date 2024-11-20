import React, { Fragment, useState, type CSSProperties, useMemo } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { useGetTodoLists } from '../api/useGetTodoLists'

export const TodoLists = ({ style }: { style: CSSProperties }) => {
  const { data: todoLists, isError, isLoading } = useGetTodoLists()

  const [activeListId, setActiveListId] = useState<string>()
  const activeList = useMemo(() => todoLists && activeListId && todoLists[activeListId], [todoLists, activeListId])

  // todo: I would normally ask for a design for these. assuming this is fine for scope of the test
  if (isError) {
    return 'Error'
  }

  if (isLoading) {
    return 'Loading'
  }

  if (!todoLists || !Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveListId(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key]?.title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && (
        <TodoListForm
          todoList={activeList}
        />
      )}
    </Fragment>
  )
}
