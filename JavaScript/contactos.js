document.addEventListener('DOMContentLoaded', () => {
    renderizarContactos();
    marcarFavoritosExistentes(); // Nueva función para que las estrellas sigan encendidas al recargar
});

function renderizarContactos() {
    const listaContenedor = document.querySelector('.contact-list');
    const contactosGuardados = JSON.parse(localStorage.getItem('misContactos')) || [];

    contactosGuardados.forEach(contacto => {
        const item = document.createElement('div');
        item.className = 'contact-item-pro';
        
        let colorClass = 'avatar-blue';
        if (contacto.categoria === 'catedratico') colorClass = 'avatar-green';
        if (contacto.categoria === 'institucional') colorClass = 'avatar-red';

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

function toggleFavorite(button) {
    button.classList.toggle('fav-active');
    
    const card = button.closest('.contact-item-pro');
    const contacto = {
        nombre: card.querySelector('h6').innerText,
        correo: card.querySelector('p').innerText,
        iniciales: card.querySelector('.avatar-pro').innerText
    };

    let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];

    if (button.classList.contains('fav-active')) {
        if (!favoritos.some(f => f.correo === contacto.correo)) {
            favoritos.push(contacto);
        }
    } else {
        favoritos = favoritos.filter(f => f.correo !== contacto.correo);
    }

    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
}

// Esta función busca qué contactos ya son favoritos y les "enciende" la estrella al cargar la página
function marcarFavoritosExistentes() {
    const favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
    const items = document.querySelectorAll('.contact-item-pro');

    items.forEach(item => {
        const correo = item.querySelector('p').innerText;
        if (favoritos.some(f => f.correo === correo)) {
            item.querySelector('.btn-fav').classList.add('fav-active');
        }
    });
}