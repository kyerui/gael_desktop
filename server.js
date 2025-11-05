const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Variável de versão para Cache Busting
const CACHE_VERSION = Date.now();

// O nome correto da pasta que contém os arquivos a serem explorados
const SAFE_ROOT_DIRECTORY = path.resolve(__dirname, 'files_to_explore');

// Middleware para servir arquivos estáticos (CSS, JS, imagens, etc.) da pasta 'public'
app.use(express.static('public'));
// Middleware para servir as imagens e outros arquivos da pasta 'files_to_explore' sob o prefixo /files
app.use('/files', express.static(SAFE_ROOT_DIRECTORY));

// Rota principal para servir o index.html dinamicamente, injetando a versão do cache
app.get('/', async (req, res) => {
    try {
        let indexHtml = await fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8');
        indexHtml = indexHtml.replace(/{{CACHE_VERSION}}/g, CACHE_VERSION);
        res.send(indexHtml);
    } catch (error) {
        console.error("Erro ao carregar index.html:", error);
        res.status(500).send("Erro ao carregar a página.");
    }
});

// Função auxiliar para criar nós de arquivo, identificando tipos especiais (.md, .proj.json, imagens)
async function createFileNode(itemPath, entry) {
    const extension = path.extname(entry.name).toLowerCase();
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
    const isImage = imageExtensions.includes(extension);
    const isProject = extension === '.proj.json';
    const isMarkdown = extension === '.md';
    return {
        name: entry.name,
        type: 'file',
        path: itemPath,
        isImage: isImage,
        isProject: isProject,
        isMarkdown: isMarkdown,
        url: isImage ? encodeURI(path.join('/files', itemPath).replace(/\\/g, '/')) : null
    };
}

// Função recursiva para ler a estrutura de diretórios e construir a árvore de navegação
async function buildFileTree(directory) {
    const name = path.basename(directory);
    let relativePath = directory.substring(SAFE_ROOT_DIRECTORY.length).replace(/\\/g, '/');
    if (relativePath === '') { relativePath = '/'; }
    const item = { name, type: 'folder', path: relativePath };
    let children = [];
    try {
        const dirEntries = await fs.readdir(directory, { withFileTypes: true });
        for (const entry of dirEntries) {
            const fullPath = path.join(directory, entry.name);
            const entryRelativePath = fullPath.substring(SAFE_ROOT_DIRECTORY.length).replace(/\\/g, '/');
            if (entry.isDirectory()) {
                children.push(await buildFileTree(fullPath));
            } else {
                children.push(await createFileNode(entryRelativePath, entry));
            }
        }
    } catch (error) { console.error(`Erro ao ler o diretório ${directory}:`, error); }
    children.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name);
    });
    if (children.length > 0) { item.children = children; }
    return item;
}

// Endpoint que fornece a estrutura completa da árvore para o painel de navegação esquerdo
app.get('/api/tree', async (req, res) => {
    try {
        const tree = await buildFileTree(SAFE_ROOT_DIRECTORY);
        res.json(tree);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao construir a árvore de arquivos.');
    }
});

// Endpoint que fornece o conteúdo de um diretório específico para o painel de conteúdo principal
app.get('/api/files', async (req, res) => {
    try {
        const requestedPath = req.query.path || '/';
        const fullPath = path.join(SAFE_ROOT_DIRECTORY, requestedPath);
        if (!fullPath.startsWith(SAFE_ROOT_DIRECTORY)) { return res.status(403).send('Acesso proibido.'); }
        const dirEntries = await fs.readdir(fullPath, { withFileTypes: true });
        const files = await Promise.all(dirEntries.map(async (entry) => {
            const entryPath = path.join(requestedPath, entry.name).replace(/\\/g, '/');
            if (entry.isDirectory()) {
                return { name: entry.name, type: 'folder' };
            } else {
                return await createFileNode(entryPath, entry);
            }
        }));
        files.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
        res.json(files);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao ler o diretório.');
    }
});

// Endpoint que lê e retorna o conteúdo de um arquivo (.txt, .md, .proj.json)
app.get('/api/content', async (req, res) => {
    try {
        const requestedPath = req.query.path;
        if (!requestedPath) { return res.status(400).send('Caminho do arquivo não especificado.'); }
        const correctedPath = requestedPath.startsWith('/') ? requestedPath.substring(1) : requestedPath;
        const fullPath = path.join(SAFE_ROOT_DIRECTORY, correctedPath);
        if (!fullPath.startsWith(SAFE_ROOT_DIRECTORY)) { return res.status(403).send('Acesso proibido: o caminho está fora do diretório seguro.'); }
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) { return res.status(400).send('Não é possível ler o conteúdo de um diretório.'); }
        const content = await fs.readFile(fullPath, 'utf-8');
        if (path.extname(requestedPath).toLowerCase().includes('.json')) {
            res.type('application/json').send(content);
        } else {
            res.type('text/plain').send(content);
        }
    } catch (error) {
        console.error("Erro em /api/content:", error);
        res.status(500).send('Erro ao ler o arquivo.');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});