const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  
  {
    pergunta: 'Sobre o Jusnaturalismo é correto afirmar: ',
    alternativas: ["a) O direito origina-se do nascimento(independe de etinia, gênero e condição social ou econômica) e da vontade divina", "b) o direito origina-se das leis e das condições (depende do poder legislativo), ou seja, da vontade e da ação do homem.", "c) tem como direitos, o direito da vida, liberdade, propriedade, proteção do Estado - princípios que a autoridade aplicaria conforme os fundamentos da lei."],
    respostaCorreta: "a) O direito origina-se do nascimento(independe de etinia, gênero e condição social ou econômica) e da vontade divina"
  },
  {
    pergunta: 'No Juspositivismo, é correto afirmar:',
    alternativas: ["a) Define como 'O que é justo por natureza'.'", "b) A fonte do direito é a formalidade, a pureza das leis e o poder da autoridade. A punição é real e concreta.", "c) A fonte do direito é a ordem natural, a moral e a justiça. A punição dá-se apenas no plano moral."],
    respostaCorreta: "b) A fonte do direito é a formalidade, a pureza das leis e o poder da autoridade. A punição é real e concreta."
  },
  {
    
    pergunta: 'Os direitos de vida, liberdade, segurança pessoal, igualdade - princípios que seriam válidos para todas as pessoas, em todos os tempos. representam direitos do jusnaturalismo?',
    alternativas: ["a) verdadeiro", "b) falso"],
    respostaCorreta: "a) verdadeiro"
  },
  {
    pergunta: 'A frase "O que é justo pela lei" define:',
    alternativas: ["A) juspositivismo", "B) jusnaturalismo", "C) justicismo"],
    respostaCorreta: "A) juspositivismo"
  },
  {
    pergunta: 'Segundo Hobbes, "o absolutismo é o poder absoluto ao rei, ao governante que representava o Estado." ',
    alternativas: ["A) verdadeiro", "B) Falso"],
    respostaCorreta: "A) verdadeiro"
  }

];
let indexPerguntaAtual = 0;
const temporizador = 50; 
let tempo = temporizador;
let vida1 = 100;
let vida2 = 100;
let numeroPergunta = 1;
let respostasCorretas = 0;
let quizFinalizado = false;


function exibirPergunta() {
  const perguntaAtual = perguntas[indexPerguntaAtual];
  document.getElementById('pergunta-titulo').textContent = "Questão " + numeroPergunta;
  document.getElementById('pergunta-texto').innerHTML = perguntaAtual.pergunta;

  const listaAlternativas = document.getElementById('alternativas-lista');
  listaAlternativas.innerHTML = "";

  perguntaAtual.alternativas.forEach((alternativa, index) => {
    const button = document.createElement('button');
    button.className = 'alternativa';
    button.textContent = alternativa;
    button.onclick = (function(alternativaClicada) {
      return function() {
        verificarResposta(alternativaClicada);
      };
    })(alternativa);

    listaAlternativas.appendChild(button);
  });
}

function atualizarContador() {
  tempo--;
  if (tempo >= 0) {
    const segundos = tempo % 60;
    const minutos = Math.floor(tempo / 60);
    document.getElementById('conta-regressiva').textContent = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
  } else {
    clearInterval(timer);
    if (!quizFinalizado) {
      desabilitarBotoesAlternativas();
      mostrarMensagemPerdeu();
    }
  }
}

const timer = setInterval(atualizarContador, 1000);
atualizarContador();

function desabilitarBotoesAlternativas() {
  const botoesAlternativas = document.querySelectorAll('.alternativa');
  botoesAlternativas.forEach(botao => {
    botao.disabled = true;
  });
}



function verificarResposta(resposta) {
  const perguntaAtual = perguntas[indexPerguntaAtual];
  if (resposta === perguntaAtual.respostaCorreta) {
    vida2 -= 20;
    sujeito.src = 'imagem/sujeito-ataque .gif';
    player.src = 'imagem/luffydano.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 20;
    player.src = 'imagem/luffy ataque.gif';
    sujeito.src = 'imagem/SUJEITODANO.gif';
    
    
  }

  if (tempo < 0) {
    // Tempo expirado, não permitir resposta
    return;
  }

  indexPerguntaAtual++;
  numeroPergunta++;

  if (indexPerguntaAtual < perguntas.length) {
    exibirPergunta();
    resetarTempo();
  } else {
    clearInterval(timer);
    quizFinalizado = true;
    exibirMensagemFinal();
  }

  atualizarVida();
  atualizarRespostasCorretas();
  if (indexPerguntaAtual === perguntas.length) {
    exibirMensagemFinal();
  }
}

function resetarTempo() {
  tempo = temporizador;
}

function atualizarRespostasCorretas() {
    
}

function atualizarVida() {
  vida1 = Math.max(0, Math.min(vida1, 100));
  vida2 = Math.max(0, Math.min(vida2, 100));

  document.getElementById('barraVida1').value = vida1;
  document.getElementById('barraVida2').value = vida2;
}

function exibirMensagemFinal() {
  let mensagem = "";

  if (vida1 > vida2) {
    mensagem = "Você ganhou!";
    document.getElementById('mensagemdeavanço').style.display = 'block';
      
  } else if (vida1 < vida2) {
    mensagem = "Você perdeu!";
  } else {
    mensagem = "Deu empate!";
  }

  document.getElementById('contingencia').textContent = mensagem;
}

function mostrarMensagemPerdeu() {
  document.getElementById('mensagem-perdeu').style.display = 'block';
}

exibirPergunta();


