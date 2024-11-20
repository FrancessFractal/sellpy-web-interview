
export type TodoListType = {
    id: string,
    title: string,
    todos: {
        [listItemId: string]: {
            id: string,
            text: string
        }
    }
}