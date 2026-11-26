# Evidências de testes

Testes feitos em 24/11/2026 e conferidos novamente em 25/11/2026 (W3C, links, rolagem lateral, teclado e contraste), na versão final do código, antes da publicação no Railway. Depois do deploy, vale repetir a validação no site publicado e acrescentar os prints do validador on-line do W3C (https://validator.w3.org).

## 1. Validação W3C

Ferramenta: Nu Html Checker (o mesmo validador usado pelo site do W3C), versão 24.10.17.

| Arquivo | Resultado |
| --- | --- |
| As 10 páginas HTML | Nenhum erro |
| `css/style.css` | Nenhum erro |

Durante os testes, o validador apontou dois problemas, que foram corrigidos:

- Em `como_funciona.html`, um `<details>` estava dentro de `<figure>` fora da legenda. Ele foi movido para dentro do `<figcaption>`.
- No CSS, o seletor `:user-valid` não é reconhecido pelo validador. A regra foi removida, e a borda vermelha de campo inválido (`:user-invalid`) foi mantida.

## 2. Lighthouse (acessibilidade, desempenho, boas práticas e SEO)

Ferramenta: Lighthouse 12.2.1, modo desktop.

| Página | Desempenho | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- | --- |
| index.html | 100 | 100 | 96 | 100 |
| como_funciona.html | 100 | 100 | 96 | 100 |
| quem_somos.html | 100 | 100 | 96 | 100 |
| voluntariar.html | 100 | 100 | 96 | 100 |
| encontrar.html | 100 | 100 | 96 | 100 |
| colaborador.html | 100 | 100 | 96 | 100 |
| teste.html | 100 | 100 | 96 | 100 |
| perguntas.html | 100 | 100 | 96 | 100 |
| contato.html | 100 | 100 | 96 | 100 |
| orcamento_hospedagem.html | 100 | 100 | 96 | 100 |

Os 96 em boas práticas vêm de um único item: no ambiente de teste, sem acesso à internet, a fonte do Google Fonts não carregou e gerou um erro no console. No site publicado, a fonte carrega normalmente.

## 3. Responsividade

Cada página foi aberta em três larguras de tela, conferindo se havia rolagem lateral.

| Tamanho | Largura | Resultado |
| --- | --- | --- |
| Celular | 360 px | Sem rolagem lateral nas 10 páginas |
| Tablet | 768 px | Sem rolagem lateral nas 10 páginas |
| Desktop | 1366 px | Sem rolagem lateral nas 10 páginas |

As tabelas largas rolam dentro da própria caixa no celular, sem empurrar a página. Prints: pasta `docs/evidencias/`.

## 4. Navegação e links

- Todos os links internos das 10 páginas apontam para arquivos e âncoras que existem.
- Menu igual em todas as páginas, com a página atual destacada.
- Nenhum arquivo (CSS, imagem, vídeo, áudio, legenda) deixou de carregar.
- Da Home até qualquer oportunidade de voluntariado: 1 clique ("Quero me voluntariar").

## 5. Teclado

- Em todas as páginas, a primeira tecla Tab leva ao link "Pular para o conteúdo principal".
- Todos os links, botões e campos mostram contorno visível ao receber foco.
- As perguntas frequentes abrem e fecham com Enter, porque usam `<details>`.

## 6. Formulário de contato

| Teste | Resultado esperado | Resultado |
| --- | --- | --- |
| Enviar com tudo vazio | Envio bloqueado | Bloqueado |
| E-mail "maria@" | Envio bloqueado no campo e-mail | Bloqueado |
| Telefone "11 9999" | Envio bloqueado no campo telefone (formato) | Bloqueado |
| 50 horas por semana | Envio bloqueado (máximo de 40) | Bloqueado |
| Todos os campos corretos | Mensagem "Mensagem enviada!" | Exibida |

Print: `docs/evidencias/formulario-enviado.jpg`. O formulário de cadastro de ONG (`encontrar.html`) usa as mesmas regras, além do formato de CNPJ.

## 7. Teste de Aptidão (JavaScript)

| Teste | Resultado esperado | Resultado |
| --- | --- | --- |
| Clicar em "Ver meu resultado" sem responder | Envio bloqueado, pedindo as respostas | Bloqueado |
| Respostas A, A, B, A, C | "Seu perfil é: Guardião do meio ambiente." e card A destacado | Correto |
| Respostas B, B, D, D, C (empate) | "Deu empate! Seus perfis são: Educador do bem e Parceiro do esporte." e cards B e D destacados | Correto |
| Erros no console do navegador | Nenhum | Nenhum |
| JavaScript desativado no navegador | Página continua funcionando, com os quatro perfis para conferir | Funciona |

## 8. Imagens

| Arquivo | Tamanho |
| --- | --- |
| Maior imagem do site (`img/poster-video.jpg`) | 50 KB |
| Imagens da galeria (6 arquivos .webp) | entre 8 e 11 KB cada |
| Logo (`img/logo.png`) | 11 KB |

Todas abaixo do limite de 200 KB definido nos objetivos do projeto.

## 9. Contraste de cores

Razão de contraste calculada pela fórmula do WCAG 2.1. O mínimo é 4,5:1 para texto comum, 3:1 para texto grande (a partir de 24 px, ou 18,66 px em negrito) e 3:1 para bordas de componentes.

| Uso no site | Cores | Razão | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| Texto principal sobre branco | #343434 sobre #FFFFFF | 12,4:1 | 4,5:1 | Passa |
| Texto suave sobre branco | #555555 sobre #FFFFFF | 7,5:1 | 4,5:1 | Passa |
| Texto suave sobre fundo creme | #555555 sobre #FFF7F0 | 7,0:1 | 4,5:1 | Passa |
| Links e títulos azuis sobre branco | #141D93 sobre #FFFFFF | 12,9:1 | 4,5:1 | Passa |
| Títulos azuis sobre fundo creme | #141D93 sobre #FFF7F0 | 12,2:1 | 4,5:1 | Passa |
| Botão e cabeçalho de tabela (texto branco) | #FFFFFF sobre #141D93 | 12,9:1 | 4,5:1 | Passa |
| Título laranja escuro (texto grande) sobre creme | #C96300 sobre #FFF7F0 | 3,8:1 | 3:1 | Passa |
| Números de destaque (texto grande) sobre pêssego | #C96300 sobre #FFE6D1 | 3,3:1 | 3:1 | Passa |
| Título do rodapé | #F98417 sobre #343434 | 4,9:1 | 4,5:1 | Passa |
| Texto do rodapé | #FFFFFF sobre #343434 | 12,4:1 | 4,5:1 | Passa |
| Asterisco de campo obrigatório | #B3261E sobre #FFFFFF | 6,5:1 | 4,5:1 | Passa |
| Mensagem de envio | #1B6B2F sobre #E8F5EA | 5,9:1 | 4,5:1 | Passa |
| Etiqueta (presencial, remoto) | #343434 sobre #FFE6D1 | 10,4:1 | 4,5:1 | Passa |
| Borda dos campos de formulário | #8A8A8A sobre #FFFFFF | 3,5:1 | 3:1 | Passa |

A laranja #F98417 não é usada em texto sobre fundo claro, apenas em bordas e marcadores. Para a apresentação, tire também um print de um verificador on-line (por exemplo, WebAIM Contrast Checker) e salve em `docs/evidencias/`.

## 10. Pendente: repetir no site publicado

Depois do deploy no Railway, repetir e anexar prints: validador do W3C pela URL pública, abertura das 10 páginas por HTTPS, vídeo e áudio tocando, envio do formulário e teste de teclado.

## 11. Recursos de acessibilidade em JavaScript (25/11/2026)

Testados no Chromium (Playwright) com o site servido localmente, nas 10 páginas.

| Recurso | Teste | Resultado |
| --- | --- | --- |
| Pular para o conteúdo | Primeiro Tab leva ao link; Enter move o foco para o `<main>` | Funciona |
| Navegação por teclado | Tab percorre menu, barra de acessibilidade, links, campos e botões, sem armadilha de foco | Funciona |
| Botões A-, A e A+ | Quatro níveis: 100%, 115%, 130% e 150%; os botões A- e A+ ficam desativados nos limites | Funciona |
| Alto contraste | Botão com `aria-pressed`; fundo preto, texto branco e amarelo; razão de contraste mínima medida: 17,2:1 | Funciona |
| Memória da escolha | Fonte e contraste continuam iguais ao abrir outra página (localStorage) | Funciona |
| Layout com fonte aumentada | 4 tamanhos de fonte, com e sem alto contraste, em 360, 768, 1024 e 1366 px | Sem rolagem lateral nas 10 páginas |
| Leitor de tela | Região `role="status"` anuncia a mudança de fonte e de contraste | Implementado |

Prints: `docs/evidencias/barra-acessibilidade.jpg` e `docs/evidencias/index-alto-contraste-fonte-maior.jpg`.

## 12. Validação dos formulários em JavaScript e localStorage (25/11/2026)

Formulários de `contato.html` e `encontrar.html` (`js/formularios.js`).

| Teste | Resultado esperado | Resultado |
| --- | --- | --- |
| Enviar com campos obrigatórios vazios | Envio bloqueado; resumo "Há 5 campos para corrigir" com links para cada campo; foco no resumo | Correto |
| E-mail "maria@" | "Digite um e-mail válido, como nome@exemplo.com." | Correto |
| Telefone digitado como 11999998888 | Máscara converte para (11) 99999-8888 | Correto |
| 50 horas por semana | "O valor máximo é 40." | Correto |
| Data anterior a 01/11/2026 | "Escolha uma data a partir de 01/11/2026." | Correto |
| Campo errado fica certo | Mensagem some na hora e `aria-invalid` é removido | Correto |
| Recarregar a página com o formulário preenchido | Campos voltam preenchidos e aparece o aviso com o botão "Limpar rascunho" | Correto |
| Caixa da LGPD | Nunca é guardada: a pessoa precisa marcar de novo | Correto |
| Envio correto | Mensagem "Mensagem enviada!" e rascunho apagado do localStorage | Correto |
| localStorage bloqueado | Funções com `try/catch`; o formulário continua funcionando sem rascunho | Implementado |
| W3C Validator depois das mudanças | Nenhum erro nas 10 páginas e no CSS | Correto |

Prints: `docs/evidencias/formulario-erros-js.jpg` e `docs/evidencias/formulario-rascunho-localstorage.jpg`.
