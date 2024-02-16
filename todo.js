const taskForm = document.getElementById("task-form");
const formReveal = document.getElementById("add-task");
const taskName = document.getElementById("task-name");
const taskText = document.getElementById("task-text");
const submitTask = document.getElementById("submit-task");
const closeForm = document.getElementById("close-form-button");
const tasksContainer = document.getElementById("tasks-container");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};


const submitTheTask = () => {
    submitTheTask.innerText = "Add Task";
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
      id: `${taskName.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
      name: taskName.value,
      text: taskText.value,
    };
  
    if (dataArrIndex === -1) {
      taskData.unshift(taskObj);
    } else {
      taskData[dataArrIndex] = taskObj;
    }
  
    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer()
    reset()
  };

  
const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";
  
    taskData.forEach(
      ({ id, name, text }) => {
          (tasksContainer.innerHTML += `
          <div class="task" id="${id}">
            <p><strong>Title:</strong> ${name}</p>
            <p><strong>Description:</strong> ${text}</p>
            <button style="background: #5E5DF0;
            border-radius: 999px;
            box-shadow: #5E5DF0 0 10px 20px -10px;
            box-sizing: border-box;
            color: #FFFFFF;
            cursor: pointer;
            font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            opacity: 1;
            outline: 0 solid transparent;
            padding: 8px 18px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            width: fit-content;
            word-break: break-word;
            border: 0;" onclick="editTask(this)" type="button" class="btn">Edit</button>
            <button style="background: #5E5DF0;
            border-radius: 999px;
            box-shadow: #5E5DF0 0 10px 20px -10px;
            box-sizing: border-box;
            color: #FFFFFF;
            cursor: pointer;
            font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            opacity: 1;
            outline: 0 solid transparent;
            padding: 8px 18px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            width: fit-content;
            word-break: break-word;
            border: 0;" onclick="deleteTask(this)" type="button" class="delete-btn">Delete</button> 
          </div>
        `)
      }
    );
  };

  const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
      (item) => item.id === buttonEl.parentElement.id
    );
  
    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
  }

  const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  taskName.value = currentTask.name;
  taskText.value = currentTask.text;

  submitTheTask.innerText = "Update Task";

  taskForm.classList.toggle("hidden");  
}

  const reset = () => {
    taskName.value = "";
    taskText.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
  }

  if (taskData.length) {
    updateTaskContainer();
  };

  formReveal.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

  closeForm.addEventListener("click", () => {
    const formInputsContainValues = taskName.value || taskText.value;
    const formInputValuesUpdated = taskName.value !== currentTask.title || taskText.value !== currentTask.taskText;
  
    if (formInputsContainValues && formInputValuesUpdated) {
      confirmCloseDialog.showModal();
    } else {
      reset();
    }
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    submitTheTask();
  });

