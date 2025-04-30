// Elemen DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// Load tasks dari Local Storage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateTaskCounter();
});

// Fungsi untuk menambahkan task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Silakan masukkan tugas!');
        return;
    }
    
    // Buat elemen task baru
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="task-btn complete-btn">Selesai</button>
            <button class="task-btn delete-btn">Hapus</button>
        </div>
    `;
    
    // Tambahkan ke daftar
    taskList.appendChild(taskItem);
    
    // Reset input
    taskInput.value = '';
    
    // Simpan ke Local Storage
    saveTasks();
    updateTaskCounter();
    
    // Fokus kembali ke input
    taskInput.focus();
}

// Event listener untuk tombol Tambah
addBtn.addEventListener('click', addTask);

// Event listener untuk Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Event delegation untuk tombol Selesai dan Hapus
taskList.addEventListener('click', (e) => {
    const target = e.target;
    
    // Tombol Selesai
    if (target.classList.contains('complete-btn')) {
        const taskItem = target.closest('.task-item');
        taskItem.classList.toggle('completed');
        saveTasks();
        updateTaskCounter();
    }
    
    // Tombol Hapus
    if (target.classList.contains('delete-btn')) {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            const taskItem = target.closest('.task-item');
            taskItem.remove();
            saveTasks();
            updateTaskCounter();
        }
    }
});

// Fungsi untuk menyimpan tasks ke Local Storage
function saveTasks() {
    const tasks = [];
    
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk memuat tasks dari Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="task-btn complete-btn">Selesai</button>
                    <button class="task-btn delete-btn">Hapus</button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
        });
    }
}

// Fungsi untuk memperbarui counter task
function updateTaskCounter() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    
    totalTasksSpan.textContent = totalTasks;
    completedTasksSpan.textContent = completedTasks;
}
