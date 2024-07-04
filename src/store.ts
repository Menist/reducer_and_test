import { legacy_createStore, combineReducers
} from 'redux'
import {tasksReducer} from "./state/tasks-reducer";
import {todoListReducer} from "./state/todoList-reducer";


const reducer = combineReducers({
  tasks: tasksReducer,
  todolist: todoListReducer
})

export const store = legacy_createStore(reducer)


export type RootStateType = ReturnType<typeof reducer>