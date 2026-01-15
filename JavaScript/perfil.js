document.addEventListener('DOMContentLoaded', () => {
    cargarDatosUsuario();
    actualizarEstadisticas();
    
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', cerrarSesion);
    }
});

function cargarDatosUsuario() {
    // Obtenemos los datos guardados por el login
    const usuarioJSON = localStorage.getItem('usuarioActivo');
    
    if (usuarioJSON) {
        const user = JSON.parse(usuarioJSON);
        
        // Rellenamos el HTML con los datos del usuario real
        document.getElementById('user-avatar').innerText = user.iniciales || "??";
        document.getElementById('user-name').innerText = user.nombre || "Usuario";
        document.getElementById('info-full-name').innerText = user.nombre;
        document.getElementById('info-inst').innerText = user.institucion || "Kinal";
        document.getElementById('info-email').innerText = user.correo;
        document.getElementById('info-carne').innerText = `Carné: ${user.carne}`;
        document.getElementById('info-rol').innerText = `Rol: ${user.rol || 'Estudiante'}`;
    } else {
        // Si alguien intenta entrar sin loguearse, redirigir al login
        window.location.href = "login.html";
    }
}

function actualizarEstadisticas() {
    // Tareas dinámicas desde localStorage
    const tareasRaw = localStorage.getItem('misTareas');
    const tareas = tareasRaw ? JSON.parse(tareasRaw) : [];
    
    const elTareas = document.getElementById('count-tareas');
    if (elTareas) {
        animarNumero('count-tareas', tareas.length);
    }
    
    // Contactos y Favoritos se mantienen estáticos (5 y 2) según tu instrucción
}

function cerrarSesion() {
    // Limpiamos el usuario activo de la memoria
    localStorage.removeItem('usuarioActivo');
    // Redirigimos al login
    window.location.href = "login.html";
}

function animarNumero(id, valorFinal) {
    const el = document.getElementById(id);
    if (!el) return;
    let inicio = 0;
    const duracion = 1000;
    const incremento = valorFinal / (duracion / 16);
    
    const conteo = () => {
        inicio += incremento;
        if (inicio < valorFinal) {
            el.innerText = Math.floor(inicio);
            requestAnimationFrame(conteo);
        } else {
            el.innerText = valorFinal;
        }
    };
    conteo();
}