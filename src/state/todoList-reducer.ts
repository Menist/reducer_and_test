import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

export let todolistId1 = v1();
export let todolistId2 = v1();

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type DeletedTaskACType = ReturnType<typeof deletedTodoListAC>



type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType |DeletedTaskACType

const initialState: TodolistType[] = [
  {id: todolistId1, title: "What to learn", filter: "all"},
  {id: todolistId2, title: "What to buy", filter: "all"}
]


export const todoListReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter(el => el.id !== action.payload.todoListId)
    }
    case 'ADD_TODOLIST': {
      const newTodo: TodolistType = {id: action.payload.todolistIdForNewKey, title: action.payload.newTodolistTitle, filter: "all"}
      return [...state, newTodo]
    }
    case "CHANGE_TODOLIST_TITLE": {
      return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
    }
    case "CHANGE_TODOLIST_FILTER": {
      return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
    }

    default:
      return state
  }
}

export const deletedTodoListAC = (todoListId: string) => {
  return {
    type: 'DELL_TODOLIST',
    payload: {todoListId}
  }as const
}
export const removeTodolistAC = (todoListId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    payload: {todoListId}
  } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
  return {
    type: 'ADD_TODOLIST',
    payload: {newTodolistTitle, todolistIdForNewKey: v1()}
  } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {title, todolistId}
  } as const
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    payload: {filter, todolistId}
  } as const
}

