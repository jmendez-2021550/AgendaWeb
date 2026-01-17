document.addEventListener('DOMContentLoaded', () => {
    inicializarContactosPorDefecto();
    renderizarContactos();
});

function inicializarContactosPorDefecto() {
    const contactosGuardados = JSON.parse(localStorage.getItem('misContactos')) || [];
    
    if (contactosGuardados.length === 0) {
        const contactosPorDefecto = [
            { nombre: 'Juan Pérez', correo: 'juan.perez@correo.com', telefono: '', categoria: 'institucional', iniciales: 'JP', favorito: false },
            { nombre: 'María García', correo: 'm.garcia@kinal.edu.gt', telefono: '', categoria: 'catedratico', iniciales: 'MG', favorito: false },
            { nombre: 'Carlos López', correo: 'clopez88@gmail.com', telefono: '', categoria: 'estudiante', iniciales: 'CL', favorito: false },
            { nombre: 'Ana Rodríguez', correo: 'ana_rodriguez@outlook.com', telefono: '', categoria: 'estudiante', iniciales: 'AR', favorito: false },
            { nombre: 'Luis Morales', correo: 'lmorales_kinal@kinal.edu.gt', telefono: '', categoria: 'institucional', iniciales: 'LM', favorito: false }
        ];
        localStorage.setItem('misContactos', JSON.stringify(contactosPorDefecto));
    }
}

function renderizarContactos() {
    const listaContenedor = document.querySelector('.contact-list');
    const contactosGuardados = JSON.parse(localStorage.getItem('misContactos')) || [];

    // Limpiar contenedor antes de renderizar
    listaContenedor.innerHTML = '';

    if (contactosGuardados.length === 0) {
        listaContenedor.innerHTML = '<p class="text-center opacity-50">No hay contactos guardados.</p>';
        return;
    }

    contactosGuardados.forEach((contacto, index) => {
        const item = document.createElement('div');
        item.className = 'contact-item-pro';
        
        let colorClass = 'avatar-blue';
        if (contacto.categoria === 'catedratico') colorClass = 'avatar-green';
        if (contacto.categoria === 'institucional') colorClass = 'avatar-red';

        item.innerHTML = `
            <div class="d-flex align-items-center flex-grow-1">
                <div class="avatar-pro ${colorClass}">${contacto.iniciales}</div>
                <div class="contact-info">
                    <h6>${contacto.nombre}</h6>
                    <p>${contacto.correo || contacto.telefono}</p>
                </div>
                <div class="badge-status ms-auto d-none d-md-block">${contacto.categoria}</div>
            </div>
            <div class="d-flex align-items-center gap-2 ms-4">
                <button class="btn-fav ${contacto.favorito ? 'fav-active' : ''}" 
                        onclick="toggleFavorite(${index})" title="Favorito">★</button>
                
                <button class="btn-delete-pro" onclick="eliminarContacto(${index})" title="Eliminar Contacto">
                    <i class="bi bi-trash"></i>
                </button>
                
                <a href="detalles.html" class="arrow-pro ms-2">Ver →</a>
            </div>
        `;
        listaContenedor.appendChild(item);
    });
}

function eliminarContacto(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
        let contactos = JSON.parse(localStorage.getItem('misContactos')) || [];
        
        // También eliminar de favoritos si existe
        let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
        const contactoAEliminar = contactos[index];
        favoritos = favoritos.filter(f => f.correo !== contactoAEliminar.correo);
        localStorage.setItem('misFavoritos', JSON.stringify(favoritos));

        // Eliminar del array principal
        contactos.splice(index, 1);
        localStorage.setItem('misContactos', JSON.stringify(contactos));
        
        // Refrescar la lista
        renderizarContactos();
    }
}

function toggleFavorite(index) {
    let contactos = JSON.parse(localStorage.getItem('misContactos')) || [];
    contactos[index].favorito = !contactos[index].favorito;
    
    localStorage.setItem('misContactos', JSON.stringify(contactos));
    
    // Actualizar lista de favoritos aparte si la usas
    actualizarListaFavoritos(contactos[index]);
    renderizarContactos();
}

function actualizarListaFavoritos(contacto) {
    let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
    if (contacto.favorito) {
        if (!favoritos.some(f => f.correo === contacto.correo)) {
            favoritos.push(contacto);
        }
    } else {
        favoritos = favoritos.filter(f => f.correo !== contacto.correo);
    }
    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
}