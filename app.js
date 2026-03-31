document.addEventListener('DOMContentLoaded', () => {
    const btnHack = document.getElementById('hack-btn');
    const inputUser = document.getElementById('username');
    const inputPass = document.getElementById('password');
    const accessMsg = document.getElementById('access-msg');
    const loginScreen = document.getElementById('login-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    const terminalOutput = document.getElementById('terminal-output');
    const cmdInput = document.getElementById('cmd-input');
    const cmdButtons = document.querySelectorAll('.cmd-btn');

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

    // Base de datos de CV
    const systemData = {
        help: `Comandos disponibles: <br>- <span class="highlight">whoami</span>: Información del sistema<br>- <span class="highlight">sobre_mi</span>: Perfil profesional<br>- <span class="highlight">experiencia</span>: Historial laboral<br>- <span class="highlight">formacion</span>: Académico y cursos<br>- <span class="highlight">proyectos</span>: Descargar repositorios (GitHub)<br>- <span class="highlight">proyecto_destacado</span>: Deep Dive en StatTracker (PHP/MySQL)<br>- <span class="highlight">hackthebox</span>: Perfiles y Redes<br>- <span class="highlight">cv</span>: Descargar Currículum en PDF<br>- <span class="highlight">contacto</span>: Vías de comunicación<br>- <span class="highlight">clear</span>: Limpiar pantalla`,
        
        whoami: asciiLogo,

        sobre_mi: `Álvaro Pavón Martínez. Programador Junior especializado en el desarrollo de aplicaciones y automatización de procesos con Python. Cuento con experiencia práctica en entornos Linux y conocimientos sólidos en programación. Soy un perfil resolutivo y autónomo, con gran capacidad de adaptación y muchas ganas de aprender y desarrollarme en entornos multiplataforma de gran escala e infraestructuras complejas.`,
        
        experiencia: `
            <strong>> PlantaSur (2025)</strong><br>Programador Junior. Desarrollo de aplicaciones y scripts con Python. Automatización de procesos y generación de reportes.<br><br>
            <strong>> NanoBytes (2022)</strong><br>Programador Junior. Programación de aplicaciones con Python, JavaScript y gestión de bases de datos relacionales (SQL) en entornos ODOO.<br><br>
            <strong>> MediaMarkt (2021-2023) & Beep Informática (2021)</strong><br>Asesor / Dependiente sección informática. Instalación de sistemas, reparación y montaje de dispositivos y atención al cliente.
        `,
        
        formacion: `
            >> FORMACIÓN REGLADA:<br>
            - Especialización Ciberseguridad | IES Zaidin Vergeles (2025-2026 - En curso).<br>
            - FPGS. Desarrollo de Aplicaciones Multiplataforma | Atlántida CIDEP (2023-2025).<br>
            - Certificado: Programación de sistemas informáticos | Academia El Futuro (2022). Administración y uso avanzado de terminal en sistemas Linux, incluyendo Bash Scripting.<br><br>
            >> FORMACIÓN COMPLEMENTARIA:<br>
            - Ciberseguridad | The Valley (2023).<br>
            - Master completo en Java | Udemy (2022).<br>
            - Internet Seguro | KLC Formación (2021).<br>
            - Desarrollo de Apps móviles, E-Commerce, Cloud Computing | EOI & Google (2019).<br>
            - Introducción al Desarrollo Web | IEI & Google (2017).
        `,

        proyecto_destacado: `
            >> DEEP DIVE: StatTracker - Gestión de Estadísticas de Salud<br>
            <span class="highlight">Descripción:</span> Aplicación web MVC desarrollada en PHP (Nativo), MySQL (PDO), JS (Chart.js) y Tailwind CSS para el registro y gestión de métricas corporales (peso, altura, cálculo automático de IMC).<br>
            <span class="highlight">Desarrollo:</span> Implementa sistema de autenticación seguro (bcrypt), historial interactivo de evolución, aislamiento de datos por usuario y código probado con más de un 85% de cobertura en tests unitarios (PHPUnit).<br>
            <span class="highlight">Seguridad:</span> Auditada bajo el estándar OWASP ASVS (Nivel 2), con mitigación contra SQLi mediante el uso de sentencias preparadas y protección con tokens Anti-CSRF.<br>
            <span class="highlight">Repositorio:</span> <a href="https://github.com/AlvaroPavon/StatTracker" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver proyecto en GitHub</a>
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
        `
    };

    // --- LÓGICA DE LOGIN ---
    async function typeWriterEffect(element, text, speed = 40) {
        element.value = '';
        for (let i = 0; i < text.length; i++) {
            element.value += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }

    btnHack.addEventListener('click', async () => {
        btnHack.disabled = true;
        await typeWriterEffect(inputUser, 'root_access');
        await typeWriterEffect(inputPass, '********');
        btnHack.classList.add('hidden');
        accessMsg.classList.remove('hidden');

        setTimeout(() => {
            loginScreen.classList.add('fade-out');
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                portfolioContent.classList.remove('hidden');
                cmdInput.focus(); 
            }, 500);
        }, 800);
    });

    // --- LÓGICA DEL INTÉRPRETE DE COMANDOS ---
    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        const isRoot = document.body.classList.contains('root-mode');
        const currentPrompt = isRoot ? 'root@alvaro-os:~#' : 'guest@alvaro-os:~$';

        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">${currentPrompt}</span> <span>${escapeHTML(cmd)}</span>`;
        terminalOutput.appendChild(userLine);

        const responseBlock = document.createElement('div');
        responseBlock.className = 'output-block';

        if (cmd === '') {
            terminalOutput.removeChild(responseBlock);
        } else if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (cmd === 'sudo su' || cmd === 'sudo') {
            if (isRoot) {
                responseBlock.innerHTML = '> Ya tienes privilegios máximos.';
            } else {
                document.body.classList.add('root-mode');
                document.querySelector('.input-line .prompt').textContent = 'root@alvaro-os:~#';
                responseBlock.innerHTML = `
                    <div class="highlight" style="display:inline-block; margin-bottom:10px;">[!] PRIVILEGIOS ESCALADOS [!]</div>
                    <p>> Acceso concedido. ¡Felicidades por encontrar el Easter Egg!</p>
                    <p>> Escribe <span class="highlight">exit</span> para cerrar la sesión segura y volver al modo normal.</p>
                `;
            }
            terminalOutput.appendChild(responseBlock);
        } else if (cmd === 'exit') {
            if (isRoot) {
                document.body.classList.remove('root-mode');
                document.querySelector('.input-line .prompt').textContent = 'guest@alvaro-os:~$';
                responseBlock.innerHTML = '> Cerrando sesión root... Privilegios devueltos a guest.';
            } else {
                responseBlock.innerHTML = '> Ya estás en la sesión estándar.';
            }
            terminalOutput.appendChild(responseBlock);
        } else if (cmd === 'cv' || cmd === 'download_cv') {
            // Generar descarga
            const link = document.createElement('a');
            link.href = 'Alvaro_Pavon_Martinez_IT.pdf';
            link.download = 'Alvaro_Pavon_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            responseBlock.innerHTML = '> Iniciando descarga del documento PDF original...';
            terminalOutput.appendChild(responseBlock);
        } else if (cmd === 'proyectos') {
            responseBlock.innerHTML = '> Estableciendo conexión con la API de GitHub...';
            terminalOutput.appendChild(responseBlock);
            fetchGitHubRepos(responseBlock);
        } else if (systemData[cmd]) {
            responseBlock.innerHTML = systemData[cmd];
            terminalOutput.appendChild(responseBlock);
        } else {
            responseBlock.innerHTML = `<span class="error-msg">bash: ${escapeHTML(cmd)}: command not found. Escriba 'help'.</span>`;
            terminalOutput.appendChild(responseBlock);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Autocompletado (TAB) y Enter
    const validCommands = Object.keys(systemData).concat(['clear', 'sudo su', 'exit', 'proyectos', 'cv']);

    cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(cmdInput.value);
            cmdInput.value = ''; 
        } else if (e.key === 'Tab') {
            e.preventDefault(); 
            const currentVal = cmdInput.value.toLowerCase();
            if (currentVal) {
                const match = validCommands.find(c => c.startsWith(currentVal));
                if (match) cmdInput.value = match;
            }
        }
    });

    // Escuchar botones
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.getAttribute('data-cmd'));
            cmdInput.focus();
        });
    });

    // Mantener foco
    document.getElementById('terminal-wrapper').addEventListener('click', () => {
        cmdInput.focus();
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    // --- FETCH GITHUB API SEGURA ---
    async function fetchGitHubRepos(container) {
        try {
            const response = await fetch(`https://api.github.com/users/AlvaroPavon/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Error API');
            
            const repos = await response.json();
            container.innerHTML = '>> Repositorios descargados correctamente:<br>';
            
            const grid = document.createElement('div');
            grid.className = 'grid';

            repos.forEach(repo => {
                if(repo.fork) return;
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<strong>> <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHTML(repo.name)}</a></strong><br>Lang: ${escapeHTML(repo.language || 'Multi')}`;
                grid.appendChild(card);
            });
            container.appendChild(grid);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        } catch (error) {
            container.innerHTML = '<span class="error-msg">> [ERROR] Fallo al contactar con github.com.</span>';
        }
    }
});