document.addEventListener('DOMContentLoaded', () => {
    // --- REFERENCIAS AL DOM ---
    const btnHack = document.getElementById('hack-btn');
    const inputUser = document.getElementById('username');
    const inputPass = document.getElementById('password');
    const accessMsg = document.getElementById('access-msg');
    const loginScreen = document.getElementById('login-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    const terminalOutput = document.getElementById('terminal-output');
    const cmdInput = document.getElementById('cmd-input');
    const cmdButtons = document.querySelectorAll('.cmd-btn');

    // --- ARTE ASCII ---
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

    // --- BASE DE DATOS DEL CURRÍCULUM ---
    const systemData = {
        help: `Comandos disponibles: <br>- <span class="highlight">whoami</span>: Información del sistema<br>- <span class="highlight">sobre_mi</span>: Perfil profesional<br>- <span class="highlight">experiencia</span>: Historial laboral<br>- <span class="highlight">formacion</span>: Académico y cursos<br>- <span class="highlight">proyectos</span>: Descargar repositorios (GitHub)<br>- <span class="highlight">proyecto_destacado</span>: Deep Dive en StatTracker (PHP/MySQL)<br>- <span class="highlight">hackthebox</span>: Perfiles y Redes<br>- <span class="highlight">cv</span>: Descargar Currículum en PDF<br>- <span class="highlight">contacto</span>: Vías de comunicación<br>- <span class="highlight">colaborar</span>: Propuestas para desarrolladores<br>- <span class="highlight">clear</span>: Limpiar pantalla`,
        
        whoami: asciiLogo,

        sobre_mi: `Álvaro Pavón Martínez. Programador Junior especializado en el desarrollo de aplicaciones y automatización de procesos con Python[cite: 30]. Cuento con experiencia práctica en entornos Linux y conocimientos sólidos en programación[cite: 31]. Perfil resolutivo y autónomo con gran capacidad de adaptación e interés en infraestructuras complejas[cite: 32].`,
        
        experiencia: `
            <strong>> PlantaSur (2025)</strong><br>Programador Junior. Desarrollo de aplicaciones y scripts con Python. Automatización de procesos y generación de reportes[cite: 4, 5, 6].<br><br>
            <strong>> NanoBytes (2022)</strong><br>Programador Junior. Programación de aplicaciones con Python, JavaScript y gestión de bases de datos relacionales (SQL) en entornos ODOO[cite: 9, 10, 11].<br><br>
            <strong>> MediaMarkt (2021-2023) & Beep Informática (2021)</strong><br>Asesor / Dependiente sección informática[cite: 7, 12]. Instalación de sistemas, reparación y montaje de dispositivos[cite: 7, 13].
        `,
        
        formacion: `
            >> FORMACIÓN REGLADA:<br>
            - Especialización Ciberseguridad | IES Zaidin Vergeles (2025-2026 - En curso)[cite: 16].<br>
            - FPGS. Desarrollo de Aplicaciones Multiplataforma | Atlántida CIDEP (2023-2025)[cite: 16, 17].<br>
            - Certificado: Programación de sistemas informáticos | Academia El Futuro (2022)[cite: 18, 19]. Administración y uso avanzado de terminal Linux y Bash Scripting[cite: 19].<br><br>
            >> FORMACIÓN COMPLEMENTARIA:<br>
            - Master completo en Java | Udemy (2022)[cite: 23].<br>
            - Ciberseguridad | The Valley (2023)[cite: 22].<br>
            - Internet Seguro | KLC Formación (2021)[cite: 24].<br>
            - Desarrollo de Apps móviles, E-Commerce, Cloud Computing | EOI & Google (2019)[cite: 25, 26].
        `,

        proyecto_destacado: `
            >> DEEP DIVE: StatTracker - Gestión de Estadísticas de Salud<br>
            <span class="highlight">Descripción:</span> Aplicación web MVC en PHP y MySQL (PDO) para gestión de métricas corporales.<br>
            <span class="highlight">Seguridad:</span> Auditada bajo OWASP ASVS (Nivel 2). Uso de bcrypt para contraseñas y sentencias preparadas contra SQLi.<br>
            <span class="highlight">Repositorio:</span> <a href="https://github.com/AlvaroPavon/StatTracker" target="_blank" rel="noopener noreferrer" style="color:var(--text-color); font-weight:bold;">Ver proyecto en GitHub</a>
        `,

        hackthebox: `
            >> PERFILES TÉCNICOS Y REDES:<br>
            - <strong>HackTheBox:</strong> <a href="https://app.hackthebox.com/users/1504123?profile-top-tab=machines&ownership-period=1M&profile-bottom-tab=prolabs" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver Perfil Completo</a> [cite: 53]<br>
            <a href="https://app.hackthebox.com/users/1504123" target="_blank" rel="noopener noreferrer"><img src="https://www.hackthebox.eu/badge/image/1504123" alt="HTB Badge" class="badge-img"></a><br>
            - <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/alvaropavonmartinez/" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver Perfil de LinkedIn</a> [cite: 52]
        `,

        contacto: `
            >> DATOS DE CONTACTO:<br>
            - <span class="highlight">Email:</span> alvaropavonmartinez7@gmail.com [cite: 35]<br>
            - <span class="highlight">Teléfono:</span> 662 44 37 94 [cite: 34]
        `,

        colaborar: `
            <div class="highlight" style="display:inline-block; margin-bottom:10px;">[>] OPCIONES DE COLABORACIÓN Y NETWORKING</div>
            <p>¿Buscas compañero para un CTF, necesitas apoyo en un proyecto backend o simplemente quieres hacer networking?</p>
            <br>
            <p><strong>1. Escríbeme desde Gmail Web:</strong> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alvaropavonmartinez7@gmail.com&su=Propuesta%20de%20Colaboración" target="_blank" style="color:var(--text-color); text-decoration:underline;">Abrir Gmail en una pestaña nueva</a></p>
            <p><strong>2. Contactar por LinkedIn:</strong> <a href="https://www.linkedin.com/in/alvaropavonmartinez/" target="_blank" style="color:var(--text-color); text-decoration:underline;">Enviar un mensaje directo</a> [cite: 52]</p>
            <p><strong>3. Colaborar en código:</strong> <a href="https://github.com/AlvaroPavon" target="_blank" style="color:var(--text-color); text-decoration:underline;">Abrir un Issue o PR en mi GitHub</a></p>
            <br>
            <p><em>O simplemente copia mi correo manualmente:</em> <span class="highlight" style="user-select: all;">alvaropavonmartinez7@gmail.com</span> [cite: 35]</p>
        `
    };

    // --- LÓGICA DE ANIMACIÓN DE LOGIN ---
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

        // Transición a la terminal principal
        setTimeout(() => {
            loginScreen.classList.add('fade-out');
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                portfolioContent.classList.remove('hidden');
                cmdInput.focus(); 
            }, 500);
        }, 800);
    });

    // --- MOTOR PRINCIPAL DEL INTÉRPRETE DE COMANDOS ---
    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        const isRoot = document.body.classList.contains('root-mode');
        const currentPrompt = isRoot ? 'root@alvaro-os:~#' : 'guest@alvaro-os:~$';

        // Imprimir comando introducido
        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">${currentPrompt}</span> <span>${escapeHTML(cmd)}</span>`;
        terminalOutput.appendChild(userLine);

        const responseBlock = document.createElement('div');
        responseBlock.className = 'output-block';

        if (cmd === '') {
            terminalOutput.removeChild(responseBlock);
            return;
        } 
        
        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        } 
        
        if (cmd === 'sudo su' || cmd === 'sudo') {
            if (isRoot) {
                responseBlock.innerHTML = '> Ya tienes privilegios máximos.';
            } else {
                document.body.classList.add('root-mode');
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
                document.body.classList.remove('root-mode');
                document.querySelector('.input-line .prompt').textContent = 'guest@alvaro-os:~$';
                responseBlock.innerHTML = '> Cerrando sesión root... Privilegios devueltos a guest.';
            } else {
                responseBlock.innerHTML = '> Ya estás en la sesión estándar. Nada que cerrar.';
            }
        } 
        
        else if (cmd === 'cv') {
            const link = document.createElement('a');
            link.href = 'Alvaro_Pavon_Martinez_IT.pdf';
            link.download = 'Alvaro_Pavon_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            responseBlock.innerHTML = '> Iniciando descarga del documento PDF original...';
        } 
        
        else if (cmd === 'proyectos') {
            responseBlock.innerHTML = '> Estableciendo conexión con la API de GitHub...';
            terminalOutput.appendChild(responseBlock);
            fetchGitHubRepos(responseBlock);
            return; 
        } 
        
        else if (systemData[cmd]) {
            responseBlock.innerHTML = systemData[cmd];
        } 
        
        else {
            responseBlock.innerHTML = `<span class="error-msg">bash: ${escapeHTML(cmd)}: command not found. Escriba 'help'.</span>`;
        }

        terminalOutput.appendChild(responseBlock);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // --- EVENTOS DE TECLADO ---
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

    // --- EVENTOS DE BOTONES ---
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.getAttribute('data-cmd'));
            cmdInput.focus(); 
        });
    });

    document.getElementById('terminal-wrapper').addEventListener('click', () => {
        cmdInput.focus();
    });

    // --- SEGURIDAD XSS ---
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    // --- API DE GITHUB ---
    async function fetchGitHubRepos(container) {
        try {
            const response = await fetch(`https://api.github.com/users/AlvaroPavon/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Error API');
            
            const repos = await response.json();
            container.innerHTML = '>> Repositorios descargados correctamente:<br>';
            
            const grid = document.createElement('div');
            grid.className = 'grid';

            repos.forEach(repo => {
                if(!repo.fork) {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `<strong>> <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHTML(repo.name)}</a></strong><br>Lang: ${escapeHTML(repo.language || 'Multi')}`;
                    grid.appendChild(card);
                }
            });
            
            container.appendChild(grid);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
        } catch (error) {
            container.innerHTML = '<span class="error-msg">> [ERROR] Fallo al contactar con github.com.</span>';
        }
    }
});