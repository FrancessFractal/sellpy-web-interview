import { useMutation, useQueryClient } from "@tanstack/react-query"
import { currentState } from "./state"
import { GetTodoListsQueryKey } from "./useGetTodoLists"

// Simulate network
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


export const useAddTodoItem = (listId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['useAddTodoItem', listId],
        mutationFn: async () => {
            return sleep(2000).then(() => {
                if (!currentState[listId]) {
                    throw Error(`List ${listId} does not exist`)
                }

                currentState[listId].todos = [...currentState[listId].todos, ''];
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
