document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { title: 'Trading Platform', image: 'images/Trading/trading.png', link: 'projects/trading.html', description: 'Indicators and trading robot. Developed in C++ with OpenGL' },
        { title: 'Blockchain', image: 'images/blockchain/pc3.jpg', link: 'projects/blockchain.html', description: 'Crypto blockchain nodes.' },
        { title: 'Antivirus', image: 'images/Defender.jpg', link: 'projects/antivirus.html', description: 'Detects malware with SHA-256. Developed in C#' },
        { title: 'EasyRDP', image: 'images/easyrdp/rdp2.png', link: 'projects/easyrdp.html', description: 'Wrapper for windows remote desktop. Developed in C# WPF' },
        { title: 'Forcefeedback Wheel', image: 'images/ratt/ratt1.jpg', link: 'projects/forcefeedback.html', description: 'For car games with forcefeedback. Developed with Arduino C++' },
        { title: 'Bitcoin Ticker', image: 'images/btctick/btct.jpg', link: 'projects/placeholder.html', description: 'Bitcoin live price data. Developed with Arduino C++' },
        { title: 'Project 3', image: 'images/project3.jpg', link: 'project3.html', description: 'Description.' },
        { title: 'Project 3', image: 'images/project3.jpg', link: 'project3.html', description: 'Description.' },
        { title: 'Project 3', image: 'images/project3.jpg', link: 'project3.html', description: 'Description.' },
        { title: 'Project 3', image: 'images/project3.jpg', link: 'project3.html', description: 'Description.' },
    ];

    const projectsPerPage = 6;
    let currentPage = 1;
    let filteredProjects = projects;

    function renderProjects() {
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const currentProjects = filteredProjects.slice(startIndex, endIndex);

        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';

        currentProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.backgroundImage = `url(${project.image})`;
            projectCard.onclick = () => window.location.href = project.link;

            const overlay = document.createElement('div');
            overlay.className = 'overlay';

            const title = document.createElement('h3');
            title.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.description;

            overlay.appendChild(title);
            overlay.appendChild(description);
            projectCard.appendChild(overlay);
            projectsGrid.appendChild(projectCard);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = i === currentPage ? 'active' : '';
            pageButton.onclick = () => {
                currentPage = i;
                renderProjects();
                renderPagination();
            };
            pagination.appendChild(pageButton);
        }
    }

    function filterProjects(query) {
        filteredProjects = projects.filter(project =>
            project.title.toLowerCase().includes(query.toLowerCase())
        );
        currentPage = 1;
        renderProjects();
        renderPagination();
    }

    document.getElementById('projectSearch').addEventListener('input', (e) => {
        filterProjects(e.target.value);
    });

    renderProjects();
    renderPagination();

    const themeToggleContainer = document.getElementById('themeToggleContainer');
    const toggleBall = document.querySelector('.toggle-ball');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
    toggleBall.style.left = savedTheme === 'light' ? '28px' : '3px';

    themeToggleContainer.addEventListener('click', () => {
        const isLightTheme = body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        toggleBall.style.left = isLightTheme ? '28px' : '3px';
    });
});
