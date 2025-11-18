import dataService from './dataService.js';
import uiRenderer from './uiRenderer.js';

const qs = (k) => new URLSearchParams(window.location.search).get(k);

const renderDetail = (meme) => {
  const container = document.getElementById('meme-detail');
  const titleEl = document.getElementById('title');
  if (!container) return;
  if (!meme) {
    container.innerHTML = '<p>Geen meme gevonden.</p>';
    return;
  }
  titleEl.textContent = meme.title;
  container.innerHTML = `
    <article class="meme-card" style="max-width:700px;margin:12px auto;text-align:left;">
      <img src="./img/${meme.image}" alt="${meme.title}" style="width:100%;height:auto;border-radius:6px;max-height:600px;object-fit:contain;" />
      <h2 style="margin-top:12px;">${meme.title} <small>(${meme.year})</small></h2>
      <p class="meta">Categorie: ${meme.category}</p>
      <h3>Geschiedenis</h3>
      <p>${meme.history || meme.description || ''}</p>
    </article>
  `;
};

const init = async () => {
  uiRenderer.showLoading('Laden...');
  try {
    const id = qs('id');
    const memes = await dataService.fetchMemes();
    uiRenderer.hideLoading();
    const meme = memes.find(m => String(m.id) === String(id));
    renderDetail(meme);
  } catch (err) {
    uiRenderer.hideLoading();
    const c = document.getElementById('meme-detail');
    if (c) c.innerHTML = `<p>Kan meme niet laden: ${err.message}</p>`;
  }
};

document.addEventListener('DOMContentLoaded', init);
