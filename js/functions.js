let engine = {
    "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'gray', 'black'],
    "hexadecimais": {
        'green': '#02ef00',
        'purple': '#790093',
        'pink': '#f02a7e',
        'red': '#e90808',
        'yellow': '#e7d703',
        'orange': '#f16529',
        'gray': '#ebebeb',
        'black': '#141414',
    },
    "moedas": 0
};

const audioMoeda = new Audio('./audio/moeda.mp3');
const audioErro = new Audio('./audio/errou.mp3');

function sortearCor() {
    let indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    let legendaCorDaCaixa = document.getElementById('cor_caixa');
    let nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}
// sortearCor();

function aplicarCorNaCaixa(nomeDaCor) {
    let caixaDasCores = document.getElementById('cor_atual');
    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('./img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}
aplicarCorNaCaixa(sortearCor());

function atualizaPontuacao(valor) {
    let pontuacao = document.getElementById('pontuacao_atual');

    engine.moedas += valor;
    if (valor < 0) {
        audioErro.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

// API DE RECONHECIMENTO DE VOZ
let btnGravador = document.getElementById("btn_responder");
let transcricaoAudio = "";
let respostaCorreta = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    let SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    let gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function() {
        btnGravador.innerText = "Estou Ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function() {
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor_caixa').innerText.toUpperCase();
        if (transcricaoAudio === respostaCorreta) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);
        }
        aplicarCorNaCaixa(sortearCor());

    }
    btnGravador.addEventListener('click', () => {
        gravador.start();
    })

} else {
    alert('não tem suporte');
}