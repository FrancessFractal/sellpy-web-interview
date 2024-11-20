import { useMutation } from "@tanstack/react-query"
import { currentState } from "./state"

// Simulate network
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


export const useSetTodos = (listId: string) => {

    return useMutation({
        mutationKey: ['useSetTodos', listId],
        mutationFn: async (value: string[]) => {
            return sleep(1000).then(() => {
                if (!currentState[listId]) {
                    throw Error(`List ${listId} does not exist`)
                }

                currentState[listId].todos = value;
                Promise.resolve()
            })
        }
    })
}
