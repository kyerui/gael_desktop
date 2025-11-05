import * as dom from '../core/dom.js';
import { createIcon } from './_icons.js';

export function renderContentPane(items, path) {
    dom.contentPane.innerHTML = '';
    const currentPathString = path.join('/');
    const isGalleryMode = currentPathString === 'trabalhos/ilustrações';

    if (path.length === 0) {
        const bioHtml = `<div class="bio-header"><h1>Olá! Eu sou o <strong>Gael</strong>!</h1><p>Desenvolvedor e ilustrador</p></div><hr class="bio-separator">`;
        dom.contentPane.insertAdjacentHTML('beforeend', bioHtml);
    }
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items-grid-container';
    dom.contentPane.appendChild(itemsContainer);

    if (!items || items.length === 0) {
        itemsContainer.innerHTML = '<p>Esta pasta está vazia.</p>';
        return;
    }

    for (const item of items) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'fs-item';
        itemDiv.dataset.name = item.name;
        itemDiv.setAttribute('title', item.name);
        
        let itemType = item.type;
        if (item.isProject) itemType = 'project';
        if (item.isMarkdown) itemType = 'markdown';
        if (item.isImage) itemType = 'image';
        
        switch (itemType) {
            case 'folder':
                itemDiv.dataset.type = 'folder';
                itemDiv.innerHTML = `${createIcon(dom.FOLDER_SVG_PATHS)}<span>${item.name}</span>`;
                break;
            case 'about':
                itemDiv.dataset.type = 'about';
                itemDiv.innerHTML = `${createIcon(dom.ABOUT_SVG_PATHS, { fill: 'var(--accent-blue)' })}<span>${item.name}</span>`;
                break;
            case 'links':
                itemDiv.dataset.type = 'links';
                itemDiv.innerHTML = `${createIcon(dom.LINKS_SVG_PATHS, { fill: 'var(--accent-blue)', viewBox: dom.LINKS_SVG_VIEWBOX })}<span>${item.name}</span>`;
                break;
            case 'contact':
                itemDiv.dataset.type = 'contact';
                itemDiv.innerHTML = `${createIcon(dom.CONTACT_SVG_PATHS, { fill: 'var(--accent-blue)', viewBox: dom.CONTACT_SVG_VIEWBOX })}<span>${item.name}</span>`;
                break;
            case 'skills':
                itemDiv.dataset.type = 'skills';
                itemDiv.innerHTML = `${createIcon(dom.FILE_SVG_PATHS, { fill: 'var(--accent-blue)' })}<span>${item.name}</span>`;
                break;
            case 'markdown':
                itemDiv.dataset.type = 'markdown';
                itemDiv.dataset.path = item.path;
                itemDiv.innerHTML = `${createIcon(dom.MARKDOWN_SVG_PATHS, { stroke: 'currentColor', 'stroke-width': '2' })}<span>${item.name.replace('.md', '')}</span>`;
                break;
            case 'project':
                itemDiv.dataset.type = 'project';
                itemDiv.dataset.path = item.path;
                itemDiv.innerHTML = `${createIcon(dom.PROJECT_SVG_PATHS, { stroke: 'currentColor', 'stroke-width': '2' })}<span>${item.name.replace('.proj.json', '')}</span>`;
                break;
            case 'image':
                itemDiv.dataset.type = 'image';
                itemDiv.dataset.url = item.url;
                itemDiv.classList.add('image-item');
                if (isGalleryMode) {
                    itemDiv.classList.add('gallery-icon-mode');
                    itemDiv.innerHTML = `<img src="${item.url}" alt="${item.name}" class="item-thumbnail">`;
                } else {
                    itemDiv.innerHTML = `<img src="${item.url}" alt="${item.name}" class="item-thumbnail"><span>${item.name}</span>`;
                }
                break;
            default: // Arquivo de texto padrão
                itemDiv.dataset.type = 'file';
                itemDiv.dataset.path = item.path;
                itemDiv.innerHTML = `${createIcon(dom.FILE_SVG_PATHS)}<span>${item.name}</span>`;
                break;
        }
        itemsContainer.appendChild(itemDiv);
    }
}