import * as dom from '../core/dom.js';
import { hideFileModal, hideAboutModal, hideImageModal, hideProjectModal, hideMarkdownModal, hideSkillsModal, hideLinksModal, hideContactModal } from './modalController.js';
import { playSound } from './audioController.js';

async function loadModal(modalElement, filePath, closeCallback) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Falha ao carregar ${filePath}`);
        modalElement.innerHTML = await response.text();
        const closeModalButton = modalElement.querySelector('.modal-close');
        if (closeModalButton) { closeModalButton.addEventListener('click', closeCallback); }
        modalElement.addEventListener('click', (e) => { if (e.target === modalElement) closeCallback(); });
    } catch (error) { console.error(`Erro ao carregar modal de ${filePath}:`, error); modalElement.innerHTML = `<div class="modal-content"><p>Não foi possível carregar o componente.</p></div>`; }
}

export async function loadFileModal() { await loadModal(dom.fileModal, '/templates/file.html', hideFileModal); }
export async function loadAboutModal() { await loadModal(dom.aboutModal, '/templates/about.html', hideAboutModal); }
export async function loadImageModal() { await loadModal(dom.imageModal, '/templates/lightbox.html', hideImageModal); }
export async function loadProjectModal() { await loadModal(dom.projectModal, '/templates/project.html', hideProjectModal); }
export async function loadMarkdownModal() { await loadModal(dom.markdownModal, '/templates/markdown.html', hideMarkdownModal); }
export async function loadSkillsModal() {
    await loadModal(dom.skillsModal, '/templates/skills.html', hideSkillsModal);
    const skillItems = dom.skillsModal.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', () => { playSound('hover'); });
    });
}
export async function loadLinksModal() { await loadModal(dom.linksModal, '/templates/links.html', hideLinksModal); }
export async function loadContactModal() { await loadModal(dom.contactModal, '/templates/contact.html', hideContactModal); }