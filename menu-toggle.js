/**
 * Inicializa la lógica del menú de hamburguesa.
 * Es llamado desde include.js después de insertar el header.
 */
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.nav-links');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && mainNav && menuIcon) {
        menuToggle.addEventListener('click', () => {
            // 1. Toggle la clase 'active' que despliega el menú en CSS
            mainNav.classList.toggle('active');
            
            // 2. Cambiar el ícono (hamburguesa <-> X)
            if (mainNav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                menuToggle.setAttribute('aria-label', 'Cerrar Menú');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir Menú');
            }
        });
    }
}