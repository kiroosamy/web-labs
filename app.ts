// Define the structure of a Todo item using TypeScript types
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Application state
let todos: Todo[] = [];
let currentFilter: 'all' | 'active' | 'completed' = 'all';

// DOM Elements
const input = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const itemsLeft = document.getElementById('items-left') as HTMLSpanElement;
const clearCompletedBtn = document.getElementById('clear-completed') as HTMLButtonElement;
const clearAllBtn = document.getElementById('clear-all') as HTMLButtonElement;
const filterBtns = document.querySelectorAll('.filter-btn');

// Add a new todo
const addTodo = (): void => {
    const text: string = input.value.trim();
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
const toggleTodo = (id: number): void => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        render();
    }
};

// Delete a single todo
const deleteTodo = (id: number): void => {
    todos = todos.filter(t => t.id !== id);
    render();
};

// Enable edit mode on double click
const enableEdit = (id: number, li: HTMLLIElement, span: HTMLSpanElement): void => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = todo.text;
    
    li.replaceChild(editInput, span);
    editInput.focus();

    editInput.addEventListener('keydown', (e: KeyboardEvent) => {
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
const clearCompleted = (): void => {
    todos = todos.filter(t => !t.completed);
    render();
};

const clearAll = (): void => {
    todos = [];
    render();
};

// Update active filter
const setFilter = (filter: 'all' | 'active' | 'completed', btn: Element): void => {
    currentFilter = filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
};

// Render the UI
const render = (): void => {
    todoList.innerHTML = '';
    
    // Filter the array based on the selected tab
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    // Generate list items using template literals
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

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
input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') addTodo();
});
clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const filter = target.getAttribute('data-filter') as 'all' | 'active' | 'completed';
        setFilter(filter, target);
    });
});
