export default function saveTask(taskNumber, newStatus, isChecked = false) {
  let parsedTask = JSON.parse(localStorage[taskNumber]);
  if (isChecked) {
    parsedTask.checked = !parsedTask.checked;
  }
  parsedTask.status = newStatus;
  let stringifyTask = JSON.stringify(parsedTask);
  localStorage.setItem(taskNumber, stringifyTask);
}
