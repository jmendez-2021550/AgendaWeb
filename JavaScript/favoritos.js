document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorFavoritos');
    const mensajeVacio = document.getElementById('mensajeVacio');
    const favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];

    if (favoritos.length === 0) {
        mensajeVacio.classList.remove('d-none');
    } else {
        mensajeVacio.classList.add('d-none');
        favoritos.forEach((fav, index) => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="glass-card-pro p-4 shadow-lg">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="avatar-fav me-3">${fav.iniciales}</div>
                            <div class="fav-info">
                                <h6 class="mb-1 text-white">${fav.nombre}</h6>
                                <p class="mb-0 text-white-50 small">${fav.correo}</p>
                            </div>
                        </div>
                        <button class="btn btn-link text-danger text-decoration-none" onclick="eliminarFav(${index})">✕</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(col);
        });
    }
});

function eliminarFav(index) {
    let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
    favoritos.splice(index, 1);
    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
    location.reload(); // Recarga para actualizar la vista
}