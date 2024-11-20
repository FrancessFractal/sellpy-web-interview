import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetTodoListsQueryKey } from "./useGetTodoLists"
import { GetTodoListsItemsQueryKey, useGetTodoListItems } from "./useGetTodoListItems"
import { API_URI } from "../../config"


export const useChangeTodoListItemCompletion = (listId: string, todoId: string) => {
    const queryClient = useQueryClient()
    const { data: currentTodos, isLoading, isError } = useGetTodoListItems(listId);

    return useMutation({
        mutationKey: ['useUpdateTodoListItem', listId],
        mutationFn: async (value: boolean) => {
            if (isError || isLoading || !currentTodos) {
                throw Error('Could not add todo item')
            }

            const response = await fetch(`${API_URI}/todo-lists/${listId}/todos/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: value
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
