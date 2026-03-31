document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE LOGIN ---
    const btnHack = document.getElementById('hack-btn');
    const inputUser = document.getElementById('username');
    const inputPass = document.getElementById('password');
    const accessMsg = document.getElementById('access-msg');
    const loginScreen = document.getElementById('login-screen');
    const portfolioContent = document.getElementById('portfolio-content');

    // Función para simular escritura por teclado
    async function typeWriterEffect(element, text, speed = 60) {
        element.value = '';
        for (let i = 0; i < text.length; i++) {
            element.value += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }

    btnHack.addEventListener('click', async () => {
        btnHack.disabled = true;
        btnHack.textContent = "> EJECUTANDO PAYLOAD...";

        // Autocompletar credenciales
        await typeWriterEffect(inputUser, 'root_access');
        await typeWriterEffect(inputPass, 'bypass_auth_2026');

        // Mostrar éxito y hacer transición
        btnHack.classList.add('hidden');
        accessMsg.classList.remove('hidden');

        setTimeout(() => {
            loginScreen.classList.add('fade-out');
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                portfolioContent.classList.remove('hidden');
                fetchGitHubRepos(); // Llamada a la API una vez dentro
            }, 800); 
        }, 1200);
    });

    // --- LÓGICA DE API GITHUB (Protección XSS incluida) ---
    async function fetchGitHubRepos() {
        const githubUsername = 'AlvaroPavon';
        const reposContainer = document.getElementById('github-repos');

        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Error en la API');
            
            const repos = await response.json();
            reposContainer.innerHTML = ''; // Limpiar mensaje de carga

            repos.forEach(repo => {
                if (repo.fork) return; // Saltamos los repositorios copiados (forks)

                // Creación de nodos DOM de forma segura (Previene XSS)
                const card = document.createElement('div');
                card.className = 'card terminal-card';

                const titleElement = document.createElement('h3');
                titleElement.textContent = '> ';
                
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer'; // Previene Tabnabbing
                link.textContent = repo.name;
                
                titleElement.appendChild(link);

                const desc = document.createElement('p');
                desc.textContent = repo.description || 'Sin descripción en el repositorio.';

                const languageTag = document.createElement('span');
                languageTag.className = 'tag';
                languageTag.textContent = repo.language || 'Multi';

                card.appendChild(titleElement);
                card.appendChild(desc);
                card.appendChild(languageTag);

                reposContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching repos:', error);
            reposContainer.textContent = '> [ERROR]: No se pudieron establecer conexiones con los servidores de GitHub.';
        }
    }
});