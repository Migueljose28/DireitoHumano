  const sujeito = document.querySelector('.sujeito')
  const player = document.querySelector('.player')
  const perguntas = [
    {
      pergunta: 'Sobre as caracteristicas do direitos fundamentais. <br> O que caracterizar a inalienabilidade?',
      alternativas: ["a) são direitos indisponíveis e,portanto, não podem ser objeto de quaisquer negociações.", "b) os direitos fundamentais não se sujeitam à prescrição, isto é, veda-se ao legislador que estipule prazo para o exercício do direito de ação com vistas a preservá-los.", "c) não pode o particular renunciar aos direitos fundamentais de que é titular. Pode, todavia, optar por não exercê-los em determinadas situações (renúncia ao exercício)","d) decorrem das condições materiais e culturais de uma época. Nesse sentido equivocada a concepção do jusnaturalismo, segundo a qual são atemporais e fixos. Pelo contrário: são fruto da evolução histórica de cada povo – daí não serem os mesmos em todas as partes do mundo."],
      respostaCorreta: "a) são direitos indisponíveis e,portanto, não podem ser objeto de quaisquer negociações."
    },
    {
      pergunta: 'Sobre as caracteristicas do direitos fundamentais. <br> O que caracterizar a irrenunciabilidade:?',
     alternativas: ["a) são direitos indisponíveis e,portanto, não podem ser objeto de quaisquer negociações.", "b) os direitos fundamentais não se sujeitam à prescrição, isto é, veda-se ao legislador que estipule prazo para o exercício do direito de ação com vistas a preservá-los.", "c) não pode o particular renunciar aos direitos fundamentais de que é titular. Pode, todavia, optar por não exercê-los em determinadas situações (renúncia ao exercício)","d) decorrem das condições materiais e culturais de uma época. Nesse sentido equivocada a concepção do jusnaturalismo, segundo a qual são atemporais e fixos. Pelo contrário: são fruto da evolução histórica de cada povo – daí não serem os mesmos em todas as partes do mundo."],
      respostaCorreta: "c) não pode o particular renunciar aos direitos fundamentais de que é titular. Pode, todavia, optar por não exercê-los em determinadas situações (renúncia ao exercício)"
    },
    {
      pergunta: 'Sobre as caracteristicas do direitos fundamentais. <br> O que caracterizar a historicidade?',
      alternativas: [ "a) os direitos fundamentais não se sujeitam à prescrição, isto é, veda-se ao legislador que estipule prazo para o exercício do direito de ação com vistas a preservá-los.","b) são direitos indisponíveis e,portanto, não podem ser objeto de quaisquer negociações.","c) decorrem das condições materiais e culturais de uma época. Nesse sentido equivocada a concepção do jusnaturalismo, segundo a qual são atemporais e fixos. Pelo contrário: são fruto da evolução histórica de cada povo – daí não serem os mesmos em todas as partes do mundo.", "d) não pode o particular renunciar aos direitos fundamentais de que é titular. Pode, todavia, optar por não exercê-los em determinadas situações (renúncia ao exercício)"],
      respostaCorreta: "c) decorrem das condições materiais e culturais de uma época. Nesse sentido equivocada a concepção do jusnaturalismo, segundo a qual são atemporais e fixos. Pelo contrário: são fruto da evolução histórica de cada povo – daí não serem os mesmos em todas as partes do mundo."
    },{
    pergunta: 'Sobre as caracteristicas do direitos fundamentais. <br> O que caracterizar a imprescritibilidade?',
    alternativas: [ "a) os direitos fundamentais não se sujeitam à prescrição, isto é, veda-se ao legislador que estipule prazo para o exercício do direito de ação com vistas a preservá-los.","b) são direitos indisponíveis e,portanto, não podem ser objeto de quaisquer negociações.","c) decorrem das condições materiais e culturais de uma época. Nesse sentido equivocada a concepção do jusnaturalismo, segundo a qual são atemporais e fixos. Pelo contrário: são fruto da evolução histórica de cada povo – daí não serem os mesmos em todas as partes do mundo.", "d) não pode o particular renunciar aos direitos fundamentais de que é titular. Pode, todavia, optar por não exercê-los em determinadas situações (renúncia ao exercício)"],
    respostaCorreta: "a) os direitos fundamentais não se sujeitam à prescrição, isto é, veda-se ao legislador que estipule prazo para o exercício do direito de ação com vistas a preservá-los."
    
    },
    {
      pergunta: 'A opinião de Carlos Santiago Niño, no livro Ethics of Human Rights sobre direitos humanos é " A expressão direitos humanos representa, em sentido amplo, o conjunto das atividades realizadas de maneira consciente, com o objetivo de assegurar ao homem a dignidade e evitar que passe por sofrimentos."',
      alternativas: [ "a) verdadeiro.", "b) Falso."],
      respostaCorreta: "a) verdadeiro."
    }
  ];
  let indexPerguntaAtual = 0;
  const temporizador = 60; 
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
  }}

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
      player.src = 'imagem/zorodano.gif';
      

    } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
      vida1 -= 20;
      sujeito.src = 'imagem/SUJEITODANO.gif';
      player.src = 'imagem/zoroATAQUE.gif';
      
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