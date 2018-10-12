const divMensagem = document.getElementById("divMensagem");

function showMessage(opMessage = '', titulo = '', width = 300) {

    const divFundo = document.getElementById("divFundoPreto");

    let visibility = 'visible';

    switch(opMessage) {
        case '':
            message = '';
            visibility = 'hidden';

            break;
        
        case  'help':
            message = `<h2>1.O JOGO</h2>
            <p>O jogo se baseia no clássico Frogger, onde o jogador deveria levar 
            um sapo com segurança para o outro lado de uma movimentada estrada.</p>
            
            <p>Nesta versão, bem mais simples, após uma guerra nuclear o mundo 
            foi dominado por baratas gigantes. Nosso hominídio resiste heroicamente, 
            tentando chegar a uma das últimas fontes de água do planeta.</p>
            
            <h2>2.COMO JOGAR</h2>
            
            <p>Depois de carregar o jogo, aperte ENTER para colocar nosso herói em 
            cena. Inicialmente ele se encontra em uma área a salvo das baratas gigates, 
            em um gramado radioativo ao qual as baratas são alérgicas.</p>
            
            <p>Infelizmente, nosso herói está morrendo de sede e a 10 dias sem 
            tomar banho. Para resolver ambos os problemas, ele precisa chegar até a 
            água do outro lado de uma região cheia de baratas.</p>
            
            <p>Nosso fedido herói não tem medo das baratas, mas bem que deveria. 
            Ao encostar em uma barata, ele fica fraco e, para se salvar, retorna 
            ao refúgio do gramado anti-barata. Um encontro baratístico não mata 
            o fedido herói, mas três desastrosos esbarrões infelizmente terminam 
            com sua vida de vez.</p>
            
            <p>Mas calma, nem tudo está perdido no radioativo mundo das baratas 
            gigantes. Em meio as baratas podem ser encontrados corações gigantes 
            que renovam uma vida ao nosso herói. Porém, ele não é o Mumm Rá, então 
            nem adianta tentar acumular mais do que 3 vidas.</p>
            
            <p>No mais, nosso herói é um ser muito esportista, então ele gosta de 
            ficar contando pontos. Desta forma, a cada travessia bem sucedida, são 
            computados 100 pontos. Fora isso, a cada coração resgatado, são 
            computados mais 150 pontos.</p>
            
            <p>Por fim, já que tudo que começa precisa terminar, a cabeça do nosso 
            herói não consegue contar além de 3000, quando ele fica zureta e cai pro 
            lado para dormir. Neste caso, é melhor encerrar o jogo !</p>
            
            <h2>3.RESUMO</h2>
            
            <ul>
                <li>Aperte ENTER para iniciar o jogo.</li>
                <li>O jogador inicia com 3 vidas e com 0 pontos.</li>
                <li>Use as setas do teclado para guiar o jogador.</li>
                <li>Evite as baratas, recolha os corações e leve o jogador até a água.</li>
                <li>Ao chegar na água o jogador ganha 100 pontos e uma nova rodada se inicia.</li>
                <li>Ao coletar um coração, uma vida é restaurada e o jogador ganha 150 pontos.</li>
                <li>A coleta de corações sempre resulterá em pontos, mas nunca fará com que o jogador tenha mais do que 3 vidas.</li>
                <li>Ao chegar em 3000 pontos, o jogo finaliza.</li>
            </ul>`;

            break;

        case 'win':
            message = `VOCÊ VENCEU !!! GAME OVER !!!
                       <br><br>
                       WEEEEEEEEE... 
                       <br><br>
                       ... ACABOU...É ISSO...THE END !`;

            break;

        case 'gameover':
            message = `Era uma vez o nosso herói... =0(
                      <br><br>
                      Vamos tentar mais uma vez ? =0)`;

            break;

        default:
            message = '';
            visibility = 'hidden';
    }

    if (message === '') {
        divMensagem.innerHTML = '';
    }
    else {
        divMensagem.innerHTML = `<div id='divFechar'><a href="javascript:showMessage();">Fechar X</a></div>
                                 <h1>${titulo}</h1>
                                 <br>${message}`;
    }
    
    divMensagem.style.width = width + 'px';

    posicionaMensagem();
    
    divMensagem.style.visibility = visibility;
    divFundo.style.visibility = visibility;
}

function posicionaMensagem() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    posX = (width - divMensagem.offsetWidth)/2;

    if (divMensagem.offsetHeight > height) {
        posY = '40px';
        divMensagem.style.height = (height - 80) + 'px';
    }
    else {
        posY = (height - divMensagem.height)/2;
    }
    
    divMensagem.style.top = posY + 'px';
    divMensagem.style.left = posX + 'px';
}