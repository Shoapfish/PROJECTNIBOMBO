// ===== PROGRAM DATA =====
const programData = {
  "B.S. NURSING": {
    icon: "🩺", rate: 92, active: 2000, cat: "Health Sciences",
    y: [500, 500, 500, 500], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 7360
  },
  "B.S. MARINE ENGINEERING": {
    icon: "⚓", rate: 88, active: 1200, cat: "Engineering",
    y: [300, 300, 300, 300], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 4224
  },
  "B.S. MARINE TRANSPORTATION": {
    icon: "🚢", rate: 85, active: 1500, cat: "Engineering",
    y: [400, 400, 400, 300], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 5100
  },
  "B.S. CRIMINOLOGY": {
    icon: "⚖️", rate: 79, active: 800, cat: "Social Sciences",
    y: [200, 200, 200, 200], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 2528
  },
  "B.S. TOURISM MANAGEMENT": {
    icon: "✈️", rate: 95, active: 600, cat: "Business",
    y: [150, 150, 150, 150], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 2280
  },
  "B.S. INFORMATION SYSTEM": {
    icon: "💻", rate: 90, active: 450, cat: "Technology",
    y: [120, 110, 110, 110], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 1620
  },
  "B.S. ENTREPRENEURSHIP": {
    icon: "💼", rate: 94, active: 300, cat: "Business",
    y: [75, 75, 75, 75], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 1128
  },
  "B.S. MANAGEMENT ACCOUNTING": {
    icon: "📊", rate: 82, active: 400, cat: "Business",
    y: [100, 100, 100, 100], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 1312
  },
  "B. EARLY CHILDHOOD EDUCATION": {
    icon: "🧸", rate: 98, active: 200, cat: "Education",
    y: [50, 50, 50, 50], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 784
  },
  "B. TECH-VOC TEACHER EDUCATION": {
    icon: "🛠️", rate: 91, active: 180, cat: "Education",
    y: [45, 45, 45, 45], labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    totalGrads: 655
  },
  // SHS Strands (only 2 year levels)
  "GAS": {
    icon: "📚", rate: 100, active: 300, cat: "Senior High",
    y: [150, 150], labels: ["Grade 11", "Grade 12"],
    totalGrads: 1800
  },
  "ABM": {
    icon: "📈", rate: 100, active: 400, cat: "Senior High",
    y: [200, 200], labels: ["Grade 11", "Grade 12"],
    totalGrads: 2400
  },
  "HUMSS": {
    icon: "🏛️", rate: 100, active: 550, cat: "Senior High",
    y: [275, 275], labels: ["Grade 11", "Grade 12"],
    totalGrads: 3300
  },
  "STEM": {
    icon: "🧪", rate: 100, active: 1000, cat: "Senior High",
    y: [500, 500], labels: ["Grade 11", "Grade 12"],
    totalGrads: 6000
  }
};

// ===== PETAL GENERATOR =====
function createPetals() {
  const bg = document.getElementById('petals-bg');
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

// ===== RING CHART UPDATE =====
const CIRCUMFERENCE = 2 * Math.PI * 32; // ~201

function updateRing(ratePercent) {
  const circle = document.getElementById('ring-circle');
  const offset = CIRCUMFERENCE - (ratePercent / 100) * CIRCUMFERENCE;
  circle.style.strokeDasharray = CIRCUMFERENCE;
  circle.style.strokeDashoffset = offset;
}

// ===== STUDENT DOTS =====
function updateDots(count) {
  const container = document.getElementById('student-dots');
  container.innerHTML = '';
  const dotCount = Math.min(Math.round(count / 100), 30);
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.animationDelay = (i * 0.03) + 's';
    container.appendChild(dot);
  }
}

// ===== BAR CHART UPDATE =====
function updateBars(data) {
  const maxVal = Math.max(...data.y);
  const rowIds = ['row-1', 'row-2', 'row-3', 'row-4'];
  const barIds = ['bar-1', 'bar-2', 'bar-3', 'bar-4'];
  const countIds = ['count-1', 'count-2', 'count-3', 'count-4'];

  rowIds.forEach((rowId, i) => {
    const row = document.getElementById(rowId);
    const bar = document.getElementById(barIds[i]);
    const countEl = document.getElementById(countIds[i]);

    if (i < data.y.length) {
      row.style.display = 'flex';
      const label = row.querySelector('.year-label');
      label.textContent = data.labels[i];
      countEl.textContent = data.y[i].toLocaleString() + ' students';
      // Animate bar width
      setTimeout(() => {
        bar.style.width = maxVal > 0 ? ((data.y[i] / maxVal) * 100) + '%' : '0%';
      }, 50);
    } else {
      row.style.display = 'none';
      bar.style.width = '0%';
    }
  });
}

// ===== FORMAT NUMBER =====
function fmt(n) {
  return n.toLocaleString();
}

// ===== UPDATE PANEL =====
function updatePanel(programName) {
  const data = programData[programName];
  if (!data) return;

  document.getElementById('display-icon').textContent = data.icon;
  document.getElementById('display-name').textContent = programName.replace(/^B\./, 'B.');
  document.getElementById('display-category').textContent = data.cat;

  // Graduation rate (ring + text) — graduates only, not year levels
  document.getElementById('pass-rate').textContent = data.rate + '%';
  updateRing(data.rate);

  // Active students
  document.getElementById('active-count').textContent = fmt(data.active);
  updateDots(data.active);

  // This year's graduates = last year cohort × rate
  const lastYearCount = data.y[data.y.length - 1];
  const thisYearGrads = Math.round(lastYearCount * data.rate / 100);
  document.getElementById('this-year-grads').textContent = fmt(thisYearGrads);
  document.getElementById('this-year-badge').textContent = data.rate + '%';

  // Total graduates (all-time)
  document.getElementById('total-grads').textContent = fmt(data.totalGrads);

  // Year bars (total students, not graduate-rate-related)
  updateBars(data);
}

// ===== CARD CLICK =====
document.addEventListener('DOMContentLoaded', () => {
  createPetals();

  const cards = document.querySelectorAll('.program-card');

  cards.forEach(card => {
    card.addEventListener('click', function () {
      cards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      updatePanel(this.getAttribute('data-name'));
    });
  });

  // Init with first program
  updatePanel('B.S. NURSING');
  updateRing(92);
});