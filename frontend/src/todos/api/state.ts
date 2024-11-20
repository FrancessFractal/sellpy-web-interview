// temporary local state to use before we move this to BE

import type { TodoListType } from "../models/TodoList";

export const currentState: { [listId: string]: TodoListType } = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: ['First todo of first list!'],
    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: ['First todo of second list!'],
    },
};