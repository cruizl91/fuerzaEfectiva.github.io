// La lógica se envuelve en una función que es llamada por include.js (solución a la sincronización)
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        
        // 1. Lógica para el botón hamburguesa (MENÚ PRINCIPAL)
        menuToggle.addEventListener('click', function() {
            const navUl = navLinks.querySelector('ul');
            
            navLinks.classList.toggle('active');
            
            // Lógica para cambiar el icono
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                
                // CLAVE: Calcular la altura dinámica del menú principal
                navLinks.style.height = navUl.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navLinks.style.height = '0'; // Cierra el menú
            }
        });
    }

    // 2. Lógica para el submenú "Gestionar Registro" (SOLO EN MÓVIL)
    const submenuParentLink = document.querySelector('.has-submenu > a');
    if (submenuParentLink) {
        submenuParentLink.addEventListener('click', function(e) {
            
            // Solo actuar si estamos en móvil O si el enlace no tiene URL
            if (window.innerWidth <= 700 || submenuParentLink.getAttribute('href') === '#') {
                e.preventDefault(); 
                const parentLi = submenuParentLink.parentElement;
                
                // Alternar la clase 'open' para mostrar/ocultar el submenú en CSS
                parentLi.classList.toggle('open'); 

                // CLAVE: Recalcular la altura del menú principal .nav-links para el submenú
                const navUl = navLinks.querySelector('ul');
                
                // Usamos un pequeño retraso para asegurar que el DOM se actualice antes de calcular el scrollHeight
                setTimeout(() => { 
                    if (navLinks.classList.contains('active')) {
                        navLinks.style.height = navUl.scrollHeight + 'px';
                    }
                }, 50);
            }
        });
    }
}
// La función NO se llama aquí. Es llamada por include.js después de cargar el header.