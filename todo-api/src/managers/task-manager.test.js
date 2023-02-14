import { LocalStorage as Storage } from "node-localstorage";

import { createTaskList, loadTasksFromStorage } from "./task-manager.js";

// These tests work via Jest
// To learn more about how to use Jest to create test cases:
// https://jestjs.io/docs/using-matchers

// also, Ctrl+Click is a thing
// Works with anything link-like, even imported modules: require('...');
// also functions that are imported, like createTaskList

// This is a whole test suite, which is a group of tests
// You can also have multiple test suites, and even inside one another
describe("Task List", () => {
  const storageKey = "tasks-test";
  let storage, tasks;

  // These are functions that are run before and after each test case is run
  beforeEach(() => {
    // To cut down on repeating ourselves,
    // we can create a new task list before each test case
    // so that we can start each test case with a clean slate
    storage = new Storage("storage.json");
    tasks = createTaskList({ storage, storageKey });
  });
  afterEach(() => {});

  // These are functions that are run only once before and once after all test cases
  beforeAll(() => {});
  afterAll(() => {});

  // This is a single test case
  it("should return an empty array of tasks", () => {
    expect(tasks.listAllTasks()).toMatchObject([]);
  });

  it("should add a task to the list", () => {
    const task = tasks.addTask("Example Task");

    expect(task).toBeDefined();
    expect(task).toHaveProperty("id", 0);
    expect(task).toHaveProperty("text", "Example Task");
    expect(task).toHaveProperty("completed", false);
  });

  it("should return a single task", () => {
    const task = tasks.addTask("Example Task");

    expect(tasks.listAllTasks()).toMatchObject([task]);
  });

  it("should mark task as completed", () => {
    const task = tasks.addTask("Example Task");
    tasks.completeTask(task.id);

    // PS. Arrays are also Objects
    expect(tasks.listAllTasks()).toMatchObject([task]);
    expect(tasks.listActiveTasks()).toMatchObject([]);
    expect(tasks.listCompletedTasks()).toMatchObject([task]);
  });

  it("should delete the task", () => {
    const task = tasks.addTask("Example Task");
    tasks.deleteTask(task.id);

    expect(tasks.listAllTasks()).toMatchObject([]);
    expect(tasks.listActiveTasks()).toMatchObject([]);
    expect(tasks.listCompletedTasks()).toMatchObject([]);
  });

  it("should still assign a unique id even after the list is altered", () => {
    // add 10 tasks and delete 5 tasks
    repeat(10, (n) => tasks.addTask(`Task #${n + 1}`)).filter((task, index) => {
      if (index > 2 && index < 8) return true;

      tasks.deleteTask(task.id);
      return false;
    });

    // add 5 extra tasks, leaving us at 10
    repeat(5, (n) => tasks.addTask(`Extra task #${n + 1}`));

    expect(tasks.listAllTasks().length).toBe(10);

    const taskIds = {};
    for (const task of tasks.listAllTasks()) {
      expect(taskIds[task.id]).not.toBe(true);
      taskIds[task.id] = true;
    }
  });

  it("should clear all completed tasks", () => {
    const _tasks = repeat(10, (n) => tasks.addTask(`Task #${n + 1}`));
    expect(tasks.listAllTasks().length).toBe(10);

    repeat(5, (n) => {
      const { id } = _tasks[n];
      return tasks.completeTask(id);
    });
    expect(tasks.listAllTasks().length).toBe(10);
    expect(tasks.listActiveTasks().length).toBe(5);
    expect(tasks.listCompletedTasks().length).toBe(5);

    tasks.clearCompletedTasks();
    expect(tasks.listAllTasks().length).toBe(5);
    expect(tasks.listActiveTasks().length).toBe(5);
    expect(tasks.listCompletedTasks().length).toBe(0);
  });

  it("should save tasks in storage after changing task list", () => {
    let task = tasks.addTask("New task 1");
    expect(task).toBeDefined();

    expect(storage.getItem(storageKey)).toBeDefined();
    expect(storage.getItem(`${storageKey}.counter`)).toBeDefined();

    tasks = loadTasksFromStorage({ storage, storageKey });
    expect(tasks.listAllTasks().length).toBe(1);
    expect(tasks.listActiveTasks().length).toBe(1);
    expect(tasks.listCompletedTasks().length).toBe(0);

    tasks.completeTask(task.id);
    tasks = loadTasksFromStorage({ storage, storageKey });

    expect(tasks.listAllTasks().length).toBe(1);
    expect(tasks.listActiveTasks().length).toBe(0);
    expect(tasks.listCompletedTasks().length).toBe(1);

    tasks.addTask("New task 2");
    tasks.addTask("New task 3");
    tasks = loadTasksFromStorage({ storage, storageKey });

    expect(tasks.listAllTasks().length).toBe(3);
    expect(tasks.listActiveTasks().length).toBe(2);
    expect(tasks.listCompletedTasks().length).toBe(1);

    const [completedTask] = tasks.listCompletedTasks();
    tasks.deleteTask(completedTask.id);
    tasks = loadTasksFromStorage({ storage, storageKey });

    expect(tasks.listAllTasks().length).toBe(1);
    expect(tasks.listActiveTasks().length).toBe(1);
    expect(tasks.listCompletedTasks().length).toBe(0);
  });
});

function repeat(count, func) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(func(i));
  }
  return items;
}
