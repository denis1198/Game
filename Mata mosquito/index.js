// 1o passo criar variáveis para altura e largura
// criar função de ajustar tamanho com window.innerXY
//criar função de posicionamento randomico arredondado e - 90
// criar função de lado random e tamanho random
// função de checar
// xPosition = xPosition < 0 ? 0 : xPosition;
// yPosition = yPosition < 0 ? 0 : yPosition;
// requerer a imagem do mosquito e dar posicionamento e lado = as funções disso
// gerar setInterval no js
// gerar id para o mosquito e ter uma função checando no começo do intervalo se já existir para remover
// boddy.appendChild(mosquito)
// criar o cenário com background-image no css e position absolute pro container específico.
//gerar função para que ao terminar o contador do tempo do próximo spawn, se existir mosquito, contador de hp ++ e no hp ++ mudar a img da vida
// gerar window.location.href = ' ' para jogar em outro html feito da tela de game over e nela ter botão restart que joga de volta no jogo.
// criar timer e utiliar span com id para dentro dele usarmos dom para definir o elemento do tempo com intervalo de --  a cada 1 seg
// criar um fluxo de vitória com timer < 0 === vitória.
// criar uma remoção do interval ao tempo chegar em 0 ou timer < 0
// criar uma remoção da criação do mosquito ao chegar o timner em 0 ou em timer < 0
// criar página para vitória ao timer chegar abaixo de 0
// criar página inicial para selecionar nível de dificuldade.
// criar em divs para facilitar
//on click start game function e recuperar os valores das dificuldades definidas
// função para checar se escolheu a dificuldade "selecione dificuldade" se for nela, alert e return false para parar ali mesmo.
//gerar o href com uma ? concatenado com dificuldade
// window.location.search me retorna o valor do ?dificuldade da htttps

let height = 0;
let width = 0;
let whiteLifes = 1;
let seconds = 15;
let createMosquitoTimer = 1500;

let howHardIsTheGame = window.location.search; //recuperando o valor da dificuldade pelo https
howHardIsTheGame = howHardIsTheGame.replace("?", "");
// alert(howHardIsTheGame.replace("?", "")); //substitui todos os caracteres do 1o parametro pelo do 2o.
if (howHardIsTheGame === "normal") {
  createMosquitoTimer = 1500;
} else if (howHardIsTheGame === "hard") {
  createMosquitoTimer = 1500;
} else if (howHardIsTheGame === "superHard") {
  createMosquitoTimer = 750;
}
// 1o preciso encontrar altura e largura da página. Junto do onresize do html
function sizeAdjustment() {
  height = window.innerHeight;
  width = window.innerWidth;
}

sizeAdjustment();
//criando um set interval que vai reduzindo o timer em 1 a cada 1 seg
let timer = setInterval(function () {
  // foi colocado 1o no js do html para que possa começar junto no contador
  seconds -= 1;
  if (seconds < 0) {
    clearInterval(timer);
    clearInterval(createMosquito);
    window.location.href = "victory.html";
  } else {
    document.getElementById("timerGame").innerText = seconds;
  }
}, 1000);

// posição random do mosquito.

function randomPositioning() {
  // remover o mosquitop anterior (caso exista) feito após chegar no setInterval
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();
    if (whiteLifes > 3) {
      // game over
      window.location.href = "end_of_the_game.html";
    }
    document.getElementById("hp" + whiteLifes).src = "./style.css/imagens/coracao_vazio.png";
    whiteLifes++;
  }

  // -90 serve para que gere uma "margem segura de 90 px para a imagem não sair da tela"
  let xPosition = Math.floor(Math.random() * width) - 90; // multiplicar por largura por ser eixo X para o valor do random ser apenas dentro dela
  let yPosition = Math.floor(Math.random() * height) - 90; // multiplicar por altura por ser eixo Y para o valor do random ser apenas dentro dela
  //Math.floor é para arredondar o número sem ser quebrado

  xPosition = xPosition < 0 ? 0 : xPosition; //operador ternário garantindo que não terá chances de ser menor que zero
  yPosition = yPosition < 0 ? 0 : yPosition;
  // criar o elemento html

  let mosquito = document.createElement("img");
  mosquito.src = "./style.css/imagens/mosquito.png";
  mosquito.className = randomSize() + " " + randomSide(); //"mosquito1"; //dando a mesma classe de css para o elemento //mudei para randomSize() para ser randomizado.
  // agora precisamos acessar os atriputos de estilo do elemento que estamos criando
  mosquito.style.left = xPosition + "px";
  mosquito.style.top = yPosition + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    this.remove(); //pode ser assim por já ter o elemento ou => // document.getElementById("mosquito").remove();
  };
  document.body.appendChild(mosquito);
}

// Criando tamanhos aleatórios

function randomSize() {
  let classes = Math.floor(Math.random() * 3);

  switch (classes) {
    // não utilizei break por que return é o final da função e finalizaria da mesma maneira.
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function randomSide() {
  let sides = Math.floor(Math.random() * 2);

  switch (sides) {
    case 0:
      return "left-side";
    case 1:
      return "right-side";
  }
}
