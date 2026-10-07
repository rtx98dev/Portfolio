import { initFilters, renderEntries } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  renderEntries();
  initFilters();

  console.log('Portfolio app initialized');
});
