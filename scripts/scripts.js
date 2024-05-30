window.onload = function () {
  const navigator = document.querySelectorAll("nav > input");
  const newTaskButton = document.querySelector(".new-task-button");
  const modalNewTask = document.querySelector(".modal-new-task");
  const modalCross = document.querySelector("#modalCross");
  const { form } = document.forms;
  const taskListToday = document.getElementById("taskListToday");

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

  function newTaskWindow() {
    modalNewTask.classList.add("modal-new-task-open");
    document.querySelector("#dateField").valueAsDate = new Date();
  }

  function closeNewTaskWindow() {
    modalNewTask.classList.remove("modal-new-task-open");
  }

  newTaskButton.onclick = function () {
    newTaskWindow();
  };

  modalCross.onclick = function () {
    closeNewTaskWindow();
  };

  form.addEventListener("submit", (event) => {
    taskValue();
    event.preventDefault();
    location.reload();
  });

  function taskValue() {
    let taskValues = {
      name: form.name.value,
      description: form.description.value,
      isImpotant: form.isImpotant.checked,
      date: form.date.value,
      periodicity: form.periodicity.value,
      ordinal: localStorage.length,
      checked: false,
    };

    let json = JSON.stringify(taskValues);

    localStorage.setItem(taskValues.ordinal, json);
  }

  for (let index = 0; index < localStorage.length; index++) {
    let task = localStorage.getItem(index);
    let parsedTask = JSON.parse(task);
    addTask(parsedTask, index);
  }

  function addTask(task, index) {
    let newTask = document.createElement("li"),
      input = document.createElement("input"),
      label = document.createElement("label");

    input.name = `task${index}`;
    input.type = "checkbox";
    input.id = `item${index}`;

    label.innerText = task.name;
    label.setAttribute("for", input.id);
    label.setAttribute("title", task.description);

    if (task.isImpotant) {
      label.style.background = "#FCFF89";
    }

    if (task.checked) {
      input.setAttribute("checked", "");
      label.className = "checked-task";
    }

    newTask.append(input, " ", label);
    taskListToday.append(newTask);
  }

  const taskCheckboxes = document.querySelectorAll("li input");

  taskCheckboxes.forEach((task) => {
    let taskNumber = task.id.at(-1);
    let taskText = document.querySelector(`label[for=item${taskNumber}]`);
    task.addEventListener("change", () => {
      taskText.classList.toggle("checked-task");
      completeTask(taskNumber);
    });
  });

  function completeTask(taskNumber) {
    let parsedTask = JSON.parse(localStorage[taskNumber]);
    parsedTask.checked = !parsedTask.checked;
    let stringifyTask = JSON.stringify(parsedTask);
    localStorage.setItem(taskNumber, stringifyTask);
  }

  // console.log(Object.entries(localStorage));
};
