import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URI } from "../../config"
import { GetTodoListsItemsQueryKey, useGetTodoListItems } from "./useGetTodoListItems"
import { GetTodoListsQueryKey } from "./useGetTodoLists"


export const useAddTodoItem = (listId: string) => {
    const queryClient = useQueryClient()
    const { data: currentTodos, isLoading, isError } = useGetTodoListItems(listId);

    return useMutation({
        mutationKey: ['useAddTodoItem', listId],
        mutationFn: async () => {
            if (isError || isLoading || !currentTodos) {
                throw Error('Could not add todo item')
            }

            const response = await fetch(`${API_URI}/todo-lists/${listId}/todos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([...currentTodos, ''])
            });

            if (!response.ok) {
                throw Error('Could not add todo item')
            }
        },
        scope: {
            id: 'useSetTodos'
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GetTodoListsItemsQueryKey(listId) })
            queryClient.invalidateQueries({ queryKey: GetTodoListsQueryKey() })
        },
    })
}
