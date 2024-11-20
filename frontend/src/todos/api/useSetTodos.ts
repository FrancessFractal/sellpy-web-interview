import { useMutation } from "@tanstack/react-query"
import { currentState } from "./state"

export const useSetTodos = (listId: string) => {

    return useMutation({
        mutationKey: ['useSetTodos', listId],
        mutationFn: async (value: string[]) => {
            if (!currentState[listId]) {
                throw Error(`List ${listId} does not exist`)
            }

            currentState[listId].todos = value;
        }
    })
}
