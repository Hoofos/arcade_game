"use strict";

// ########## SUPERCLASSE <
//
const Elementos = function(x, y, h, w, s) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
    this.sprite = s;
}
//
// ########## SUPERCLASSE >


// ########## JOGO <
//
// Configurações e Status do jogo
const Game = function() {
    this.isStarted = false;     // Indica se o jogo está iniciado ou não
    this.maxVidas = 3;          // Define o número máximo de vidas
};
//
// ########## JOGO >


// ########## CORAÇÃO <
//
// Coração que fornece uma vida ao jogador e mais 150 pontos
const Heart = function() {
    Elementos.call(this, 0, 0, 80, 101, 'images/heart.png') // herda as propriedades da superclasse
};

Heart.prototype.reset = function() {
    this.x = (Math.floor((Math.random() * 5)) * 101);
    this.y = (Math.floor((Math.random() * 4)) * 83) + 80;
};

Heart.prototype.render = function() {
    if (jogo.isStarted) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//
// ########## CORAÇÃO >


// ########## INIMIGOS <
//
// Inimigos que nosso jogador deve evitar
const Enemy = function() {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    Elementos.call(this, 0, 0, 83, 101, 'images/enemy-bug.png') // herda as propriedades da superclasse

    // Posição inicial dos inimigos
    this.x = -this.width;
	this.y = ((this.height) * (Math.floor(Math.random() * 4))) + 65;

    this.speed = 1;
	this.speed = (Math.random() + 1) * this.speed * 150;
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
    this.x += this.speed * dt;

	// Verifica se um inimigo cruzou o caminho do nosso herói
	if ( (Math.abs((jogador.x + jogador.width) - (this.x + this.width)) < 80) && (Math.abs((jogador.y + jogador.height) - (this.y + this.height)) < 60) ) {
        jogador.reset();
        jogador.vidas('-');
	}

    if (this.x > ctx.canvas.width + this.width) {
		allEnemies.splice(allEnemies.indexOf(this), 1);
	}
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    if (jogo.isStarted) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
//
// ########## INIMIGOS >


// ########## JOGADOR <
//
const Player = function() {
    Elementos.call(this, 0, 0, 76, 101, 'images/char-boy.png') // herda as propriedades da superclasse
    this.speed = 1;
    this.Yay = false;   // Define quando nosso herói chegou com sucesso até a água
};

// Marca os pontos do nosso herói
Player.prototype.pontos = (() => {
    let pontos = 0;
    return (qtdPontos) => { 
        pontos = (qtdPontos === 0) ? pontos = 0 : pontos += qtdPontos;
        divPontos.innerHTML = pontos;

        if (pontos >= 3000) { // Objetivo !!! Fim do jogo...
            jogo.isStarted = false; // Para o jogo
            divIniciar.innerHTML = "* APERTE ENTER PARA INICIAR *";
            showMessage('win', '* THE END DNE EHT *');
            resetAll();
        }
    }
})();

// Registra as vidas do nosso herói
Player.prototype.vidas = (() => {
    let vidas = 0;
    return (opVida) => { // opVida = [#, +, -]
        vidas = (opVida === '#') ? vidas = jogo.maxVidas : (opVida === '-') ? vidas -= 1 : (vidas === jogo.maxVidas) ? jogo.maxVidas : vidas += 1;

        imgVidas.src = `images/${vidas}_vidas.png`;
        
        if (vidas === 0) gameOver();
    }
})();

Player.prototype.reset = function() {	
	this.x = 202;   //segunda coluna
    this.y = 405;   //sexta linha
    this.Yay = false;    //começamos uma nova tentativa para chegar na água
};

Player.prototype.update = function() {
    if ((this.y == -10) && (!this.Yay)) { // Herói conseguiu chegar na água
        this.Yay = true;
        heart.reset(); // Desenhamos um novo coração
        window.setTimeout(() => { this.pontos(100); this.reset(); }, 300);
    }

    // Verifica se nosso Herói conseguiu pegar o coração
    if ( (Math.abs((this.x + this.width) - (heart.x + heart.width)) < 90) && (Math.abs((this.y + this.height) - (heart.y + heart.height)) < 50) ) {
        heart.x = -101; // Posicionamos o coração fora do Canvas até a próxima rodada
        heart.y = 0;
        this.vidas('+');
        this.pontos(150);
    }
}

Player.prototype.render = function() {
    if (jogo.isStarted) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(comando) {
    
    let novaPosicao = null; // Posição para a qual o jogador irá se mover
    const yMov = 83;        // Tamanho do movimento no eixo y
    const xMov = 101;       // Tamanho do movimento no eixo x

    if(!jogo.isStarted && comando === 'enter') {
        jogo.isStarted = true;
        showMessage();
        divIniciar.innerHTML = "";
        resetAll();
    }
    else {

        switch(comando) {
            case 'up':
                novaPosicao = this.y - yMov;
    
                if(novaPosicao > -this.height) {
                    this.y = novaPosicao;
                    this.update();
                }
    
                break;
            case 'down':
                novaPosicao = this.y + yMov;
    
                if(novaPosicao < ctx.canvas.height - 2 * this.height) {
                    this.y = novaPosicao;
                    this.update();
                }
    
                break;
            case 'left':
                novaPosicao = this.x - xMov;
    
                if(novaPosicao > -this.width) {
                    this.x = novaPosicao;
                    this.update();
                }
    
                break;
            case 'right':
                novaPosicao = this.x + xMov;
    
                if(novaPosicao <= ctx.canvas.width - this.width) {
                    this.x = novaPosicao;
                    this.update();
                }
    
                break;
        }
    }
};
//
// ########## JOGADOR >

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
const jogo = new Game;
const jogador = new Player;
jogador.vidas('#');
const allEnemies = [];
const heart = new Heart(0, 0);
heart.reset();

// Cria os inimigos com intervalo de 1 segundo entre eles
window.setInterval(() => { if(allEnemies.length < 6) allEnemies.push(new Enemy); }, 1000);

// Reinicia 
function resetAll() {
    jogador.pontos(0);
    jogador.vidas('#');
    jogador.reset();
}

function gameOver() {
    jogo.isStarted = false; // Para o jogo

    showMessage('gameover', '* GAME OVER *');

    divIniciar.innerHTML = "* APERTE ENTER PARA INICIAR *";
}

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    jogador.handleInput(allowedKeys[e.keyCode]);
});
