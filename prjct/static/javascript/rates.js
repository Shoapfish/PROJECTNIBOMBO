document.addEventListener('DOMContentLoaded', () => {
    const programData = {
        "B.S. NURSING": { rate: "92%", active: 2000, y: [500, 500, 500, 500], cat: "Health Sciences", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. MARINE ENGINEERING": { rate: "88%", active: 1200, y: [300, 300, 300, 300], cat: "Engineering", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. MARINE TRANSPORTATION": { rate: "85%", active: 1500, y: [400, 400, 400, 300], cat: "Engineering", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. CRIMINOLOGY": { rate: "79%", active: 800, y: [200, 200, 200, 200], cat: "Social Sciences", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. TOURISM MANAGEMENT": { rate: "95%", active: 600, y: [150, 150, 150, 150], cat: "Business", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. INFORMATION SYSTEM": { rate: "90%", active: 450, y: [120, 110, 110, 110], cat: "Technology", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. ENTREPRENEURSHIP": { rate: "94%", active: 300, y: [75, 75, 75, 75], cat: "Business", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B.S. MANAGEMENT ACCOUNTING": { rate: "82%", active: 400, y: [100, 100, 100, 100], cat: "Business", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B. EARLY CHILDHOOD EDUCATION": { rate: "98%", active: 200, y: [50, 50, 50, 50], cat: "Education", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
        "B. TECH-VOC TEACHER EDUCATION": { rate: "91%", active: 180, y: [45, 45, 45, 45], cat: "Education", labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },

        // SHS Strands
        "GAS": { rate: "100%", active: 300, y: [150, 150, 0, 0], cat: "Senior High", labels: ["Grade 11", "Grade 12", "", ""] },
        "ABM": { rate: "100%", active: 400, y: [200, 200, 0, 0], cat: "Senior High", labels: ["Grade 11", "Grade 12", "", ""] },
        "HUMSS": { rate: "100%", active: 550, y: [275, 275, 0, 0], cat: "Senior High", labels: ["Grade 11", "Grade 12", "", ""] },
        "STEM": { rate: "100%", active: 1000, y: [500, 500, 0, 0], cat: "Senior High", labels: ["Grade 11", "Grade 12", "", ""] }
    };

    const cards = document.querySelectorAll('.program-card');
    const displayName = document.getElementById('display-name');
    const displayCat = document.getElementById('display-category');
    const passRate = document.getElementById('pass-rate');
    const activeCount = document.getElementById('active-count');
    const yearFields = document.querySelectorAll('.year-count');
    const yearRows = document.querySelectorAll('.year-row');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const programName = this.getAttribute('data-name');
            const data = programData[programName];

            if (data) {
                cards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');

                displayName.textContent = programName;
                displayCat.textContent = data.cat;
                passRate.textContent = data.rate;
                activeCount.textContent = data.active;

                // Update Year Breakdown and hide/show rows
                data.y.forEach((val, index) => {
                    const labelSpan = yearRows[index].querySelector('span');
                    if (val === 0 && data.cat === "Senior High") {
                        yearRows[index].style.display = 'none';
                    } else {
                        yearRows[index].style.display = 'flex';
                        labelSpan.innerText = data.labels[index];
                        yearFields[index].innerText = val + " students";
                    }
                });
            }
        });
    });
});