import type { TodoListItemType } from "./TodoListItem"

export type TodoListType = {
    id: string,
    title: string,
    todos: {
        [listItemId: string]: TodoListItemType
    }
}