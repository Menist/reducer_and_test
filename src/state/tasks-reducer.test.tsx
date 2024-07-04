import {TasksStateType} from "../App";
import {addTasksAC, changeCheckBoxAC, changeTitleAC, removeTasksAC, tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, deletedTodoListAC} from "./todoList-reducer";

let startState: TasksStateType

beforeEach(() => {
  startState = {
    "todolistId1": [
      {id: '1', title: "CSS", isDone: false},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: '1', title: "bread", isDone: false},
      {id: '2', title: "milk", isDone: true},
      {id: '3', title: "tea", isDone: false}
    ]
  };
})


test('correct task should be deleted from correct array', () => {

  const endState = tasksReducer(startState, removeTasksAC('todolistId2', '2'))

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
  //expect(endState["todolistId2"][0].id).toBe("1");
  //expect(endState["todolistId2"][1].id).toBe("3");
});

test('correct task should be added to correct array', () => {

  const endState = tasksReducer(startState, addTasksAC('todolistId2', 'juce'))

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
  const endState = tasksReducer(startState, changeCheckBoxAC('todolistId2', '2', false))
  expect(endState["todolistId2"][1].isDone).toBeFalsy();
  expect(endState["todolistId1"][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {

  const endState = tasksReducer(startState, changeTitleAC('todolistId2', '2', 'Milkyway'))

  expect(endState["todolistId2"][1].title).toBe("Milkyway");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new property with new array should be added when new todolist is added', () => {

  const action = addTodolistAC('new todolist')
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test('propertry with todolistId should be deleted', () => {
  const action = deletedTodoListAC('todolistId2')
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});

