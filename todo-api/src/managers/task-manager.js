import { LocalStorage } from "node-localstorage";

// REMEMBER
// Google Is Your Friend
// So please, RTFM and have fun!

function createTaskList({
  tasks = [],
  // storage = window.localStorage,
  storage = new LocalStorage("localStorage.json"),
  storageKey = "tasks",
  counter = 0,
} = {}) {
  // returns all the tasks in the task list
  function listAllTasks() {
    return tasks;
  }

  // returns tasks where completed is false
  function listActiveTasks() {
    return tasks.filter((task) => {
      return task.completed === false;
    });
  }

  //returns tasks where completed is true
  function listCompletedTasks() {
    return tasks.filter((task) => {
      return task.completed;
    });
  }

  // adds task to the tasks array
  function addTask(text) {
    const id = counter++;
    const task = { text, id, completed: false };
    tasks.push(task);
    saveTasksToStorage();
    return task;
  }

  // changes completed from false to true
  function completeTask(id) {
    // 1. find index of task
    // 2. change tasks[index].completed
    const index = tasks.findIndex((task) => {
      return task.id === id;
    });
    tasks[index].completed = true;
    saveTasksToStorage();
  }
  // deletes the task with the specified id from array tasks
  function deleteTask(id) {
    tasks = tasks.filter((task) => {
      return id !== task.id;
    });
    saveTasksToStorage();
  }
  //removes completed tasks from the task list
  function clearCompletedTasks() {
    for (const task of listCompletedTasks()) {
      deleteTask(task.id);
    }
  }

  function saveTasksToStorage() {
    const jasonderulo = JSON.stringify(tasks);
    storage.setItem(storageKey, jasonderulo);
  }

  return {
    listAllTasks,
    listActiveTasks,
    listCompletedTasks,

    addTask,
    completeTask,
    deleteTask,
    clearCompletedTasks,
  };
}

function loadTasksFromStorage({ storage, storageKey = "tasks" }) {
  // todo: load tasks from storage
  const jasonderulo = storage.getItem(storageKey);
  const counter = +storage.getItem(`${storageKey}.counter`);
  const tasks = JSON.parse(jasonderulo);
  return createTaskList({ tasks, storage, storageKey, counter });
}

// -- comment when in browser
export { createTaskList, loadTasksFromStorage };
