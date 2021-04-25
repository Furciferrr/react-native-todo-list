import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { TodoItemType } from "../../../App";
import { ScreenContext } from "../screen/screenContext";
import { TodoContext } from "./todoContext";
import { initialState, todoReducer } from "./todoReducer";
import { actionsTodo }  from './todoReducer';
import { Http } from './../../http'

export const TodoState: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const {changeScreen}= useContext(ScreenContext);
  const url = 'https://rn-todo-app-881d0-default-rtdb.firebaseio.com/todos'
  const addTodo = async (title: string) => {
    clearError()
    try  {
      const data =  await Http.post(`${url}.json`, { title })
      dispatch(actionsTodo.addTodo(title, data.name))
    } catch (e) {
      showError('some error...')
    }
  }
  const removeTodo = (id: string) => {
      const todo = state.todos.find((t: TodoItemType) => t.id === id);
      Alert.alert(
        "Removing Todo",
        `Are you sure you want to remove '${todo?.title}'?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
              changeScreen(null)
              await Http.delete(`${url}/${id}.json`)         
              dispatch(actionsTodo.removeTodo(id)) 
            },
          },
        ],
        { cancelable: true }
      );
  }
  const fetchTodos = async () => {
    clearError()
    try {
      showLoader()
        const data = await Http.get(`${url}.json`)
        const todos = Object.keys(data).map(key => ({ ...data[key], id: key}))
        dispatch(actionsTodo.fetchTodos(todos))
    } catch (e) {
      showError('some error...')
    } finally {
      hideLoader()
    }
  }
  const updateTodo = async (id: string, title: string) => {
    clearError()
    try {
      await Http.patch(`${url}/${id}.json`, { title })
      dispatch(actionsTodo.updateTodo(id, title))
    } catch (e) {
      showError('some error...')
    }
    
  }
  const showLoader = () => {
    dispatch(actionsTodo.showLoader())
  }
  const hideLoader = () => {
    dispatch(actionsTodo.hideLoader())
  }
  const showError = (error: string) => {
    dispatch(actionsTodo.showError(error))
  }
  const clearError = () => {
    dispatch(actionsTodo.clearError())
  }
  return (
    <TodoContext.Provider value={{ 
                              todos: state.todos,
                              loading: state.loading,
                              error: state.error,
                              addTodo, removeTodo, updateTodo, fetchTodos
                             }}>
      {children}
    </TodoContext.Provider>
  );
};
