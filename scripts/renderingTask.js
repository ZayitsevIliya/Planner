export default function renderingTask(task) {
  let newTask = document.createElement("li"),
    input = document.createElement("input"),
    label = document.createElement("label"),
    divEdit = document.createElement("div"),
    iconEdit = document.createElement("img"),
    divCancel = document.createElement("div"),
    iconCancel = document.createElement("img"),
    divDelete = document.createElement("div"),
    iconDelete = document.createElement("img");

  newTask.setAttribute("status", task.status);

  input.name = `task${task.id}`;
  input.type = "checkbox";
  input.id = `item${task.id}`;

  label.innerText = task.name;
  label.setAttribute("for", input.id);
  let date = task.date.split("-").reverse().toString().replaceAll(",", ".");
  let title = `${task.description} \nDate of completion: ${date}`;
  label.setAttribute("title", title);

  if (task.isImportant) {
    newTask.className = "important-task";
  }

  divDelete.setAttribute("role", "delete task icon");
  divDelete.setAttribute("class", "delete-task");
  divDelete.style.display = "flex";
  divDelete.append(iconDelete);

  iconDelete.setAttribute(
    "src",
    "https://www.svgrepo.com/show/500535/delete.svg"
  );

  switch (task.status) {
    case "Active":
      divEdit.setAttribute("role", "edit task icon");
      divEdit.setAttribute("class", "edit-task");
      divEdit.style.display = "flex";
      divEdit.append(iconEdit);

      iconEdit.setAttribute(
        "src",
        "https://www.svgrepo.com/show/521620/edit.svg"
      );

      divCancel.setAttribute("role", "cancel task icon");
      divCancel.setAttribute("class", "cancel-task");
      divCancel.style.display = "flex";
      divCancel.append(iconCancel);

      iconCancel.setAttribute(
        "src",
        "https://www.svgrepo.com/show/486564/cancel.svg"
      );

      newTask.append(input, label, divEdit, divCancel, divDelete);
      taskListToday.append(newTask);
      break;

    case "Completed":
      input.setAttribute("checked", "");
      label.className = "checked-task";

      newTask.append(input, label, divDelete);
      taskListToday.append(newTask);
      break;

    case "Canceled":
      input.setAttribute("disabled", "");

      divCancel.setAttribute("role", "restore task icon");
      divCancel.setAttribute("class", "restore-task");
      divCancel.style.display = "flex";
      divCancel.append(iconCancel);

      iconCancel.setAttribute(
        "src",
        "https://www.svgrepo.com/show/505254/restore.svg"
      );

      newTask.append(input, label, divCancel, divDelete);
      taskListToday.append(newTask);
      break;
  }
}
