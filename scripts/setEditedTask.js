export default function setEditedTask(taskNumber) {
  let taskValues = {
    id: taskNumber,
    name: editingTaskForm.name.value,
    description: editingTaskForm.description.value,
    isImportant: editingTaskForm.isImportantEditingTask.checked,
    date: editingTaskForm.date.value,
    checked: false,
    status: "Active",
  };

  let json = JSON.stringify(taskValues);
  localStorage.setItem(taskValues.id, json);
}
