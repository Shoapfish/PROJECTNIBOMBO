// ===== PROGRAM DATA (unchanged) =====
const programData = {
    "BSN": { name: "B.S. NURSING", cat: "Health Sciences", icon: "🩺", desc: "Healthcare and patient care.", dean: { name: "Dr. Maria Santos", initial: "MS", email: "m.santos@college.edu", office: "Health Bldg, 101", bio: "Expert in Clinical Nursing." }, instructors: [{ name: "Prof. Jane Doe", initial: "JD", email: "j.doe@college.edu", office: "Room 202", bio: "Pediatric specialist." }] },
    "BSME": { name: "B.S. MARINE ENGINEERING", cat: "Engineering", icon: "⚓", desc: "Marine propulsion systems.", dean: { name: "Engr. Roberto Diaz", initial: "RD", email: "r.diaz@college.edu", office: "Room 401", bio: "Chief Engineer." }, instructors: [{ name: "Engr. Sam Cruz", initial: "SC", email: "s.cruz@college.edu", office: "Lab A", bio: "Thermal dynamics." }] },
    "BSMT": { name: "B.S. MARINE TRANSPORTATION", cat: "Engineering", icon: "🚢", desc: "Navigation and logistics.", dean: { name: "Capt. Arthur Pendragon", initial: "AP", email: "a.pen@college.edu", office: "Bridge Room", bio: "Master Mariner." }, instructors: [{ name: "Officer Leo King", initial: "LK", email: "l.king@college.edu", office: "Room 102", bio: "Navigation instructor." }] },
    "BSCRIM": { name: "B.S. CRIMINOLOGY", cat: "Social Sciences", icon: "⚖️", desc: "Law enforcement and safety.", dean: { name: "Dr. Victor Magtanggol", initial: "VM", email: "v.mag@college.edu", office: "Justice Hall", bio: "Police superintendent." }, instructors: [{ name: "Atty. Clara Sison", initial: "CS", email: "c.sison@college.edu", office: "Room 501", bio: "Criminal Law expert." }] },
    "BSTM": { name: "B.S. TOURISM MANAGEMENT", cat: "Business", icon: "✈️", desc: "Hospitality management.", dean: { name: "Dr. Elena Rossi", initial: "ER", email: "e.rossi@college.edu", office: "Travel Center", bio: "Hospitality consultant." }, instructors: [{ name: "Prof. Marco Polo", initial: "MP", email: "m.polo@college.edu", office: "Room 204", bio: "Heritage specialist." }] },
    "BSIS": { name: "B.S. INFORMATION SYSTEM", cat: "Technology", icon: "💻", desc: "Software development.", dean: { name: "Dr. Michael Chen", initial: "MC", email: "m.chen@college.edu", office: "Room 501", bio: "CS Education leader." }, instructors: [{ name: "Dr. Sarah Johnson", initial: "SJ", email: "s.johnson@college.edu", office: "Room 301", bio: "AI specialist." }] },
    "BSENTREP": { name: "B.S. ENTREPRENEURSHIP", cat: "Business", icon: "💼", desc: "Start-up strategies.", dean: { name: "Dr. Sarah Tiu", initial: "ST", email: "s.tiu@college.edu", office: "Biz Center", bio: "Angel investor." }, instructors: [{ name: "Prof. Ben Sy", initial: "BS", email: "b.sy@college.edu", office: "Room 303", bio: "Marketing specialist." }] },
    "BSMA": { name: "B.S. MANAGEMENT ACCOUNTING", cat: "Business", icon: "📊", desc: "Financial planning.", dean: { name: "Dr. Luis CPA", initial: "LL", email: "l.luis@college.edu", office: "Finance Wing", bio: "Tax consultant." }, instructors: [{ name: "Prof. Rita Book", initial: "RB", email: "r.book@college.edu", office: "Room 404", bio: "Auditing expert." }] },
    "BECED": { name: "B. EARLY CHILDHOOD EDUCATION", cat: "Education", icon: "🧸", desc: "Educating young minds.", dean: { name: "Dr. Rose Gardon", initial: "RG", email: "r.gardon@college.edu", office: "Educ Bldg", bio: "Child psychology." }, instructors: [{ name: "Ms. Lily White", initial: "LW", email: "l.white@college.edu", office: "Room 101", bio: "Montessori expert." }] },
    "BTVTED": { name: "B. TECH-VOC TEACHER EDUCATION", cat: "Education", icon: "🛠️", desc: "Technical teaching.", dean: { name: "Dr. Gear Shift", initial: "GS", email: "g.shift@college.edu", office: "Workshop 1", bio: "Vocational pioneer." }, instructors: [{ name: "Mr. Jack Trades", initial: "JT", email: "j.trades@college.edu", office: "Shop A", bio: "Master craftsman." }] },
    "GAS": { name: "GAS", cat: "Senior High", icon: "📚", desc: "General academics.", dean: { name: "Dir. Alice Wonderland", initial: "AW", email: "a.won@college.edu", office: "SHS Office", bio: "Education coordinator." }, instructors: [{ name: "Mr. Bob Ross", initial: "BR", email: "b.ross@college.edu", office: "Art Room", bio: "Humanities." }] },
    "ABM": { name: "ABM", cat: "Senior High", icon: "📈", desc: "Accountancy and Business.", dean: { name: "Dir. Rich Money", initial: "RM", email: "r.money@college.edu", office: "SHS Office", bio: "Business coach." }, instructors: [{ name: "Ms. Penny Wise", initial: "PW", email: "p.wise@college.edu", office: "Room 201", bio: "Accounting." }] },
    "HUMSS": { name: "HUMSS", cat: "Senior High", icon: "🏛️", desc: "Humanities.", dean: { name: "Dir. Phil Oso", initial: "PO", email: "p.oso@college.edu", office: "SHS Office", bio: "Social researcher." }, instructors: [{ name: "Mr. Guy Man", initial: "GM", email: "g.man@college.edu", office: "Room 302", bio: "History teacher." }] },
    "STEM": { name: "STEM", cat: "Senior High", icon: "🧪", desc: "Science and Technology.", dean: { name: "Dir. Isaac Newton", initial: "IN", email: "i.newton@college.edu", office: "SHS Office", bio: "Scientific head." }, instructors: [{ name: "Dr. Atom Eve", initial: "AE", email: "a.eve@college.edu", office: "Lab B", bio: "Physics lead." }] }
};

let currentKey = null;

// ===== PETAL GENERATOR =====
function createPetals() {
    const bg = document.getElementById('petals-bg');
    if (!bg) return;
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = (Math.random() * -20) + 'vh';
        petal.style.animationDuration = (6 + Math.random() * 8) + 's';
        petal.style.animationDelay = (Math.random() * 8) + 's';
        petal.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
        const scale = 0.6 + Math.random() * 0.8;
        petal.style.transform = `scale(${scale})`;
        bg.appendChild(petal);
    }
}

// ===== SIDEBAR INIT =====
function init() {
    const sidebar = document.getElementById('program-sidebar');

    // Add College Programs label
    const collegeLabel = document.createElement('div');
    collegeLabel.className = 'sidebar-label';
    collegeLabel.textContent = 'College Programs';
    sidebar.appendChild(collegeLabel);

    const shsKeys = ['GAS', 'ABM', 'HUMSS', 'STEM'];
    let shsLabelAdded = false;

    for (const key in programData) {
        // Insert SHS label before first SHS program
        if (shsKeys.includes(key) && !shsLabelAdded) {
            const shsLabel = document.createElement('div');
            shsLabel.className = 'sidebar-label shs-label';
            shsLabel.textContent = 'Senior High School';
            sidebar.appendChild(shsLabel);
            shsLabelAdded = true;
        }

        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="icon-circle">${programData[key].icon}</div>
            <div class="info">
                <strong>${programData[key].name}</strong>
                <span>${programData[key].cat}</span>
            </div>
        `;
        card.onclick = () => selectProgram(key, card);
        sidebar.appendChild(card);
    }
}

// ===== SELECT PROGRAM =====
function selectProgram(key, element) {
    currentKey = key;
    const data = programData[key];

    document.querySelectorAll('.program-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');

    // Show faculty section, hide empty state
    document.getElementById('empty-state').style.display = 'none';
    document.getElementById('faculty-section').style.display = 'block';

    // Update header
    document.getElementById('display-icon').textContent = data.icon;
    document.getElementById('display-name').textContent = data.name;
    document.getElementById('display-category').textContent = data.cat;

    // Default to instructors view
    switchView('instructors');
}

// ===== SWITCH VIEW =====
function switchView(type) {
    if (!currentKey) return;
    const isDean = type === 'dean';
    const container = document.getElementById('faculty-container');
    const data = programData[currentKey];

    document.getElementById('btn-instructors').classList.toggle('active', !isDean);
    document.getElementById('btn-dean').classList.toggle('active', isDean);

    const people = isDean ? [data.dean] : data.instructors;

    container.innerHTML = people.map((p, i) => `
        <div class="faculty-card" style="animation-delay: ${i * 0.07}s">
            <div class="card-header-flex">
                <div class="avatar">${p.initial}</div>
                <div>
                    <h3>${p.name}</h3>
                    <span class="role-badge ${isDean ? 'dean-badge' : ''}">
                        ${isDean ? '🎓 Dean' : '👩‍🏫 Instructor'}
                    </span>
                </div>
            </div>
            <div class="card-details">
                <div class="detail-row">
                    <span class="detail-label">✉️ Email</span>
                    <span class="detail-value highlight">${p.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📍 Office</span>
                    <span class="detail-value">${p.office}</span>
                </div>
                <hr class="card-divider">
                <div class="detail-row">
                    <span class="detail-label">📝 Biography</span>
                    <span class="detail-value">${p.bio}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    init();
});