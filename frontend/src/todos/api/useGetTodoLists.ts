
import { useQuery } from '@tanstack/react-query'
import type { TodoListType } from '../models/TodoList'
import { currentState } from './state'

// Simulate network
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type TTodoLists = {
    [listId: string]: TodoListType
}

export const useGetTodoLists = () => {
    return useQuery<TTodoLists>({
        queryKey: ['getTodoLists'],
        queryFn: () => {
            return sleep(1000).then(() =>
                Promise.resolve(currentState)
            )
        }
    })
}

