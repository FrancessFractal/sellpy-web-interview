
import { useQuery } from '@tanstack/react-query'
import { API_URI } from '../../config';
import type { TodoListItemType } from '../models/TodoListItem';

export const GetTodoListsItemsQueryKey = (listId: string) => ['useGetTodoListItems', listId]

export const useGetTodoListItems = (listId: string) => {
    return useQuery<TodoListItemType[]>({
        queryKey: GetTodoListsItemsQueryKey(listId),
        queryFn: async () => {
            const response = await fetch(`${API_URI}/todo-lists/${listId}/todos`);

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

