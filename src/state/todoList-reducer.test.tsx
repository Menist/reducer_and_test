import {v1} from "uuid";
import {TodolistType} from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todoListReducer
} from "./todoList-reducer";

let todolistId1: string
let todolistId2: string;

let startState: TodolistType[]

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
})

test('correct todolist should be removed', () => {

  const endState= todoListReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

  const newTodolistTitle='newTodolistTitle'

  const endState= todoListReducer(startState, addTodolistAC('newTodolistTitle'))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
  expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
const newTodolistTitle='New Title'
const endState = todoListReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2))
  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  const newFilter='completed'
const endState= todoListReducer(startState, changeTodolistFilterAC('completed', todolistId2))
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});