import { getCompromissos } from '../services/storage.js';

export function renderSidebar(areas, activeArea) {
  const compromissos = getCompromissos();
  
  const areaCounts = areas.map(area => {
    if (area.name === 'TODOS') {
      return { ...area, count: compromissos.length };
    }
    return {
      ...area,
      count: compromissos.filter(c => c.categoria === area.name).length
    };
  });

  return `
    <div class="p-4">
      <div class="space-y-1">
        ${areaCounts.map(area => `
          <div 
            class="sidebar-item ${activeArea === area.name ? 'active' : ''}" 
            data-area="${area.name}"
          >
            <div class="flex items-start gap-3 flex-1 min-w-0">
              <span class="w-6 text-center text-base flex-shrink-0 pt-0.5">${area.icon}</span>
              <span class="pr-2">${area.name}</span>
            </div>
            <span class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
              ${area.count}
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
