document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { title: 'Trading Platform', image: 'images/trading.png', link: 'project1.html', description: 'A stock/crypto platform with indicators and trading robot. Developed in C++ with OpenGL' },
        { title: 'Antivirus', image: 'images/mal.jpg', link: 'project2.html', description: 'Detects malware with SHA-256. Developed in C#' },
        { title: 'Forcefeedback Wheel', image: 'images/ratt/ratt1.jpg', link: 'project3.html', description: 'For car games with forcefeedback. Developed with Arduino C++' },
        { title: 'Project 2', image: 'images/project2.jpg', link: 'project2.html', description: 'A brief description of Project 2.' },
        { title: 'Project 3', image: 'images/project3.jpg', link: 'project3.html', description: 'A brief description of Project 3.' },
    ];

    const projectsPerPage = 4;
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
    const themeToggle = document.getElementById('themeToggle');
    const toggleBall = themeToggle.querySelector('.toggle-ball');

    themeToggleContainer.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        toggleBall.classList.toggle('toggle-on');
    });
});
