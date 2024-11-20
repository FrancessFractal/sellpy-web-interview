
import { useQuery } from '@tanstack/react-query'
import type { TodoListType } from '../models/TodoList'
import { API_URI } from '../../config'

type TTodoLists = {
    [listId: string]: TodoListType
}

export const GetTodoListsQueryKey = () => ['useGetTodoLists']

export const useGetTodoLists = () => {
    return useQuery<TTodoLists>({
        queryKey: GetTodoListsQueryKey(),
        queryFn: async () => {
            const response = await fetch(`${API_URI}/todo-lists`);

            if (!response.ok) {
                throw new Error(`${response.status}`)
            }

            const responseBody = await response.json()

            // todo would be best to do more data sanitization here, but considering oos for this test         
            if (!responseBody.data) {
                throw Error('Bad api response')
            }

            return responseBody.data
        }
    })
}

