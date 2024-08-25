import setNewTask from "./setNewTask.js";
import setEditedTask from "./setEditedTask.js";
import renderingTask from "./renderingTask.js";
import * as tasks from "./getTasks.js";
import changeTaskStatus from "./changeTaskStatus.js";
import deleteTaskFromLS from "./deleteTaskfromLS.js";

window.onload = function () {
  const newTaskWindow = document.querySelector(".new-task-window");

  const newTaskWindowOpen = document.querySelector(".new-task-button");
  const newTaskWindowCross = document.querySelector("#newTaskWindowCross");

  const newTaskForm = document.querySelector("#newTaskForm");

  const editTaskWindow = document.querySelector(".editing-task-window");
  const editingTaskForm = document.querySelector("#editingTaskForm");
  const editTaskWindowCross = document.querySelector("#editTaskWindowCross");

  const overlayElement = document.querySelector(".overlay");

  const taskStatus = document.querySelector("select");

  function overlay(state) {
    if (state == "open") {
      overlayElement.style.display = "block";

      overlayElement.onclick = () => {
        overlayElement.style.display = "none";
        newTaskWindow.classList.remove("new-task-window-open");
        editTaskWindow.classList.remove("editing-task-window-open");
      };
    }

    if (state == "close") {
      overlayElement.style.display = "none";
    }
  }

  newTaskWindowOpen.onclick = function () {
    newTaskWindow.classList.add("new-task-window-open");
    document.querySelector("#dateFieldNewTask").valueAsDate = new Date();
    overlay("open");
  };

  newTaskWindowCross.onclick = function () {
    newTaskWindow.classList.remove("new-task-window-open");
    overlay("close");
  };

  editTaskWindowCross.onclick = function () {
    editTaskWindow.classList.remove("editing-task-window-open");
    overlay("close");
  };

  newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setNewTask();
    renderCurrentTasks();
    event.target.reset();
    newTaskWindow.classList.remove("new-task-window-open");
    overlay("close");
  });

  taskStatus.addEventListener("change", () => {
    renderCurrentTasks();
  });

  function renderCurrentTasks() {
    document.querySelector("#taskListToday").innerHTML = "";
    let currentTasks = [];

    switch (taskStatus.value) {
      case "Active":
        currentTasks = tasks.active();
        break;

      case "Completed":
        currentTasks = tasks.completed();
        break;

      case "Canceled":
        currentTasks = tasks.canceled();
        break;
    }

    currentTasks.forEach((task) => {
      renderingTask(task);
    });

    completingTask();
    editingTask();
    cancelingTask();
    restoringTask();
    deletingTask();
  }

  function completingTask(isChecked = true) {
    const taskCheckboxes = document.querySelectorAll("li input");

    taskCheckboxes.forEach((task) => {
      let parent = task.parentElement;
      let taskNumber = task.id.slice(4);
      let taskText = document.querySelector(`label[for=item${taskNumber}]`);
      task.addEventListener("change", () => {
        taskText.classList.toggle("checked-task");

        if (parent.getAttribute("status") == "Active") {
          parent.setAttribute("status", "Completed");
        } else {
          parent.setAttribute("status", "Active");
        }

        let newStatus = parent.getAttribute("status");

        changeTaskStatus(taskNumber, newStatus, isChecked);
      });
    });
  }

  function editingTask() {
    const editIcons = document.querySelectorAll(".edit-task");

    editIcons.forEach((elem) => {
      elem.onclick = function () {
        let taskNumber = elem.parentNode.firstChild.id.slice(4);
        let task = localStorage.getItem(taskNumber);
        let parsedTask = JSON.parse(task);

        editTaskWindow.classList.add("editing-task-window-open");
        overlay("open");

        editingTaskForm.name.value = parsedTask.name;
        editingTaskForm.description.value = parsedTask.description;
        editingTaskForm.isImportant.checked = parsedTask.isImportant;
        editingTaskForm.date.value = parsedTask.date;

        editingTaskForm.addEventListener(
          "submit",
          (event) => {
            event.preventDefault();
            setEditedTask(taskNumber);
            renderCurrentTasks();

            editTaskWindow.classList.remove("editing-task-window-open");
            overlay("close");
          },
          { once: true }
        );
      };
    });
  }

  function cancelingTask() {
    const cancelingTaskIcon = document.querySelectorAll(".cancel-task");

    cancelingTaskIcon.forEach((elem) => {
      elem.onclick = () => {
        elem.parentNode.remove();
        let taskNumber = elem.parentNode.firstChild.id.slice(4);
        let newStatus = "Canceled";
        changeTaskStatus(taskNumber, newStatus);
      };
    });
  }

  function restoringTask() {
    const restoringTaskIcon = document.querySelectorAll(".restore-task");

    restoringTaskIcon.forEach((elem) => {
      elem.onclick = () => {
        elem.parentNode.remove();
        let taskNumber = elem.parentNode.firstChild.id.slice(4);
        let newStatus = "Active";
        changeTaskStatus(taskNumber, newStatus);
      };
    });
  }

  function deletingTask() {
    let deletintIcons = document.querySelectorAll(".delete-task");

    deletintIcons.forEach((elem) => {
      elem.onclick = () => {
        let taskNumber = elem.parentNode.firstChild.id.slice(4);
        changeTaskStatus(taskNumber, "Deleted");
        elem.parentNode.remove();

        deleteTaskFromLS();

        renderCurrentTasks();
      };
    });
  }

  renderCurrentTasks();
};
