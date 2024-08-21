import setTask from "./setTask.js";
import renderingTask from "./renderingTask.js";
import * as tasks from "./getTasks.js";
import changeTask from "./changeTask.js";
import deleteTaskFromLS from "./deleteTaskfromLS.js";

window.onload = function () {
  const navigator = document.querySelectorAll("nav > input");
  const newTaskWindow = document.querySelector(".modal-new-task");
  const newTaskWindowOpen = document.querySelector(".new-task-button");
  const newTaskWindowClose = document.querySelector("#modalCross");
  const { form } = document.forms;
  const taskStatus = document.querySelector("select");

  taskStatus.value = localStorage.getItem(0) || "Active";
  localStorage.setItem(0, taskStatus.value);

  navigator.forEach((elem) => {
    elem.onclick = function () {
      let allGradation = document.querySelectorAll(".content > article");
      let currentGradation = document.querySelector(`.${elem.value}`);

      allGradation.forEach((item) => {
        item == currentGradation
          ? (item.style.visibility = "visible")
          : (item.style.visibility = "hidden");
      });
    };
  });

  newTaskWindowOpen.onclick = function () {
    newTaskWindow.classList.add("modal-new-task-open");
    document.querySelector("#dateField").valueAsDate = new Date();
  };

  newTaskWindowClose.onclick = function () {
    newTaskWindow.classList.remove("modal-new-task-open");
  };

  form.addEventListener("submit", (event) => {
    setTask();
    event.preventDefault();
    renderCurrentTasks();
    event.target.reset();
    newTaskWindow.classList.remove("modal-new-task-open");
  });

  taskStatus.addEventListener("change", (event) => {
    localStorage.setItem(0, taskStatus.value);
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

    currentTasks.forEach((elem) => {
      renderingTask(elem);
    });

    completingTask();
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

        changeTask(taskNumber, newStatus, isChecked);
      });
    });
  }

  function cancelingTask() {
    const cancelingTaskIcon = document.querySelectorAll(".cancel-task");

    cancelingTaskIcon.forEach((elem) => {
      elem.onclick = () => {
        elem.parentNode.remove();
        let taskNumber = elem.parentNode.firstChild.id.slice(4);
        let newStatus = "Canceled";
        changeTask(taskNumber, newStatus);
      };
    });
  }

  function restoringTask() {
    const restoringTaskIcon = document.querySelectorAll(".restore-task");

    restoringTaskIcon.forEach((elem) => {
      elem.onclick = () => {
        elem.parentNode.remove();
        let taskNumber = elem.parentNode.firstChild
          .getAttribute("for")
          .slice(4);
        let newStatus = "Active";
        changeTask(taskNumber, newStatus);
      };
    });
  }

  function deletingTask() {
    let deletintIcons = document.querySelectorAll(".delete-task");

    deletintIcons.forEach((elem) => {
      elem.onclick = () => {
        let taskNumber = elem.parentNode.firstChild.id.slice(4);
        changeTask(taskNumber, "Deleted");
        elem.parentNode.remove();

        deleteTaskFromLS();
      };
    });
  }

  renderCurrentTasks();

  console.log(Object.entries(localStorage));

  // localStorage.clear();
};
