export default function setNewTask() {
  let taskValues = {
    id: localStorage.length,
    name: newTaskForm.name.value,
    description: newTaskForm.description.value,
    isImportant: newTaskForm.isImportantNewTask.checked,
    date: newTaskForm.date.value,
    checked: false,
    status: "Active",
  };

  let json = JSON.stringify(taskValues);
  localStorage.setItem(taskValues.id, json);
}
