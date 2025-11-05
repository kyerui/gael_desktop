import { contentPane } from './dom.js';

export async function fetchDirectoryContents(path) { 
    try { 
        const pathString = path.join('/'); 
        const response = await fetch(`/api/files?path=${encodeURIComponent(pathString)}`); 
        if (!response.ok) throw new Error('Falha ao buscar o diretório.'); 
        return await response.json(); 
    } catch (error) { 
        console.error('Erro:', error); 
        if(contentPane) contentPane.innerHTML = `<p style="color: #ff757f;">Não foi possível carregar o diretório.</p>`; 
        return []; 
    } 
}

export async function fetchFileContent(path) { 
    try { 
        const pathString = path; 
        const response = await fetch(`/api/content?path=${encodeURIComponent(pathString)}`); 
        if (!response.ok) throw new Error('Falha ao buscar o conteúdo do arquivo.'); 
        return await response.text(); 
    } catch (error) { 
        console.error('Erro:', error); 
        return 'Não foi possível carregar o conteúdo do arquivo.'; 
    } 
}

export async function fetchFileTree() { 
    try { 
        const response = await fetch('/api/tree'); 
        if (!response.ok) throw new Error('Falha ao buscar a árvore de arquivos.'); 
        return await response.json(); 
    } catch (error) { 
        console.error('Erro:', error); 
        if(navPane) navPane.innerHTML = `<p style="color: #ff757f;">Erro ao carregar navegação.</p>`; 
        return {}; 
    } 
}