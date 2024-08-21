export default function deleteTaskFromLS() {
  let tasks = [];
  let tasksStatus = localStorage.getItem(0);

  for (let i = 1; i < localStorage.length; i++) {
    let task = localStorage.getItem(i);
    let parsedTask = JSON.parse(task);
    if (parsedTask.status != "Deleted") {
      tasks.push(task);
    }
  }

  localStorage.clear();

  localStorage.setItem(0, tasksStatus);

  for (let i = 0; i < tasks.length; i++) {
    let parsedTask = JSON.parse(tasks[i]);
    parsedTask.id = i + 1;
    let stringifyTask = JSON.stringify(parsedTask);
    localStorage.setItem(i + 1, stringifyTask);
  }
}
