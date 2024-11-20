import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetTodoListsQueryKey } from "./useGetTodoLists"
import { GetTodoListsItemsQueryKey, useGetTodoListItems } from "./useGetTodoListItems"
import { API_URI } from "../../config"


export const useUpdateTodoListItem = (listId: string, index: number) => {
    const queryClient = useQueryClient()
    const { data: currentTodos, isLoading, isError } = useGetTodoListItems(listId);

    return useMutation({
        mutationKey: ['useUpdateTodoListItem', listId],
        mutationFn: async (value: string) => {
            if (isError || isLoading || !currentTodos) {
                throw Error('Could not add todo item')
            }

            const response = await fetch(`${API_URI}/todo-lists/${listId}/todos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([
                    // immutable update
                    ...currentTodos.slice(0, index),
                    value,
                    ...currentTodos.slice(index + 1),
                ])
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
        }
    })
}
