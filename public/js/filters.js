import { entries } from './data.js';
const state = { top: 'experience' };
function applyFilter(list, filter) {
    return list.filter((e) => e.category === filter);
}
export function renderEntries() {
    const grid = document.getElementById('projectsGrid');
    if (!grid)
        return;
    const filtered = applyFilter(entries, state.top);
    grid.style.opacity = '0';
    grid.style.transition = 'opacity 0.15s ease';
    setTimeout(() => {
        if (filtered.length === 0) {
            grid.innerHTML = `
        <div class="col-12 text-center py-5 text-secondary">
          <i class="bi bi-inbox fs-1 d-block mb-2"></i>
          No entries in this category yet.
        </div>`;
        }
        else {
            grid.innerHTML = filtered.map(cardTemplate).join('');
        }
        grid.style.opacity = '1';
    }, 150);
}
function cardTemplate(entry) {
    const techBadges = entry.tech
        .map((t) => `<span class="badge-tech me-1 mb-1 d-inline-block">${t}</span>`)
        .join('');
    let meta = '';
    let categoryIcon = '';
    let categoryLabel = entry.category;
    if (entry.category === 'education') {
        categoryIcon = '<i class="bi bi-mortarboard-fill me-1"></i>';
        categoryLabel = `${categoryIcon}${entry.subCategory}`;
        meta = `
      <p class="text-secondary small mb-1">
        <i class="bi bi-building me-1"></i>${entry.institution} · ${entry.year}
        ${entry.grade ? `<span class="badge bg-success-subtle text-success-emphasis ms-2">${entry.grade}</span>` : ''}
      </p>`;
    }
    else if (entry.category === 'experience') {
        categoryIcon = '<i class="bi bi-briefcase-fill me-1"></i>';
        categoryLabel = `${categoryIcon}${entry.subCategory}`;
        meta = `
      <p class="text-secondary small mb-1">
        <i class="bi bi-building me-1"></i>${entry.company}
        <span class="text-muted">·</span>
        <i class="bi bi-geo-alt ms-1 me-1"></i>${entry.location}
      </p>
      <p class="text-secondary small mb-1">
        <i class="bi bi-calendar3 me-1"></i>${entry.period}
      </p>`;
    }
    else {
        meta = `
      <p class="text-secondary small mb-1">
        <i class="bi bi-tag me-1"></i>${entry.subCategory}
      </p>`;
    }
    const badgeClass = entry.category === 'education'
        ? 'bg-primary-subtle text-primary-emphasis border-primary-subtle'
        : entry.category === 'experience'
            ? 'bg-warning-subtle text-warning-emphasis border-warning-subtle'
            : 'bg-info-subtle text-info-emphasis border-info-subtle';
    const hasLink = Boolean(entry.link);
    const linkTag = hasLink
        ? `<a href="${entry.link}" target="_blank" rel="noopener noreferrer"
           class="stretched-link" aria-label="Open ${entry.title}"></a>`
        : '';
    return `
    <div class="col-md-6 col-lg-4">
      <div class="project-card card h-100 border-0 shadow-sm position-relative">
        <img src="${entry.image}" class="card-img-top" alt="${entry.title}"
             style="height: 180px; object-fit: cover;">
        <div class="card-body p-4">
          <div class="mb-2">
            <h5 class="card-title fw-bold mb-2">${entry.title}</h5>
              <span class="badge border px-2 py-1 rounded-pill small ${badgeClass}">
                ${categoryLabel}
              </span>
          </div>
          ${meta}
          <p class="card-text text-secondary small mt-2">${entry.description}</p>
          <div class="mt-3 d-flex flex-wrap">${techBadges}</div>
          ${hasLink
        ? `<span class="mt-3 d-inline-flex align-items-center fw-medium text-primary">
                 View on GitHub <i class="bi bi-github ms-2"></i>
               </span>`
        : ''}
        </div>
        ${linkTag}
      </div>
    </div>`;
}
export function initFilters() {
    const buttons = document.querySelectorAll('#filterContainer .filter-btn');
    buttons.forEach((b) => b.classList.add('no-transition'));
    requestAnimationFrame(() => {
        buttons.forEach((b) => b.classList.remove('no-transition'));
    });
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            state.top = (btn.dataset.filter ?? 'experience');
            buttons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            renderEntries();
        });
    });
}
//# sourceMappingURL=filters.js.map