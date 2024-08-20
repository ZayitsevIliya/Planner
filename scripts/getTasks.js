const helpers = {
  getActiveTasks: function () {
    let activeTasks = [];
    for (let index = 1; index < localStorage.length; index++) {
      let task = JSON.parse(localStorage.getItem(index));
      if (task.status == "Active") {
        activeTasks.push(task);
      }
    }
    return activeTasks;
  },

  getCompletedTasks: function () {
    let completedTasks = [];
    for (let index = 1; index < localStorage.length; index++) {
      let task = JSON.parse(localStorage.getItem(index));
      if (task.status == "Completed") {
        completedTasks.push(task);
      }
    }
    return completedTasks;
  },

  getCanceledTasks: function () {
    let canceledTasks = [];
    for (let index = 1; index < localStorage.length; index++) {
      let task = JSON.parse(localStorage.getItem(index));
      if (task.status == "Canceled") {
        canceledTasks.push(task);
      }
    }
    return canceledTasks;
  },
};

export const active = helpers.getActiveTasks();
export const completed = helpers.getCompletedTasks();
export const canceled = helpers.getCanceledTasks();
