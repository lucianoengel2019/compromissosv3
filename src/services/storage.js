import { supabase } from './supabase.js';

let compromissosStore = []; // Armazenamento em memória para acesso rápido

// --- Mappers para conversão de nomes de colunas ---

/**
 * Converte um objeto do Supabase (snake_case) para um objeto JS (camelCase).
 * @param {object} supabaseObj O objeto vindo do banco de dados.
 * @returns {object} O objeto convertido para uso no JavaScript.
 */
function fromSupabase(supabaseObj) {
    if (!supabaseObj) return null;
    return {
        id: supabaseObj.id,
        createdAt: supabaseObj.created_at,
        prioridade: supabaseObj.prioridade,
        categoria: supabaseObj.categoria,
        nomeReuniao: supabaseObj.nome_reuniao,
        dataRegistro: supabaseObj.data_registro,
        dataPrazo: supabaseObj.data_prazo,
        tema: supabaseObj.tema,
        acao: supabaseObj.acao,
        responsavel: supabaseObj.responsavel,
    };
}

/**
 * Converte um objeto JS (camelCase) para um objeto do Supabase (snake_case).
 * @param {object} jsObj O objeto do JavaScript.
 * @returns {object} O objeto convertido para ser salvo no banco de dados.
 */
function toSupabase(jsObj) {
    if (!jsObj) return null;
    return {
        prioridade: jsObj.prioridade,
        categoria: jsObj.categoria,
        nome_reuniao: jsObj.nomeReuniao,
        data_registro: jsObj.dataRegistro,
        data_prazo: jsObj.dataPrazo,
        tema: jsObj.tema,
        acao: jsObj.acao,
        responsavel: jsObj.responsavel,
    };
}


// --- Funções CRUD ---

// Busca os dados iniciais do Supabase
export async function initializeData() {
    const { data, error } = await supabase
        .from('compromissos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
        compromissosStore = [];
    } else {
        compromissosStore = data.map(fromSupabase);
    }
}

export function getCompromissos() {
    return [...compromissosStore];
}

export async function saveCompromisso(compromisso) {
    const supabaseCompromisso = toSupabase(compromisso);

    const { data, error } = await supabase
        .from('compromissos')
        .insert([supabaseCompromisso])
        .select()
        .single();
    
    if (error) {
        console.error("Erro detalhado ao salvar compromisso:", error);
        if (error.message.includes("column") && error.message.includes("does not exist")) {
            console.error("--- AÇÃO NECESSÁRIA ---");
            console.error("DICA: Este erro indica uma divergência entre o código e o banco de dados. O nome de uma coluna no código (ex: 'data_prazo') não foi encontrado na sua tabela do Supabase.");
            console.error("Por favor, execute o script SQL para renomear as colunas no seu editor SQL do Supabase para o formato 'snake_case'.");
            console.error("-----------------------");
        }
        throw error;
    }

    const newCompromisso = fromSupabase(data);
    compromissosStore.unshift(newCompromisso);
    return newCompromisso;
}

export async function updateCompromisso(id, updates) {
    const supabaseUpdates = toSupabase(updates);

    const { data, error } = await supabase
        .from('compromissos')
        .update(supabaseUpdates)
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error("Erro detalhado ao atualizar compromisso:", error);
        if (error.message.includes("column") && error.message.includes("does not exist")) {
            console.error("--- AÇÃO NECESSÁRIA ---");
            console.error("DICA: Este erro indica uma divergência entre o código e o banco de dados. O nome de uma coluna no código (ex: 'data_prazo') não foi encontrado na sua tabela do Supabase.");
            console.error("Por favor, execute o script SQL para renomear as colunas no seu editor SQL do Supabase para o formato 'snake_case'.");
            console.error("-----------------------");
        }
        throw error;
    }

    const updatedCompromisso = fromSupabase(data);
    const index = compromissosStore.findIndex(c => c.id === id);
    if (index !== -1) {
        compromissosStore[index] = updatedCompromisso;
    }
}

export async function deleteCompromisso(id) {
    const { error } = await supabase
        .from('compromissos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro ao excluir compromisso:", error);
        throw error;
    }
    
    compromissosStore = compromissosStore.filter(c => c.id !== id);
}
