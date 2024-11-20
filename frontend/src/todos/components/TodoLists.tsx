import React, { Fragment, useState, useEffect, type CSSProperties } from 'react'
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
import type { TodoListType } from '../models/TodoList'

// Simulate network
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type TTodoLists = {
  [listId: string]: TodoListType
}

const fetchTodoLists = (): Promise<TTodoLists> => {
  return sleep(1000).then(() =>
    Promise.resolve({
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: ['First todo of first list!'],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: ['First todo of second list!'],
      },
    } as TTodoLists)
  )
}

export const TodoLists = ({ style }: { style: CSSProperties }) => {
  const [todoLists, setTodoLists] = useState<TTodoLists>({})
  const [activeList, setActiveList] = useState<string>()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
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
            const listToUpdate = todoLists[id]
            if (!listToUpdate) {
              throw Error('List does not exist')
            }
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </Fragment>
  )
}
