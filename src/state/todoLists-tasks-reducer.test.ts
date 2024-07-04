import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todoListReducer} from "./todoList-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', ()=>{
  const startTasksState: TasksStateType ={}
  const startTodoListsState: TodolistType[]=[]

  const action = addTodolistAC('new todolist');

  const endTaskState = tasksReducer(startTasksState, action)

  const endTodoListsState = todoListReducer(startTodoListsState, action);

  const keys= Object.keys(endTaskState);
  const idFromTasks= keys[0]
  const idFromTodoLists= endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistIdForNewKey);
  expect(idFromTodoLists).toBe(action.payload.todolistIdForNewKey);
})