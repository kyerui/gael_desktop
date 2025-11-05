export const FOLDER_SVG_PATHS = `<path d="M4 4h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>`;
export const FILE_SVG_PATHS = `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`;
export const ABOUT_SVG_PATHS = `<path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>`;
export const PROJECT_SVG_PATHS = `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>`;
export const MARKDOWN_SVG_PATHS = `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>`;
export const SKILLS_SVG_PATHS = `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`;
export const LINKS_SVG_PATHS = `<path fill="currentColor" d="M1000 267q0 112-78 188L747 631q-78 78-189 78q-97 0-171-63l115-115q26 17 56 17q44 0 75-31l175-176q31-29 31-74q0-44-30.5-74.5T734 162q-25 0-49.5 12T652 208H414L546 79Q626 1 734 1q110 0 188 78t78 188zm-387 89L498 471q-26-17-56-17q-44 0-75 31L192 661q-31 29-31 74q0 44 30.5 74.5T266 840q25 0 49.5-12t32.5-34h238L454 923q-80 78-188 78q-110 0-188-78T0 735q0-112 78-188l175-176q78-78 189-78q97 0 171 63z"/>`;
export const LINKS_SVG_VIEWBOX = '0 0 1000 1000';
export const CONTACT_SVG_PATHS = `<path fill="currentColor" fill-rule="evenodd" d="M11 2H4V0H3v2H1.5A1.5 1.5 0 0 0 0 3.5v8A1.5 1.5 0 0 0 1.5 13h12a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 13.5 2H12V0h-1v2ZM3 6a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm-.618 4.618a2.927 2.927 0 0 1 5.236 0l.33.658A.5.5 0 0 1 7.5 12h-5a.5.5 0 0 1-.447-.724l.329-.658ZM9 6h3V5H9v1Zm0 3h3V8H9v1Z" clip-rule="evenodd"/><path fill="currentColor" d="M15 14v1H0v-1h15Z"/>`;
export const CONTACT_SVG_VIEWBOX = '0 0 15 15';

export let navPane, contentPane, backButton, soundToggleButton, musicToggleButton;
export let fileModal, aboutModal, imageModal, projectModal, markdownModal, skillsModal, linksModal, contactModal;
export let audioOpen, audioClose, audioHover, audioMusic;

export function initializeDOM() {
    navPane = document.getElementById('nav-pane');
    contentPane = document.getElementById('content-pane');
    backButton = document.getElementById('back-button');
    soundToggleButton = document.getElementById('sound-toggle-button');
    musicToggleButton = document.getElementById('music-toggle-button');
    fileModal = document.getElementById('file-modal');
    aboutModal = document.getElementById('about-modal');
    imageModal = document.getElementById('image-modal');
    projectModal = document.getElementById('project-modal');
    markdownModal = document.getElementById('markdown-modal');
    skillsModal = document.getElementById('skills-modal');
    linksModal = document.getElementById('links-modal');
    contactModal = document.getElementById('contact-modal');
    audioOpen = document.getElementById('audio-open');
    audioClose = document.getElementById('audio-close');
    audioHover = document.getElementById('audio-hover');
    audioMusic = document.getElementById('audio-music');
}