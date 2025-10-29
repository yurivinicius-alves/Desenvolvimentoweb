🚀 A Jornada de Construção Deste Projeto

Este sumário descreve como o projeto foi estruturado, desde a fundação (HTML) até a interatividade (JavaScript), garantindo que ele não apenas funcione, mas ofereça uma ótima experiência ao usuário em qualquer dispositivo.

🏗️ Fase 1: O Alicerce (HTML5 Semântico)

Começamos pelo básico, mas com foco total na qualidade. A primeira entrega foi a espinha dorsal do site, garantindo que a estrutura fosse sólida e acessível.

O que entregamos aqui:

Páginas Essenciais Prontas: Criamos as quatro telas principais que o usuário precisa:

index.html (Boas-vindas)

projetos.html (Conteúdo Principal/Cursos)

cadastro.html (Formulário de Inscrição)

sucesso.html (Mensagem de Confirmação)

Navegação Clara: Montamos o menu (<nav>) para que o usuário possa se movimentar facilmente entre todas essas páginas.

Estrutura Acessível: Usamos tags semânticas do HTML5 (<header>, <main>, <footer>, <section>, <article>, <figure>, <fieldset>) para dar significado ao conteúdo, o que é ótimo para SEO e acessibilidade.

Formulário Inteligente: O formulário já veio com validações nativas do HTML (como required, pattern, minlength), garantindo que os dados cheguem corretos antes mesmo de pensar em JavaScript.

🎨 Fase 2: A Cara do Projeto (Estilização e Responsividade)

Com o alicerce pronto, chegou a hora de dar vida ao projeto! O objetivo foi criar uma identidade visual coesa e garantir que o site ficasse perfeito em qualquer tamanho de tela.

Os destaques do design e layout:

Design System Simplificado: Para manter a consistência, definimos um "sistema de design" com variáveis CSS (:root), incluindo uma paleta de 8 cores, uma hierarquia tipográfica com 5 tamanhos e um sistema de espaçamento baseado no múltiplo de 8px.

Layout Adaptável (Responsivo): Construímos o layout pensando em todos os dispositivos, utilizando o que há de melhor no CSS:

Flexbox para alinhamentos em uma dimensão.

CSS Grid para layouts bidimensionais complexos.

5 Breakpoints estratégicos para que o design se ajuste de celular a desktop.

Componentes Visuais: Criamos elementos reutilizáveis e bem pensados, como o menu superior com a versão Hambúrguer para dispositivos móveis, cards estilizados para os cursos e formulários com feedback visual imediato.

⚙️ Fase 3: A Magia da Interatividade (JavaScript Moderno)

Na última etapa, transformamos o site estático em uma experiência fluida, eliminando a necessidade de recarregar a página a cada clique, ou seja, uma SPA (Single Page Application).

Funcionalidades que dão vida ao site:

Funcionalidade

O que o usuário ganha com isso?

Roteamento SPA por Hash

Navegação super rápida (ex: #home, #cursos) sem a irritante tela branca de carregamento.

Sistema de Templates

Conteúdo novo é injetado dinamicamente a partir de <template> prontos no HTML, o que torna o carregamento eficiente.

Manipulação do DOM

Todo o conteúdo é inserido no container principal de forma limpa e otimizada (innerHTML e cloneNode()).

Validação de Formulário

O usuário recebe mensagens de erro personalizadas e amigáveis, guiando-o para o preenchimento correto.

Máscara de Entrada

O campo formata automaticamente CPF/telefone enquanto o usuário digita, economizando tempo e evitando erros.

Armazenamento Local (LocalStorage)

(Esta é opcional, mas se ativada:) Os dados do formulário podem ser guardados no navegador para uma experiência contínua.

🛠 Resumo das Tecnologias

Este projeto foi construído usando o trio fundamental do desenvolvimento web moderno:

HTML5

CSS3 (Com foco em Flexbox, Grid e Media Queries)

JavaScript ES6+ (DOM, Eventos, e arquitetura SPA)


GitHub

Yuri Vinicius Alves

https://github.com/yurivinicius-alves

📄 Licença

Este é um projeto acadêmico e pode ser usado livremente para estudos e aprendizado.