import * as dom from '../core/dom.js';
import { fetchFileContent } from '../core/api.js';
import { playSound } from './audioController.js';

export function hideFileModal() { playSound('close'); dom.fileModal.style.display = 'none'; }
export function showAboutModal() { playSound('open'); dom.aboutModal.style.display = 'flex'; }
export function hideAboutModal() { playSound('close'); dom.aboutModal.style.display = 'none'; }
export function hideProjectModal() { playSound('close'); dom.projectModal.style.display = 'none'; }
export function hideMarkdownModal() { playSound('close'); dom.markdownModal.style.display = 'none'; }
export function showSkillsModal() { playSound('open'); dom.skillsModal.style.display = 'flex'; }
export function hideSkillsModal() { playSound('close'); dom.skillsModal.style.display = 'none'; }
export function showLinksModal() { playSound('open'); dom.linksModal.style.display = 'flex'; }
export function hideLinksModal() { playSound('close'); dom.linksModal.style.display = 'none'; }
export function showContactModal() { playSound('open'); dom.contactModal.style.display = 'flex'; }
export function hideContactModal() { playSound('close'); dom.contactModal.style.display = 'none'; }

export function showImageModal(imageUrl) {
    const lightboxImage = dom.imageModal.querySelector('#lightbox-image');
    if (lightboxImage) {
        playSound('open');
        lightboxImage.src = imageUrl;
        dom.imageModal.style.display = 'flex';
    }
}
export function hideImageModal() {
    playSound('close');
    dom.imageModal.style.display = 'none';
    const lightboxImage = dom.imageModal.querySelector('#lightbox-image');
    if (lightboxImage) { lightboxImage.src = ''; }
}

export async function showFileContent(filePath) {
    const modalTitle = dom.fileModal.querySelector('#modal-title');
    const modalBody = dom.fileModal.querySelector('#modal-body');
    const content = await fetchFileContent(filePath);
    modalTitle.textContent = filePath.split('/').pop();
    modalBody.textContent = content || 'Arquivo vazio.';
    playSound('open');
    dom.fileModal.style.display = 'flex';
}

export async function showProjectModal(filePath) { 
    try { 
        const response = await fetch(`/api/content?path=${encodeURIComponent(filePath)}`); 
        if (!response.ok) throw new Error('Falha ao buscar dados do projeto.'); 
        const projectData = await response.json(); 
        const projectTitle = dom.projectModal.querySelector('#project-title');
        const projectLanguage = dom.projectModal.querySelector('#project-language');
        const projectRepoLink = dom.projectModal.querySelector('#project-repo-link');
        const projectDescription = dom.projectModal.querySelector('#project-description');
        projectTitle.textContent = projectData.title; 
        projectLanguage.textContent = projectData.language; 
        projectRepoLink.href = projectData.repoUrl; 
        projectDescription.innerHTML = ''; 
        projectData.description.forEach(paragraph => { const p = document.createElement('p'); p.textContent = paragraph; projectDescription.appendChild(p); }); 
        playSound('open');
        dom.projectModal.style.display = 'flex'; 
    } catch (error) { console.error("Erro ao exibir modal de projeto:", error); } 
}

export async function showMarkdownModal(filePath) {
    try {
        const markdownTitle = dom.markdownModal.querySelector('#markdown-title');
        const markdownBody = dom.markdownModal.querySelector('#markdown-body');
        const markdownContent = await fetchFileContent(filePath);
        markdownTitle.textContent = filePath.split('/').pop().replace('.md', '');
        markdownBody.innerHTML = marked.parse(markdownContent);
        playSound('open');
        dom.markdownModal.style.display = 'flex';
    } catch (error) { console.error("Erro ao exibir modal de Markdown:", error); }
}