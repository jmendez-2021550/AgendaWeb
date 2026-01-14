document.addEventListener('DOMContentLoaded', () => {
    renderizarContactos();
});

function renderizarContactos() {
    const listaContenedor = document.querySelector('.contact-list');
    const contactosGuardados = JSON.parse(localStorage.getItem('misContactos')) || [];

    // Por cada contacto guardado, creamos el HTML
    contactosGuardados.forEach(contacto => {
        const item = document.createElement('div');
        item.className = 'contact-item-pro';
        
        // Determinamos el color basado en la categoría (opcional)
        const colorClass = contacto.categoria === 'catedratico' ? 'avatar-green' : 'avatar-blue';

        item.innerHTML = `
            <a href="detalles.html" class="d-flex align-items-center text-decoration-none flex-grow-1">
                <div class="avatar-pro ${colorClass}">${contacto.iniciales}</div>
                <div class="contact-info">
                    <h6>${contacto.nombre}</h6>
                    <p>${contacto.correo || contacto.telefono}</p>
                </div>
                <div class="badge-status ms-auto d-none d-md-block">${contacto.categoria}</div>
            </a>
            <div class="d-flex align-items-center gap-3 ms-4">
                <button class="btn-fav" onclick="toggleFavorite(this)">★</button>
                <a href="detalles.html" class="arrow-pro">Ver →</a>
            </div>
        `;
        listaContenedor.appendChild(item);
    });
}