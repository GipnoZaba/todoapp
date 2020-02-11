import { createContext } from "react";
import { observable, action, computed } from "mobx";
import { ITask } from "./task";
import { compareAsc, isToday } from "date-fns";
import { isOverdue } from "./utils";

class TaskStore {
  tasksRegistryKey = "tasksRegistryKey";

  @observable tasks: ITask[] = [];

  @action loadTasks = () => {
    if (window.localStorage.getItem(this.tasksRegistryKey) !== null) {
      this.setTasksFromJson();
    }
  };

  @computed get tasksByDate() {
    return this.groupAppTasksByDate(
      this.tasks.filter(
        task => !task.done && !isOverdue(new Date(task.deadline))
      )
    );
  }

  @computed get overdueTasks() {
    return this.tasks.filter(
      appTask => !appTask.done && isOverdue(new Date(appTask.deadline))
    );
  }

  @computed get doneTasks() {
    return this.tasks.filter(appTask => appTask.done);
  }

  groupAppTasksByDate(appTasks: ITask[]) {
    const sortedAppTasks = appTasks.sort((a, b) =>
      compareAsc(new Date(a.deadline), new Date(b.deadline))
    );

    return Object.entries(
      sortedAppTasks.reduce((tasks, appTask) => {
        const deadline = new Date(appTask.deadline);

        const group = isToday(deadline)
          ? "Today"
          : deadline.toISOString().split("T")[0];

        tasks[group] = tasks[group] ? [...tasks[group], appTask] : [appTask];
        return tasks;
      }, {} as { [key: string]: ITask[] })
    );
  }

  @action createTask = (task: ITask) => {
    this.tasks.push(task);
    this.updateStorage();
  };

  @action completeTask = (id: string) => {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].done = true;
        this.updateStorage();
        return;
      }
    }
    this.updateStorage();
  };

  @action restoreTask = (id: string) => {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].done = false;
        this.updateStorage();
        return;
      }
    }
  };

  @action deleteTask = (id: string) => {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks.splice(i, 1);
        this.updateStorage();
        return;
      }
    }
  };

  setTasksFromJson() {
    const json = window.localStorage.getItem(this.tasksRegistryKey);
    if (json) {
      this.tasks = [];
      const arrayObject = JSON.parse(json);
      arrayObject.forEach((task: ITask) => {
        this.tasks.push(task);
      });
    }
  }

  updateStorage() {
    if (this.tasks) {
      console.log(this.tasks);
      window.localStorage.setItem(
        this.tasksRegistryKey,
        JSON.stringify(this.tasks)
      );
    } else {
      window.localStorage.removeItem(this.tasksRegistryKey);
    }
  }
}

export const TaskStoreContext = createContext(new TaskStore());
