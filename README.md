# Portfólio Interativo - Explorador de Arquivos

Este é um projeto de portfólio pessoal construído com Node.js, Express e JavaScript modular. Ele simula a interface de um explorador de arquivos de sistema operacional, onde cada arquivo e pasta funciona como um link para uma seção do meu portfólio, exibindo informações em modais customizados.

## Funcionalidades

* **API de Sistema de Arquivos:** Um backend em Node.js que lê dinamicamente a estrutura de pastas e o conteúdo de arquivos do diretório `files_to_explore` e os serve através de uma API.
* **Interface Reativa:** Um frontend modular em JavaScript (ES6) que consome a API e constrói a interface do usuário dinamicamente, sem recarregar a página.
* **Navegação Dupla:**
    * **Painel de Conteúdo:** Navegação principal por ícones, similar ao Finder ou Windows Explorer.
    * **Árvore de Navegação:** Painel lateral que exibe a estrutura de pastas, sincronizando-se com a navegação principal.
* **Sistema de Modais Dinâmicos:** Diferentes "tipos de arquivo" abrem diferentes tipos de modais:
    * **Arquivos `.md`:** Abrem um visualizador estilizado que renderiza o conteúdo Markdown (usado para exibir projetos, como o `gesobank.md`).
    * **Arquivos de Imagem:** Abrem um *lightbox* para visualização de imagens em tela cheia.
    * **Arquivos `.txt`:** Abrem um visualizador de texto simples.
* **Arquivos Virtuais:** Ícones especiais que não existem no sistema de arquivos, mas que abrem modais com informações pessoais:
    * **sobre mim:** Exibe uma bio, foto de perfil e informações pessoais.
    * **links:** Exibe botões com links para redes sociais (GitHub, LinkedIn, etc.).
    * **contato:** Exibe informações de contato e um botão `mailto:`.
    * **skills:** Exibe um grid dinâmico de ferramentas e tecnologias.
* **Sistema de Áudio:**
    * **Música de Fundo:** Um botão para tocar ou pausar uma música ambiente em loop.
    * **Efeitos Sonoros:** Sons para navegação, abertura/fechamento de modais e hovers, com um botão global para silenciar todos os efeitos.
* **Design e UI:**
    * Tema escuro completo, inspirado no VS Code.
    * Barra de rolagem customizada para se adequar ao tema.
    * Ícones SVG customizados para diferentes tipos de arquivos e controles.
    * Interface responsiva para o painel principal (a árvore de navegação é oculta em telas menores).
* **Otimização:**
    * Sistema de **Cache Busting** (`?v={{CACHE_VERSION}}`) implementado no `server.js` para garantir que o navegador sempre baixe as versões mais recentes dos arquivos CSS e JS após uma atualização.

---

## Tecnologias Usadas

Este projeto foi construído do zero, utilizando as seguintes tecnologias:

* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/) (para o servidor e a API)
    * `fs.promises` (para leitura assíncrona do sistema de arquivos)
    * `nodemon` (para desenvolvimento)

* **Frontend:**
    * HTML5 (com carregamento de templates dinâmicos)
    * CSS3 (Modular, usando CSS Grid, Flexbox e Variáveis)
    * JavaScript (ES6+), organizado em Módulos (`import`/`export`)
    * [Marked.js](https://marked.js.org/) (Biblioteca para renderizar Markdown em HTML)
    * `Fetch API` (para comunicação cliente-servidor)

---

## Estrutura do Projeto

O projeto é dividido em duas áreas principais: o backend (`server.js`) e o frontend (`public/`).

Com certeza\! Analisei todo o projeto que construímos juntos. Ele é um portfólio fantástico, criativo e tecnicamente impressionante, que combina um backend Node.js com um frontend modular e interativo.

Aqui está um arquivo `README.md` completo e profissional para você colocar na raiz do seu projeto (por exemplo, no seu repositório do GitHub). Ele explica o que o projeto é, quais tecnologias usa e, o mais importante, como você pode adicionar novos conteúdos a ele no futuro.

-----

### Arquivo: `README.md` (Completo)

(Basta copiar e colar este conteúdo em um novo arquivo chamado `README.md` na pasta principal do seu projeto).


## Como Rodar o Projeto Localmente

1.  **Clone este repositório** (ou certifique-se de ter todos os arquivos acima).
2.  **Abra um terminal** na pasta raiz do projeto.
3.  **Instale as dependências** (você só precisa fazer isso uma vez):
    ```bash
    npm install
    ```
4.  **Inicie o servidor:**
    ```bash
    npm start
    ```
5.  **Abra o navegador** e acesse [http://localhost:3000](http://localhost:3000).

---

## Como Adicionar e Modificar Conteúdo

A melhor parte deste projeto é que ele é totalmente dinâmico. Para adicionar novos projetos ou informações, **você não precisa tocar no código JavaScript**, apenas adicionar ou editar arquivos nas pastas corretas.

### Adicionar um Novo Projeto (Estilo README)

1.  **Crie um arquivo `.md`:** Adicione um novo arquivo de texto com a extensão `.md` na pasta `files_to_explore/trabalhos/programacao/`.
2.  **Use o Formato:** Copie o formato do arquivo `gesobank.md` (com o `div` do `title-with-logo` e a formatação Markdown) para manter o estilo.
3.  **Adicione a Imagem (Opcional):** Coloque a imagem do logo do projeto na pasta `public/img/`.

### Adicionar uma Nova Ilustração

1.  **Adicione a Imagem:** Simplesmente coloque um novo arquivo `.png` ou `.jpg` na pasta `files_to_explore/trabalhos/ilustrações/`.
2.  **Modo Galeria:** O sistema irá automaticamente renderizar a imagem no modo "miniatura sem texto".

### Modificar os "Skills"

1.  **Abra o arquivo:** `public/templates/skills.html`.
2.  **Edite os Itens:** Adicione ou remova os `divs` com a classe `skill-item` para atualizar suas listas de ferramentas e desenvolvimento.

### Modificar as Informações Pessoais

* **Para "Sobre mim":** Edite o arquivo `public/templates/about.html`.
* **Para "Contato":** Edite o arquivo `public/templates/contact.html`.
* **Para "Links":** Edite o arquivo `public/templates/links.html` para adicionar ou alterar os botões de redes sociais.

---

## Créditos de Áudio

Os efeitos sonoros e a música de fundo utilizados neste projeto são de [Zapsplat.com](https://www.zapsplat.com/).
