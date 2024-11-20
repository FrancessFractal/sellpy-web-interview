
import { useQuery } from '@tanstack/react-query'
import { GetTodoListsQueryKey, useGetTodoLists } from './useGetTodoLists'

export const GetTodoListsItemsQueryKey = (listId: string) => [...GetTodoListsQueryKey(), 'useGetTodoListItems', listId]

export const useGetTodoListItems = (listId: string) => {
    const { data: todoLists, isLoading, isError } = useGetTodoLists();

    return useQuery<string[]>({
        queryKey: GetTodoListsItemsQueryKey(listId),
        queryFn: () => {
            if (isError || !todoLists) {
                throw Error('could not load todo lists')
            }
            if (!todoLists[listId]) {
                throw Error(`List ${listId} does not exist`)
            }
            return Promise.resolve(todoLists[listId].todos)
        },
        enabled: !isLoading
    })
}

