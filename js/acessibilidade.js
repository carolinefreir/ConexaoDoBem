/* =========================================================
   ConexãoDoBem - Barra de acessibilidade
   - Botões A- / A / A+ : tamanho da fonte (100%, 115%, 130%, 150%)
   - Botão de alto contraste (fundo preto, texto branco e amarelo)
   - A escolha fica salva no localStorage e vale para todas as páginas
   - Sem JavaScript o site continua funcionando; só a barra não aparece
   ========================================================= */

(function () {
    const CHAVE = "conexaodobem:acessibilidade";
    const TAMANHOS = [100, 115, 130, 150];
    const raiz = document.documentElement;

    // Estado atual: índice do tamanho e contraste ligado ou não
    let estado = { tamanho: 0, contraste: false };

    // localStorage pode estar bloqueado (modo privado), por isso o try/catch
    function carregar() {
        try {
            const salvo = JSON.parse(localStorage.getItem(CHAVE));
            if (salvo && Number.isInteger(salvo.tamanho) && salvo.tamanho >= 0 && salvo.tamanho < TAMANHOS.length) {
                estado.tamanho = salvo.tamanho;
                estado.contraste = salvo.contraste === true;
            }
        } catch (erro) { /* usa o padrão */ }
    }

    function salvar() {
        try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (erro) { /* ignora */ }
    }

    function aplicar() {
        raiz.style.fontSize = TAMANHOS[estado.tamanho] + "%";
        raiz.classList.toggle("alto_contraste", estado.contraste);
    }

    carregar();
    aplicar();

    function criarBotao(texto, rotulo, aoClicar) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "barra_botao";
        botao.textContent = texto;
        botao.setAttribute("aria-label", rotulo);
        botao.addEventListener("click", aoClicar);
        return botao;
    }

    function montarBarra() {
        const barra = document.createElement("div");
        barra.className = "barra_acessibilidade";
        barra.setAttribute("role", "region");
        barra.setAttribute("aria-label", "Ferramentas de acessibilidade");

        const conteudo = document.createElement("div");
        conteudo.className = "barra_acessibilidade_conteudo";

        const titulo = document.createElement("span");
        titulo.className = "barra_acessibilidade_titulo";
        titulo.textContent = "Acessibilidade:";

        const menos = criarBotao("A-", "Diminuir tamanho da fonte", function () {
            estado.tamanho = Math.max(0, estado.tamanho - 1);
            atualizar("Fonte em " + TAMANHOS[estado.tamanho] + "%");
        });
        const normal = criarBotao("A", "Tamanho normal da fonte", function () {
            estado.tamanho = 0;
            atualizar("Fonte em 100%");
        });
        const mais = criarBotao("A+", "Aumentar tamanho da fonte", function () {
            estado.tamanho = Math.min(TAMANHOS.length - 1, estado.tamanho + 1);
            atualizar("Fonte em " + TAMANHOS[estado.tamanho] + "%");
        });

        const contraste = criarBotao("Alto contraste", "Alto contraste", function () {
            estado.contraste = !estado.contraste;
            atualizar(estado.contraste ? "Alto contraste ligado" : "Alto contraste desligado");
        });
        contraste.id = "botao_contraste";

        // Região que o leitor de tela anuncia depois de cada clique
        const aviso = document.createElement("span");
        aviso.className = "sr_only";
        aviso.setAttribute("role", "status");
        aviso.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;";

        function atualizar(mensagem) {
            aplicar();
            salvar();
            contraste.setAttribute("aria-pressed", String(estado.contraste));
            menos.disabled = estado.tamanho === 0;
            mais.disabled = estado.tamanho === TAMANHOS.length - 1;
            aviso.textContent = mensagem;
        }

        conteudo.append(titulo, menos, normal, mais, contraste, aviso);
        barra.appendChild(conteudo);

        // A barra entra logo depois do link "Pular para o conteúdo principal"
        const pular = document.querySelector(".pular_conteudo");
        if (pular && pular.parentNode) {
            pular.parentNode.insertBefore(barra, pular.nextSibling);
        } else {
            document.body.insertBefore(barra, document.body.firstChild);
        }

        atualizar("");
        aviso.textContent = "";
    }

    montarBarra();

    // O link "Pular para o conteúdo" leva o foco do teclado para o <main>
    const pularLink = document.querySelector(".pular_conteudo");
    const principal = document.getElementById("conteudo");
    if (pularLink && principal) {
        pularLink.addEventListener("click", function () {
            principal.focus();
        });
    }
})();
