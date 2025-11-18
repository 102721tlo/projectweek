const showLoading = (message = 'Laden...') => {
    const el = document.getElementById('loading');
    if (el) el.textContent = message;
};

const hideLoading = () => {
    const el = document.getElementById('loading');
    if (el) el.textContent = '';
};

const renderFilters = (memes) => {
    const catSelect = document.getElementById('categoryFilter');
    const yearSelect = document.getElementById('yearFilter');
    if (!catSelect || !yearSelect) return;

    const categories = Array.from(new Set(memes.map(m => m.category))).sort();
    const years = Array.from(new Set(memes.map(m => String(m.year)))).sort((a,b) => b - a);

    catSelect.innerHTML = `<option value="all">Alle</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join('');
    yearSelect.innerHTML = `<option value="all">Alle</option>` + years.map(y => `<option value="${y}">${y}</option>`).join('');
};

const renderMemes = (memes) => {
    const container = document.getElementById('memes');
    if (!container) return;
    if (!memes || memes.length === 0) {
        container.innerHTML = '<p>Geen memes gevonden.</p>';
        return;
    }

    container.innerHTML = memes.map(m => `
        <a href="meme.html?id=${m.id}" class="meme-link">
          <article class="meme-card">
              <img src="./img/${m.image}" alt="${m.title}" loading="lazy" />
              <h2>${m.title} <small>(${m.year})</small></h2>
              <p class="caption">${m.description}</p>
              <p class="meta">Categorie: ${m.category}</p>
          </article>
        </a>
    `).join('');
};

const setupFilterListeners = (onChange) => {
    const catSelect = document.getElementById('categoryFilter');
    const yearSelect = document.getElementById('yearFilter');
    const searchInput = document.getElementById('searchInput');
    if (!catSelect || !yearSelect) return;

    const handler = () => onChange({ category: catSelect.value, year: yearSelect.value, search: searchInput ? searchInput.value.trim() : '' });
    catSelect.addEventListener('change', handler);
    yearSelect.addEventListener('change', handler);
    if (searchInput) searchInput.addEventListener('input', handler);
};

const render = (memes, onChange) => {
    renderFilters(memes);
    setupFilterListeners(onChange);
    
};

export default { showLoading, hideLoading, render, renderMemes };