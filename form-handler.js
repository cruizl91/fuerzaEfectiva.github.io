document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dotacionForm');
    const displayInput = document.getElementById('registro-datetime-display');
    const submitInput = document.getElementById('registro-datetime-submit');
    
    // Función para obtener la zona horaria del sistema del usuario (ej: "America/Santiago")
    const getTimezone = () => {
        // La zona horaria se obtiene solo una vez, al cargar el script.
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    const userTimeZone = getTimezone();

    // Función que lee la hora actual, la formatea y actualiza los campos
    const setDateTimeAutomatico = () => {
        const now = new Date();
        
        // Opciones de formato para la visualización (Ej: "19/11/2025 15:54:43 CLST")
        const options = {
            year: '2-digit', // Cambiado a 2-digit para más espacio
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'short',
            timeZone: userTimeZone
        };

        // 1. Valor para mostrar al usuario (legible y en hora local/zona horaria)
        const displayValue = now.toLocaleDateString('es-CL', options).replace(/, /g, ' '); // Formatear para mejor visualización
        
        // 2. Valor para enviar al servidor (formato ISO + Zona Horaria)
        const isoString = now.toISOString().slice(0, 19); // YYYY-MM-DDTHH:MM:SS
        const submitValue = `${isoString}[${userTimeZone}]`;

        // Rellenar los campos de Solo Lectura y Oculto
        displayInput.value = displayValue;
        submitInput.value = submitValue;
    };

    // ----------------------------------------------------
    // INICIAR EL RELOJ CONTINUO: Ejecuta la función cada segundo
    // ----------------------------------------------------
    setDateTimeAutomatico(); // Llama una vez inmediatamente para evitar un retraso inicial
    setInterval(setDateTimeAutomatico, 1000); // Llama cada 1000 milisegundos (1 segundo)


    // Función principal que maneja el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {};
        
        // Convertir todos los datos del formulario a un objeto
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        console.log("Datos a enviar al servidor (incluye zona horaria):", data);
        
        // Simulación de éxito (Manteniendo el código de ejemplo)
        document.getElementById('mensaje-respuesta').textContent = `Registro guardado. Fecha/Hora de envío: ${data['fecha_hora_registro_tz']}`;
        document.getElementById('mensaje-respuesta').style.color = 'green';
    });
});