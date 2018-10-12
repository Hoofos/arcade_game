// ########## CORAÇÃO <
//
// Coração que fornece uma vida ao jogador e mais 150 pontos
const Heart = function(x, y) {
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 101;

    this.sprite = 'images/heart.png';
};

Heart.prototype.reset = function() {
    this.x = (Math.floor((Math.random() * 5)) * 101);
    this.y = (Math.floor((Math.random() * 4)) * 83) + 80;
};

Heart.prototype.render = function() {
    if (isStarted) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    this.sprite = 'images/enemy-bug.png';
    this.height = 83;
    this.width = 101;

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
    if (isStarted) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
//
// ########## INIMIGOS >


// ########## JOGADOR <
//
const Player = function() {
	this.sprite = 'images/char-boy.png';
	this.height = 76;
    this.width = 101;
	this.reset();
    this.speed = 1;
};

// Marca os pontos do nosso herói
Player.prototype.pontos = (() => {
    let pontos = 0;
    return (qtdPontos) => { 
        pontos = (qtdPontos === 0) ? pontos = 0 : pontos += qtdPontos;
        divPontos.innerHTML = pontos;

        if (pontos >= 3000) { // Objetivo !!! Fim do jogo...
            isStarted = false; // Para o jogo
            divIniciar.innerHTML = "* APERTE ENTER PARA INICIAR *";
            showMessage('win', '* THE END DNE EHT *');
            resetAll();
        }
    }
})();

// Registra as vidas do nosso herói
Player.prototype.vidas = (() => {
    let vidas = maxVidas;
    return (opVida) => { // opVida = [#, +, -]
        vidas = (opVida === '#') ? vidas = maxVidas : (opVida === '-') ? vidas -= 1 : (vidas === maxVidas) ? maxVidas : vidas += 1;
        
        imgVidas.src = `images/${vidas}_vidas.png`;
        
        if (vidas === 0) gameOver();
    }
})();

Player.prototype.reset = function() {	
	this.x = 202;   //segunda coluna
    this.y = 405;   //sexta linha
    Yay = false;    //começamos uma nova tentativa para chegar na água
};

Player.prototype.update = function() {
    if ((this.y == -10) && (!Yay)) { // Herói conseguiu chegar na água
        Yay = true;
        heart.reset(); // Desenhamos um novo coração
        window.setTimeout(() => { this.pontos(100); this.reset(); }, 300);
    }

    // Verifica se nosso Herói conseguiu pegar o coração
    if ( (Math.abs((this.x + this.width) - (heart.x + heart.width)) < 90) && (Math.abs((this.y + this.height) - (heart.y + heart.height)) < 50) ) {
        heart.x = -101; // Posicionamos o coração fora do Canvas até a próxima rodada
        heart.y = 0;
        jogador.vidas('+');
        jogador.pontos(150);
    }
}

Player.prototype.render = function() {
    if (isStarted) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(comando) {
    
    let novaPosicao = null; // Posição para a qual o jogador irá se mover
    const yMov = 83;        // Tamanho do movimento no eixo y
    const xMov = 101;       // Tamanho do movimento no eixo x

    if(!isStarted && comando === 'enter') {
        isStarted = true;
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

const jogador = new Player;
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
    isStarted = false; // Para o jogo

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
