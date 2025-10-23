import { areas } from '../data/areas.js';
import { nomeReunioes } from '../data/reunioes.js';
import { saveCompromisso, updateCompromisso } from '../services/storage.js';

export function openModal(compromisso = null, onSave) {
  const isEdit = !!compromisso;
  const modalContainer = document.getElementById('modal-container');

  const areasWithoutTodos = areas.filter(c => c.name !== 'TODOS');

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal-content">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">
              ${isEdit ? 'Editar Compromisso' : 'Novo Compromisso'}
            </h2>
            <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form id="compromisso-form" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
              <select name="prioridade" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Selecione...</option>
                <option value="1" ${compromisso?.prioridade === 1 ? 'selected' : ''}>1 - Crítica</option>
                <option value="2" ${compromisso?.prioridade === 2 ? 'selected' : ''}>2 - Alta</option>
                <option value="3" ${compromisso?.prioridade === 3 ? 'selected' : ''}>3 - Média</option>
                <option value="4" ${compromisso?.prioridade === 4 ? 'selected' : ''}>4 - Baixa</option>
                <option value="5" ${compromisso?.prioridade === 5 ? 'selected' : ''}>5 - Muito Baixa</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Área</label>
              <select name="categoria" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Selecione...</option>
                ${areasWithoutTodos.map(area => `
                  <option value="${area.name}" ${compromisso?.categoria === area.name ? 'selected' : ''}>${area.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Reunião</label>
              <select name="nomeReuniao" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Selecione...</option>
                ${nomeReunioes.map(reuniao => `
                  <option value="${reuniao}" ${compromisso?.nomeReuniao === reuniao ? 'selected' : ''}>${reuniao}</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data do Registro</label>
              <input 
                type="date" 
                name="dataRegistro" 
                required
                value="${compromisso?.dataRegistro || ''}"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data do Prazo</label>
              <input 
                type="date" 
                name="dataPrazo" 
                required
                value="${compromisso?.dataPrazo || ''}"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tema</label>
              <input 
                type="text" 
                name="tema" 
                required
                value="${compromisso?.tema || ''}"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Matriz de risco"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Ação</label>
              <textarea 
                name="acao" 
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Descreva a ação necessária..."
              >${compromisso?.acao || ''}</textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Responsável</label>
              <input 
                type="text" 
                name="responsavel" 
                required
                value="${compromisso?.responsavel || ''}"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button type="button" id="cancel-btn" class="flex-1 btn-secondary justify-center">
              Cancelar
            </button>
            <button type="submit" class="flex-1 btn-primary justify-center">
              ${isEdit ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('compromisso-form');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-btn');

  const closeModal = () => {
    modalContainer.innerHTML = '';
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      prioridade: parseInt(formData.get('prioridade')),
      categoria: formData.get('categoria'),
      nomeReuniao: formData.get('nomeReuniao'),
      dataRegistro: formData.get('dataRegistro'),
      dataPrazo: formData.get('dataPrazo'),
      tema: formData.get('tema'),
      acao: formData.get('acao'),
      responsavel: formData.get('responsavel'),
    };

    if (isEdit) {
      await updateCompromisso(compromisso.id, data);
    } else {
      await saveCompromisso(data);
    }

    closeModal();
    onSave();
  });
}
