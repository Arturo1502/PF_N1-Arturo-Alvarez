/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let inde=0
const defecto = document.querySelector('.nav-link');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}




//Funcion para mostrar dependiendo que elemento de mi nav esté activo
function showAll() {
  
  defecto.classList.add('defecto')
  document.getElementById("allSection").style.display = "block";
  document.getElementById("activeSection").style.display = "none";
  document.getElementById("completedSection").style.display = "none";
  displayTasks("taskList", false, false);

}

function showActive() {
  document.getElementById("allSection").style.display = "none";
  document.getElementById("activeSection").style.display = "block";
  defecto.classList.remove('defecto')
  document.getElementById("completedSection").style.display = "none";
  
  displayTasks("activeTaskList", true, false);
  
}

function showCompleted() {
  document.getElementById("allSection").style.display = "none";
  document.getElementById("activeSection").style.display = "none";
  document.getElementById("completedSection").style.display = "block";
  defecto.classList.remove('defecto')
  displayTasks("completedTaskList", false, true);
}



// Función para añadir una nueva tarea
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  
  if (taskText !== "") {
      tasks.push({id:inde , title: taskText, completed: false });
      
      saveTasks();
      taskInput.value = "";
      showAll();
  } 

  document.getElementById("taskInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
})
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  showAll();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showCompleted();
}


// Funcion para borrar todas las tareas
function deleteAll() {
  tasks = tasks.filter(task => !task.completed);
    saveTasks();
    showCompleted();
}

function displayTasks(elementId, showActiveTasks, showCompletedTasks) {
  let taskListElement = document.getElementById(elementId);
  taskListElement.innerHTML = "";

  tasks.forEach((task, index) => {
    if ((showActiveTasks && !task.completed) || (showCompletedTasks && task.completed) || (!showActiveTasks && !showCompletedTasks)) {
      inde++;
      let listItem = document.createElement("li");
      listItem.innerHTML = `
      <div class="items">
          <input type="checkbox" onclick="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
          <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.title}</span>
      </div>`;

      if (showCompletedTasks) {
        let deleteButton = document.createElement("i");
        deleteButton.nodeType = "button"
        deleteButton.className = "fa-solid fa-trash";
        deleteButton.onclick = function () {
          deleteTask(index);
        };
        listItem.appendChild(deleteButton);


        taskListElement.appendChild(listItem);

      }

      taskListElement.appendChild(listItem);
    }
  });
}
document.getElementById("taskInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

showAll();

