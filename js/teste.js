/* =========================================================
   ConexãoDoBem - Teste de Aptidão
   Conta quantas vezes cada letra (A, B, C, D) foi marcada
   e mostra o perfil que teve mais respostas.

   Se o JavaScript estiver desligado, a página continua
   funcionando: a pessoa confere o resultado sozinha.
   ========================================================= */

// Nome de cada perfil, de acordo com a letra
const perfis = {
    A: "Guardião do meio ambiente",
    B: "Educador do bem",
    C: "Agente de inclusão",
    D: "Parceiro do esporte"
};

// Pega na página o formulário e a caixa onde o resultado vai aparecer
const formulario = document.getElementById("form_teste");
const caixaResultado = document.getElementById("resultado_automatico");

// Quando a pessoa clica em "Ver meu resultado"...
// (o HTML só deixa chegar aqui se todas as perguntas foram respondidas,
// por causa do atributo "required")
formulario.addEventListener("submit", function (evento) {

    // 1. Impede a página de recarregar
    evento.preventDefault();

    // 2. Começa a contagem do zero
    const contagem = { A: 0, B: 0, C: 0, D: 0 };

    // 3. Pega as opções marcadas e soma 1 para a letra de cada uma
    const marcadas = formulario.querySelectorAll("input[type=radio]:checked");
    for (const opcao of marcadas) {
        contagem[opcao.value] = contagem[opcao.value] + 1;
    }

    // 4. Descobre qual foi a maior contagem
    const maior = Math.max(contagem.A, contagem.B, contagem.C, contagem.D);

    // 5. Separa a(s) letra(s) que chegaram na maior contagem (pode dar empate)
    const vencedoras = [];
    for (const letra of ["A", "B", "C", "D"]) {
        if (contagem[letra] === maior) {
            vencedoras.push(letra);
        }
    }

    // 6. Monta a frase do resultado
    let frase;
    if (vencedoras.length === 1) {
        frase = "Seu perfil é: " + perfis[vencedoras[0]] + ".";
    } else {
        const nomes = vencedoras.map(function (letra) {
            return perfis[letra];
        });
        frase = "Deu empate! Seus perfis são: " + nomes.join(" e ") + ".";
    }

    // 7. Destaca o card do perfil vencedor e tira o destaque dos outros
    for (const letra of ["A", "B", "C", "D"]) {
        const card = document.getElementById("perfil_" + letra);
        if (vencedoras.includes(letra)) {
            card.classList.add("perfil_escolhido");
        } else {
            card.classList.remove("perfil_escolhido");
        }
    }

    // 8. Mostra a frase na página e leva a pessoa até o resultado
    caixaResultado.textContent = frase;
    caixaResultado.hidden = false;
    caixaResultado.focus();
});
