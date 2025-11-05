import * as dom from '../core/dom.js';
import { state } from '../../main.js';

export function playSound(type) {
    if (!state.isSoundEnabled) {
        return;
    }

    let audio;
    if (type === 'open') {
        audio = dom.audioOpen;
    } else if (type === 'close') {
        audio = dom.audioClose;
    } else if (type === 'hover') {
        audio = dom.audioHover;
    }

    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.warn("A reprodução de áudio foi bloqueada pelo navegador:", error);
        });
    }
}

export function playMusic() {
    if (dom.audioMusic) {
        dom.audioMusic.play().catch(error => {
            console.warn("A reprodução de música foi bloqueada pelo navegador:", error);
        });
    }
}

export function pauseMusic() {
    if (dom.audioMusic) {
        dom.audioMusic.pause();
    }
}