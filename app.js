// Esperar a que el HTML esté completamente cargado antes de ejecutar JS
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CAPTURA DE REFERENCIAS DEL DOM ---
    // Guardamos en constantes los elementos HTML con los que vamos a interactuar
    const btnHack = document.getElementById('hack-btn');
    const inputUser = document.getElementById('username');
    const inputPass = document.getElementById('password');
    const accessMsg = document.getElementById('access-msg');
    const loginScreen = document.getElementById('login-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    const terminalOutput = document.getElementById('terminal-output');
    const cmdInput = document.getElementById('cmd-input');
    const cmdButtons = document.querySelectorAll('.cmd-btn');

    // --- 2. DICCIONARIO ESTÁTICO DE DATOS ---
    const asciiLogo = `
<div class="ascii-art">
    ___   __    _  __ ___   ___  ___ 
   / _ | / /   | |/ // _ | / _ \\/ _ \\
  / __ |/ /__  |   // __ |/ , _/ // /
 /_/ |_/____/  |__//_/ |_/_/|_|\\___/ 
                                     
---------------------------------------
 OS: Linux / Alvaro_OS
 Host: Portfolio Terminal v1.0
 Uptime: 2021 - Presente
 Shell: bash
 Rol: Programador Junior & Ciberseguridad
---------------------------------------
</div>`;

    // Objeto JSON que actúa como nuestra "Base de Datos" para las respuestas estándar de la terminal
    const systemData = {
        help: `Comandos disponibles: <br>- <span class="highlight">whoami</span>: Información del sistema<br>- <span class="highlight">sobre_mi</span>: Perfil profesional<br>- <span class="highlight">experiencia</span>: Historial laboral<br>- <span class="highlight">formacion</span>: Académico y cursos<br>- <span class="highlight">proyectos</span>: Descargar repositorios (GitHub)<br>- <span class="highlight">proyecto_destacado</span>: Deep Dive en StatTracker (PHP/MySQL)<br>- <span class="highlight">hackthebox</span>: Perfiles y Redes<br>- <span class="highlight">cv</span>: Descargar Currículum en PDF<br>- <span class="highlight">contacto</span>: Vías de comunicación<br>- <span class="highlight">colaborar</span>: Propuestas para desarrolladores<br>- <span class="highlight">clear</span>: Limpiar pantalla`,
        whoami: asciiLogo,
        sobre_mi: `Álvaro Pavón Martínez. Programador Junior especializado en el desarrollo de aplicaciones y automatización de procesos con Python. Cuento con experiencia práctica en entornos Linux y conocimientos sólidos en programación. Perfil resolutivo y autónomo con gran capacidad de adaptación e interés en infraestructuras complejas.`,
        experiencia: `
            <strong>> PlantaSur (2025)</strong><br>Programador Junior. Desarrollo de aplicaciones y scripts con Python. Automatización de procesos y generación de reportes.<br><br>
            <strong>> NanoBytes (2022)</strong><br>Programador Junior. Programación de aplicaciones con Python, JavaScript y gestión de bases de datos relacionales (SQL) en entornos ODOO.<br><br>
            <strong>> MediaMarkt (2021-2023) & Beep Informática (2021)</strong><br>Asesor / Dependiente sección informática. Instalación de sistemas, reparación y montaje de dispositivos.
        `,
        formacion: `
            >> FORMACIÓN REGLADA:<br>
            - Especialización Ciberseguridad | IES Zaidin Vergeles (2025-2026 - En curso).<br>
            - FPGS. Desarrollo de Aplicaciones Multiplataforma | Atlántida CIDEP (2023-2025).<br>
            - Certificado: Programación de sistemas informáticos | Academia El Futuro (2022). Administración y uso avanzado de terminal Linux y Bash Scripting.<br><br>
            >> FORMACIÓN COMPLEMENTARIA:<br>
            - Master completo en Java | Udemy (2022).<br>
            - Ciberseguridad | The Valley (2023).<br>
            - Internet Seguro | KLC Formación (2021).<br>
            - Desarrollo de Apps móviles, E-Commerce, Cloud Computing | EOI & Google (2019).
        `,
        proyecto_destacado: `
            >> DEEP DIVE: StatTracker - Gestión de Estadísticas de Salud<br>
            <span class="highlight">Descripción:</span> Aplicación web MVC en PHP y MySQL (PDO) para gestión de métricas corporales.<br>
            <span class="highlight">Seguridad:</span> Auditada bajo OWASP ASVS (Nivel 2). Uso de bcrypt para contraseñas y sentencias preparadas contra SQLi.<br>
            <span class="highlight">Repositorio:</span> <a href="https://github.com/AlvaroPavon/StatTracker" target="_blank" rel="noopener noreferrer" style="color:var(--text-color); font-weight:bold;">Ver proyecto en GitHub</a>
        `,
        hackthebox: `
            >> PERFILES TÉCNICOS Y REDES:<br>
            - <strong>HackTheBox:</strong> <a href="https://app.hackthebox.com/users/1504123?profile-top-tab=machines&ownership-period=1M&profile-bottom-tab=prolabs" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver Perfil Completo</a><br>
            <a href="https://app.hackthebox.com/users/1504123" target="_blank" rel="noopener noreferrer"><img src="https://www.hackthebox.eu/badge/image/1504123" alt="HTB Badge" class="badge-img"></a><br>
            - <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/alvaropavonmartinez/" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver Perfil de LinkedIn</a>
        `,
        contacto: `
            >> DATOS DE CONTACTO:<br>
            - <span class="highlight">Email:</span> <a href="mailto:alvaropavonmartinez7@gmail.com" style="color:inherit;">alvaropavonmartinez7@gmail.com</a><br>
            - <span class="highlight">Teléfono:</span> <a href="tel:+34662443794" style="color:inherit;">662 44 37 94</a>
        `,
        colaborar: `
            <div class="highlight" style="display:inline-block; margin-bottom:10px;">[>] OPCIONES DE COLABORACIÓN Y NETWORKING</div>
            <p>¿Buscas compañero para un CTF, necesitas apoyo en un proyecto backend o simplemente quieres hacer networking?</p><br>
            <p><strong>1. Escríbeme desde Gmail Web:</strong> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alvaropavonmartinez7@gmail.com&su=Propuesta%20de%20Colaboración" target="_blank" style="color:var(--text-color); text-decoration:underline;">Abrir Gmail en una pestaña nueva</a></p>
            <p><strong>2. Contactar por LinkedIn:</strong> <a href="https://www.linkedin.com/in/alvaropavonmartinez/" target="_blank" style="color:var(--text-color); text-decoration:underline;">Enviar un mensaje directo</a></p>
            <p><strong>3. Colaborar en código:</strong> <a href="https://github.com/AlvaroPavon" target="_blank" style="color:var(--text-color); text-decoration:underline;">Abrir un Issue o PR en mi GitHub</a></p><br>
            <p><em>O simplemente copia mi correo manualmente:</em> <span class="highlight" style="user-select: all;">alvaropavonmartinez7@gmail.com</span></p>
        `
    };

    // --- 3. LÓGICA ASÍNCRONA (Animación de Login) ---
    // Promesa para simular que un usuario teclea (efecto máquina de escribir)
    async function typeWriterEffect(element, text, speed = 40) {
        element.value = '';
        for (let i = 0; i < text.length; i++) {
            element.value += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }

    // Evento disparado al pulsar "HACK"
    btnHack.addEventListener('click', async () => {
        btnHack.disabled = true; // Previene múltiples clics
        
        // Ejecución asíncrona secuencial (await)
        await typeWriterEffect(inputUser, 'root_access');
        await typeWriterEffect(inputPass, '********');
        
        btnHack.classList.add('hidden');
        accessMsg.classList.remove('hidden');

        // Transición CSS para desvanecer el login y mostrar la terminal
        setTimeout(() => {
            loginScreen.classList.add('fade-out');
            setTimeout(() => {
                loginScreen.classList.add('hidden'); // Elimina el elemento del flujo visual
                portfolioContent.classList.remove('hidden'); // Muestra el contenedor principal
                cmdInput.focus(); // Coloca el cursor directamente en la línea de comandos
            }, 500); // Da tiempo a la transición de opacidad del CSS
        }, 800);
    });

    // --- 4. MOTOR PRINCIPAL DEL INTÉRPRETE DE COMANDOS ---
    function executeCommand(command) {
        // Normalización: convierte a minúsculas y quita espacios extra en los bordes
        const cmd = command.toLowerCase().trim();
        
        // Verifica si hemos inyectado la clase 'root-mode' en el body
        const isRoot = document.body.classList.contains('root-mode');
        // Define el nombre del usuario dinámicamente según los permisos
        const currentPrompt = isRoot ? 'root@alvaro-os:~#' : 'guest@alvaro-os:~$';

        // Imprimir en el historial el comando que introdujo el usuario
        const userLine = document.createElement('p');
        // Usamos escapeHTML para evitar que nos inyecten código malicioso mediante el input
        userLine.innerHTML = `<span class="prompt">${currentPrompt}</span> <span>${escapeHTML(cmd)}</span>`;
        terminalOutput.appendChild(userLine);

        // Crear el contenedor para la respuesta del sistema
        const responseBlock = document.createElement('div');
        responseBlock.className = 'output-block';

        // LÓGICA DE ENRUTAMIENTO DE COMANDOS (IF/ELSE IF)
        if (cmd === '') {
            terminalOutput.removeChild(responseBlock); // Si está vacío, no imprime bloque de respuesta
            return;
        } 
        
        if (cmd === 'clear') {
            terminalOutput.innerHTML = ''; // Borra el DOM del historial
            return;
        } 
        
        if (cmd === 'sudo su' || cmd === 'sudo') {
            if (isRoot) {
                responseBlock.innerHTML = '> Ya tienes privilegios máximos.';
            } else {
                document.body.classList.add('root-mode'); // Cambia el CSS global a rojo
                document.querySelector('.input-line .prompt').textContent = 'root@alvaro-os:~#';
                responseBlock.innerHTML = `
                    <div class="highlight" style="display:inline-block; margin-bottom:10px;">[!] PRIVILEGIOS ESCALADOS [!]</div>
                    <p>> Acceso concedido al Easter Egg.</p>
                    <p>> Escribe <span class="highlight">exit</span> para cerrar la sesión segura y volver al modo normal.</p>
                `;
            }
        } 
        
        else if (cmd === 'exit') {
            if (isRoot) {
                document.body.classList.remove('root-mode'); // Revoca los privilegios (Vuelve a verde)
                document.querySelector('.input-line .prompt').textContent = 'guest@alvaro-os:~$';
                responseBlock.innerHTML = '> Cerrando sesión root... Privilegios devueltos a guest.';
            } else {
                responseBlock.innerHTML = '> Ya estás en la sesión estándar. Nada que cerrar.';
            }
        } 
        
        else if (cmd === 'cv') {
            // Script para forzar la descarga de un archivo local de forma transparente
            const link = document.createElement('a');
            link.href = 'Alvaro_Pavon_Martinez_IT.pdf'; // Ruta del archivo
            link.download = 'Alvaro_Pavon_CV.pdf'; // Nombre que verá el usuario al descargar
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            responseBlock.innerHTML = '> Iniciando descarga del documento PDF original...';
        } 
        
        else if (cmd === 'proyectos') {
            responseBlock.innerHTML = '> Estableciendo conexión con la API de GitHub...';
            terminalOutput.appendChild(responseBlock);
            fetchGitHubRepos(responseBlock); // Delega la ejecución a la función Fetch
            return; 
        } 
        
        else if (systemData[cmd]) {
            // Busca directamente la clave en el objeto JSON de la base de datos
            responseBlock.innerHTML = systemData[cmd];
        } 
        
        else {
            // Gestión de errores: el comando no se reconoce
            responseBlock.innerHTML = `<span class="error-msg">bash: ${escapeHTML(cmd)}: command not found. Escriba 'help'.</span>`;
        }

        // Inyecta el bloque en el historial y fuerza el scroll hacia abajo
        terminalOutput.appendChild(responseBlock);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // --- 5. EVENTOS DE TECLADO Y AUTOCOMPLETADO ---
    // Array que agrupa todas las claves estáticas y dinámicas para el autocompletado
    const validCommands = Object.keys(systemData).concat(['clear', 'sudo su', 'exit', 'proyectos', 'cv']);

    cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(cmdInput.value); // Dispara el motor
            cmdInput.value = ''; // Limpia el input para el siguiente comando
        } else if (e.key === 'Tab') {
            e.preventDefault(); // Evita que la tecla Tab cambie de elemento HTML en el navegador
            const currentVal = cmdInput.value.toLowerCase();
            if (currentVal) {
                // Busca la primera coincidencia en el array de comandos válidos
                const match = validCommands.find(c => c.startsWith(currentVal));
                if (match) cmdInput.value = match; // Autocompleta
            }
        }
    });

    // --- 6. EVENTOS DE LOS BOTONES DEL MENÚ ---
    // Asigna un escuchador a todos los botones, recuperando el atributo 'data-cmd'
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.getAttribute('data-cmd'));
            cmdInput.focus(); // Devuelve la atención a la línea de comandos
        });
    });

    // Mejora de usabilidad (UX): Al hacer clic en cualquier lado de la consola negra, selecciona el input
    document.getElementById('terminal-wrapper').addEventListener('click', () => {
        cmdInput.focus();
    });

    // --- 7. CIBERSEGURIDAD: PREVENCIÓN XSS ---
    // Función utilitaria que convierte caracteres especiales a entidades HTML, impidiendo la ejecución de scripts
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    // --- 8. CONSUMO DE APIS EXTERNAS (FETCH) ---
    async function fetchGitHubRepos(container) {
        try {
            // Llamada asíncrona a la API pública de GitHub para obtener repositorios ordenados por actualización
            const response = await fetch(`https://api.github.com/users/AlvaroPavon/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Error API');
            
            const repos = await response.json();
            container.innerHTML = '>> Repositorios descargados correctamente:<br>';
            
            const grid = document.createElement('div');
            grid.className = 'grid';

            // Iteramos sobre el JSON devuelto
            repos.forEach(repo => {
                if(!repo.fork) { // Discriminamos los proyectos que no son de autoría propia (forks)
                    const card = document.createElement('div');
                    card.className = 'card';
                    // Inyección de Nodos al DOM aplicando escapeHTML para proteger frente a descripciones maliciosas inyectadas en GitHub
                    card.innerHTML = `<strong>> <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHTML(repo.name)}</a></strong><br>Lang: ${escapeHTML(repo.language || 'Multi')}`;
                    grid.appendChild(card);
                }
            });
            
            container.appendChild(grid);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
        } catch (error) {
            // Manejo de errores de red o fallo de la API
            container.innerHTML = '<span class="error-msg">> [ERROR] Fallo al contactar con github.com. Revise su conexión.</span>';
        }
    }
});