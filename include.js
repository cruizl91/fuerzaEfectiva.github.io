/**
 * Función para cargar contenido de un archivo en un elemento placeholder.
 * @param {string} url - Ruta al archivo HTML (ej: 'header.html')
 * @param {string} targetId - ID del elemento donde se insertará el contenido (ej: 'header-placeholder')
 */
function loadHTML(url, targetId) {
    fetch(url)
        .then(response => {
            // Verifica que la solicitud fue exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Inserta el contenido HTML en el placeholder
            document.getElementById(targetId).innerHTML = data;
            
            // **CRÍTICO: Inicializar el menú SÓLO después de cargar el header**
            if (targetId === 'header-placeholder') {
                // Asegúrate de que la función initializeMenuToggle exista antes de llamarla
                if (typeof initializeMenuToggle === 'function') {
                    initializeMenuToggle();
                } else {
                    console.error("Error: initializeMenuToggle no está definida. Asegúrate de cargar menu-toggle.js");
                }
            }
        })
        .catch(error => {
            console.error(`Error cargando el archivo ${url}:`, error);
        });
}

// Cargar el header y el footer al cargar la página
window.onload = function() {
    loadHTML('header.html', 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder');
};