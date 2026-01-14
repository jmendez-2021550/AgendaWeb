let modalBootstrap;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el modal de Bootstrap
    modalBootstrap = new bootstrap.Modal(document.getElementById('modalEditar'));
    
    inicializarTareas();
    
    document.getElementById('formTarea').addEventListener('submit', (e) => {
        e.preventDefault();
        agregarTarea();
    });
});

function inicializarTareas() {
    let tareas = JSON.parse(localStorage.getItem('misTareas'));
    
    // Solo cargar predeterminadas si no hay nada en el storage
    if (!tareas || tareas.length === 0) {
        const predeterminadas = [
            { id: 1, titulo: "Terminar el proyecto de Programación", prioridad: "3", fecha: "2026-01-20", completada: false },
            { id: 2, titulo: "Subir laboratorio a GitHub", prioridad: "3", fecha: "2026-01-15", completada: true },
            { id: 3, titulo: "Estudiar para examen parcial", prioridad: "2", fecha: "2026-01-18", completada: false },
            { id: 4, titulo: "Diseñar vista de favoritos", prioridad: "1", fecha: "2026-01-14", completada: true },
            { id: 5, titulo: "Revisar documentación de Bootstrap", prioridad: "1", fecha: "2026-01-25", completada: false }
        ];
        localStorage.setItem('misTareas', JSON.stringify(predeterminadas));
    }
    renderizarTareas();
}

function renderizarTareas() {
    const contenedor = document.getElementById('contenedorTareas');
    let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];
    
    // Ordenar: Primero pendientes, luego por prioridad (Alta a Baja)
    tareas.sort((a, b) => {
        if (a.completada === b.completada) return b.prioridad - a.prioridad;
        return a.completada ? 1 : -1;
    });

    contenedor.innerHTML = '';
    let pendientesCount = 0;

    tareas.forEach(tarea => {
        if (!tarea.completada) pendientesCount++;
        
        const priorityLabel = tarea.prioridad === "3" ? "Alta" : tarea.prioridad === "2" ? "Media" : "Baja";
        const priorityClass = tarea.prioridad === "3" ? "bg-danger" : tarea.prioridad === "2" ? "bg-warning text-dark" : "bg-info text-dark";

        const item = document.createElement('div');
        item.className = `task-item ${tarea.completada ? 'completed' : ''}`;
        item.innerHTML = `
            <div class="check-custom ${tarea.completada ? 'active' : ''}" onclick="toggleEstado(${tarea.id})">
                ${tarea.completada ? '✓' : ''}
            </div>
            <div class="flex-grow-1 ms-2">
                <h6 class="mb-1 text-white fw-semibold ${tarea.completada ? 'text-decoration-line-through opacity-50' : ''}">
                    ${tarea.titulo}
                </h6>
                <div class="d-flex gap-3 align-items-center">
                    <span class="badge ${priorityClass}" style="font-size: 0.65rem; letter-spacing: 0.5px; border-radius: 6px;">
                        ${priorityLabel.toUpperCase()}
                    </span>
                    <span class="text-white-50 small" style="font-size: 0.75rem;">📅 ${tarea.fecha}</span>
                </div>
            </div>
            <div class="d-flex gap-1">
                <button class="btn btn-sm text-white-50 btn-hover-blue" onclick="prepararEdicion(${tarea.id})">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10z"/></svg>
                </button>
                <button class="btn btn-sm text-danger opacity-75 btn-hover-red" onclick="eliminarTarea(${tarea.id})">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                </button>
            </div>
        `;
        contenedor.appendChild(item);
    });

    document.getElementById('contadorTareas').innerText = `${pendientesCount} Pendientes`;
}

function agregarTarea() {
    const titulo = document.getElementById('tituloTarea').value;
    const prioridad = document.getElementById('prioridadTarea').value;
    const fecha = document.getElementById('fechaTarea').value;

    const nueva = { id: Date.now(), titulo, prioridad, fecha, completada: false };
    let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];
    tareas.push(nueva);
    localStorage.setItem('misTareas', JSON.stringify(tareas));
    
    document.getElementById('formTarea').reset();
    renderizarTareas();
}

function prepararEdicion(id) {
    const tareas = JSON.parse(localStorage.getItem('misTareas'));
    const tarea = tareas.find(t => t.id === id);
    
    document.getElementById('editId').value = id;
    document.getElementById('editTitulo').value = tarea.titulo;
    document.getElementById('editPrioridad').value = tarea.prioridad;
    document.getElementById('editFecha').value = tarea.fecha;
    
    modalBootstrap.show();
}

function guardarEdicion() {
    const id = parseInt(document.getElementById('editId').value);
    let tareas = JSON.parse(localStorage.getItem('misTareas'));
    
    tareas = tareas.map(t => t.id === id ? {
        ...t, 
        titulo: document.getElementById('editTitulo').value,
        prioridad: document.getElementById('editPrioridad').value,
        fecha: document.getElementById('editFecha').value
    } : t);

    localStorage.setItem('misTareas', JSON.stringify(tareas));
    modalBootstrap.hide();
    renderizarTareas();
}

function eliminarTarea(id) {
    let tareas = JSON.parse(localStorage.getItem('misTareas'));
    tareas = tareas.filter(t => t.id !== id);
    localStorage.setItem('misTareas', JSON.stringify(tareas));
    renderizarTareas();
}

function toggleEstado(id) {
    let tareas = JSON.parse(localStorage.getItem('misTareas'));
    tareas = tareas.map(t => t.id === id ? {...t, completada: !t.completada} : t);
    localStorage.setItem('misTareas', JSON.stringify(tareas));
    renderizarTareas();
}