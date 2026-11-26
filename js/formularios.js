/* =========================================================
   ConexãoDoBem - Validação dos formulários (contato e cadastro de ONG)

   O que este arquivo faz:
   1. Mostra mensagens de erro em português, embaixo de cada campo
   2. Ao enviar com erro, impede o envio, lista os erros e leva o foco ao primeiro
   3. Aplica máscara de telefone e de CNPJ enquanto a pessoa digita
   4. Salva um rascunho no localStorage, para a pessoa não perder o que digitou
   5. Apaga o rascunho depois de um envio correto

   Sem JavaScript, a validação do próprio HTML5 continua funcionando.
   ========================================================= */

(function () {
    const formularios = document.querySelectorAll("form.formulario");

    // Tenta usar o localStorage; se estiver bloqueado, o resto continua funcionando
    function lerRascunho(chave) {
        try { return JSON.parse(localStorage.getItem(chave)); } catch (erro) { return null; }
    }
    function gravarRascunho(chave, dados) {
        try { localStorage.setItem(chave, JSON.stringify(dados)); } catch (erro) { /* ignora */ }
    }
    function apagarRascunho(chave) {
        try { localStorage.removeItem(chave); } catch (erro) { /* ignora */ }
    }

    // Escolhe a mensagem de acordo com o tipo de erro do campo
    function mensagemDeErro(campo) {
        const v = campo.validity;
        const dica = campo.getAttribute("aria-describedby") ? document.getElementById(campo.getAttribute("aria-describedby").split(" ")[0]) : null;

        if (v.valueMissing) {
            if (campo.type === "checkbox") return "Marque esta caixa para continuar.";
            if (campo.tagName === "SELECT") return "Escolha uma opção.";
            return "Preencha este campo.";
        }
        if (v.typeMismatch && campo.type === "email") return "Digite um e-mail válido, como nome@exemplo.com.";
        if (v.patternMismatch) {
            if (campo.type === "tel") return "Use o formato (11) 91234-5678.";
            if (campo.id === "ong_cnpj") return "Use o formato 00.000.000/0000-00.";
            if (campo.id === "nome") return "Use apenas letras e espaços, com pelo menos 3 letras.";
            return dica ? dica.textContent : "Confira o formato do campo.";
        }
        if (v.tooShort) return "Escreva pelo menos " + campo.minLength + " caracteres (você digitou " + campo.value.length + ").";
        if (v.rangeUnderflow) {
            if (campo.type === "date") return "Escolha uma data a partir de " + formatarData(campo.min) + ".";
            return "O valor mínimo é " + campo.min + ".";
        }
        if (v.rangeOverflow) return "O valor máximo é " + campo.max + ".";
        if (v.badInput) return "Digite um valor válido.";
        if (v.stepMismatch) return "Digite um número inteiro.";
        return "Confira este campo.";
    }

    function formatarData(iso) {
        const partes = iso.split("-");
        return partes[2] + "/" + partes[1] + "/" + partes[0];
    }

    // Máscaras: ajudam a pessoa a chegar no formato que o campo exige
    function mascaraTelefone(valor) {
        const n = valor.replace(/\D/g, "").slice(0, 11);
        if (n.length <= 2) return n.length ? "(" + n : "";
        if (n.length <= 6) return "(" + n.slice(0, 2) + ") " + n.slice(2);
        if (n.length <= 10) return "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
        return "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
    }
    function mascaraCnpj(valor) {
        const n = valor.replace(/\D/g, "").slice(0, 14);
        let r = n.slice(0, 2);
        if (n.length > 2) r += "." + n.slice(2, 5);
        if (n.length > 5) r += "." + n.slice(5, 8);
        if (n.length > 8) r += "/" + n.slice(8, 12);
        if (n.length > 12) r += "-" + n.slice(12, 14);
        return r;
    }

    formularios.forEach(function (form, indice) {
        // Chave do rascunho: uma por página
        const chave = "conexaodobem:rascunho:" + (location.pathname.split("/").pop() || "index.html") + ":" + indice;
        const campos = Array.from(form.elements).filter(function (el) {
            return el.name && el.type !== "submit" && el.type !== "button";
        });

        // Desliga o balão padrão do navegador: as mensagens passam a ser as nossas
        form.noValidate = true;

        // ----- Resumo de erros (aparece só quando o envio falha) -----
        const resumo = document.createElement("div");
        resumo.className = "resumo_erros";
        resumo.setAttribute("role", "alert");
        resumo.tabIndex = -1;
        resumo.hidden = true;
        form.insertBefore(resumo, form.firstChild);

        // ----- Mensagem de erro de cada campo -----
        campos.forEach(function (campo) {
            const erro = document.createElement("span");
            erro.className = "erro_campo";
            erro.id = "erro_" + campo.id;
            erro.hidden = true;

            // Para o checkbox, a mensagem vai depois do rótulo; para os outros, depois do campo
            const ancora = campo.type === "checkbox" ? campo.parentNode : campo.parentNode;
            ancora.appendChild(erro);

            const ids = (campo.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
            ids.push(erro.id);
            campo.setAttribute("aria-describedby", ids.join(" "));
        });

        function validarCampo(campo) {
            const erro = document.getElementById("erro_" + campo.id);
            if (campo.checkValidity()) {
                campo.removeAttribute("aria-invalid");
                erro.hidden = true;
                erro.textContent = "";
                return true;
            }
            campo.setAttribute("aria-invalid", "true");
            erro.textContent = mensagemDeErro(campo);
            erro.hidden = false;
            return false;
        }

        // ----- Rascunho salvo (localStorage) -----
        function salvarRascunho() {
            const dados = {};
            campos.forEach(function (campo) {
                // A autorização da LGPD nunca é guardada: a pessoa precisa marcar de novo
                if (campo.type === "checkbox") return;
                dados[campo.name] = campo.value;
            });
            gravarRascunho(chave, dados);
        }

        const aviso = document.createElement("div");
        aviso.className = "aviso_rascunho";
        aviso.hidden = true;
        aviso.innerHTML = "<p>Recuperamos o que você tinha digitado neste formulário.</p>";
        const botaoLimpar = document.createElement("button");
        botaoLimpar.type = "button";
        botaoLimpar.className = "botao botao_contorno";
        botaoLimpar.textContent = "Limpar rascunho";
        aviso.appendChild(botaoLimpar);
        form.parentNode.insertBefore(aviso, form);

        const salvo = lerRascunho(chave);
        let recuperou = false;
        if (salvo && typeof salvo === "object") {
            campos.forEach(function (campo) {
                if (campo.type !== "checkbox" && typeof salvo[campo.name] === "string" && salvo[campo.name] !== "") {
                    campo.value = salvo[campo.name];
                    recuperou = true;
                }
            });
        }
        aviso.hidden = !recuperou;

        botaoLimpar.addEventListener("click", function () {
            form.reset();
            apagarRascunho(chave);
            campos.forEach(validarCampoSilencioso);
            aviso.hidden = true;
            resumo.hidden = true;
            form.querySelector("input, select, textarea").focus();
        });

        function validarCampoSilencioso(campo) {
            campo.removeAttribute("aria-invalid");
            const erro = document.getElementById("erro_" + campo.id);
            erro.hidden = true;
            erro.textContent = "";
        }

        // ----- Eventos dos campos -----
        campos.forEach(function (campo) {
            const mascara = campo.type === "tel" ? mascaraTelefone : (campo.id === "ong_cnpj" ? mascaraCnpj : null);

            campo.addEventListener("input", function () {
                if (mascara) campo.value = mascara(campo.value);
                salvarRascunho();
                // Depois de o campo ter sido marcado como errado, a mensagem some assim que ele ficar certo
                if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
            });

            // Ao sair do campo, mostra o erro (só se a pessoa digitou ou mexeu)
            campo.addEventListener("blur", function () {
                if (campo.value !== "" || campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
            });

            campo.addEventListener("change", function () {
                if (campo.type === "checkbox" || campo.type === "date" || campo.type === "number" || campo.tagName === "SELECT") validarCampo(campo);
            });
        });

        // ----- Envio -----
        form.addEventListener("submit", function (evento) {
            const invalidos = campos.filter(function (campo) { return !validarCampo(campo); });

            if (invalidos.length > 0) {
                evento.preventDefault();

                resumo.innerHTML = "";
                const titulo = document.createElement("p");
                titulo.textContent = invalidos.length === 1
                    ? "Há 1 campo para corrigir:"
                    : "Há " + invalidos.length + " campos para corrigir:";
                const lista = document.createElement("ul");
                invalidos.forEach(function (campo) {
                    const item = document.createElement("li");
                    const link = document.createElement("a");
                    const rotulo = form.querySelector('label[for="' + campo.id + '"]');
                    link.href = "#" + campo.id;
                    link.textContent = (rotulo ? rotulo.textContent.replace("*", "").trim() : campo.name) + ": " +
                        document.getElementById("erro_" + campo.id).textContent;
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        campo.focus();
                    });
                    item.appendChild(link);
                    lista.appendChild(item);
                });
                resumo.append(titulo, lista);
                resumo.hidden = false;
                resumo.focus();
                return;
            }

            // Tudo certo: apaga o rascunho e deixa o envio seguir para #enviado
            resumo.hidden = true;
            apagarRascunho(chave);
        });
    });
})();
