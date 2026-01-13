function toggleFavorite(button) {
    // Alterna la clase que pone la estrella amarilla
    button.classList.toggle('fav-active');
    
    // Feedback visual opcional en consola
    const contactName = button.closest('.contact-item-pro').querySelector('h6').innerText;
    
    if (button.classList.contains('fav-active')) {
        console.log("Añadido a favoritos: " + contactName);
        button.title = "Quitar de favoritos";
    } else {
        console.log("Eliminado de favoritos: " + contactName);
        button.title = "Agregar a favoritos";
    }
}