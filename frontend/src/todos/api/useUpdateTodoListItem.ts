import { useMutation, useQueryClient } from "@tanstack/react-query"
import { currentState } from "./state"
import { GetTodoListsQueryKey } from "./useGetTodoLists"

// Simulate network
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


export const useUpdateTodoListItem = (listId: string, index: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['useUpdateTodoListItem', listId],
        mutationFn: async (value: string) => {
            return sleep(2000).then(() => {
                if (!currentState[listId]) {
                    throw Error(`List ${listId} does not exist`)
                }

                currentState[listId].todos = [
                    // immutable update
                    ...currentState[listId].todos.slice(0, index),
                    value,
                    ...currentState[listId].todos.slice(index + 1),
                ];
                Promise.resolve()
            })
        },
        scope: {
            id: 'useSetTodos'
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GetTodoListsQueryKey() })
        }
    })
}
