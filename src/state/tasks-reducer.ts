import {TasksStateType} from "../App";
import {AddTodolistACType, DeletedTaskACType, todolistId1, todolistId2} from "./todoList-reducer";
import {v1} from "uuid";

export const initialState: TasksStateType = {
  [todolistId1]: [
    {id: v1(), title: "CSS", isDone: false},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false}
  ],
  [todolistId2]: [
    {id: v1(), title: "bread", isDone: false},
    {id: v1(), title: "milk", isDone: true},
    {id: v1(), title: "tea", isDone: false}
  ]
};

type RemoveTasksACType = ReturnType<typeof removeTasksAC>
type AddTasksACType = ReturnType<typeof addTasksAC>
type ChangeCheckBoxACType = ReturnType<typeof changeCheckBoxAC>
type ChangeTitleACType = ReturnType<typeof changeTitleAC>


type ActionType =
  RemoveTasksACType
  | AddTasksACType
  | ChangeCheckBoxACType
  | ChangeTitleACType
  | AddTodolistACType
  | DeletedTaskACType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
      }
    }
    case "ADD_TASK": {
      const newTask = {id: v1(), title: action.payload.title, isDone: false}
      return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
    }
    case "CHANGE_CHECKBOX": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {
          ...el,
          isDone: action.payload.isDone
        } : el)
      }
    }
    case "CHANGE_TITLE": {
      return {...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {
          ...el,
          title: action.payload.title
        } : el)
      }
    }
    case "ADD_TODOLIST": {
      return {...state, [action.payload.todolistIdForNewKey]: []}
    }
    case "DELL_TODOLIST":{
      let copyState={...state}
      delete copyState[action.payload.todoListId]
      return copyState
    }
    default:
      return state
  }
}



export const removeTasksAC = (todoListId: string, taskId: string) => {
  return {
    type: 'REMOVE_TASK',
    payload: {todoListId, taskId}
  } as const
}

export const addTasksAC = (todoListId: string, title: string) => {
  return {
    type: 'ADD_TASK',
    payload: {todoListId, title}
  } as const
}

export const changeCheckBoxAC = (todoListId: string, taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE_CHECKBOX',
    payload: {todoListId, taskId, isDone}
  } as const
}

export const changeTitleAC = (todoListId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE_TITLE',
    payload: {todoListId, taskId, title}
  } as const
}

export default tasksReducer