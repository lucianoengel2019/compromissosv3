export function renderHeader() {
  return `
    <header class="bg-green-600 text-white shadow-md sticky top-0 z-30">
      <div class="px-4 py-3 flex items-center gap-2 sm:gap-4">
        <button id="sidebar-toggle" class="p-2 -ml-2 rounded-md hover:bg-green-700 transition-colors lg:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-3 shrink-0">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 class="text-xl font-bold hidden sm:block">Compromisso</h1>
        </div>
        <div class="flex-1 max-w-2xl">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              id="search-input"
              type="text" 
              placeholder="LOCALIZAR..." 
              class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-green-500 bg-opacity-50 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-green-600"
            />
          </div>
        </div>
        <button class="p-2 hover:bg-green-700 rounded-lg transition-colors shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  `;
}
