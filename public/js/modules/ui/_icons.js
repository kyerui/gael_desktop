export function createIcon(paths, options = {}) {
    const { fill, stroke, viewBox, ...attrs } = options;
    
    const style = [];
    if (fill) style.push(`fill: ${fill}`);
    if (stroke) style.push(`stroke: ${stroke}`);
    const styleString = style.length ? `style="${style.join(';')}"` : '';

    const attrsString = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    
    const viewBoxAttr = viewBox || '0 0 24 24';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxAttr}" ${styleString} ${attrsString}>${paths}</svg>`;
}