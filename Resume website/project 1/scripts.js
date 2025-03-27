
  // Task Management Class
class TaskManager {
  constructor() {
      this.tasks = [];
      this.currentFilter = 'all';
      this.loadTasks();
      this.initializeEventListeners();
      this.updateTaskCount();
  }

  // Initialize event listeners
  initializeEventListeners() {
      // Add task on Enter key
      document.getElementById('taskInput').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              this.addTask();
          }
      });

      // Add task on button click
      document.querySelector('.add-btn').addEventListener('click', () => {
          this.addTask();
      });

      // Add filter buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              this.filterTasks(e.target.dataset.filter);
          });
      });

      // Add action buttons
      document.querySelector('.clear-completed').addEventListener('click', () => {
          this.clearCompleted();
      });

      document.querySelector('.sort-tasks').addEventListener('click', () => {
          this.sortTasks();
      });
  }

  // Add new task
  addTask() {
      const taskInput = document.getElementById("taskInput");
      const prioritySelect = document.getElementById("prioritySelect");
      const taskText = taskInput.value.trim();
      
      if (taskText === "") return;

      const task = {
          id: Date.now(),
          text: taskText,
          completed: false,
          priority: prioritySelect.value,
          date: new Date(),
          createdAt: new Date().toISOString()
      };

      this.tasks.push(task);
      this.saveTasks();
      this.updateTaskList();
      this.updateTaskCount();
      taskInput.value = "";
      
      // Show success animation
      this.showNotification('Task added successfully!');
  }

  // Update task list display
  updateTaskList() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      let filteredTasks = this.tasks;
      if (this.currentFilter !== 'all') {
          filteredTasks = this.tasks.filter(task => {
              switch(this.currentFilter) {
                  case 'active': return !task.completed;
                  case 'completed': return task.completed;
                  case 'high': return task.priority === 'high';
                  default: return true;
              }
          });
      }

      filteredTasks.forEach(task => {
          const li = this.createTaskElement(task);
          taskList.appendChild(li);
      });
  }

  // Create task element
  createTaskElement(task) {
      const li = document.createElement("li");
      li.className = `priority-${task.priority} ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
          <div class="task-content">
              <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                  onchange="taskManager.toggleComplete(${task.id})">
              <span>${this.escapeHtml(task.text)}</span>
              <span class="task-date">${this.formatDate(task.date)}</span>
          </div>
          <div class="task-controls">
              <button class="edit-btn" onclick="taskManager.editTask(${task.id})">✎</button>
              <button class="delete-btn" onclick="taskManager.removeTask(${task.id})">❌</button>
          </div>
      `;
      li.classList.add("flip");
      return li;
  }

  // Toggle task completion
  toggleComplete(taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
          task.completed = !task.completed;
          this.saveTasks();
          this.updateTaskList();
          this.updateTaskCount();
      }
  }

  // Remove task
  removeTask(taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.saveTasks();
          this.updateTaskList();
          this.updateTaskCount();
          this.showNotification('Task deleted successfully!');
      }
  }

  // Edit task
  editTask(taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
          const newText = prompt("Edit task:", task.text);
          if (newText !== null && newText.trim() !== "") {
              task.text = newText.trim();
              this.saveTasks();
              this.updateTaskList();
              this.showNotification('Task updated successfully!');
          }
      }
  }

  // Filter tasks
  filterTasks(filter) {
      this.currentFilter = filter;
      document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
      });
      event.target.classList.add('active');
      this.updateTaskList();
  }

  // Clear completed tasks
  clearCompleted() {
      if (confirm('Are you sure you want to clear all completed tasks?')) {
          this.tasks = this.tasks.filter(task => !task.completed);
          this.saveTasks();
          this.updateTaskList();
          this.updateTaskCount();
          this.showNotification('Completed tasks cleared successfully!');
      }
  }

  // Sort tasks by priority
  sortTasks() {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      this.tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      this.updateTaskList();
  }

  // Update task counter
  updateTaskCount() {
      const activeTasks = this.tasks.filter(task => !task.completed).length;
      document.getElementById("taskCount").textContent = activeTasks;
  }

  // Format date
  formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  }

  // Show notification
  showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
          notification.classList.add('show');
          setTimeout(() => {
              notification.classList.remove('show');
              setTimeout(() => {
                  notification.remove();
              }, 300);
          }, 2000);
      }, 100);
  }

  // Save tasks to localStorage
  saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Load tasks from localStorage
  loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
          this.tasks = JSON.parse(savedTasks);
      }
  }

  // Escape HTML to prevent XSS
  escapeHtml(unsafe) {
      return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
  }
}

// Initialize TaskManager
const taskManager = new TaskManager(); 