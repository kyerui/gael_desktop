import * as dom from '../core/dom.js';
import { createIcon } from './_icons.js';

export function renderNavTree(node, currentPathString) {
    if (!node || !node.name) return '';
    const isFolderWithChildren = node.type === 'folder' && node.children && node.children.length > 0;
    const isActive = node.path === currentPathString ? 'active' : '';
    let togglerHtml = isFolderWithChildren ? '<span class="tree-toggler"></span>' : '<span style="width: 11px; display: inline-block;"></span>';
    
    let icon;
    if (node.isVirtual) { icon = createIcon(dom.ABOUT_SVG_PATHS, { class: 'tree-icon', fill: 'var(--accent-blue)' }); } 
    else if (node.isVirtualContact) { icon = createIcon(dom.CONTACT_SVG_PATHS, { class: 'tree-icon', fill: 'var(--accent-blue)', viewBox: dom.CONTACT_SVG_VIEWBOX }); } 
    else if (node.isVirtualLinks) { icon = createIcon(dom.LINKS_SVG_PATHS, { class: 'tree-icon', fill: 'var(--accent-blue)', viewBox: dom.LINKS_SVG_VIEWBOX }); } 
    else if (node.isVirtualSkills) { icon = createIcon(dom.FILE_SVG_PATHS, { class: 'tree-icon', fill: 'var(--accent-blue)' }); } 
    else if (node.isMarkdown) { icon = createIcon(dom.MARKDOWN_SVG_PATHS, { class: 'tree-icon tree-icon-markdown', stroke: 'currentColor', 'stroke-width': '2' }); } 
    else if (node.isProject) { icon = createIcon(dom.PROJECT_SVG_PATHS, { class: 'tree-icon tree-icon-project', stroke: 'currentColor', 'stroke-width': '2' }); } 
    else { icon = node.type === 'folder' ? createIcon(dom.FOLDER_SVG_PATHS, { class: 'tree-icon tree-icon-folder' }) : createIcon(dom.FILE_SVG_PATHS, { class: 'tree-icon tree-icon-file' }); }

    let dataAttributes = `data-path="${node.path}" data-type="${node.type}" data-virtual="${node.isVirtual || false}"`;
    if (node.isVirtualContact) { dataAttributes += ` data-is-contact="true"`; }
    if (node.isVirtualLinks) { dataAttributes += ` data-is-links="true"`; }
    if (node.isVirtualSkills) { dataAttributes += ` data-is-skills="true"`; }
    if (node.isImage) { dataAttributes += ` data-is-image="true" data-url="${node.url}"`; }
    if (node.isProject) { dataAttributes += ` data-is-project="true"`; }
    if (node.isMarkdown) { dataAttributes += ` data-is-markdown="true"`; }
    let html = `<li class="${isActive}" ${dataAttributes}><div class="tree-item-label">${togglerHtml}${icon}<span>${node.name.replace('.proj.json','').replace('.md', '')}</span></div>`;
    if (isFolderWithChildren) { html += `<ul>`; for (const child of node.children) { html += renderNavTree(child, currentPathString); } html += `</ul>`; }
    html += `</li>`;
    return html;
}