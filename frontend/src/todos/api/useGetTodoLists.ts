
import { useQuery } from '@tanstack/react-query'
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
        })
    )
}

export const useGetTodoLists = () => {
    return useQuery<TTodoLists>({
        queryKey: ['getTodoLists'],
        queryFn: fetchTodoLists
    })
}

