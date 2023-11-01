// script.js

// Search functionality
const searchInput = document.getElementById('searchInput');
const tasks = document.querySelectorAll('.task');

searchInput.addEventListener('input', (e) => {
  const searchQuery = e.target.value.toLowerCase();

  tasks.forEach((task) => {
    const taskName = task.querySelector('label').textContent.toLowerCase();
    if (taskName.includes(searchQuery)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
});

// Mark completed tasks
const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const label = e.target.nextElementSibling;
    if (checkbox.checked) {
      label.classList.add('completed');
    } else {
      label.classList.remove('completed');
    }
  });
});

// Sort tasks by due date
const taskList = document.getElementById('taskList');

function sortTasksByDueDate() {
  Array.from(taskList.children)
    .sort((a, b) => {
      const aDueDate = a.querySelector('.due-date').textContent;
      const bDueDate = b.querySelector('.due-date').textContent;
      return new Date(aDueDate) - new Date(bDueDate);
    })
    .forEach((task) => taskList.appendChild(task));
}

// Local storage
const STORAGE_KEY = 'todoListTasks';

function saveTasksToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(taskList.children)));
}

function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storedTasks) {
    storedTasks.forEach((task) => {
      taskList.appendChild(task);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  sortTasksByDueDate();
});

document.addEventListener('change', () => {
  saveTasksToLocalStorage();
});