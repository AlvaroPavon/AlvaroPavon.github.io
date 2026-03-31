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

    // Base de datos de CV extraída del documento
    const systemData = {
        help: `Comandos disponibles: <br>- <span class="highlight">sobre_mi</span>: Perfil profesional<br>- <span class="highlight">experiencia</span>: Historial laboral<br>- <span class="highlight">formacion</span>: Historial académico<br>- <span class="highlight">capacidades</span>: Tecnologías y aptitudes<br>- <span class="highlight">proyectos</span>: Descargar repositorios de GitHub<br>- <span class="highlight">clear</span>: Limpiar pantalla`,
        
        sobre_mi: `Álvaro Pavón Martínez. Programador Junior especializado en el desarrollo de aplicaciones y automatización de procesos con Python. Cuento con experiencia práctica en entornos Linux y conocimientos sólidos en programación. Soy un perfil resolutivo y autónomo, con gran capacidad de adaptación y muchas ganas de aprender.`,
        
        experiencia: `
            <strong>> PlantaSur (2025)</strong><br>Programador Junior. Desarrollo de aplicaciones y scripts con Python. Automatización de procesos y generación de reportes.<br><br>
            <strong>> NanoBytes (2022)</strong><br>Programador Junior. Programación de aplicaciones con Python, JavaScript y gestión de bases de datos relacionales (SQL) en entornos ODOO.<br><br>
            <strong>> MediaMarkt & Beep Informática (2021-2023)</strong><br>Asesor / Dependiente sección informática. Instalación de sistemas, reparación y montaje de dispositivos.
        `,
        
        formacion: `
            - Especialización Ciberseguridad | IES Zaidin Vergeles (2025-2026 - En curso)<br>
            - FPGS. Desarrollo de Aplicaciones Multiplataforma | Atlántida CIDEP (2023-2025)<br>
            - Certificado Programación sistemas informáticos | Academia El Futuro (2022)<br>
            - Ciberseguridad | The Valley (2023)<br>
            - Master completo en Java | Udemy (2022)
        `,

        capacidades: `Python, Java / C, Linux / Bash Scripting, Bases de Datos Relacionales / SQL, Resolución de errores (Debugging), Windows, Eclipse, Visual Studio Code.<br>Aptitudes: Autonomía, Resolutivo, Flexibilidad, Dinámico, Puntual.`
    };

    // --- LÓGICA DE LOGIN ---
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
                cmdInput.focus(); 
            }, 500);
        }, 800);
    });

    // --- LÓGICA DEL INTÉRPRETE DE COMANDOS ---
    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        const isRoot = document.body.classList.contains('root-mode');
        const currentPrompt = isRoot ? 'root@alvaro-os:~#' : 'guest@alvaro-os:~$';

        // Imprimir comando introducido de forma segura (Previene XSS)
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
                    <p>> Como futuro experto en Ciberseguridad, sé lo importante que es proteger los sistemas, pero también premiar la curiosidad.</p>
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

    cmdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeCommand(cmdInput.value);
            cmdInput.value = ''; 
        }
    });

    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.getAttribute('data-cmd'));
            cmdInput.focus();
        });
    });

    // Mantener el foco en el input al hacer clic en la terminal
    document.getElementById('terminal-wrapper').addEventListener('click', () => {
        cmdInput.focus();
    });

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