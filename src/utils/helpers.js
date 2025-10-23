export function getPriorityIcon(priority) {
  const configs = {
    1: { bg: 'bg-red-500', text: 'text-white', icon: '⬆️' },
    2: { bg: 'bg-orange-500', text: 'text-white', icon: '⬆️' },
    3: { bg: 'bg-yellow-400', text: 'text-yellow-900', icon: '➡️' },
    4: { bg: 'bg-gray-400', text: 'text-white', icon: '—' },
    5: { bg: 'bg-green-500', text: 'text-white', icon: '⬇️' },
  };

  const config = configs[priority] || configs[3];
  
  return `
    <div class="priority-icon ${config.bg} ${config.text}">
      <span class="leading-none">${config.icon}</span>
      <span class="ml-0.5">${priority}</span>
    </div>
  `;
}

export function getStatusColor(dataPrazo, isText = false) {
  const today = new Date();
  const prazo = new Date(dataPrazo);
  const diffDays = Math.ceil((prazo - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return isText ? 'text-red-600' : 'bg-red-500';
  } else if (diffDays <= 7) {
    return isText ? 'text-orange-600' : 'bg-orange-500';
  } else {
    return isText ? 'text-green-600' : 'bg-green-500';
  }
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
