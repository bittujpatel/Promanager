// Enhanced Application State with extended data structure
let appState = {
    currentPage: 'dashboard',
    currentDate: new Date().toISOString().split('T')[0],
    nextLaborerId: 7,
    nextProjectId: 4,
    nextMaterialId: 8,
    selectedLaborers: [],
    pendingAssignment: null,
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
                {id: 1, item: "Cement", quantity: "50 bags", cost: 25000, date: "2024-08-15", supplier: "ACC Ltd"},
                {id: 2, item: "Steel Rods", quantity: "2 tons", cost: 120000, date: "2024-08-18", supplier: "Tata Steel"},
                {id: 3, item: "Bricks", quantity: "10000 pieces", cost: 35000, date: "2024-08-20", supplier: "Local Supplier"}
            ],
            milestones: [
                {name: "Foundation", targetDate: "2024-03-01", actualDate: "2024-03-05", status: "Completed"},
                {name: "Structure", targetDate: "2024-07-01", actualDate: null, status: "In Progress"},
                {name: "Finishing", targetDate: "2024-11-01", actualDate: null, status: "Not Started"}
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
                {id: 4, item: "Glass Panels", quantity: "100 sqm", cost: 80000, date: "2024-08-10", supplier: "Guardian Glass"},
                {id: 5, item: "Electrical Cables", quantity: "500m", cost: 45000, date: "2024-08-19", supplier: "Polycab"}
            ],
            milestones: [
                {name: "Foundation", targetDate: "2024-04-15", actualDate: "2024-04-20", status: "Completed"},
                {name: "Structure", targetDate: "2024-08-01", actualDate: null, status: "In Progress"},
                {name: "Interiors", targetDate: "2024-10-15", actualDate: null, status: "Not Started"}
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
                {id: 6, item: "Concrete Mix", quantity: "500 cubic meters", cost: 200000, date: "2024-08-12", supplier: "UltraTech"},
                {id: 7, item: "Reinforcement Steel", quantity: "5 tons", cost: 300000, date: "2024-08-16", supplier: "SAIL"}
            ],
            milestones: [
                {name: "Survey & Planning", targetDate: "2024-03-01", actualDate: "2024-02-28", status: "Completed"},
                {name: "Foundation Work", targetDate: "2024-08-01", actualDate: null, status: "In Progress"},
                {name: "Bridge Construction", targetDate: "2024-12-01", actualDate: null, status: "Not Started"}
            ]
        }
    ],
    laborers: [
        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Mason",
            dailyRate: 800,
            phone: "9876543210",
            status: "Active",
            skillLevel: "Expert",
            totalDaysWorked: 45,
            totalEarnings: 38400
        },
        {
            id: 2,
            name: "Amit Singh",
            role: "Helper",
            dailyRate: 500,
            phone: "9876543211",
            status: "Active",
            skillLevel: "Helper",
            totalDaysWorked: 40,
            totalEarnings: 21000
        },
        {
            id: 3,
            name: "Priya Sharma",
            role: "Electrician",
            dailyRate: 1000,
            phone: "9876543212",
            status: "Active",
            skillLevel: "Skilled",
            totalDaysWorked: 35,
            totalEarnings: 38500
        },
        {
            id: 4,
            name: "Vikram Patel",
            role: "Plumber",
            dailyRate: 900,
            phone: "9876543213",
            status: "Active",
            skillLevel: "Skilled",
            totalDaysWorked: 38,
            totalEarnings: 35550
        },
        {
            id: 5,
            name: "Sunita Yadav",
            role: "Mason",
            dailyRate: 750,
            phone: "9876543214",
            status: "Active",
            skillLevel: "Skilled",
            totalDaysWorked: 42,
            totalEarnings: 33000
        },
        {
            id: 6,
            name: "Rahul Gupta",
            role: "Helper",
            dailyRate: 450,
            phone: "9876543215",
            status: "Active",
            skillLevel: "Helper",
            totalDaysWorked: 30,
            totalEarnings: 14850
        }
    ],
    attendance: {
        "2024-08-20": {
            "1": [{laborerId: 1, employmentType: "normal"}, {laborerId: 3, employmentType: "overtime"}, {laborerId: 5, employmentType: "normal"}],
            "2": [{laborerId: 2, employmentType: "normal"}, {laborerId: 4, employmentType: "double"}],
            "3": [{laborerId: 6, employmentType: "normal"}]
        },
        "2024-08-19": {
            "1": [{laborerId: 1, employmentType: "normal"}, {laborerId: 2, employmentType: "normal"}, {laborerId: 5, employmentType: "overtime"}],
            "2": [{laborerId: 3, employmentType: "normal"}, {laborerId: 4, employmentType: "normal"}, {laborerId: 6, employmentType: "night"}],
            "3": []
        }
    },
    employmentTypes: [
        {id: "normal", name: "Normal Shift", multiplier: 1.0, color: "#10B981"},
        {id: "overtime", name: "Overtime", multiplier: 1.5, color: "#F59E0B"},
        {id: "double", name: "Double Shift", multiplier: 2.0, color: "#EF4444"},
        {id: "night", name: "Night Shift", multiplier: 1.25, color: "#8B5CF6"},
        {id: "holiday", name: "Holiday Work", multiplier: 2.5, color: "#EC4899"}
    ]
};

// Chart instances
let charts = {
    costTrendsChart: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDatePicker();
    initializeSearch();
    initializeForms();
    initializeFilters();
    showPage('dashboard');
});

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            showPage(page);
        });
    });
}

function showPage(pageId) {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    appState.currentPage = pageId;

    // Load page content
    switch(pageId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'laborers':
            loadLaborers();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'attendance':
            loadAttendance();
            break;
    }
}

// Enhanced Dashboard Functions
function loadDashboard() {
    updateDashboardMetrics();
    renderProjectCostCards();
    setTimeout(() => {
        initializeCostTrendsChart();
    }, 100);
}

function updateDashboardMetrics() {
    const totalProjects = appState.projects.length;
    const activeLaborers = appState.laborers.filter(l => l.status === 'Active').length;
    const totalLaborCost = calculateTotalLaborCost();
    const avgProgress = Math.round(appState.projects.reduce((sum, p) => sum + p.progress, 0) / appState.projects.length);

    document.getElementById('totalProjects').textContent = totalProjects;
    document.getElementById('totalLaborers').textContent = activeLaborers;
    document.getElementById('totalLaborCost').textContent = formatCurrency(totalLaborCost);
    document.getElementById('avgProgress').textContent = `${avgProgress}%`;
}

function calculateTotalLaborCost() {
    let totalCost = 0;
    Object.entries(appState.attendance).forEach(([date, dayAttendance]) => {
        Object.values(dayAttendance).forEach(assignments => {
            assignments.forEach(assignment => {
                const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
                if (laborer) {
                    const employmentType = appState.employmentTypes.find(et => et.id === assignment.employmentType);
                    const multiplier = employmentType ? employmentType.multiplier : 1.0;
                    totalCost += laborer.dailyRate * multiplier;
                }
            });
        });
    });
    return totalCost;
}

function renderProjectCostCards() {
    const container = document.getElementById('projectCostCards');
    
    container.innerHTML = appState.projects.map(project => {
        const laborCost = calculateProjectLaborCost(project.id);
        const materialCost = calculateProjectMaterialCost(project.id);
        const totalCost = laborCost + materialCost;
        const budgetVariance = ((totalCost - project.budget) / project.budget) * 100;
        const varianceClass = budgetVariance > 0 ? 'negative' : 'positive';

        return `
            <div class="project-cost-card" onclick="showProjectDetails(${project.id})">
                <div class="cost-card-header">
                    <h4 class="cost-card-title">${project.name}</h4>
                    <div class="cost-variance ${varianceClass}">
                        ${budgetVariance > 0 ? '+' : ''}${budgetVariance.toFixed(1)}%
                    </div>
                </div>
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <span class="cost-label">Labor Cost:</span>
                        <span class="cost-value">${formatCurrency(laborCost)}</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Material Cost:</span>
                        <span class="cost-value">${formatCurrency(materialCost)}</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Budget:</span>
                        <span class="cost-value">${formatCurrency(project.budget)}</span>
                    </div>
                    <div class="cost-item cost-total">
                        <span class="cost-label">Total Spent:</span>
                        <span class="cost-value">${formatCurrency(totalCost)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function calculateProjectLaborCost(projectId) {
    let totalCost = 0;
    Object.values(appState.attendance).forEach(dayAttendance => {
        const projectAssignments = dayAttendance[projectId.toString()] || [];
        projectAssignments.forEach(assignment => {
            const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
            if (laborer) {
                const employmentType = appState.employmentTypes.find(et => et.id === assignment.employmentType);
                const multiplier = employmentType ? employmentType.multiplier : 1.0;
                totalCost += laborer.dailyRate * multiplier;
            }
        });
    });
    return totalCost;
}

function calculateProjectMaterialCost(projectId) {
    const project = appState.projects.find(p => p.id === projectId);
    return project ? project.materialCosts.reduce((sum, material) => sum + material.cost, 0) : 0;
}

function initializeCostTrendsChart() {
    if (charts.costTrendsChart) charts.costTrendsChart.destroy();

    const ctx = document.getElementById('costTrendsChart').getContext('2d');
    const chartData = generateCostTrendsData();
    
    charts.costTrendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: chartData.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
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
}

function generateCostTrendsData() {
    const colors = ['#1FB8CD', '#FFC185', '#B4413C'];
    const labels = ['Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024'];
    
    const datasets = appState.projects.map((project, index) => ({
        label: project.name,
        data: [
            Math.random() * 500000 + 200000,
            Math.random() * 600000 + 300000,
            Math.random() * 700000 + 400000,
            Math.random() * 800000 + 500000
        ],
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + '20',
        tension: 0.4
    }));

    return { labels, datasets };
}

// Enhanced Labor Management Functions
function loadLaborers() {
    renderLaborersTable();
}

function initializeFilters() {
    // Labor filters
    const roleFilter = document.getElementById('laborerRoleFilter');
    const skillFilter = document.getElementById('laborerSkillFilter');
    const projectFilter = document.getElementById('projectStatusFilter');
    const availableFilter = document.getElementById('availableRoleFilter');

    if (roleFilter) roleFilter.addEventListener('change', renderLaborersTable);
    if (skillFilter) skillFilter.addEventListener('change', renderLaborersTable);
    if (projectFilter) projectFilter.addEventListener('change', renderProjectsGrid);
    if (availableFilter) availableFilter.addEventListener('change', renderAvailableLaborers);
}

function renderLaborersTable() {
    const tbody = document.getElementById('laborersTableBody');
    const searchTerm = document.getElementById('laborerSearch').value.toLowerCase();
    const roleFilter = document.getElementById('laborerRoleFilter').value;
    const skillFilter = document.getElementById('laborerSkillFilter').value;
    
    const filteredLaborers = appState.laborers.filter(laborer => 
        (laborer.name.toLowerCase().includes(searchTerm) ||
         laborer.role.toLowerCase().includes(searchTerm)) &&
        (roleFilter === '' || laborer.role === roleFilter) &&
        (skillFilter === '' || laborer.skillLevel === skillFilter)
    );

    tbody.innerHTML = filteredLaborers.map(laborer => `
        <tr>
            <td>
                <input type="checkbox" class="laborer-checkbox" data-laborer-id="${laborer.id}">
            </td>
            <td>${laborer.name}</td>
            <td>${laborer.role}</td>
            <td>
                <span class="status-badge status-badge--${laborer.skillLevel.toLowerCase()}">${laborer.skillLevel}</span>
            </td>
            <td>${formatCurrency(laborer.dailyRate)}</td>
            <td>${laborer.totalDaysWorked}</td>
            <td>${formatCurrency(laborer.totalEarnings)}</td>
            <td>${laborer.phone}</td>
            <td><span class="status-badge status-badge--${laborer.status.toLowerCase()}">${laborer.status}</span></td>
            <td>
                <button class="btn btn--sm btn--outline" onclick="editLaborer(${laborer.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn--sm btn--danger" onclick="confirmDeleteLaborer(${laborer.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.laborer-checkbox');
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

function bulkUpdateRates() {
    const selected = getSelectedLaborers();
    if (selected.length === 0) {
        showToast('Please select laborers to update', 'warning');
        return;
    }
    
    const newRate = prompt(`Update daily rate for ${selected.length} laborers:`);
    if (newRate && !isNaN(newRate) && newRate > 0) {
        selected.forEach(laborerId => {
            const laborer = appState.laborers.find(l => l.id === laborerId);
            if (laborer) {
                laborer.dailyRate = parseInt(newRate);
            }
        });
        renderLaborersTable();
        showToast(`Updated rates for ${selected.length} laborers`, 'success');
    }
}

function getSelectedLaborers() {
    const checkboxes = document.querySelectorAll('.laborer-checkbox:checked');
    return Array.from(checkboxes).map(cb => parseInt(cb.dataset.laborerId));
}

// Enhanced Project Management Functions
function loadProjects() {
    renderProjectsGrid();
}

function renderProjectsGrid() {
    const grid = document.getElementById('projectsGrid');
    const searchTerm = document.getElementById('projectSearch') ? document.getElementById('projectSearch').value.toLowerCase() : '';
    const statusFilter = document.getElementById('projectStatusFilter') ? document.getElementById('projectStatusFilter').value : '';
    
    const filteredProjects = appState.projects.filter(project => 
        (project.name.toLowerCase().includes(searchTerm) ||
         project.location.toLowerCase().includes(searchTerm)) &&
        (statusFilter === '' || project.status === statusFilter)
    );

    grid.innerHTML = filteredProjects.map(project => {
        const laborCost = calculateProjectLaborCost(project.id);
        const materialCost = calculateProjectMaterialCost(project.id);
        const totalCost = laborCost + materialCost;

        return `
            <div class="project-card" onclick="showProjectDetails(${project.id})">
                <div class="project-header">
                    <h3 class="project-title">${project.name}</h3>
                    <div class="project-actions" onclick="event.stopPropagation()">
                        <button class="btn btn--sm btn--outline" onclick="editProject(${project.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn--sm btn--danger" onclick="confirmDeleteProject(${project.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="project-info">
                    <p><i class="fas fa-map-marker-alt"></i> ${project.location}</p>
                    <p><i class="fas fa-calendar"></i> ${formatDate(project.startDate)} - ${formatDate(project.endDate)}</p>
                    <p><i class="fas fa-rupee-sign"></i> Budget: ${formatCurrency(project.budget)}</p>
                    <p><span class="status-badge status-badge--${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span></p>
                </div>
                <div class="project-summary">
                    <div class="summary-item">
                        <span class="summary-value">${formatCurrency(laborCost)}</span>
                        <div class="summary-label">Labor Cost</div>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${formatCurrency(materialCost)}</span>
                        <div class="summary-label">Material Cost</div>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${formatCurrency(totalCost)}</span>
                        <div class="summary-label">Total Spent</div>
                    </div>
                </div>
                <div class="project-progress">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span>Progress</span>
                        <span>${project.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                </div>
                <button class="expand-btn" onclick="event.stopPropagation(); showProjectDetails(${project.id})">
                    <i class="fas fa-expand"></i> View Details
                </button>
            </div>
        `;
    }).join('');
}

function showProjectDetails(projectId) {
    const project = appState.projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectDetailsModal');
    const title = document.getElementById('projectDetailsTitle');
    const content = document.getElementById('projectDetailsContent');

    title.textContent = project.name;

    const laborCost = calculateProjectLaborCost(project.id);
    const materialCost = calculateProjectMaterialCost(project.id);
    const totalCost = laborCost + materialCost;
    const budgetVariance = totalCost - project.budget;

    content.innerHTML = `
        <div class="project-details-tabs">
            <button class="tab-btn active" onclick="switchTab('overview')">Overview</button>
            <button class="tab-btn" onclick="switchTab('materials')">Materials</button>
            <button class="tab-btn" onclick="switchTab('milestones')">Milestones</button>
            <button class="tab-btn" onclick="switchTab('costs')">Cost Analysis</button>
        </div>

        <div id="overview-tab" class="tab-content active">
            <div class="project-summary">
                <div class="summary-item">
                    <span class="summary-value">${formatCurrency(project.budget)}</span>
                    <div class="summary-label">Budget</div>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${formatCurrency(totalCost)}</span>
                    <div class="summary-label">Spent</div>
                </div>
                <div class="summary-item">
                    <span class="summary-value ${budgetVariance >= 0 ? 'text-error' : 'text-success'}">${formatCurrency(Math.abs(budgetVariance))}</span>
                    <div class="summary-label">${budgetVariance >= 0 ? 'Over Budget' : 'Under Budget'}</div>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${project.progress}%</span>
                    <div class="summary-label">Progress</div>
                </div>
            </div>
            <div class="project-info">
                <p><strong>Location:</strong> ${project.location}</p>
                <p><strong>Duration:</strong> ${formatDate(project.startDate)} - ${formatDate(project.endDate)}</p>
                <p><strong>Status:</strong> <span class="status-badge status-badge--${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span></p>
            </div>
        </div>

        <div id="materials-tab" class="tab-content">
            <div class="material-costs-section">
                <div class="section-header">
                    <h4>Material Costs</h4>
                    <button class="btn btn--primary btn--sm" onclick="openMaterialModal(${project.id})">
                        <i class="fas fa-plus"></i> Add Material
                    </button>
                </div>
                <div class="materials-list">
                    ${project.materialCosts.map(material => `
                        <div class="material-item">
                            <div class="material-info">
                                <strong>${material.item}</strong> - ${material.quantity}
                                <br>
                                <small>${formatDate(material.date)} • ${material.supplier || 'No supplier'}</small>
                            </div>
                            <div class="material-actions">
                                <span class="font-semibold">${formatCurrency(material.cost)}</span>
                                <button class="btn btn--sm btn--outline" onclick="editMaterial(${project.id}, ${material.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn--sm btn--danger" onclick="deleteMaterial(${project.id}, ${material.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cost-total" style="margin-top: 16px;">
                    <strong>Total Material Cost: ${formatCurrency(materialCost)}</strong>
                </div>
            </div>
        </div>

        <div id="milestones-tab" class="tab-content">
            <div class="materials-list">
                ${project.milestones.map(milestone => `
                    <div class="material-item">
                        <div class="material-info">
                            <strong>${milestone.name}</strong>
                            <br>
                            <small>Target: ${formatDate(milestone.targetDate)} ${milestone.actualDate ? `• Actual: ${formatDate(milestone.actualDate)}` : ''}</small>
                        </div>
                        <div class="material-actions">
                            <span class="status-badge status-badge--${milestone.status.toLowerCase().replace(' ', '-')}">${milestone.status}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div id="costs-tab" class="tab-content">
            <div class="cost-breakdown">
                <div class="cost-item">
                    <span class="cost-label">Labor Cost:</span>
                    <span class="cost-value">${formatCurrency(laborCost)}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Material Cost:</span>
                    <span class="cost-value">${formatCurrency(materialCost)}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Budget Allocated:</span>
                    <span class="cost-value">${formatCurrency(project.budget)}</span>
                </div>
                <div class="cost-item cost-total">
                    <span class="cost-label">Total Spent:</span>
                    <span class="cost-value">${formatCurrency(totalCost)}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Budget Variance:</span>
                    <span class="cost-value ${budgetVariance >= 0 ? 'text-error' : 'text-success'}">
                        ${budgetVariance >= 0 ? '+' : ''}${formatCurrency(budgetVariance)}
                    </span>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function closeProjectDetailsModal() {
    document.getElementById('projectDetailsModal').classList.add('hidden');
}

// Material Management Functions
function openMaterialModal(projectId, materialId = null) {
    const modal = document.getElementById('materialModal');
    const form = document.getElementById('materialForm');
    const title = document.getElementById('materialModalTitle');
    
    form.reset();
    document.getElementById('materialProjectId').value = projectId;
    document.getElementById('materialDate').value = appState.currentDate;
    
    if (materialId) {
        const project = appState.projects.find(p => p.id === projectId);
        const material = project.materialCosts.find(m => m.id === materialId);
        if (material) {
            title.textContent = 'Edit Material Cost';
            document.getElementById('materialId').value = material.id;
            document.getElementById('materialItem').value = material.item;
            document.getElementById('materialQuantity').value = material.quantity;
            document.getElementById('materialCost').value = material.cost;
            document.getElementById('materialDate').value = material.date;
            document.getElementById('materialSupplier').value = material.supplier || '';
        }
    } else {
        title.textContent = 'Add Material Cost';
    }
    
    modal.classList.remove('hidden');
}

function closeMaterialModal() {
    document.getElementById('materialModal').classList.add('hidden');
}

function editMaterial(projectId, materialId) {
    openMaterialModal(projectId, materialId);
}

function deleteMaterial(projectId, materialId) {
    const project = appState.projects.find(p => p.id === projectId);
    const material = project.materialCosts.find(m => m.id === materialId);
    
    showConfirmModal(
        `Delete material "${material.item}"?`,
        () => {
            project.materialCosts = project.materialCosts.filter(m => m.id !== materialId);
            showProjectDetails(projectId);
            showToast('Material deleted successfully', 'success');
        },
        `Cost: ${formatCurrency(material.cost)}`
    );
}

// Enhanced Attendance Management Functions
function initializeDatePicker() {
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput) {
        dateInput.value = appState.currentDate;
        dateInput.addEventListener('change', function() {
            appState.currentDate = this.value;
            loadAttendance();
        });
    }
}

function loadAttendance() {
    document.getElementById('attendanceDate').value = appState.currentDate;
    renderAvailableLaborers();
    renderProjectAssignments();
    updateAttendanceSummary();
    renderEmploymentLegend();
}

function renderAvailableLaborers() {
    const container = document.getElementById('availableLaborers');
    const roleFilter = document.getElementById('availableRoleFilter') ? document.getElementById('availableRoleFilter').value : '';
    const assignedLaborerIds = getAssignedLaborerIds(appState.currentDate);
    
    const availableLaborers = appState.laborers.filter(laborer => 
        laborer.status === 'Active' && 
        !assignedLaborerIds.includes(laborer.id) &&
        (roleFilter === '' || laborer.role === roleFilter)
    );

    if (availableLaborers.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No available laborers</p></div>';
        return;
    }

    container.innerHTML = availableLaborers.map(laborer => `
        <div class="laborer-item" draggable="true" data-laborer-id="${laborer.id}">
            <div class="laborer-name">${laborer.name}</div>
            <div class="laborer-details">
                <span>${laborer.role} - ${formatCurrency(laborer.dailyRate)}/day</span>
                <span class="status-badge status-badge--${laborer.skillLevel.toLowerCase()}">${laborer.skillLevel}</span>
            </div>
        </div>
    `).join('');

    // Add drag event listeners
    container.querySelectorAll('.laborer-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('click', function() {
            selectLaborer(parseInt(this.dataset.laborerId));
        });
    });
}

function renderProjectAssignments() {
    const container = document.getElementById('projectAssignments');
    
    container.innerHTML = appState.projects.map(project => {
        const assignedLaborers = getAssignedLaborersForProject(project.id, appState.currentDate);
        const totalCost = assignedLaborers.reduce((sum, assignment) => {
            const employmentType = appState.employmentTypes.find(et => et.id === assignment.employmentType);
            const multiplier = employmentType ? employmentType.multiplier : 1.0;
            return sum + (assignment.laborer.dailyRate * multiplier);
        }, 0);
        
        return `
            <div class="project-assignment drop-zone" data-project-id="${project.id}">
                <div class="assignment-header">
                    <div class="assignment-title">${project.name}</div>
                    <div class="assignment-cost">${formatCurrency(totalCost)}</div>
                </div>
                <div class="assigned-laborers">
                    ${assignedLaborers.map(assignment => `
                        <div class="laborer-item" data-laborer-id="${assignment.laborer.id}" onclick="unassignLaborer(${assignment.laborer.id})">
                            <div class="laborer-name">${assignment.laborer.name}</div>
                            <div class="laborer-details">
                                <span>${assignment.laborer.role} - ${formatCurrency(assignment.laborer.dailyRate * assignment.multiplier)}/day</span>
                                <div class="employment-type-indicator-small" style="background-color: ${assignment.color}" title="${assignment.employmentTypeName}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Add drop event listeners
    container.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
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

function getAssignedLaborersForProject(projectId, date) {
    const attendance = appState.attendance[date];
    if (!attendance || !attendance[projectId.toString()]) return [];
    
    const assignments = attendance[projectId.toString()];
    return assignments.map(assignment => {
        const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
        const employmentType = appState.employmentTypes.find(et => et.id === assignment.employmentType);
        return {
            laborer,
            employmentType: assignment.employmentType,
            employmentTypeName: employmentType ? employmentType.name : 'Normal',
            multiplier: employmentType ? employmentType.multiplier : 1.0,
            color: employmentType ? employmentType.color : '#10B981'
        };
    }).filter(a => a.laborer);
}

function selectLaborer(laborerId) {
    document.querySelectorAll('.laborer-item').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelector(`[data-laborer-id="${laborerId}"]`).classList.add('selected');
    
    // Show employment type selection
    appState.selectedLaborerId = laborerId;
    showEmploymentTypeModal();
}

function showEmploymentTypeModal() {
    const modal = document.getElementById('employmentTypeModal');
    const container = document.getElementById('employmentTypesList');
    
    container.innerHTML = appState.employmentTypes.map(type => `
        <div class="employment-type-option" onclick="selectEmploymentType('${type.id}')">
            <div class="employment-type-indicator" style="background-color: ${type.color}"></div>
            <div class="employment-type-info">
                <div class="employment-type-name">${type.name}</div>
                <div class="employment-type-rate">${type.multiplier}x rate</div>
            </div>
        </div>
    `).join('');
    
    modal.classList.remove('hidden');
}

function selectEmploymentType(employmentTypeId) {
    appState.pendingAssignment = {
        laborerId: appState.selectedLaborerId,
        employmentType: employmentTypeId
    };
    closeEmploymentTypeModal();
    
    // Highlight drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.style.border = '2px dashed var(--color-primary)';
        zone.style.backgroundColor = 'var(--color-bg-1)';
    });
    
    showToast('Select a project to assign the laborer', 'info');
}

function closeEmploymentTypeModal() {
    document.getElementById('employmentTypeModal').classList.add('hidden');
}

function renderEmploymentLegend() {
    const container = document.getElementById('employmentLegend');
    container.innerHTML = appState.employmentTypes.map(type => `
        <div class="employment-type-badge">
            <div class="employment-type-indicator" style="background-color: ${type.color}"></div>
            <span>${type.name}</span>
        </div>
    `).join('');
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.laborerId);
    e.target.classList.add('dragging');
    appState.draggingLaborerId = parseInt(e.target.dataset.laborerId);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const laborerId = parseInt(e.dataTransfer.getData('text/plain'));
    const projectId = parseInt(e.currentTarget.dataset.projectId);
    
    if (appState.pendingAssignment && appState.pendingAssignment.laborerId === laborerId) {
        // Use pending assignment with employment type
        assignLaborerToProject(laborerId, projectId, appState.pendingAssignment.employmentType);
        appState.pendingAssignment = null;
        
        // Reset drop zone highlighting
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.style.border = '';
            zone.style.backgroundColor = '';
        });
    } else {
        // Show employment type selection for drag & drop
        appState.selectedLaborerId = laborerId;
        appState.targetProjectId = projectId;
        showEmploymentTypeModal();
    }
}

function assignLaborerToProject(laborerId, projectId, employmentType = 'normal') {
    const date = appState.currentDate;
    
    // Initialize attendance for date if doesn't exist
    if (!appState.attendance[date]) {
        appState.attendance[date] = {};
    }
    
    // Initialize project attendance if doesn't exist
    if (!appState.attendance[date][projectId.toString()]) {
        appState.attendance[date][projectId.toString()] = [];
    }
    
    // Remove laborer from other projects on this date
    Object.keys(appState.attendance[date]).forEach(pId => {
        appState.attendance[date][pId] = appState.attendance[date][pId].filter(assignment => 
            assignment.laborerId !== laborerId
        );
    });
    
    // Add laborer to new project with employment type
    appState.attendance[date][projectId.toString()].push({
        laborerId: laborerId,
        employmentType: employmentType
    });
    
    // Update laborer stats
    const laborer = appState.laborers.find(l => l.id === laborerId);
    const employmentMultiplier = appState.employmentTypes.find(et => et.id === employmentType)?.multiplier || 1.0;
    laborer.totalDaysWorked += 1;
    laborer.totalEarnings += laborer.dailyRate * employmentMultiplier;
    
    loadAttendance();
    showToast(`${laborer.name} assigned with ${employmentType} shift`, 'success');
}

function unassignLaborer(laborerId) {
    const date = appState.currentDate;
    
    if (appState.attendance[date]) {
        Object.keys(appState.attendance[date]).forEach(projectId => {
            appState.attendance[date][projectId] = appState.attendance[date][projectId].filter(assignment => 
                assignment.laborerId !== laborerId
            );
        });
    }
    
    const laborer = appState.laborers.find(l => l.id === laborerId);
    showToast(`${laborer.name} unassigned`, 'info');
    loadAttendance();
}

function updateAttendanceSummary() {
    const assignedLaborerIds = getAssignedLaborerIds(appState.currentDate);
    const totalAssigned = assignedLaborerIds.length;
    const activeProjects = Object.keys(appState.attendance[appState.currentDate] || {}).filter(projectId => 
        appState.attendance[appState.currentDate][projectId].length > 0
    ).length;
    
    const dailyCost = calculateDailyCost(appState.currentDate);
    
    document.getElementById('totalAssigned').textContent = totalAssigned;
    document.getElementById('assignmentBreakdown').textContent = `Across ${activeProjects} projects`;
    document.getElementById('dailyCost').textContent = formatCurrency(dailyCost);
    
    // Calculate employment type breakdown
    const employmentBreakdown = getEmploymentTypeBreakdown(appState.currentDate);
    document.getElementById('costBreakdown').textContent = `Normal: ${employmentBreakdown.normal}, OT: ${employmentBreakdown.overtime}, Double: ${employmentBreakdown.double}`;
}

function calculateDailyCost(date) {
    const attendance = appState.attendance[date];
    if (!attendance) return 0;
    
    let totalCost = 0;
    Object.values(attendance).forEach(assignments => {
        assignments.forEach(assignment => {
            const laborer = appState.laborers.find(l => l.id === assignment.laborerId);
            const employmentType = appState.employmentTypes.find(et => et.id === assignment.employmentType);
            if (laborer) {
                const multiplier = employmentType ? employmentType.multiplier : 1.0;
                totalCost += laborer.dailyRate * multiplier;
            }
        });
    });
    return totalCost;
}

function getEmploymentTypeBreakdown(date) {
    const attendance = appState.attendance[date];
    if (!attendance) return {normal: 0, overtime: 0, double: 0, night: 0, holiday: 0};
    
    const breakdown = {normal: 0, overtime: 0, double: 0, night: 0, holiday: 0};
    Object.values(attendance).forEach(assignments => {
        assignments.forEach(assignment => {
            breakdown[assignment.employmentType] = (breakdown[assignment.employmentType] || 0) + 1;
        });
    });
    return breakdown;
}

function changeDate(days) {
    const currentDate = new Date(appState.currentDate);
    currentDate.setDate(currentDate.getDate() + days);
    appState.currentDate = currentDate.toISOString().split('T')[0];
    loadAttendance();
}

function goToToday() {
    appState.currentDate = new Date().toISOString().split('T')[0];
    loadAttendance();
}

// Enhanced Form Handling
function initializeSearch() {
    const laborerSearch = document.getElementById('laborerSearch');
    const projectSearch = document.getElementById('projectSearch');
    
    if (laborerSearch) laborerSearch.addEventListener('input', renderLaborersTable);
    if (projectSearch) projectSearch.addEventListener('input', renderProjectsGrid);
}

function initializeForms() {
    // Laborer form
    const laborerForm = document.getElementById('laborerForm');
    if (laborerForm) {
        laborerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveLaborer();
        });
    }

    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProject();
        });
    }

    // Material form
    const materialForm = document.getElementById('materialForm');
    if (materialForm) {
        materialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveMaterial();
        });
    }
}

function updateProgressValue(value) {
    document.getElementById('progressValue').textContent = value;
}

function openLaborerModal(laborerId = null) {
    const modal = document.getElementById('laborerModal');
    const form = document.getElementById('laborerForm');
    const title = document.getElementById('laborerModalTitle');
    
    form.reset();
    
    if (laborerId) {
        const laborer = appState.laborers.find(l => l.id === laborerId);
        if (laborer) {
            title.textContent = 'Edit Laborer';
            document.getElementById('laborerId').value = laborer.id;
            document.getElementById('laborerName').value = laborer.name;
            document.getElementById('laborerRole').value = laborer.role;
            document.getElementById('laborerSkillLevel').value = laborer.skillLevel;
            document.getElementById('laborerRate').value = laborer.dailyRate;
            document.getElementById('laborerPhone').value = laborer.phone;
            document.getElementById('laborerStatus').value = laborer.status;
        }
    } else {
        title.textContent = 'Add Laborer';
        document.getElementById('laborerStatus').value = 'Active';
        document.getElementById('laborerSkillLevel').value = 'Helper';
    }
    
    modal.classList.remove('hidden');
}

function closeLaborerModal() {
    document.getElementById('laborerModal').classList.add('hidden');
}

function saveLaborer() {
    const laborer = {
        id: document.getElementById('laborerId').value ? 
            parseInt(document.getElementById('laborerId').value) : 
            appState.nextLaborerId++,
        name: document.getElementById('laborerName').value,
        role: document.getElementById('laborerRole').value,
        skillLevel: document.getElementById('laborerSkillLevel').value,
        dailyRate: parseInt(document.getElementById('laborerRate').value),
        phone: document.getElementById('laborerPhone').value,
        status: document.getElementById('laborerStatus').value,
        totalDaysWorked: 0,
        totalEarnings: 0
    };

    const existingIndex = appState.laborers.findIndex(l => l.id === laborer.id);
    if (existingIndex !== -1) {
        // Preserve existing stats when editing
        laborer.totalDaysWorked = appState.laborers[existingIndex].totalDaysWorked;
        laborer.totalEarnings = appState.laborers[existingIndex].totalEarnings;
        appState.laborers[existingIndex] = laborer;
        showToast('Laborer updated successfully', 'success');
    } else {
        appState.laborers.push(laborer);
        showToast('Laborer added successfully', 'success');
    }

    closeLaborerModal();
    renderLaborersTable();
    updateDashboardMetrics();
}

function editLaborer(id) {
    openLaborerModal(id);
}

function confirmDeleteLaborer(id) {
    const laborer = appState.laborers.find(l => l.id === id);
    if (laborer) {
        showConfirmModal(
            `Delete laborer "${laborer.name}"?`,
            () => deleteLaborer(id),
            `This will remove them from all attendance records.`
        );
    }
}

function deleteLaborer(id) {
    const laborer = appState.laborers.find(l => l.id === id);
    appState.laborers = appState.laborers.filter(l => l.id !== id);
    
    // Remove from attendance records
    Object.keys(appState.attendance).forEach(date => {
        Object.keys(appState.attendance[date]).forEach(projectId => {
            appState.attendance[date][projectId] = appState.attendance[date][projectId].filter(assignment => assignment.laborerId !== id);
        });
    });
    
    renderLaborersTable();
    updateDashboardMetrics();
    showToast(`${laborer.name} deleted successfully`, 'success');
}

function openProjectModal(projectId = null) {
    const modal = document.getElementById('projectModal');
    const form = document.getElementById('projectForm');
    const title = document.getElementById('projectModalTitle');
    
    form.reset();
    
    if (projectId) {
        const project = appState.projects.find(p => p.id === projectId);
        if (project) {
            title.textContent = 'Edit Project';
            document.getElementById('projectId').value = project.id;
            document.getElementById('projectName').value = project.name;
            document.getElementById('projectLocation').value = project.location;
            document.getElementById('projectStartDate').value = project.startDate;
            document.getElementById('projectEndDate').value = project.endDate;
            document.getElementById('projectBudget').value = project.budget;
            document.getElementById('projectStatus').value = project.status;
            document.getElementById('projectProgress').value = project.progress;
            document.getElementById('progressValue').textContent = project.progress;
        }
    } else {
        title.textContent = 'Add Project';
        document.getElementById('projectStatus').value = 'Not Started';
        document.getElementById('projectProgress').value = 0;
        document.getElementById('progressValue').textContent = '0';
    }
    
    modal.classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.add('hidden');
}

function saveProject() {
    const project = {
        id: document.getElementById('projectId').value ? 
            parseInt(document.getElementById('projectId').value) : 
            appState.nextProjectId++,
        name: document.getElementById('projectName').value,
        location: document.getElementById('projectLocation').value,
        startDate: document.getElementById('projectStartDate').value,
        endDate: document.getElementById('projectEndDate').value,
        budget: parseInt(document.getElementById('projectBudget').value),
        status: document.getElementById('projectStatus').value,
        progress: parseInt(document.getElementById('projectProgress').value),
        materialCosts: [],
        milestones: []
    };

    const existingIndex = appState.projects.findIndex(p => p.id === project.id);
    if (existingIndex !== -1) {
        // Preserve existing material costs and milestones
        project.materialCosts = appState.projects[existingIndex].materialCosts;
        project.milestones = appState.projects[existingIndex].milestones;
        appState.projects[existingIndex] = project;
        showToast('Project updated successfully', 'success');
    } else {
        appState.projects.push(project);
        showToast('Project added successfully', 'success');
    }

    closeProjectModal();
    renderProjectsGrid();
    renderProjectCostCards();
    updateDashboardMetrics();
}

function editProject(id) {
    openProjectModal(id);
}

function confirmDeleteProject(id) {
    const project = appState.projects.find(p => p.id === id);
    if (project) {
        showConfirmModal(
            `Delete project "${project.name}"?`,
            () => deleteProject(id),
            `This will remove all associated attendance and material records.`
        );
    }
}

function deleteProject(id) {
    const project = appState.projects.find(p => p.id === id);
    appState.projects = appState.projects.filter(p => p.id !== id);
    
    // Remove from attendance records
    Object.keys(appState.attendance).forEach(date => {
        delete appState.attendance[date][id.toString()];
    });
    
    renderProjectsGrid();
    renderProjectCostCards();
    updateDashboardMetrics();
    showToast(`${project.name} deleted successfully`, 'success');
}

function saveMaterial() {
    const projectId = parseInt(document.getElementById('materialProjectId').value);
    const materialId = document.getElementById('materialId').value;
    
    const material = {
        id: materialId ? parseInt(materialId) : appState.nextMaterialId++,
        item: document.getElementById('materialItem').value,
        quantity: document.getElementById('materialQuantity').value,
        cost: parseInt(document.getElementById('materialCost').value),
        date: document.getElementById('materialDate').value,
        supplier: document.getElementById('materialSupplier').value
    };

    const project = appState.projects.find(p => p.id === projectId);
    if (!project.materialCosts) project.materialCosts = [];
    
    const existingIndex = project.materialCosts.findIndex(m => m.id === material.id);
    if (existingIndex !== -1) {
        project.materialCosts[existingIndex] = material;
        showToast('Material updated successfully', 'success');
    } else {
        project.materialCosts.push(material);
        showToast('Material added successfully', 'success');
    }

    closeMaterialModal();
    showProjectDetails(projectId);
    renderProjectCostCards();
}

// Enhanced Modal Functions
function showConfirmModal(message, onConfirm, details = '') {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('confirmDetails').textContent = details;
    document.getElementById('confirmModal').classList.remove('hidden');
    
    window.currentConfirmAction = onConfirm;
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.add('hidden');
    window.currentConfirmAction = null;
}

function confirmAction() {
    if (window.currentConfirmAction) {
        window.currentConfirmAction();
        window.currentConfirmAction = null;
    }
    closeConfirmModal();
}

// Toast Notification System
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Export Functions
function exportDashboardData() {
    const data = {
        projects: appState.projects.map(project => ({
            name: project.name,
            budget: project.budget,
            laborCost: calculateProjectLaborCost(project.id),
            materialCost: calculateProjectMaterialCost(project.id),
            progress: project.progress,
            status: project.status
        }))
    };
    
    downloadJSON(data, 'dashboard-report.json');
    showToast('Dashboard data exported', 'success');
}

function exportProjectsData() {
    const data = {
        projects: appState.projects,
        totalProjects: appState.projects.length,
        exportDate: new Date().toISOString()
    };
    
    downloadJSON(data, 'projects-data.json');
    showToast('Projects data exported', 'success');
}

function downloadJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = filename;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Utility Functions
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});
