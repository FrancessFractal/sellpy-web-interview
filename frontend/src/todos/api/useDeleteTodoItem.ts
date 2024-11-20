import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetTodoListsQueryKey } from "./useGetTodoLists"
import { GetTodoListsItemsQueryKey } from "./useGetTodoListItems"
import { API_URI } from "../../config"

export const useDeleteTodoItem = (listId: string, todoId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['useDeleteTodoItem', listId],
        mutationFn: async () => {
            const response = await fetch(`${API_URI}/todo-lists/${listId}/todos/${todoId}`, {
                method: 'DELETE',
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
