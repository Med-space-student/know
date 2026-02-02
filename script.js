// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic greeting based on time of day
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('dynamic-greeting');
        let greeting = '';
        
        if (hour < 12) {
            greeting = 'Good Morning Doctor, welcome to your <span class="highlight">KnowMed Space</span>';
        } else if (hour < 18) {
            greeting = 'Good Afternoon Doctor, welcome to your <span class="highlight">KnowMed Space</span>';
        } else {
            greeting = 'Good Evening Doctor, welcome to your <span class="highlight">KnowMed Space</span>';
        }
        
        greetingElement.innerHTML = greeting;
    }

    // Initialize greeting
    updateGreeting();

    // Navigation variables
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .btn[data-section]');
    const sections = document.querySelectorAll('.section');
    const mainContent = document.getElementById('main-content');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const lines = document.querySelectorAll('.hamburger .line');
        if (hamburger.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const lines = document.querySelectorAll('.hamburger .line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
            
            // Handle dropdown toggling on mobile
            if (this.parentElement.classList.contains('has-dropdown')) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                }
            }
        });
    });

    // Section switching functionality
    function switchSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update active nav link
            updateActiveNavLink(sectionId);
            
            // If switching to semester-2, load the to-do list
            if (sectionId === 'semester-2') {
                setTimeout(loadTodoList, 100);
            }
            
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Update active navigation link
    function updateActiveNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                switchSection(sectionId);
            }
        });
    });

    // Load To-Do List data
    function loadTodoList() {
        const todoData = {
            "Anatomy (Part I)": {
                "Osteology": [
                    ["Coxal bone and femur", "□", "□", "□", "□", "□"],
                    ["Tibia and fibula", "□", "□", "□", "□", "□"],
                    ["The bones of the foot", "□", "□", "□", "□", "□"]
                ],
                "Arthrology": [
                    ["Hip joint", "□", "□", "□", "□", "□"],
                    ["Knee joint", "□", "□", "□", "□", "□"],
                    ["Talo-crural (ankle) joint", "□", "□", "□", "□", "□"]
                ]
            },
            "Anatomy (Part II)": {
                "Myology": [
                    ["Muscles of the hip", "□", "□", "□", "□", "□"],
                    ["Muscles of the thigh", "□", "□", "□", "□", "□"]
                ],
                "Angiology": [
                    ["Femoral artery", "□", "□", "□", "□", "□"],
                    ["Popliteal artery", "□", "□", "□", "□", "□"],
                    ["Tibio-fibular trunk", "□", "□", "□", "□", "□"],
                    ["Dorsal arteries of leg/foot", "□", "□", "□", "□", "□"],
                    ["Venous & lymphatic drainage", "□", "□", "□", "□", "□"]
                ],
                "Neurology": [
                    ["Lumbar plexus", "□", "□", "□", "□", "□"],
                    ["Femoral nerve", "□", "□", "□", "□", "□"],
                    ["Modified obturator nerve", "□", "□", "□", "□", "□"],
                    ["Sacral plexus & sciatic nerve", "□", "□", "□", "□", "□"],
                    ["Terminal branches of sciatic", "□", "□", "□", "□", "□"]
                ]
            },
            "Biochemistry": {
                "Amino Acids": [
                    ["Amino acids, peptides, proteins", "☐", "☐", "☐", "☐", "☐"],
                    ["Structure & properties of A.A.", "☐", "☐", "☐", "☐", "☐"],
                    ["Amino acid metabolism", "☐", "☐", "☐", "☐", "☑"],
                    ["Protein sequencing", "☐", "☐", "☐", "☐", "☐"]
                ],
                "Enzymes": [
                    ["Enzymology", "☐", "☐", "☐", "☐", "☑"],
                    ["Single-substrate enzyme kinetics", "☐", "☐", "☐", "☑", "☑"],
                    ["Modulation of enzymatic activity", "☐", "☐", "☐", "☑", "☐"],
                    ["Allosteric enzymes", "☐", "☐", "☐", "☑", "☑"],
                    ["Vitamins and coenzymes", "☐", "☐", "☑", "☑", "☑"]
                ],
                "Nucleic Acids": [
                    ["Nucleic acids", "☐", "☐", "☑", "☑", "☑"]
                ],
                "Bioenergetics": [
                    ["Bioenergetics", "☐", "☐", "☑", "☑", "☑"]
                ]
            },
            "Cytology": {
                "Cell Biology": [
                    ["Endoplasmic reticulum", "☐", "☐", "☐", "☐", "☐"],
                    ["Golgi apparatus", "☐", "☐", "☐", "☐", "☑"],
                    ["Ribosome", "☐", "☐", "☐", "☐", "☐"],
                    ["Peroxisomes", "☐", "☐", "☐", "☐", "☑"],
                    ["Lysosomes", "☐", "☐", "☐", "☑", "☑"],
                    ["Mitochondria", "☐", "☐", "☐", "☑", "☐"],
                    ["Interphase nucleus", "☐", "☐", "☐", "☑", "☑"],
                    ["Cell cycle", "☐", "☐", "☐", "☑", "☐"]
                ]
            }
        };

        const todoContainer = document.querySelector('.todo-container');
        if (!todoContainer) return;
        
        todoContainer.innerHTML = '';
        
        for (const [subject, chapters] of Object.entries(todoData)) {
            const todoTable = document.createElement('div');
            todoTable.className = 'todo-table';
            
            let tableHTML = `
                <h4>${subject}</h4>
                <div class="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>TOPIC</th>
                                <th>L1</th>
                                <th>L2</th>
                                <th>L3</th>
                                <th>Q1</th>
                                <th>Q2</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            for (const [chapter, topics] of Object.entries(chapters)) {
                tableHTML += `<tr><td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">${chapter}</td></tr>`;
                
                topics.forEach(topic => {
                    tableHTML += `
                        <tr>
                            <td>${topic[0]}</td>
                            <td>${topic[1]}</td>
                            <td>${topic[2]}</td>
                            <td>${topic[3]}</td>
                            <td>${topic[4]}</td>
                            <td>${topic[5]}</td>
                        </tr>
                    `;
                });
            }
            
            tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;
            
            todoTable.innerHTML = tableHTML;
            todoContainer.appendChild(todoTable);
        }
    }

    // Load Past Exams data
    function loadPastExams() {
        const examsData = [
            { subject: "Anatomy", year: "2025", promo: "Oran" },
            { subject: "Anatomy", year: "2024", promo: "Oran" },
            { subject: "Anatomy", year: "2023", promo: "Oran" },
            { subject: "Biochemistry", year: "2025", promo: "Oran" },
            { subject: "Biochemistry", year: "2024", promo: "Oran" },
            { subject: "Biochemistry", year: "2023", promo: "Oran" },
            { subject: "Cytology", year: "2025", promo: "Oran" },
            { subject: "Cytology", year: "2024", promo: "Oran" },
            { subject: "Cytology", year: "2023", promo: "Oran" }
        ];

        const examsGrid = document.querySelector('.exams-grid');
        if (examsGrid) {
            examsGrid.innerHTML = '';
            
            examsData.forEach(exam => {
                const examCard = document.createElement('div');
                examCard.className = 'exam-card';
                examCard.innerHTML = `
                    <h4>${exam.subject}</h4>
                    <p><strong>Promo:</strong> ${exam.promo} ${exam.year}</p>
                    <button class="btn btn-outline" style="margin-top: 1rem; width: 100%;">Download PDF</button>
                `;
                examsGrid.appendChild(examCard);
            });
        }
    }

    // Load Online Tests data
    function loadOnlineTests() {
        const testsData = [
            { name: "Osteology Test", questions: 25, time: "30 min" },
            { name: "Arthrology Test", questions: 20, time: "25 min" },
            { name: "Myology Test", questions: 30, time: "35 min" },
            { name: "Angiology Test", questions: 25, time: "30 min" },
            { name: "Neurology Test", questions: 35, time: "40 min" }
        ];

        const testsGrid = document.querySelector('.tests-grid');
        if (testsGrid) {
            testsGrid.innerHTML = '';
            
            testsData.forEach(test => {
                const testCard = document.createElement('div');
                testCard.className = 'test-card';
                testCard.innerHTML = `
                    <h4>${test.name}</h4>
                    <p><strong>Questions:</strong> ${test.questions}</p>
                    <p><strong>Time:</strong> ${test.time}</p>
                    <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Start Test</button>
                `;
                testsGrid.appendChild(testCard);
            });
        }
    }

    // Initialize data loading
    loadPastExams();
    loadOnlineTests();

    // Modal functionality
    const modal = document.getElementById('todo-modal');
    const closeModal = document.querySelector('.close-modal');
    const lessonBtns = document.querySelectorAll('.lesson-btn');

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle lesson button clicks
    lessonBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const chapterCard = this.closest('.chapter-card');
            const chapterTitle = chapterCard.querySelector('h5').textContent;
            const lessons = Array.from(chapterCard.querySelectorAll('.lessons-list li')).map(li => li.textContent);
            
            const modalBody = document.getElementById('todo-modal-body');
            let modalHTML = `<h4>${chapterTitle}</h4><ul>`;
            
            lessons.forEach(lesson => {
                modalHTML += `<li>${lesson}</li>`;
            });
            
            modalHTML += '</ul>';
            modalBody.innerHTML = modalHTML;
            
            modal.classList.add('active');
        });
    });

    // Handle menu card clicks
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`${title} feature will be implemented soon!`);
        });
    });

    // Handle subject card clicks
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subjectName = this.textContent || this.querySelector('span').textContent;
            alert(`Resources for ${subjectName} will be available soon!`);
        });
    });

    // Update greeting every minute
    setInterval(updateGreeting, 60000);

    // Initialize with home section
    switchSection('home');
});