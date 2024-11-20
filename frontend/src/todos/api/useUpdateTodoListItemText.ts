import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetTodoListsQueryKey } from "./useGetTodoLists"
import { GetTodoListsItemsQueryKey } from "./useGetTodoListItems"
import { API_URI } from "../../config"


export const useUpdateTodoListItemText = (listId: string, todoId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['useUpdateTodoListItem', listId],
        mutationFn: async (value: string) => {
            const response = await fetch(`${API_URI}/todo-lists/${listId}/todos/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: value
                })
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
