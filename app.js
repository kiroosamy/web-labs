"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Application state
let todos = [];
let currentFilter = 'all';
// DOM Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');
const filterBtns = document.querySelectorAll('.filter-btn');
// Add a new todo
const addTodo = () => {
    const text = input.value.trim();
    if (text) {
        todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        input.value = '';
        render();
    }
};
// Toggle completion status
const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        render();
    }
};
// Delete a single todo
const deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    render();
};
// Enable edit mode on double click
const enableEdit = (id, li, span) => {
    const todo = todos.find(t => t.id === id);
    if (!todo)
        return;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = todo.text;
    li.replaceChild(editInput, span);
    editInput.focus();
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            todo.text = editInput.value.trim();
            render();
        }
    });
    editInput.addEventListener('blur', () => {
        todo.text = editInput.value.trim();
        render();
    });
};
// Clear actions using Array filter method
const clearCompleted = () => {
    todos = todos.filter(t => !t.completed);
    render();
};
const clearAll = () => {
    todos = [];
    render();
};
// Update active filter
const setFilter = (filter, btn) => {
    currentFilter = filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
};
// Render the UI
const render = () => {
    todoList.innerHTML = '';
    // Filter the array based on the selected tab
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    }
    else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    // Generate list items using template literals
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed)
            li.classList.add('completed');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('dblclick', () => enableEdit(todo.id, li, span));
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    // Update footer count
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
};
// Event Listeners
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        addTodo();
});
clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.target;
        const filter = target.getAttribute('data-filter');
        setFilter(filter, target);
    });
});
//# sourceMappingURL=app.js.map