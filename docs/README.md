# ConexãoDoBem

**Conexões que transformam.**

Site final (10 páginas), entrega da Atividade A06, desenvolvido para a disciplina de Desenvolvimento Front-End do curso de Análise e Desenvolvimento de Sistemas da Fatec São Caetano do Sul (prof. Paulo Fratta), 2026.

## Links do projeto

| Item | Endereço |
| --- | --- |
| Site publicado no Railway (HTTPS) | **PREENCHER: https://SEU-DOMINIO.up.railway.app** |
| Repositório no GitHub | **PREENCHER: https://github.com/USUARIO/REPOSITORIO** |

## Documentação (pasta `docs/`)

| Arquivo | Conteúdo |
| --- | --- |
| `README.md` | Este arquivo: objetivos, tema, divisão de funções e links |
| `diario_de_bordo.md` | Decisões, aprendizados, dificuldades e soluções, da A05 até a A06 |
| `orcamento_hospedagem.md` | Comparativo de 3 hospedagens e 3 domínios, com a escolha da equipe |
| `evidencias_testes.md` | W3C, Lighthouse, responsividade, teclado, contraste e formulários |
| `relatorio_melhorias.md` | Pontos apontados no MVP e como foram resolvidos (antes e depois) |
| `escopo_projeto.md` | Escopo da A05 atualizado, correspondência com a A06 e critérios de aceitação |
| `evidencias/` | Prints das páginas no celular e no desktop e do formulário enviado |

## Tema

Sustentabilidade e impacto social. A ConexãoDoBem é uma plataforma que conecta ONGs de impacto social e ambiental a voluntários, doadores e empresas parceiras. Para incentivar os jovens, o grupo com menor participação no voluntariado, a plataforma oferece um certificado das horas realizadas, que pode ser aproveitado como atividade complementar.

## Objetivos

**Geral:** desenvolver uma plataforma web acessível que conecte ONGs de impacto social e ambiental a voluntários, doadores e empresas parceiras, com foco no engajamento de jovens estudantes por meio de certificados aproveitáveis como horas de atividades complementares.

**Específicos:**

1. Apresentar pelo menos 6 ONGs fictícias, com área de atuação, projetos, resultados e necessidades, e 10 oportunidades de voluntariado, presenciais e remotas, em pelo menos 4 causas.
2. Permitir que o visitante chegue a qualquer oportunidade em no máximo 3 cliques a partir da página inicial.
3. Atingir nota mínima de 90 em acessibilidade no Lighthouse em todas as páginas, com navegação completa pelo teclado.
4. Publicar as 10 páginas sem erros no validador do W3C.
5. Manter cada imagem do site com no máximo 200 KB.

## Divisão de funções

| Integrante | Função | Responsabilidades |
| --- | --- | --- |
| Julia de Lira | Líder | Organização da equipe, cronograma, documentação e entregas |
| Nathália Mamontow | Desenvolvimento | HTML, CSS, estrutura do projeto, GitHub e deploy no Railway |
| Caroline Freire | Design | Logotipo, paleta de cores, imagens e design da apresentação |
| Erica Teixeira | Pesquisa | Pesquisa de dados, conteúdo das páginas e orçamento |
| Jéssica Serra | Pesquisa | Pesquisa de dados e conteúdo das páginas |
| Bianca Furlan | Qualidade e Testes | Validação W3C, acessibilidade, responsividade e evidências de testes |

## Páginas

| Página | Conteúdo |
| --- | --- |
| `index.html` | Apresentação, dados que justificam o projeto e notícias sobre voluntariado |
| `como_funciona.html` | Passo a passo para voluntários e ONGs, certificado, tabela de impacto e mídia (vídeo, áudio e mapa) |
| `quem_somos.html` | História, missão, visão, valores, galeria e medidas de acessibilidade para PCD |
| `voluntariar.html` | 10 oportunidades de voluntariado (projetos das ONGs) |
| `encontrar.html` | Cadastro de ONGs, com formulário validado |
| `colaborador.html` | Voluntariado corporativo, ONGs parceiras e necessidades de doação |
| `teste.html` | Teste de Aptidão que calcula com JavaScript a causa que combina com a pessoa |
| `perguntas.html` | Perguntas frequentes |
| `contato.html` | Formulário de contato validado, dados de contato e equipe |
| `orcamento_hospedagem.html` | Comparativo de hospedagens e domínios |

## Estrutura de pastas

```text
conexaodobem/
├── index.html
├── contato.html
├── orcamento_hospedagem.html
├── [outras 7 páginas].html
├── css/style.css        (um único CSS para o site inteiro)
├── js/acessibilidade.js (barra de fonte e alto contraste, com localStorage)
├── js/formularios.js    (validação e rascunho dos formulários, com localStorage)
├── js/teste.js          (Teste de Aptidão)
├── img/                 (logo, favicon, poster do vídeo e galeria)
├── assets/video/        (vídeo .mp4 e legendas .vtt)
├── assets/audio/        (trilha .mp3)
└── docs/                (esta documentação)
```

## Tecnologias

- HTML5 semântico e CSS3 (Flexbox, Grid e media queries, mobile first)
- JavaScript em três arquivos: `js/acessibilidade.js` (botões de aumentar e diminuir a fonte e de alto contraste, com a escolha salva no localStorage), `js/formularios.js` (mensagens de erro em português, resumo de erros, máscara de telefone e CNPJ e rascunho salvo no localStorage) e `js/teste.js` (resultado do Teste de Aptidão). Tudo é melhoria progressiva: com o JavaScript desativado, os formulários usam a validação do HTML5, as perguntas frequentes usam `<details>` e o teste mostra os quatro perfis para a pessoa conferir
- Visual Studio Code, Git e GitHub
- Validação no W3C (HTML e CSS) e Lighthouse
- Hospedagem no Railway

## Como abrir no computador

Abra a pasta no VS Code e use a extensão Live Server (botão "Go Live"). Abrindo o `index.html` direto pelo arquivo, o site funciona, mas o Chrome pode não mostrar as legendas do vídeo.

## Como publicar no Railway

1. Crie um repositório no GitHub e envie o conteúdo da pasta `conexaodobem`, com o `index.html` na raiz do repositório.
2. No Railway, clique em **New Project** e escolha **Deploy from GitHub repo**. Selecione o repositório.
3. O Railway detecta o `index.html` na raiz e publica o site como site estático, sem nenhuma configuração extra.
4. Em **Settings > Networking**, clique em **Generate Domain** para gerar o endereço público do site.
5. A cada novo envio para o GitHub, o Railway publica a nova versão automaticamente.

## Créditos

- Ícones das ilustrações e do vídeo: [Lucide](https://lucide.dev), licença ISC.
- Fonte: Open Sans, Google Fonts, licença SIL Open Font License.
- Vídeo, áudio e ilustrações: produzidos para o projeto.
- ONGs, oportunidades, resultados e telefone de contato: fictícios.
- Dados de voluntariado: Datafolha, pesquisa Voluntariado no Brasil 2026 (Folha de S.Paulo, 28/08/2026) e IBGE, PNAD Contínua: outras formas de trabalho 2022 (IBGE, 2023).
