import React, { Fragment, useState, type CSSProperties } from 'react'
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

  const [activeList, setActiveList] = useState<string>()

  // todo: I would normally ask for a design for these. assuming this is fine for scope of the test
  if (isError) {
    return 'Error'
  }

  if (isLoading) {
    return 'Loading'
  }

  // fixme: why isn't ts helping here like it should?
  if (!todoLists || !Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key]?.title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            // todo save todo lists
          }}
        />
      )}
    </Fragment>
  )
}
