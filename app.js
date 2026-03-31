document.addEventListener('DOMContentLoaded', () => {
    // --- 1. REFERENCIAS AL DOM ---
    const btnHack = document.getElementById('hack-btn');
    const inputUser = document.getElementById('username');
    const inputPass = document.getElementById('password');
    const accessMsg = document.getElementById('access-msg');
    const loginScreen = document.getElementById('login-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    const terminalOutput = document.getElementById('terminal-output');
    const cmdInput = document.getElementById('cmd-input');
    const cmdButtons = document.querySelectorAll('.cmd-btn');
    const hrCvLink = document.getElementById('hr-cv-link'); // [NUEVO] Referencia al botón de RRHH
    
    let commandHistory = [];

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

    // --- 2. BASE DE DATOS DE CV Y AYUDA ---
    const systemData = {
        help: `Comandos documentados: <br>- <span class="highlight">whoami</span>, <span class="highlight">sobre_mi</span>, <span class="highlight">experiencia</span>, <span class="highlight">formacion</span>, <span class="highlight">proyectos</span>, <span class="highlight">proyecto_destacado</span>, <span class="highlight">hackthebox</span>, <span class="highlight">cv</span>, <span class="highlight">contacto</span>, <span class="highlight">colaborar</span>, <span class="highlight">clear</span><br><br><span style="color:#ff3333;">>> PISTA TÉCNICA: Se han detectado funcionalidades de bash no listadas (CTF, logs, redes, matrix). Utilice la intuición...</span>`,
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
            - <strong>HackTheBox:</strong> <a href="https://app.hackthebox.com/users/1504123" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver Perfil Completo</a><br>
            <a href="https://app.hackthebox.com/users/1504123" target="_blank" rel="noopener noreferrer"><img src="https://www.hackthebox.eu/badge/image/1504123" alt="HTB Badge" class="badge-img"></a><br>
            - <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/alvaropavonmartinez/" target="_blank" rel="noopener noreferrer" style="color:var(--text-color);">Ver Perfil de LinkedIn</a>
        `,
        contacto: `
            >> DATOS DE CONTACTO:<br>
            - <span class="highlight">Email:</span> alvaropavonmartinez7@gmail.com<br>
            - <span class="highlight">Teléfono:</span> 662 44 37 94
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

    // --- 3. EVENTOS DE ANALÍTICA WEB (GA4) ---
    // Rastrea si alguien de RRHH descarga el CV sin entrar a la terminal
    if (hrCvLink) {
        hrCvLink.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'download_cv_hr', {
                    'event_category': 'engagement',
                    'event_label': 'Boton_RRHH_Bypass'
                });
            }
        });
    }

    // --- 4. FUNCIONES ASÍNCRONAS (Login y Efectos Visuales) ---
    async function typeWriterEffect(element, text, speed = 40) {
        element.value = '';
        for (let i = 0; i < text.length; i++) {
            element.value += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }

    function startMatrixEffect() {
        const canvas = document.getElementById('matrix-canvas');
        canvas.classList.remove('hidden');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];
        for(let x = 0; x < columns; x++) drops[x] = 1;
        
        const matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            for(let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }, 33);
        
        canvas.onclick = () => {
            clearInterval(matrixInterval);
            canvas.classList.add('hidden');
        };
    }

    btnHack.addEventListener('click', async () => {
        btnHack.disabled = true;
        
        // [NUEVO] Registrar entrada a la terminal en Analytics
        if (typeof gtag === 'function') {
            gtag('event', 'login_terminal_success', {
                'event_category': 'engagement'
            });
        }

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

    // --- 5. MOTOR PRINCIPAL DE EJECUCIÓN Y ROUTING DE COMANDOS ---
    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        if(cmd !== '' && cmd !== 'history') commandHistory.push(cmd);

        // [NUEVO] Enviar cada comando escrito a Google Analytics
        if (typeof gtag === 'function' && cmd !== '') {
            gtag('event', 'terminal_command', {
                'command_name': cmd
            });
        }

        const isRoot = document.body.classList.contains('root-mode');
        const currentPrompt = isRoot ? 'root@alvaro-os:~#' : 'guest@alvaro-os:~$';

        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">${currentPrompt}</span> <span>${escapeHTML(cmd)}</span>`;
        terminalOutput.appendChild(userLine);

        const responseBlock = document.createElement('div');
        responseBlock.className = 'output-block';

        if (cmd === '') {
            terminalOutput.removeChild(responseBlock);
            return;
        } 
        else if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        } 
        else if (cmd === 'date') {
            responseBlock.innerHTML = `> Hora del sistema: ${new Date().toLocaleString()}`;
        }
        else if (cmd === 'history') {
            if(commandHistory.length === 0) responseBlock.innerHTML = '> Historial vacío.';
            else responseBlock.innerHTML = commandHistory.map((c, i) => `${i + 1}  ${escapeHTML(c)}`).join('<br>');
        }
        else if (cmd === 'nmap' || cmd === 'scan' || cmd === 'nmap localhost') {
            responseBlock.innerHTML = `
                <p>Iniciando Nmap 7.93 ( https://nmap.org )</p>
                <p>Nmap scan report for localhost (127.0.0.1)</p>
                <p>PORT     STATE  SERVICE   REASON</p>
                <p>22/tcp   open   ssh       Administración Linux & Bash Scripting</p>
                <p>80/tcp   open   http      Desarrollo Web (HTML/CSS/JS)</p>
                <p>443/tcp  open   https     Ciberseguridad & OWASP</p>
                <p>3306/tcp open   mysql     Bases de Datos Relacionales (SQL)</p>
                <p>8080/tcp open   http-alt  Python & Java Backend</p>
            `;
        }
        else if (cmd === 'cat /etc/shadow') {
            if (isRoot) {
                // [NUEVO] Rastrea si alguien descubre la bandera del CTF
                if (typeof gtag === 'function') gtag('event', 'ctf_flag_found');
                
                responseBlock.innerHTML = `
                    <p style="word-wrap: break-word;">root:$6$hacker$flag{h1r3_m3_p134s3}:18000:0:99999:7:::</p>
                    <div class="highlight">[!] FELICIDADES, HAS CAPTURADO LA BANDERA (FLAG)</div>
                    <p>> Demostraste curiosidad y habilidades. Usa el comando 'colaborar' si estás en un proceso de selección.</p>
                `;
            } else {
                responseBlock.innerHTML = `<span class="error-msg">cat: /etc/shadow: Permiso denegado. (Prueba a escalar privilegios primero...)</span>`;
            }
        }
        else if (cmd === 'matrix') {
            responseBlock.innerHTML = '> Iniciando protocolo Matrix... (Haz clic en cualquier parte para salir)';
            startMatrixEffect();
        }
        else if (cmd === 'sudo su' || cmd === 'sudo') {
            if (isRoot) {
                responseBlock.innerHTML = '> Ya tienes privilegios máximos.';
            } else {
                document.body.classList.add('root-mode');
                document.querySelector('.input-line .prompt').textContent = 'root@alvaro-os:~#';
                responseBlock.innerHTML = `
                    <div class="highlight" style="display:inline-block; margin-bottom:10px;">[!] PRIVILEGIOS ESCALADOS [!]</div>
                    <p>> Acceso concedido al Root. Ahora puedes leer archivos restringidos.</p>
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
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
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

    // --- 6. EVENTOS GLOBALES ---
    const validCommands = Object.keys(systemData).concat(['clear', 'sudo su', 'exit', 'proyectos', 'cv', 'date', 'history', 'nmap', 'scan', 'matrix']);

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

    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.getAttribute('data-cmd'));
            cmdInput.focus(); 
        });
    });

    document.getElementById('terminal-wrapper').addEventListener('click', () => {
        cmdInput.focus();
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

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