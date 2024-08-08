const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  
  {
    pergunta: 'A característica "limitavam o poder do Estado e defendiam o indivíduo diante do poder do soberano. (Mais tarde, no século XIX, apareceria também a noção de direitos individuais exercidos coletivamente na forma de liberdades públicas." diz respeito ao:',
    alternativas: ["A) Direitos humanos de primeira geração (liberdade)", "B) Direitos humanos de segunda geração (igualdade)", "C) Direitos humanos de terceira geração (fraternidade)"],
    respostaCorreta: "A) Direitos humanos de primeira geração (liberdade)"
  },
  {
    pergunta: 'A característica "direitos de solidariedade (paz, desenvolvimento, patrimônio, autodeterminação dos povos, comunicação e meio ambiente) – direitos difusos e coletivos (meio ambiente, proteção da infância e juventude e defesa do consumidor, entre outros)" diz respeito ao:',
    alternativas: ["A) Direitos humanos de primeira geração (liberdade)", "B) Direitos humanos de segunda geração (igualdade)", "C) Direitos humanos de terceira geração (fraternidade)"],
    respostaCorreta: "C) Direitos humanos de terceira geração (fraternidade)"
  },
  {
    pergunta: 'Sobre direitos humanos, a frase "Atitudes que levam ao respeito integral da dignidade humana, evitando sofrimentos." representa:',
    alternativas: ["A) Concepção contemporânea", "B) direitos", "C) Convenções internacionais", "D) Características"],
    respostaCorreta: "A) Concepção contemporânea"
  },
  {
    pergunta: 'Sobre direitos humanos, a frase "Vida, liberdade, igualdade e segurança pessoal." representa:',
    alternativas: ["A) Concepção contemporânea", "B) direitos", "C) Convenções internacionais", "D) Características"],
    respostaCorreta: "B) direitos"
  },
  {
    pergunta: 'A característica de "geração individualista" se refere a qual geração?',
    alternativas: ["A) Direitos humanos de primeira geração(liberdade).", "B) Direitos humanos de segunda geração(Igualdade)", "C) Direitos humanos de terceira geração(fraternidade)"],
    respostaCorreta: "A) Direitos humanos de primeira geração(liberdade)."
  },
];
let indexPerguntaAtual = 0;
const temporizador = 30; 
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
    player.src = 'imagem/biadano2,0.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 20;
    player.src = 'imagem/biaataque.gif';
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
