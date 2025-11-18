import dataService from './dataService.js';
import uiRenderer from './uiRenderer.js';

const applyFiltersAndRender = (allMemes) => (filters = { category: 'all', year: 'all' }) => {
	let filtered = allMemes.slice();
	if (filters.category && filters.category !== 'all') {
		filtered = filtered.filter(m => m.category === filters.category);
	}
	if (filters.year && filters.year !== 'all') {
		filtered = filtered.filter(m => String(m.year) === String(filters.year));
	}
	uiRenderer.renderMemes(filtered);
};

const init = async () => {
	uiRenderer.showLoading();
	try {
		const memes = await dataService.fetchMemes();
		uiRenderer.hideLoading();

		const update = applyFiltersAndRender(memes);
		uiRenderer.render(memes, update);

		update();
	} catch (error) {
		uiRenderer.hideLoading();
		const c = document.getElementById('memes');
		if (c) c.innerHTML = `<p>Kan memes niet laden: ${error.message}</p>`;
	}
};

document.addEventListener('DOMContentLoaded', init);