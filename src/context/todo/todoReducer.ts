import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from "../types";

type TodoType = {
  id: string;
  title: string;
};
export let initialState = {
  todos: [] as Array<TodoType>,
  loading: false as boolean,
  error: null as null | string
};

export type InitialStateType = typeof initialState;

export const todoReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            title: action.title,
          },
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return {
              ...todo,
              title: action.title,
            };
          }
          return todo;
        }),
      };
    case SHOW_LOADER:
      return {
        ...state,
        loading: true
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false
      }; 
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: action.error
      };
    case FETCH_TODOS:
      return {
        ...state, 
        todos: action.todos
      }         
    default:
      return state;
  }
};

export const actionsTodo = {
    addTodo: (title: string, id: string) => {
        return{
            type: ADD_TODO,
            title, id
        } as const
    },
    removeTodo: (id: string) => {
        return{
            type: REMOVE_TODO,
            id
        } as const
    },
    updateTodo: (id: string, title: string) => {
        return {
            type: UPDATE_TODO,
            id,
            title
        } as const
    },
    showLoader: () => {
      return {
        type: SHOW_LOADER
      } as const
    },
    hideLoader: () => {
      return {
        type: HIDE_LOADER
      } as const
    },
    clearError: () => {
      return {
        type: CLEAR_ERROR
      } as const
    },
    showError: (error: string) => {
      return {
        type: SHOW_ERROR,
        error
      } as const
    },
    fetchTodos: (todos: Array<TodoType>) => {
      return {
        type: FETCH_TODOS,
        todos
      } as const
    }
}

type ActionTypes = ReturnType<typeof actionsTodo.addTodo> |
                   ReturnType<typeof actionsTodo.removeTodo> |
                   ReturnType<typeof actionsTodo.updateTodo> |
                   ReturnType<typeof actionsTodo.showLoader> |
                   ReturnType<typeof actionsTodo.hideLoader> |
                   ReturnType<typeof actionsTodo.showError> |
                   ReturnType<typeof actionsTodo.clearError> |
                   ReturnType<typeof actionsTodo.fetchTodos>
