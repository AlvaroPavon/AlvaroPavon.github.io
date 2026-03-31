document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM (Login)
    const btnHack = document.getElementById('hack-btn');
    const inputUser = document.getElementById('username');
    const inputPass = document.getElementById('password');
    const accessMsg = document.getElementById('access-msg');
    const loginScreen = document.getElementById('login-screen');
    const portfolioContent = document.getElementById('portfolio-content');

    // Referencias al DOM (Terminal)
    const terminalOutput = document.getElementById('terminal-output');
    const cmdInput = document.getElementById('cmd-input');
    const cmdButtons = document.querySelectorAll('.cmd-btn');

    // Base de datos de respuestas estáticas (Información de tu CV)
    const systemData = {
        help: `Comandos disponibles: <br>- <span class="highlight">sobre_mi</span>: Perfil profesional<br>- <span class="highlight">experiencia</span>: Historial laboral<br>- <span class="highlight">formacion</span>: Historial académico<br>- <span class="highlight">capacidades</span>: Tecnologías y aptitudes<br>- <span class="highlight">proyectos</span>: Descargar repositorios de GitHub<br>- <span class="highlight">clear</span>: Limpiar pantalla`,
        
        sobre_mi: `Programador Junior especializado en el desarrollo de aplicaciones y automatización de procesos con Python. Cuento con experiencia práctica en entornos Linux y conocimientos sólidos en programación. Soy un perfil resolutivo y autónomo, con gran capacidad de adaptación.`,
        
        experiencia: `
            <strong>> PlantaSur (2025)</strong><br>Programador Junior. Desarrollo de aplicaciones y scripts con Python. Automatización de procesos.<br><br>
            <strong>> NanoBytes (2022)</strong><br>Programador Junior. Programación de aplicaciones con Python, JavaScript y gestión de bases de datos relacionales (SQL) en entornos ODOO.<br><br>
            <strong>> MediaMarkt & Beep Informática (2021-2023)</strong><br>Asesor / Dependiente sección informática.
        `,
        
        formacion: `
            - Especializacion Ciberseguridad | IES Zaidin Vergeles (2025-2026)<br>
            - FPGS. Desarrollo de Aplicaciones Multiplataforma | Atlántida CIDEP (2023-2025)<br>
            - Certificado de Profesionalidad. Programación de sistemas informáticos | Academia El Futuro (2022)
        `,

        capacidades: `Python, Java / C, Linux / Bash Scripting, SQL, Debugging. Autónomo, Resolutivo y Dinámico.`
    };

    // --- 1. LÓGICA DE LOGIN ---
    async function typeWriterEffect(element, text, speed = 50) {
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
                cmdInput.focus(); // Autoseleccionar la línea de comandos
            }, 500);
        }, 800);
    });

    // --- 2. LÓGICA DEL INTÉRPRETE DE COMANDOS ---
    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        // Mostrar en pantalla el comando que el usuario ha introducido (Protección XSS con textContent)
        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">guest@alvaro-os:~$</span> <span>${escapeHTML(cmd)}</span>`;
        terminalOutput.appendChild(userLine);

        // Bloque de respuesta
        const responseBlock = document.createElement('div');
        responseBlock.className = 'output-block';

        if (cmd === '') {
            // No hacer nada si pulsa enter en blanco
            terminalOutput.removeChild(responseBlock);
        } else if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (cmd === 'proyectos') {
            responseBlock.innerHTML = 'Estableciendo conexión con la API de GitHub...';
            terminalOutput.appendChild(responseBlock);
            fetchGitHubRepos(responseBlock); // Ejecuta la función dinámica
        } else if (systemData[cmd]) {
            // Usamos innerHTML aquí SOLO porque systemData es código duro nuestro (sin inputs de usuario) [cite: 30, 31, 6, 11, 8, 14, 16, 17, 18, 19]
            responseBlock.innerHTML = systemData[cmd];
            terminalOutput.appendChild(responseBlock);
        } else {
            responseBlock.innerHTML = `<span class="error-msg">bash: ${escapeHTML(cmd)}: command not found. Escriba 'help' para ver la lista.</span>`;
            terminalOutput.appendChild(responseBlock);
        }

        // Hacer scroll automático hacia abajo
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Escuchar el 'Enter' en el teclado
    cmdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeCommand(cmdInput.value);
            cmdInput.value = ''; // Limpiar input
        }
    });

    // Escuchar clics en los botones de acceso directo
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            executeCommand(cmd);
            cmdInput.focus();
        });
    });

    // Utilidad de seguridad básica para inyecciones en la entrada de comandos
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    // --- 3. API DE GITHUB EN LA TERMINAL ---
    async function fetchGitHubRepos(container) {
        try {
            const response = await fetch(`https://api.github.com/users/AlvaroPavon/repos?sort=updated&per_page=4`);
            if (!response.ok) throw new Error('Error API');
            
            const repos = await response.json();
            container.innerHTML = '>> Repositorios descargados correctamente:<br>';
            
            const grid = document.createElement('div');
            grid.className = 'grid';

            repos.forEach(repo => {
                if(repo.fork) return;
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<strong>> <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></strong><br>Lang: ${repo.language || 'Multi'}`;
                grid.appendChild(card);
            });
            container.appendChild(grid);
            terminalOutput.scrollTop = terminalOutput.scrollHeight; // Ajustar scroll al cargar
        } catch (error) {
            container.innerHTML = '<span class="error-msg">> [ERROR] Fallo al contactar con github.com.</span>';
        }
    }
});