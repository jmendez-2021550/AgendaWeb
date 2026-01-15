let modalBootstrap;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el modal de Bootstrap
    const modalElement = document.getElementById('modalEditar');
    if (modalElement) {
        modalBootstrap = new bootstrap.Modal(modalElement);
    }
    
    inicializarTareas();
    
    const formTarea = document.getElementById('formTarea');
    if (formTarea) {
        formTarea.addEventListener('submit', (e) => {
            e.preventDefault();
            agregarTarea();
        });
    }
});

function inicializarTareas() {
    let tareas = JSON.parse(localStorage.getItem('misTareas'));
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
    if (!contenedor) return;
    let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];
    
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
        item.className = `task-item ${tarea.completada ? 'opacity-75' : ''}`;
        item.innerHTML = `
            <div class="check-custom ${tarea.completada ? 'active' : ''}" onclick="toggleEstado(${tarea.id})" style="cursor:pointer">
                ${tarea.completada ? '<i class="bi bi-check-lg"></i>' : ''}
            </div>
            <div class="flex-grow-1 ms-3">
                <h6 class="mb-1 text-white fw-semibold ${tarea.completada ? 'text-decoration-line-through opacity-50' : ''}">
                    ${tarea.titulo}
                </h6>
                <div class="d-flex gap-3 align-items-center">
                    <span class="badge ${priorityClass}" style="font-size: 0.65rem; border-radius: 6px;">
                        ${priorityLabel.toUpperCase()}
                    </span>
                    <span class="text-white-50 small" style="font-size: 0.75rem;">
                        <i class="bi bi-calendar3 me-1"></i> ${tarea.fecha}
                    </span>
                </div>
            </div>
            <div class="d-flex gap-1">
                <button class="btn btn-sm text-white-50" onclick="prepararEdicion(${tarea.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm text-danger opacity-75" onclick="eliminarTarea(${tarea.id})">
                    <i class="bi bi-x-lg"></i>
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
    if (tarea) {
        document.getElementById('editId').value = id;
        document.getElementById('editTitulo').value = tarea.titulo;
        document.getElementById('editPrioridad').value = tarea.prioridad;
        document.getElementById('editFecha').value = tarea.fecha;
        modalBootstrap.show();
    }
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