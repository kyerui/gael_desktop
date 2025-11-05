import * as dom from './modules/core/dom.js';
import * as api from './modules/core/api.js';
import * as ui from './modules/ui/ui.js';
import * as modalLoader from './modules/components/modalLoader.js';
import * as modalController from './modules/components/modalController.js';
import { playSound, playMusic, pauseMusic } from './modules/components/audioController.js';

export const state = {
    currentPath: [],
    fileSystemTree: {},
    isSoundEnabled: true,
    isMusicPlaying: false,
    expandedPaths: new Set(['/'])
};

export async function updateUI() {
    dom.backButton.disabled = state.currentPath.length === 0;
    const currentPathString = '/' + state.currentPath.join('/');
    dom.navPane.innerHTML = `<ul class="nav-tree">${ui.renderNavTree(state.fileSystemTree, currentPathString)}</ul>`;
    dom.navPane.querySelectorAll('li').forEach(li => {
        if (state.expandedPaths.has(li.dataset.path)) {
            li.classList.add('expanded');
        }
    });
    const realItems = await api.fetchDirectoryContents(state.currentPath);
    let itemsToRender = [...realItems];
    if (state.currentPath.length === 0) {
        itemsToRender.push({ name: 'sobre mim', type: 'about' });
        itemsToRender.push({ name: 'links', type: 'links' });
        itemsToRender.push({ name: 'contato', type: 'contact' });
    }
    if (state.currentPath.join('/') === 'trabalhos') {
        itemsToRender.push({ name: 'skills', type: 'skills' });
    }
    const desiredOrder = ['trabalhos', 'sobre mim', 'links', 'contato'];
    itemsToRender.sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.name);
        const indexB = desiredOrder.indexOf(b.name);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name);
    });
    ui.renderContentPane(itemsToRender, state.currentPath);
}

function findNodeByPath(pathArray, tree) {
    let currentNode = tree;
    for (const segment of pathArray) {
        if (!currentNode || !currentNode.children) return null;
        const nextNode = currentNode.children.find(child => child.name === segment);
        if (!nextNode) return null;
        currentNode = nextNode;
    }
    return currentNode;
}

document.addEventListener('DOMContentLoaded', async () => {
    
    dom.initializeDOM();
    await Promise.all([
        api.fetchFileTree().then(tree => state.fileSystemTree = tree),
        modalLoader.loadFileModal(),
        modalLoader.loadAboutModal(),
        modalLoader.loadImageModal(),
        modalLoader.loadProjectModal(),
        modalLoader.loadMarkdownModal(),
        modalLoader.loadSkillsModal(),
        modalLoader.loadLinksModal(),
        modalLoader.loadContactModal()
    ]);
    
    if (state.fileSystemTree && state.fileSystemTree.children) {
        const aboutNode = { name: 'sobre mim', type: 'file', path: '/sobre-mim', isVirtual: true };
        const contactNode = { name: 'contato', type: 'file', path: '/contato', isVirtualContact: true };
        const linksNode = { name: 'links', type: 'file', path: '/links', isVirtualLinks: true };
        state.fileSystemTree.children.push(aboutNode, contactNode, linksNode);
        const desiredOrder = ['trabalhos', 'sobre mim', 'links', 'contato'];
        state.fileSystemTree.children.sort((a, b) => {
            const indexA = desiredOrder.indexOf(a.name);
            const indexB = desiredOrder.indexOf(b.name);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
    }
    
    const trabalhosNode = findNodeByPath(['trabalhos'], state.fileSystemTree);
    if (trabalhosNode && trabalhosNode.children) {
        const skillsNode = { name: 'skills', type: 'file', path: '/trabalhos/skills', isVirtualSkills: true };
        trabalhosNode.children.push(skillsNode);
        trabalhosNode.children.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
    }
    
    dom.backButton.addEventListener('click', () => { if (state.currentPath.length > 0) { playSound('open'); state.currentPath.pop(); updateUI(); } });
    dom.soundToggleButton.addEventListener('click', () => { state.isSoundEnabled = !state.isSoundEnabled; dom.soundToggleButton.classList.toggle('muted', !state.isSoundEnabled); });
    dom.musicToggleButton.addEventListener('click', () => {
        state.isMusicPlaying = !state.isMusicPlaying;
        if (state.isMusicPlaying) { playMusic(); } 
        else { pauseMusic(); }
        dom.musicToggleButton.classList.toggle('playing', state.isMusicPlaying);
    });

    dom.contentPane.addEventListener('click', (e) => {
        const itemDiv = e.target.closest('.fs-item');
        if (!itemDiv) return;
        const type = itemDiv.dataset.type;
        const name = itemDiv.dataset.name;
        if (type === 'folder') { playSound('open'); state.currentPath.push(name); updateUI(); } 
        else if (type === 'contact') { modalController.showContactModal(); } 
        else if (type === 'links') { modalController.showLinksModal(); } 
        else if (type === 'skills') { modalController.showSkillsModal(); } 
        else if (type === 'image') { modalController.showImageModal(itemDiv.dataset.url); } 
        else if (type === 'project') { modalController.showProjectModal(itemDiv.dataset.path); } 
        else if (type === 'markdown') { modalController.showMarkdownModal(itemDiv.dataset.path); } 
        else if (type === 'file') { modalController.showFileContent(itemDiv.dataset.path); } 
        else if (type === 'about') { modalController.showAboutModal(); }
    });

    // ======================================================
    // LÓGICA DE CLIQUE DA ÁRVORE CORRIGIDA
    // ======================================================
    dom.navPane.addEventListener('click', (e) => {
        const targetElement = e.target;
        const targetLi = targetElement.closest('li');
        if (!targetLi) return;

        const path = targetLi.dataset.path;
        
        // Se clicar no toggler (seta), apenas alterna o estado e para
        if (targetElement.classList.contains('tree-toggler')) {
            e.stopPropagation();
            if (state.expandedPaths.has(path)) {
                state.expandedPaths.delete(path);
            } else {
                state.expandedPaths.add(path);
            }
            targetLi.classList.toggle('expanded');
            return;
        }

        // Lida com cliques em arquivos virtuais primeiro
        if (targetLi.dataset.virtual === 'true') { modalController.showAboutModal(); return; }
        if (targetLi.dataset.isContact === 'true') { modalController.showContactModal(); return; }
        if (targetLi.dataset.isLinks === 'true') { modalController.showLinksModal(); return; }
        if (targetLi.dataset.isSkills === 'true') { modalController.showSkillsModal(); return; }
        
        const type = targetLi.dataset.type;
        
        // Se clicar no nome de uma pasta
        if (type === 'folder') {
            playSound('open');
            // Alterna o estado de expansão
            if (state.expandedPaths.has(path)) {
                state.expandedPaths.delete(path);
            } else {
                state.expandedPaths.add(path);
            }
            // E navega para a pasta
            state.currentPath = path === '/' ? [] : path.substring(1).split('/');
            updateUI(); // Redesenha tudo para refletir as mudanças
        } else { // É um arquivo
            if (targetLi.dataset.isMarkdown === 'true') { modalController.showMarkdownModal(path); }
            else if (targetLi.dataset.isProject === 'true') { modalController.showProjectModal(path); } 
            else if (targetLi.dataset.isImage === 'true') { modalController.showImageModal(targetLi.dataset.url); } 
            else { modalController.showFileContent(path); }
        }
    });

    updateUI();
});