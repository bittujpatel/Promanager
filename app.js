// Enhanced Project Management Application - Fully Functional Version
let appState = {
    currentPage: 'dashboard',
    currentDate: new Date().toISOString().split('T')[0],
    nextLaborerId: 7,
    nextProjectId: 4,
    nextMaterialId: 10,
    
    // Employment type multipliers
    employmentTypes: {
        "normal": {"label": "Normal", "multiplier": 1.0},
        "overtime": {"label": "Overtime", "multiplier": 1.5},
        "double_shift": {"label": "Double Shift", "multiplier": 2.0},
        "night_shift": {"label": "Night Shift", "multiplier": 1.25},
        "holiday": {"label": "Holiday", "multiplier": 2.0}
    },

    // Projects with material costs
    projects: [
        {
            id: 1,
            name: "Residential Complex A",
            location: "Mumbai, Maharashtra",
            startDate: "2024-01-15",
            endDate: "2024-12-31",
            budget: 5000000,
            status: "In Progress",
            progress: 45,
            materialCosts: [
                {id: 1, date: "2024-08-01", description: "Cement and Steel", amount: 150000, category: "Raw Materials"},
                {id: 2, date: "2024-08-10", description: "Electrical Wiring", amount: 75000, category: "Electrical"},
                {id: 3, date: "2024-08-15", description: "Plumbing Materials", amount: 45000, category: "Plumbing"}
            ]
        },
        {
            id: 2,
            name: "Office Building B",
            location: "Pune, Maharashtra",
            startDate: "2024-03-01",
            endDate: "2024-11-30",
            budget: 8000000,
            status: "In Progress",
            progress: 30,
            materialCosts: [
                {id: 4, date: "2024-08-05", description: "Glass and Aluminium", amount: 200000, category: "Facade"},
                {id: 5, date: "2024-08-12", description: "HVAC Equipment", amount: 180000, category: "HVAC"}
            ]
        },
        {
            id: 3,
            name: "Bridge Construction",
            location: "Nashik, Maharashtra",
            startDate: "2024-02-10",
            endDate: "2025-02-10",
            budget: 12000000,
            status: "In Progress",
            progress: 25,
            materialCosts: [
                {id: 6, date: "2024-08-03", description: "Steel Beams", amount: 350000, category: "Structural"},
                {id: 7, date: "2024-08-18", description: "Concrete", amount: 120000, category: "Raw Materials"}
            ]
        }
    ],

    laborers: [
        {id: 1, name: "Rajesh Kumar", role: "Mason", dailyRate: 800, phone: "9876543210", status: "Active"},
        {id: 2, name: "Amit Singh", role: "Helper", dailyRate: 500, phone: "9876543211", status: "Active"},
        {id: 3, name: "Priya Sharma", role: "Electrician", dailyRate: 1000, phone: "9876543212", status: "Active"},
        {id: 4, name: "Vikram Patel", role: "Plumber", dailyRate: 900, phone: "9876543213", status: "Active"},
        {id: 5, name: "Sunita Yadav", role: "Mason", dailyRate: 750, phone: "9876543214", status: "Active"},
        {id: 6, name: "Rahul Gupta", role: "Helper", dailyRate: 450, phone: "9876543215", status: "Active"}
    ],

    // Enhanced attendance with employment types
    attendance: {
        "2024-08-20": {
            "1": [
                {laborerId: 1, employmentType: "normal"},
                {laborerId: 3, employmentType: "overtime"},
                {laborerId: 5, employmentType: "normal"}
            ],
            "2": [
                {laborerId: 2, employmentType: "double_shift"},
                {laborerId: 4, employmentType: "normal"}
            ],
            "3": [
                {laborerId: 6, employmentType: "night_shift"}
            ]
        },
        "2024-08-19": {
            "1": [
                {laborerId: 1, employmentType: "normal"},
                {laborerId: 2, employmentType: "normal"},
                {laborerId: 5, employmentType: "overtime"}
            ],
            "2": [
                {laborerId: 3, employmentType: "normal"},
                {laborerId: 4, employmentType: "night_shift"},
                {laborerId: 6, employmentType: "normal"}
            ],
            "3": []
        },
        "2024-08-18": {
            "1": [
                {laborerId: 1, employmentType: "holiday"},
                {laborerId: 5, employmentType: "holiday"}
            ],
            "2": [
                {laborerId: 2, employmentType: "holiday"},
                {laborerId: 3, employmentType: "holiday"},
                {laborerId: 4, employmentType: "holiday"}
            ],
            "3": [
                {laborerId: 6, employmentType: "holiday"}
            ]
        }
    }
};

// Global variables
let charts = { laborCostChart: null };
let confirmCallback = null;

// DOM Ready - Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    initializeApp();
});

// Main initialization
function initializeApp() {
    try {
        setupNavigation();
        setupEventListeners();
        setupForms();
        setupModals();
        setupDatePicker();
        showPage('dashboard');
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Navigation Setup - FIXED
function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Clear any existing event listeners and setup new ones
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const pageId = link.getAttribute('data-page');
        
        // Remove existing listeners
        link.removeEventListener('click', handleNavClick);
        
        // Add new listener
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Navigation clicked:', pageId);
            
            if (pageId) {
                showPage(pageId);
            }
        });
    });
}

function handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const pageId = this.getAttribute('data-page');
    if (pageId) {
        showPage(pageId);
    }
}

// Page Navigation - FIXED
function showPage(pageId) {
    console.log(`Navigating to page: ${pageId}`);
    
    try {
        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Show target page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            appState.currentPage = pageId;

            // Load page content
            switch(pageId) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'projects':
                    loadProjects();
                    break;
                case 'attendance':
                    loadAttendance();
                    break;
                case 'laborers':
                    loadLaborers();
                    break;
            }
        }
    } catch (error) {
        console.error('Error showing page:', error);
    }
}

// Event Listeners Setup - FIXED
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Dashboard refresh button
    const refreshBtn = document.querySelector('button[onclick="refreshDashboard()"]');
    if (refreshBtn) {
        refreshBtn.onclick = null; // Remove inline onclick
        refreshBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loadDashboard();
        });
    }

    // Add Project Button
    setupButton('addProjectBtn', function() {
        console.log('Add Project button clicked');
        openProjectModal();
    });

    // Add Laborer Button  
    setupButton('addLaborerBtn', function() {
        console.log('Add Laborer button clicked');
        openLaborerModal();
    });

    // Date navigation
    setupButton('prevDateBtn', function() {
        changeDate(-1);
    });
    
    setupButton('nextDateBtn', function() {
        changeDate(1);
    });
    
    setupButton('copyPrevDayBtn', function() {
        copyPreviousDay();
    });

    // Search functionality
    const projectSearch = document.getElementById('projectSearch');
    if (projectSearch) {
        projectSearch.addEventListener('input', filterProjects);
    }
    
    const laborerSearch = document.getElementById('laborerSearch');
    if (laborerSearch) {
        laborerSearch.addEventListener('input', renderLaborersEnhancedGrid);
    }

    // Date picker
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            appState.currentDate = this.value;
            loadAttendance();
        });
    }

    // Global keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Modal backdrop clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

function setupButton(buttonId, clickHandler) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clickHandler();
        });
    } else {
        console.warn(`Button ${buttonId} not found`);
    }
}

// Forms Setup - FIXED
function setupForms() {
    console.log('Setting up forms...');
    
    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateProjectForm()) {
                saveProject();
            }
        });
    }

    // Material form
    const materialForm = document.getElementById('materialForm');
    if (materialForm) {
        materialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateMaterialForm()) {
                saveMaterial();
            }
        });
    }

    // Laborer form
    const laborerForm = document.getElementById('laborerForm');
    if (laborerForm) {
        laborerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLaborerForm()) {
                saveLaborer();
            }
        });
    }
}

// Modal Setup - FIXED
function setupModals() {
    console.log('Setting up modals...');
    
    // Close buttons
    const modalCloseButtons = [
        'closeProjectModalBtn',
        'closeMaterialModalBtn', 
        'closeAssignmentModalBtn',
        'closeLaborerModalBtn'
    ];
    
    modalCloseButtons.forEach(btnId => {
        setupButton(btnId, closeAllModals);
    });

    // Cancel buttons
    const cancelButtons = [
        'cancelProjectBtn',
        'cancelMaterialBtn',
        'cancelAssignmentBtn', 
        'cancelLaborerBtn',
        'cancelConfirmBtn'
    ];
    
    cancelButtons.forEach(btnId => {
        setupButton(btnId, closeAllModals);
    });

    // Action buttons
    setupButton('confirmAssignmentBtn', confirmAssignment);
    setupButton('confirmActionBtn', executeConfirmAction);
}

function setupDatePicker() {
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput) {
        dateInput.value = appState.currentDate;
    }
}

// Dashboard Functions
function loadDashboard() {
    console.log('Loading dashboard...');
    try {
        updateDashboardStats();
        renderProjectCostOverview();
        setTimeout(() => initializeLaborCostChart(), 100);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function updateDashboardStats() {
    const totalProjects = appState.projects.length;
    const totalLaborCost = calculateTotalLaborCost();
    const averageProgress = appState.projects.length > 0 ? 
        Math.round(appState.projects.reduce((sum, p) => sum + p.progress, 0) / appState.projects.length) : 0;

    setElementText('totalProjects', totalProjects);
    setElementText('totalLaborCost', `₹${totalLaborCost.toLocaleString()}`);
    setElementText('averageProgress', `${averageProgress}%`);
}

function renderProjectCostOverview() {
    const container = document.getElementById('projectCostOverview');
    if (!container) return;
    
    container.innerHTML = appState.projects.map(project => {
        const laborCost = calculateProjectLaborCost(project.id);
        const materialCost = calculateProjectMaterialCost(project.id);
        const totalCost = laborCost + materialCost;
        const budgetUtilization = project.budget > 0 ? Math.round((totalCost / project.budget) * 100) : 0;

        return `
            <div class="project-cost-card">
                <div class="project-cost-header">
                    <h3 class="project-cost-title">${project.name}</h3>
                    <div class="project-progress-badge">${project.progress}%</div>
                </div>
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <h4 class="cost-amount">₹${laborCost.toLocaleString()}</h4>
                        <p class="cost-label">Labor Costs</p>
                    </div>
                    <div class="cost-item">
                        <h4 class="cost-amount">₹${materialCost.toLocaleString()}</h4>
                        <p class="cost-label">Material Costs</p>
                    </div>
                </div>
                <div class="progress-section">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Budget Utilization</span>
                        <span class="${budgetUtilization > 80 ? 'text-warning' : 'text-success'}">${budgetUtilization}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(budgetUtilization, 100)}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function initializeLaborCostChart() {
    const chartCanvas = document.getElementById('laborCostChart');
    if (!chartCanvas) return;
    
    try {
        if (charts.laborCostChart) {
            charts.laborCostChart.destroy();
        }
        
        const ctx = chartCanvas.getContext('2d');
        
        charts.laborCostChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Weekly Labor Cost',
                    data: [12000, 18000, 25000, 22000],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

// Projects Functions
function loadProjects() {
    console.log('Loading projects...');
    renderProjectsList();
}

function filterProjects() {
    const searchInput = document.getElementById('projectSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (searchTerm === '') {
        renderProjectsList();
        return;
    }
    
    const filteredProjects = appState.projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm) ||
        project.location.toLowerCase().includes(searchTerm) ||
        project.status.toLowerCase().includes(searchTerm)
    );
    
    renderProjectsList(filteredProjects);
}

function renderProjectsList(projectsToRender = null) {
    const container = document.getElementById('projectsList');
    if (!container) return;
    
    const projects = projectsToRender || appState.projects;
    
    if (projects.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-building"></i><p>No projects found</p></div>';
        return;
    }

    container.innerHTML = projects.map(project => {
        const laborCost = calculateProjectLaborCost(project.id);
        const materialCost = calculateProjectMaterialCost(project.id);
        const totalCost = laborCost + materialCost;

        return `
            <div class="project-card" id="project-${project.id}">
                <div class="project-card-header" data-project-id="${project.id}">
                    <div class="project-main-info">
                        <h3>${project.name}</h3>
                        <div class="project-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                            <span><i class="fas fa-calendar"></i> ${formatDate(project.startDate)} - ${formatDate(project.endDate)}</span>
                            <span class="status-badge status-badge--${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                        </div>
                    </div>
                    <div class="project-actions">
                        <button class="btn btn--sm btn--outline edit-project-btn" data-project-id="${project.id}" title="Edit Project">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn--sm btn--danger delete-project-btn" data-project-id="${project.id}" title="Delete Project">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn--sm btn--outline expand-project-btn" data-project-id="${project.id}" title="Expand Project">
                            <i class="fas fa-chevron-down expand-icon"></i>
                        </button>
                    </div>
                </div>
                <div class="project-card-content">
                    <div class="project-details-grid">
                        <div class="project-costs-section">
                            <h4>Cost Overview</h4>
                            <div class="costs-summary">
                                <div class="cost-summary-item">
                                    <h5>₹${laborCost.toLocaleString()}</h5>
                                    <p>Labor Costs</p>
                                </div>
                                <div class="cost-summary-item">
                                    <h5>₹${materialCost.toLocaleString()}</h5>
                                    <p>Material Costs</p>
                                </div>
                                <div class="cost-summary-item">
                                    <h5>₹${totalCost.toLocaleString()}</h5>
                                    <p>Total Spent</p>
                                </div>
                                <div class="cost-summary-item">
                                    <h5>₹${project.budget.toLocaleString()}</h5>
                                    <p>Budget</p>
                                </div>
                            </div>
                        </div>
                        <div class="project-materials-section">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4>Material Costs</h4>
                                <button class="btn btn--sm btn--primary add-material-btn" data-project-id="${project.id}" title="Add Material Cost">
                                    <i class="fas fa-plus"></i> Add Material
                                </button>
                            </div>
                            <div class="materials-list">
                                ${project.materialCosts.map(material => `
                                    <div class="material-item">
                                        <div class="material-info">
                                            <h6>${material.description}</h6>
                                            <p>${formatDate(material.date)} • ${material.category}</p>
                                        </div>
                                        <div class="material-actions">
                                            <span class="material-amount">₹${material.amount.toLocaleString()}</span>
                                            <button class="btn btn--sm btn--outline edit-material-btn" data-project-id="${project.id}" data-material-id="${material.id}" title="Edit Material">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn--sm btn--danger delete-material-btn" data-project-id="${project.id}" data-material-id="${material.id}" title="Delete Material">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                                ${project.materialCosts.length === 0 ? '<p class="text-center" style="color: var(--color-text-secondary); margin: 20px 0;">No material costs recorded yet.</p>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Setup project action buttons
    setupProjectActionButtons();
}

function setupProjectActionButtons() {
    // Edit project buttons
    document.querySelectorAll('.edit-project-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const projectId = parseInt(this.getAttribute('data-project-id'));
            openProjectModal(projectId);
        };
    });

    // Delete project buttons
    document.querySelectorAll('.delete-project-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = parseInt(this.dataset.projectId);
            confirmDeleteProject(projectId);
        });
    });

    // Expand project buttons
    document.querySelectorAll('.expand-project-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = parseInt(this.dataset.projectId);
            toggleProjectExpansion(projectId);
        });
    });

    // Add material buttons
    document.querySelectorAll('.add-material-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = parseInt(this.dataset.projectId);
            openMaterialModal(projectId);
        });
    });

    // Edit material buttons
    document.querySelectorAll('.edit-material-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = parseInt(this.dataset.projectId);
            const materialId = parseInt(this.dataset.materialId);
            openMaterialModal(projectId, materialId);
        });
    });

    // Delete material buttons
    document.querySelectorAll('.delete-material-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = parseInt(this.dataset.projectId);
            const materialId = parseInt(this.dataset.materialId);
            confirmDeleteMaterial(projectId, materialId);
        });
    });
}

function toggleProjectExpansion(projectId) {
    const card = document.getElementById(`project-${projectId}`);
    if (card) {
        card.classList.toggle('expanded');
    }
}

// Attendance Functions
function loadAttendance() {
    console.log('Loading attendance...');
    try {
        const dateInput = document.getElementById('attendanceDate');
        if (dateInput) {
            dateInput.value = appState.currentDate;
        }
        renderAvailableLaborers();
        renderProjectAssignments();
        updateAttendanceSummary();
    } catch (error) {
        console.error('Error loading attendance:', error);
    }
}

function renderAvailableLaborers() {
    const container = document.getElementById('availableLaborers');
    if (!container) return;
    
    const assignedLaborerIds = getAssignedLaborerIds(appState.currentDate);
    const availableLaborers = appState.laborers.filter(laborer => 
        laborer.status === 'Active' && !assignedLaborerIds.includes(laborer.id)
    );

    if (availableLaborers.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>All laborers are assigned</p></div>';
        return;
    }

    container.innerHTML = availableLaborers.map(laborer => `
        <div class="laborer-item assign-laborer-btn" data-laborer-id="${laborer.id}">
            <div class="laborer-name">${laborer.name}</div>
            <div class="laborer-details">
                <span>${laborer.role}</span>
                <span>₹${laborer.dailyRate}/day</span>
            </div>
        </div>
    `).join('');

    // Setup click handlers for assignment
    document.querySelectorAll('.assign-laborer-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const laborerId = parseInt(this.getAttribute('data-laborer-id'));
            openAssignmentModal(laborerId);
        };
    });
}

function renderProjectAssignments() {
    const container = document.getElementById('projectAssignments');
    if (!container) return;
    
    container.innerHTML = appState.projects.map(project => {
        const assignedLaborers = getAssignedLaborersForProject(project.id, appState.currentDate);
        const totalCost = assignedLaborers.reduce((sum, assignment) => {
            const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
            if (laborer) {
                const multiplier = appState.employmentTypes[assignment.employmentType].multiplier;
                return sum + (laborer.dailyRate * multiplier);
            }
            return sum;
        }, 0);
        
        return `
            <div class="project-assignment">
                <div class="assignment-header">
                    <div class="assignment-title">${project.name}</div>
                    <div class="assignment-cost">₹${Math.round(totalCost).toLocaleString()}</div>
                </div>
                <div class="assigned-laborers">
                    ${assignedLaborers.map(assignment => {
                        const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
                        if (!laborer) return '';
                        const multiplier = appState.employmentTypes[assignment.employmentType].multiplier;
                        const finalRate = laborer.dailyRate * multiplier;
                        return `
                            <div class="laborer-item assigned">
                                <div class="laborer-name">${laborer.name}</div>
                                <div class="laborer-details">
                                    <span>${laborer.role}</span>
                                    <div>
                                        <span class="employment-type-badge">${appState.employmentTypes[assignment.employmentType].label}</span>
                                        <span style="margin-left: 8px;">₹${Math.round(finalRate)}</span>
                                    </div>
                                </div>
                                <button class="remove-btn unassign-laborer-btn" data-laborer-id="${assignment.laborerId}" title="Remove Assignment">×</button>
                            </div>
                        `;
                    }).join('')}
                    ${assignedLaborers.length === 0 ? '<p style="text-align: center; color: var(--color-text-secondary); margin: 20px 0;">No laborers assigned</p>' : ''}
                </div>
            </div>
        `;
    }).join('');

    // Setup unassign buttons
    document.querySelectorAll('.unassign-laborer-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const laborerId = parseInt(this.dataset.laborerId);
            unassignLaborer(laborerId);
        });
    });
}

function updateAttendanceSummary() {
    const assignedLaborers = getAllAssignedLaborersForDate(appState.currentDate);
    const totalAssigned = assignedLaborers.length;
    
    const dailyCost = assignedLaborers.reduce((sum, assignment) => {
        const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
        if (laborer) {
            const multiplier = appState.employmentTypes[assignment.employmentType].multiplier;
            return sum + (laborer.dailyRate * multiplier);
        }
        return sum;
    }, 0);

    const employmentBreakdown = {};
    assignedLaborers.forEach(assignment => {
        const type = assignment.employmentType;
        employmentBreakdown[type] = (employmentBreakdown[type] || 0) + 1;
    });

    const breakdownText = Object.entries(employmentBreakdown)
        .map(([type, count]) => `${appState.employmentTypes[type].label}: ${count}`)
        .join(', ') || 'None';
    
    setElementText('totalAssigned', totalAssigned);
    setElementText('dailyCost', `₹${Math.round(dailyCost).toLocaleString()}`);
    setElementText('employmentBreakdown', breakdownText);
}

function changeDate(days) {
    const currentDate = new Date(appState.currentDate);
    currentDate.setDate(currentDate.getDate() + days);
    appState.currentDate = currentDate.toISOString().split('T')[0];
    
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput) {
        dateInput.value = appState.currentDate;
    }
    
    loadAttendance();
}

function copyPreviousDay() {
    const currentDate = new Date(appState.currentDate);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    const previousDateStr = previousDate.toISOString().split('T')[0];

    if (appState.attendance[previousDateStr]) {
        appState.attendance[appState.currentDate] = JSON.parse(JSON.stringify(appState.attendance[previousDateStr]));
        loadAttendance();
        showSuccessMessage('Previous day attendance copied successfully!');
    } else {
        alert('No attendance data found for previous day');
    }
}

// Labor Management Functions
function loadLaborers() {
    console.log('Loading laborers...');
    renderLaborersEnhancedGrid();
}

function renderLaborersEnhancedGrid() {
    const container = document.getElementById('laborersEnhancedGrid');
    if (!container) return;
    
    const searchInput = document.getElementById('laborerSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    let filteredLaborers = appState.laborers;
    if (searchTerm) {
        filteredLaborers = appState.laborers.filter(laborer => 
            laborer.name.toLowerCase().includes(searchTerm) ||
            laborer.role.toLowerCase().includes(searchTerm)
        );
    }

    if (filteredLaborers.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No laborers found</p></div>';
        return;
    }

    container.innerHTML = filteredLaborers.map(laborer => {
        const totalEarnings = calculateLaborerTotalEarnings(laborer.id);
        const daysWorked = calculateLaborerDaysWorked(laborer.id);
        const projects = getLaborerProjects(laborer.id);

        return `
            <div class="laborer-enhanced-card">
                <div class="laborer-card-header">
                    <div class="laborer-info">
                        <h4>${laborer.name}</h4>
                        <p class="laborer-role">${laborer.role}</p>
                        <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin: 4px 0;">📞 ${laborer.phone}</p>
                        <span class="status-badge status-badge--${laborer.status.toLowerCase()}">${laborer.status}</span>
                    </div>
                    <div class="project-actions">
                        <button class="btn btn--sm btn--outline edit-laborer-btn" data-laborer-id="${laborer.id}" title="Edit Laborer">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn--sm btn--danger delete-laborer-btn" data-laborer-id="${laborer.id}" title="Delete Laborer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="rate-breakdown">
                    <h5>Employment Rate Breakdown</h5>
                    <div class="rate-grid">
                        ${Object.entries(appState.employmentTypes).map(([key, type]) => `
                            <div class="rate-item">
                                <span>${type.label}</span>
                                <strong>₹${Math.round(laborer.dailyRate * type.multiplier)}</strong>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="laborer-analytics" style="background-color: var(--color-bg-3); border-radius: var(--radius-base); padding: var(--space-16);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: var(--space-12); text-align: center;">
                        <div>
                            <strong style="color: var(--color-text);">₹${totalEarnings.toLocaleString()}</strong>
                            <p style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin: 2px 0 0 0;">Total Earned</p>
                        </div>
                        <div>
                            <strong style="color: var(--color-text);">${daysWorked}</strong>
                            <p style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin: 2px 0 0 0;">Days Worked</p>
                        </div>
                        <div>
                            <strong style="color: var(--color-text);">${projects.length}</strong>
                            <p style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin: 2px 0 0 0;">Projects</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Setup laborer action buttons
    document.querySelectorAll('.edit-laborer-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const laborerId = parseInt(this.getAttribute('data-laborer-id'));
            openLaborerModal(laborerId);
        };
    });

    document.querySelectorAll('.delete-laborer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const laborerId = parseInt(this.dataset.laborerId);
            confirmDeleteLaborer(laborerId);
        });
    });
}

// Modal Functions - COMPLETELY FIXED
function openProjectModal(projectId = null) {
    console.log('Opening project modal, projectId:', projectId);
    
    const modal = document.getElementById('projectModal');
    const form = document.getElementById('projectForm');
    const title = document.getElementById('projectModalTitle');
    
    if (!modal || !form || !title) {
        console.error('Project modal elements not found');
        return;
    }
    
    // Reset form
    form.reset();
    clearFormErrors();
    
    if (projectId) {
        // Edit mode: fill form with project data
        const project = appState.projects.find(p => p.id === projectId);
        if (project) {
            document.getElementById('projectId').value = project.id;
            document.getElementById('projectName').value = project.name;
            document.getElementById('projectLocation').value = project.location;
            document.getElementById('projectStartDate').value = project.startDate;
            document.getElementById('projectEndDate').value = project.endDate;
            document.getElementById('projectBudget').value = project.budget;
            document.getElementById('projectProgress').value = project.progress;
            document.getElementById('projectStatus').value = project.status;
            title.textContent = 'Edit Project';
        }
    } else {
        title.textContent = 'Add Project';
    }
    showModal(modal);
}

function openMaterialModal(projectId, materialId = null) {
    console.log('Opening material modal, projectId:', projectId, 'materialId:', materialId);
    
    const modal = document.getElementById('materialModal');
    const form = document.getElementById('materialForm');
    const title = document.getElementById('materialModalTitle');
    
    if (!modal || !form || !title) {
        console.error('Material modal elements not found');
        return;
    }
    
    // Reset form
    form.reset();
    clearFormErrors();
    
    document.getElementById('materialProjectId').value = projectId;
    document.getElementById('materialDate').value = appState.currentDate;
    
    if (materialId) {
        const project = appState.projects.find(p => p.id === projectId);
        const material = project?.materialCosts.find(m => m.id === materialId);
        if (material) {
            title.textContent = 'Edit Material Cost';
            document.getElementById('materialId').value = material.id;
            document.getElementById('materialDate').value = material.date;
            document.getElementById('materialDescription').value = material.description;
            document.getElementById('materialCategory').value = material.category;
            document.getElementById('materialAmount').value = material.amount;
        }
    } else {
        title.textContent = 'Add Material Cost';
    }
    
    showModal(modal);
}

function openLaborerModal(laborerId = null) {
    console.log('Opening laborer modal, laborerId:', laborerId);
    
    const modal = document.getElementById('laborerModal');
    const form = document.getElementById('laborerForm');
    const title = document.getElementById('laborerModalTitle');
    
    if (!modal || !form || !title) {
        console.error('Laborer modal elements not found');
        return;
    }
    
    // Reset form
    form.reset();
    clearFormErrors();
    
    if (laborerId) {
        // Edit mode: fill form with laborer data
        const laborer = appState.laborers.find(l => l.id === laborerId);
        if (laborer) {
            document.getElementById('laborerId').value = laborer.id;
            document.getElementById('laborerName').value = laborer.name;
            document.getElementById('laborerRole').value = laborer.role;
            document.getElementById('laborerRate').value = laborer.dailyRate;
            document.getElementById('laborerPhone').value = laborer.phone;
            document.getElementById('laborerStatus').value = laborer.status;
            title.textContent = 'Edit Laborer';
        }
    } else {
        title.textContent = 'Add Laborer';
    }
    showModal(modal);
}

function openAssignmentModal(laborerId) {
    console.log('Opening assignment modal, laborerId:', laborerId);
    
    const laborer = appState.laborers.find(l => l.id === laborerId);
    if (!laborer) return;
    
    const modal = document.getElementById('assignmentModal');
    
    // Populate project dropdown
    const projectSelect = document.getElementById('assignProjectId');
    if (projectSelect) {
        projectSelect.innerHTML = '<option value="">Select Project</option>' +
            appState.projects.map(project => `<option value="${project.id}">${project.name}</option>`).join('');
    }

    document.getElementById('assignLaborerId').value = laborerId;
    document.getElementById('employmentType').value = 'normal';
    setElementText('baseRate', `₹${laborer.dailyRate}`);
    setElementText('finalRate', `₹${laborer.dailyRate}`);

    // Update final rate when employment type changes
    const employmentSelect = document.getElementById('employmentType');
    if (employmentSelect) {
        employmentSelect.onchange = function() {
            const multiplier = appState.employmentTypes[this.value].multiplier;
            const finalRate = laborer.dailyRate * multiplier;
            setElementText('finalRate', `₹${Math.round(finalRate)}`);
        };
    }

    showModal(modal);
}

function showModal(modal) {
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
}

function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('.form-control.error').forEach(el => {
        el.classList.remove('error');
    });
}

// Assignment Functions
function confirmAssignment() {
    const laborerId = parseInt(document.getElementById('assignLaborerId').value);
    const projectId = parseInt(document.getElementById('assignProjectId').value);
    const employmentType = document.getElementById('employmentType').value;

    if (!projectId) {
        alert('Please select a project');
        return;
    }

    assignLaborerToProject(laborerId, projectId, employmentType);
    closeAllModals();
    loadAttendance();
    updateDashboardStats();
    showSuccessMessage('Laborer assigned successfully!');
}

function assignLaborerToProject(laborerId, projectId, employmentType) {
    const date = appState.currentDate;
    
    if (!appState.attendance[date]) {
        appState.attendance[date] = {};
    }
    
    if (!appState.attendance[date][projectId.toString()]) {
        appState.attendance[date][projectId.toString()] = [];
    }
    
    // Remove laborer from other projects on this date
    Object.keys(appState.attendance[date]).forEach(pId => {
        appState.attendance[date][pId] = appState.attendance[date][pId].filter(assignment => assignment.laborerId !== laborerId);
    });
    
    // Add laborer to new project with employment type
    appState.attendance[date][projectId.toString()].push({
        laborerId: laborerId,
        employmentType: employmentType
    });
}

function unassignLaborer(laborerId) {
    const date = appState.currentDate;
    
    if (appState.attendance[date]) {
        Object.keys(appState.attendance[date]).forEach(projectId => {
            appState.attendance[date][projectId] = appState.attendance[date][projectId].filter(assignment => assignment.laborerId !== laborerId);
        });
    }
    
    loadAttendance();
    updateDashboardStats();
    showSuccessMessage('Laborer unassigned successfully!');
}

// Form Validation
function validateProjectForm() {
    const requiredFields = [
        { id: 'projectName', message: 'Project name is required' },
        { id: 'projectLocation', message: 'Location is required' },
        { id: 'projectStartDate', message: 'Start date is required' },
        { id: 'projectEndDate', message: 'End date is required' },
        { id: 'projectBudget', message: 'Budget is required' }
    ];
    
    return validateFields(requiredFields) && validateProjectDates() && validateProjectProgress();
}

function validateMaterialForm() {
    const requiredFields = [
        { id: 'materialDate', message: 'Date is required' },
        { id: 'materialDescription', message: 'Description is required' },
        { id: 'materialCategory', message: 'Category is required' },
        { id: 'materialAmount', message: 'Amount is required' }
    ];
    
    return validateFields(requiredFields);
}

function validateLaborerForm() {
    const requiredFields = [
        { id: 'laborerName', message: 'Name is required' },
        { id: 'laborerRole', message: 'Role is required' },
        { id: 'laborerRate', message: 'Daily rate is required' },
        { id: 'laborerPhone', message: 'Phone number is required' }
    ];
    
    return validateFields(requiredFields) && validatePhone();
}

function validateFields(fields) {
    let isValid = true;
    
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorEl = document.getElementById(field.id + 'Error');
        
        if (input && errorEl) {
            errorEl.textContent = '';
            input.classList.remove('error');
            
            if (!input.value || input.value.trim() === '') {
                isValid = false;
                errorEl.textContent = field.message;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
}

function validateProjectDates() {
    const startDateInput = document.getElementById('projectStartDate');
    const endDateInput = document.getElementById('projectEndDate');
    const errorEl = document.getElementById('projectEndDateError');
    
    if (startDateInput && endDateInput && startDateInput.value && endDateInput.value) {
        if (startDateInput.value >= endDateInput.value) {
            if (errorEl) errorEl.textContent = 'End date must be after start date';
            endDateInput.classList.add('error');
            return false;
        }
    }
    
    return true;
}

function validateProjectProgress() {
    const progressInput = document.getElementById('projectProgress');
    const errorEl = document.getElementById('projectProgressError');
    
    if (progressInput && progressInput.value) {
        const progress = parseInt(progressInput.value);
        if (progress < 0 || progress > 100) {
            if (errorEl) errorEl.textContent = 'Progress must be between 0 and 100';
            progressInput.classList.add('error');
            return false;
        }
    }
    
    return true;
}

function validatePhone() {
    const phoneInput = document.getElementById('laborerPhone');
    const errorEl = document.getElementById('laborerPhoneError');
    
    if (phoneInput && phoneInput.value) {
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phoneInput.value)) {
            if (errorEl) errorEl.textContent = 'Phone must be 10 digits';
            phoneInput.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Save Functions
function saveProject() {
    const projectId = document.getElementById('projectId').value;
    const isEdit = !!projectId;
    
    const project = {
        id: isEdit ? parseInt(projectId) : appState.nextProjectId++,
        name: document.getElementById('projectName').value.trim(),
        location: document.getElementById('projectLocation').value.trim(),
        startDate: document.getElementById('projectStartDate').value,
        endDate: document.getElementById('projectEndDate').value,
        budget: parseInt(document.getElementById('projectBudget').value),
        status: document.getElementById('projectStatus').value,
        progress: parseInt(document.getElementById('projectProgress').value) || 0,
        materialCosts: []
    };

    const existingIndex = appState.projects.findIndex(p => p.id === project.id);
    if (existingIndex !== -1) {
        project.materialCosts = appState.projects[existingIndex].materialCosts;
        appState.projects[existingIndex] = project;
    } else {
        appState.projects.push(project);
    }

    closeAllModals();
    loadProjects();
    updateDashboardStats();
    renderProjectCostOverview();
    
    showSuccessMessage(isEdit ? 'Project updated successfully!' : 'Project added successfully!');
}

function saveMaterial() {
    const projectId = parseInt(document.getElementById('materialProjectId').value);
    const materialId = document.getElementById('materialId').value;
    const isEdit = !!materialId;
    
    const material = {
        id: isEdit ? parseInt(materialId) : appState.nextMaterialId++,
        date: document.getElementById('materialDate').value,
        description: document.getElementById('materialDescription').value.trim(),
        category: document.getElementById('materialCategory').value,
        amount: parseInt(document.getElementById('materialAmount').value)
    };

    const project = appState.projects.find(p => p.id === projectId);
    if (project) {
        if (isEdit) {
            const materialIndex = project.materialCosts.findIndex(m => m.id === material.id);
            if (materialIndex !== -1) {
                project.materialCosts[materialIndex] = material;
            }
        } else {
            project.materialCosts.push(material);
        }
    }

    closeAllModals();
    loadProjects();
    updateDashboardStats();
    renderProjectCostOverview();
    
    showSuccessMessage(isEdit ? 'Material cost updated successfully!' : 'Material cost added successfully!');
}

function saveLaborer() {
    const laborerId = document.getElementById('laborerId').value;
    const isEdit = !!laborerId;
    
    const laborer = {
        id: isEdit ? parseInt(laborerId) : appState.nextLaborerId++,
        name: document.getElementById('laborerName').value.trim(),
        role: document.getElementById('laborerRole').value,
        dailyRate: parseInt(document.getElementById('laborerRate').value),
        phone: document.getElementById('laborerPhone').value.trim(),
        status: document.getElementById('laborerStatus').value
    };

    const existingIndex = appState.laborers.findIndex(l => l.id === laborer.id);
    if (existingIndex !== -1) {
        appState.laborers[existingIndex] = laborer;
    } else {
        appState.laborers.push(laborer);
    }

    closeAllModals();
    loadLaborers();
    updateDashboardStats();
    
    showSuccessMessage(isEdit ? 'Laborer updated successfully!' : 'Laborer added successfully!');
}

// Delete Functions
function confirmDeleteProject(id) {
    const project = appState.projects.find(p => p.id === id);
    if (project) {
        showConfirmModal(`Are you sure you want to delete "${project.name}"?`, () => deleteProject(id));
    }
}

function confirmDeleteMaterial(projectId, materialId) {
    const project = appState.projects.find(p => p.id === projectId);
    const material = project?.materialCosts.find(m => m.id === materialId);
    if (material) {
        showConfirmModal(`Are you sure you want to delete "${material.description}"?`, () => deleteMaterial(projectId, materialId));
    }
}

function confirmDeleteLaborer(id) {
    const laborer = appState.laborers.find(l => l.id === id);
    if (laborer) {
        showConfirmModal(`Are you sure you want to delete ${laborer.name}?`, () => deleteLaborer(id));
    }
}

function showConfirmModal(message, callback) {
    const modal = document.getElementById('confirmModal');
    const messageEl = document.getElementById('confirmMessage');
    
    if (modal && messageEl) {
        messageEl.textContent = message;
        confirmCallback = callback;
        showModal(modal);
    }
}

function executeConfirmAction() {
    if (confirmCallback) {
        confirmCallback();
        confirmCallback = null;
    }
    closeAllModals();
}

function deleteProject(id) {
    appState.projects = appState.projects.filter(p => p.id !== id);
    
    // Remove from attendance records
    Object.keys(appState.attendance).forEach(date => {
        delete appState.attendance[date][id.toString()];
    });
    
    loadProjects();
    updateDashboardStats();
    renderProjectCostOverview();
    showSuccessMessage('Project deleted successfully!');
}

function deleteMaterial(projectId, materialId) {
    const project = appState.projects.find(p => p.id === projectId);
    if (project) {
        project.materialCosts = project.materialCosts.filter(m => m.id !== materialId);
        loadProjects();
        updateDashboardStats();
        renderProjectCostOverview();
        showSuccessMessage('Material cost deleted successfully!');
    }
}

function deleteLaborer(id) {
    appState.laborers = appState.laborers.filter(l => l.id !== id);
    
    // Remove from attendance records
    Object.keys(appState.attendance).forEach(date => {
        Object.keys(appState.attendance[date]).forEach(projectId => {
            appState.attendance[date][projectId] = appState.attendance[date][projectId].filter(assignment => assignment.laborerId !== id);
        });
    });
    
    loadLaborers();
    updateDashboardStats();
    showSuccessMessage('Laborer deleted successfully!');
}

// Utility Functions
function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function formatDate(dateString) {
    try {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 300px;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Cost Calculation Functions
function calculateTotalLaborCost() {
    let totalCost = 0;
    Object.values(appState.attendance).forEach(dayAttendance => {
        Object.values(dayAttendance).forEach(assignments => {
            assignments.forEach(assignment => {
                const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
                if (laborer) {
                    const multiplier = appState.employmentTypes[assignment.employmentType].multiplier;
                    totalCost += laborer.dailyRate * multiplier;
                }
            });
        });
    });
    return Math.round(totalCost);
}

function calculateProjectLaborCost(projectId) {
    let projectCost = 0;
    Object.values(appState.attendance).forEach(dayAttendance => {
        const projectAttendance = dayAttendance[projectId.toString()] || [];
        projectAttendance.forEach(assignment => {
            const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
            if (laborer) {
                const multiplier = appState.employmentTypes[assignment.employmentType].multiplier;
                projectCost += laborer.dailyRate * multiplier;
            }
        });
    });
    return Math.round(projectCost);
}

function calculateProjectMaterialCost(projectId) {
    const project = appState.projects.find(p => p.id === projectId);
    return project ? project.materialCosts.reduce((sum, cost) => sum + cost.amount, 0) : 0;
}

function calculateLaborerTotalEarnings(laborerId) {
    let totalEarnings = 0;
    Object.values(appState.attendance).forEach(dayAttendance => {
        Object.values(dayAttendance).forEach(assignments => {
            const assignment = assignments.find(a => a.laborerId === laborerId);
            if (assignment) {
                const laborer = appState.laborers.find(l => l.id === laborerId);
                if (laborer) {
                    const multiplier = appState.employmentTypes[assignment.employmentType].multiplier;
                    totalEarnings += laborer.dailyRate * multiplier;
                }
            }
        });
    });
    return Math.round(totalEarnings);
}

function calculateLaborerDaysWorked(laborerId) {
    let daysWorked = 0;
    Object.values(appState.attendance).forEach(dayAttendance => {
        Object.values(dayAttendance).forEach(assignments => {
            if (assignments.some(a => a.laborerId === laborerId)) {
                daysWorked++;
                return;
            }
        });
    });
    return daysWorked;
}

function getLaborerProjects(laborerId) {
    const projectIds = new Set();
    Object.values(appState.attendance).forEach(dayAttendance => {
        Object.keys(dayAttendance).forEach(projectId => {
            const assignments = dayAttendance[projectId];
            if (assignments.some(a => a.laborerId === laborerId)) {
                projectIds.add(parseInt(projectId));
            }
        });
    });
    return Array.from(projectIds);
}

function getAssignedLaborerIds(date) {
    const attendance = appState.attendance[date];
    if (!attendance) return [];
    
    const assigned = [];
    Object.values(attendance).forEach(assignments => {
        assignments.forEach(assignment => {
            assigned.push(assignment.laborerId);
        });
    });
    return assigned;
}

function getAllAssignedLaborersForDate(date) {
    const attendance = appState.attendance[date];
    if (!attendance) return [];
    
    const assigned = [];
    Object.values(attendance).forEach(assignments => {
        assigned.push(...assignments);
    });
    return assigned;
}

function getAssignedLaborersForProject(projectId, date) {
    const attendance = appState.attendance[date];
    if (!attendance || !attendance[projectId.toString()]) return [];
    
    return attendance[projectId.toString()];
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);