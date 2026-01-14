document.getElementById('formNuevoContacto').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Capturar los valores de los inputs
    const nombre = document.querySelector('input[placeholder="Ej. Juan Pérez"]').value;
    const telefono = document.querySelector('input[placeholder="1234-5678"]').value;
    const correo = document.querySelector('input[placeholder="correo@ejemplo.com"]').value;
    const categoria = document.querySelector('select.input-pro').value;

    // 2. Crear el objeto de contacto
    const nuevoContacto = {
        nombre,
        telefono,
        correo,
        categoria,
        iniciales: nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    };

    // 3. Obtener contactos existentes de LocalStorage o crear lista vacía
    let contactos = JSON.parse(localStorage.getItem('misContactos')) || [];

    // 4. Agregar el nuevo y guardar
    contactos.push(nuevoContacto);
    localStorage.setItem('misContactos', JSON.stringify(contactos));

    // 5. Redirigir a la lista
    window.location.href = 'contactos.html';
});