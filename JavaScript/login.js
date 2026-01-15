document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (form) form.addEventListener('submit', handleLogin);
});

function handleLogin(e) {
    e.preventDefault();
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    if (!emailEl || !passwordEl) return;

    const correo = emailEl.value.trim().toLowerCase();

    const nombre = deriveNameFromEmail(correo);
    const iniciales = getInitials(nombre);

    const usuarioActivo = {
        nombre: nombre,
        correo: correo,
        iniciales: iniciales,
        carne: '',
        rol: 'Estudiante',
        institucion: 'Kinal'
    };

    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

    window.location.href = 'contactos.html';
}

function deriveNameFromEmail(email) {
    if (!email) return 'Usuario';
    const local = email.split('@')[0];
    const parts = local.split(/[._\-]/).filter(Boolean);
    if (parts.length >= 2) {
        return capitalize(parts[0]) + ' ' + capitalize(parts[1]);
    }
    return capitalize(parts[0]);
}

function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function getInitials(fullName) {
    if (!fullName) return '??';
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}
