import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import Task from "../src/task.js";
import { setTimeout } from "node:timers/promises";

describe("#Task test suite", () => {
  let _logMock;
  let _task;
  beforeEach(() => {
    _logMock = jest.spyOn(console, "log").mockImplementation();
    _task = new Task();
  });

  it("should only run tasks that are due without fake timers (slow)", async () => {
    const tasks = [
      {
        name: "Task-Will-Run-In-5-Secs",
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn(),
      },
      {
        name: "Task-Will-Run-In-10-Secs",
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn(),
      },
    ];

    _task.save(tasks[0]);
    _task.save(tasks[1]);

    _task.run(200);

    await setTimeout(11e3);
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  }, 15e3);

  it("should only run tasks that are due with fake timers (fast)", async () => {
    jest.useFakeTimers()
    const tasks = [
      {
        name: "Task-Will-Run-In-5-Secs",
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn(),
      },
      {
        name: "Task-Will-Run-In-10-Secs",
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn(),
      },
    ];

    _task.save(tasks[0]);
    _task.save(tasks[1]);

    _task.run(200);
    jest.advanceTimersByTime(4000)

    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000)

    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5000)

    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();

  });
});
