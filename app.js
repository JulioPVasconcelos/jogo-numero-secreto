let listaNumeros = [];
let limiteTentativas = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female");
}

function mensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do Número Secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
// Comentario check Github
mensagemInicial();

function verificarChute() {
  let chute = parseInt(document.querySelector("input").value);
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `"Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!"`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("h1", "Errou!");
      exibirTextoNaTela("p", "O número secreto é menor!");
    } else {
      exibirTextoNaTela("h1", "Errou!");
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limiteTentativas + 1);
  let qtdElemLista = listaNumeros.length;

  if (qtdElemLista == limiteTentativas) {
    listaNumeros = [];
  }
  if (listaNumeros.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumeros.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
