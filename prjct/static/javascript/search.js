// Live incremental search with debounce
let searchTimeout;
 
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const resultsContainer = document.getElementById('resultsContainer');
const resultsCount = document.getElementById('resultsCount');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const resultsSection = document.querySelector('.results-section');
 
function debounce(func, delay) {
    return function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(func, delay);
    };
}
 
function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="match-highlight">$1</mark>');
}
 
// Maps program names (from DB) to their department page URL
const PROGRAM_TO_URL = {
    'B.S. NURSING':                     '/dept/nursing',
    'B.S. MARINE ENGINEERING':          '/dept/maritime',
    'B.S. MARINE TRANSPORTATION':       '/dept/maritime',
    'B.S. CRIMINOLOGY':                 '/dept/criminology',
    'B.S. TOURISM MANAGEMENT':          '/dept/tourism',
    'B.S. INFORMATION SYSTEM':          '/dept/information-system',
    'B.S. ENTREPRENEURSHIP':            '/dept/business',
    'B.S. MANAGEMENT ACCOUNTING':       '/dept/business',
    'B. EARLY CHILDHOOD EDUCATION':     '/dept/education',
    'B. TECH-VOC TEACHER EDUCATION':    '/dept/education',
};
 
function getUrlForResult(result) {
    if (result.type === 'program') {
        return PROGRAM_TO_URL[result.name.toUpperCase()] || null;
    }
    // Faculty/deans → go to deans page
    if (result.type === 'faculty') {
        return '/deans';
    }
    // Students → no dedicated page yet
    return null;
}
 
async function performSearch() {
    const query = searchInput.value.trim();
    const filter = filterSelect.value;
    if (query.length < 1) {
        resultsSection.style.display = 'none';
        return;
    }
 
    loading.style.display = 'block';
    resultsSection.style.display = 'block';
    noResults.style.display = 'none';
    resultsContainer.innerHTML = '';
 
    try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&filter=${filter}`);
        const data = await response.json();
        const results = data.results || [];
 
        resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
 
        if (results.length === 0) {
            noResults.style.display = 'block';
        } else {
            results.forEach(result => {
                const card = document.createElement('div');
                card.className = 'result-card';
 
                const url = getUrlForResult(result);
                if (url) {
                    card.classList.add('result-clickable');
                    card.style.cursor = 'pointer';
                    card.addEventListener('click', () => {
                        window.location.href = url;
                    });
                }
 
                card.innerHTML = `
                    <div class="result-type">${result.type.toUpperCase()}${url ? ' <span class="result-arrow">→</span>' : ''}</div>
                    <div class="result-name">${highlightMatch(result.name, query)}</div>
                    <div class="result-details">
                        ${result.category || result.role || result.strand || ''}
                        ${result.passing_rate ? ` | ${result.passing_rate}` : ''}
                        ${result.year ? ` | Year ${result.year}` : ''}
                    </div>
                `;
 
                resultsContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsCount.textContent = 'Search error';
    } finally {
        loading.style.display = 'none';
    }
}
 
// Debounced search (300ms)
searchInput.addEventListener('input', debounce(performSearch, 300));
 
// Filter change
filterSelect.addEventListener('change', performSearch);
 
// Form submit
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch();
});
 
// Focus effects
const inputWrapper = document.querySelector('.input-wrapper');
searchInput.addEventListener('focus', () => inputWrapper.classList.add('focused'));
searchInput.addEventListener('blur', () => inputWrapper.classList.remove('focused'));