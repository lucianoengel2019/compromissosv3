import { getPriorityIcon, getStatusColor, formatDate } from '../utils/helpers.js';

export function renderTable(compromissos, filter, search) {
  let filtered = compromissos;

  if (filter !== 'TODOS') {
    filtered = filtered.filter(c => c.categoria === filter);
  }

  if (search) {
    filtered = filtered.filter(c => 
      (c.nomeReuniao && c.nomeReuniao.toLowerCase().includes(search.toLowerCase())) ||
      (c.tema && c.tema.toLowerCase().includes(search.toLowerCase())) ||
      (c.responsavel && c.responsavel.toLowerCase().includes(search.toLowerCase())) ||
      (c.acao && c.acao.toLowerCase().includes(search.toLowerCase()))
    );
  }

  if (filtered.length === 0) {
    return `
      <div class="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum compromisso encontrado</h3>
        <p class="text-gray-500">Ajuste os filtros ou adicione um novo registro.</p>
      </div>
    `;
  }

  return `
    <!-- Desktop Table View -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden hidden md:block">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="table-header">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prioridade</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome da Reunião</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data Registro</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tema</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ação</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsável</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data Prazo</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${filtered.map(c => `
              <tr class="table-row">
                <td class="px-4 py-3 whitespace-nowrap">${getPriorityIcon(c.prioridade)}</td>
                <td class="px-4 py-3"><div class="text-sm font-medium text-gray-900">${c.nomeReuniao}</div></td>
                <td class="px-4 py-3 whitespace-nowrap"><div class="text-sm text-gray-600">${formatDate(c.dataRegistro)}</div></td>
                <td class="px-4 py-3"><div class="text-sm text-gray-900">${c.tema}</div></td>
                <td class="px-4 py-3"><div class="text-sm text-gray-600">${c.acao}</div></td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <span class="text-sm font-medium text-green-700">${c.responsavel}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full ${getStatusColor(c.dataPrazo)}"></div>
                    <span class="text-sm font-medium ${getStatusColor(c.dataPrazo, true)}">${formatDate(c.dataPrazo)}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex gap-2">
                    <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${c.id}" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button class="btn-delete p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" data-id="${c.id}" title="Excluir"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
      ${filtered.map(c => `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-4 space-y-3">
            <div class="flex justify-between items-start">
              <div class="font-medium text-gray-900 pr-2">${c.nomeReuniao || c.tema}</div>
              ${getPriorityIcon(c.prioridade)}
            </div>
            
            <div class="text-sm text-gray-600 space-y-2">
              <p><strong class="font-medium text-gray-800">Ação:</strong> ${c.acao}</p>
              <p><strong class="font-medium text-gray-800">Responsável:</strong> ${c.responsavel}</p>
            </div>

            <div class="flex items-center justify-between text-sm pt-3 border-t border-gray-100 mt-3">
              <div>
                <span class="text-gray-500">Prazo:</span>
                <div class="flex items-center gap-2 mt-1">
                  <div class="w-2 h-2 rounded-full ${getStatusColor(c.dataPrazo)}"></div>
                  <span class="font-medium ${getStatusColor(c.dataPrazo, true)}">${formatDate(c.dataPrazo)}</span>
                </div>
              </div>
              <div>
                <span class="text-gray-500">Registro:</span>
                <div class="mt-1">
                  <span class="font-medium text-gray-700">${formatDate(c.dataRegistro)}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-2 flex justify-end gap-2">
            <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${c.id}" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
            <button class="btn-delete p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" data-id="${c.id}" title="Excluir"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
