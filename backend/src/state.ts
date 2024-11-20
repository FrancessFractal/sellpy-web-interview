// temporary local state to use before we move this to BE

import type { TodoListType } from "./models/TodoList";

const listsState: { [listId: string]: TodoListType } = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: {
            '286dc217-9617-4043-b17e-8214555595f8': {
                id: '286dc217-9617-4043-b17e-8214555595f8',
                text: 'First todo of first list!',
                completed: false,
            },
        },
    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: {
            'e3399fb1-19e7-4309-8570-079b0e8bf61c': {
                id: 'e3399fb1-19e7-4309-8570-079b0e8bf61c',
                text: 'First todo of second list!',
                completed: false,
            }
        },
    },
};

export const currentState = {
    listsState,
}