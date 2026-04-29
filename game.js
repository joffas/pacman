class Game {

    constructor(name){
        this.name = name;
        this.atores = null;
        this.width  = 580;
        this.height = 600;
        this.pacman = null;
        this.azul = null;
        this.vermelho = null;
        this.Mapa = null;
        this.somInicio = new Audio('pacman_beginning.wav');
        this.somGame = new Audio('siren.wav');
        this.passouFase = false;
        this.somFantasmaDead = new Audio('pacman_eatghost.wav');
        this.somDot1 = new Audio('dot.wav');
        this.somDot2 = new Audio('dot1.wav');
        this.somDot3 = new Audio('dot2.wav');
        this.inicio = false;
        this.atores = new Array();
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('pacman_highscore') || '0');
        this.vidas = 3;
        this.tempoDeMorte = 0;
        this.fantasmasComidos = 0;
        this.pcs = 0;
        this.dotCount = 0;
        this.introFrame = 0;
        this.somFruta = new Audio('pacman_eatfruit.wav');
        this.fruta = null;
    }

	set pacman(value){
		this._pacman = value;
	}
	
	get pacman(){
		return this._pacman;
	}

    keyDown(evt){
        if (evt.keyCode==13){
            this.inicio = true;
            this.somInicio.play();
        }
        if (this.pacman) {
            this.pacman.direcao = evt.keyCode;           // aplica imediato (Ator)
            this.pacman.direcaoDesejada = evt.keyCode;   // salva no buffer
        }
    }

    keyUp(evt){
        this.pacman.direcao = evt.keyCode;//,false);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    desenharFantasmaIntro(x, y, color) {
        var ctx = this.ctx;
        var r = 15;
        ctx.beginPath();
        ctx.arc(x, y - r / 2, r, Math.PI, 0);
        ctx.lineTo(x + r, y + r / 2);
        var segs = 3, sw = (r * 2) / segs;
        for (var i = segs; i >= 0; i--)
            ctx.lineTo(x - r + sw * i, y + r / 2 + (i % 2 === 0 ? r / 2 : 0));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath(); ctx.arc(x - 5, y - r / 2 - 1, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(x + 5, y - r / 2 - 1, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x - 4, y - r / 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00f'; ctx.fill();
        ctx.beginPath(); ctx.arc(x + 6, y - r / 2, 2, 0, Math.PI * 2); ctx.fill();
    }

    desenharIntro() {
        this.introFrame++;
        var f   = this.introFrame;
        var ctx = this.ctx;
        var W   = this.width;
        var H   = this.height;

        // fundo preto
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H + 40);

        // scan-lines estilo CRT
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        for (var sl = 0; sl < H; sl += 4) ctx.fillRect(0, sl, W, 2);

        // título — sombra laranja depois amarelo por cima
        ctx.font = 'bold 72px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FF4500';
        ctx.fillText('PAC-MAN', W / 2 + 4, 124);
        ctx.fillStyle = '#FFD700';
        ctx.fillText('PAC-MAN', W / 2, 120);

        // sub-título
        ctx.font = '16px monospace';
        ctx.fillStyle = '#FF69B4';
        ctx.fillText('ORIGINAL BY NAMCO  1980', W / 2, 158);

        // high score
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = '#FF0000';
        ctx.fillText('- HIGH SCORE -', W / 2, 200);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 26px monospace';
        ctx.fillText(this.highScore, W / 2, 232);

        // cena de perseguição animada
        var chaseX = ((f * 2.5) % (W + 220)) - 110;

        // pontos na linha
        for (var dx = 12; dx < W; dx += 22) {
            if (dx > chaseX + 18) {
                ctx.beginPath();
                ctx.arc(dx, 320, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#FFD700';
                ctx.fill();
            }
        }

        // pacman com boca animada
        var mouth = Math.abs(Math.sin(f * 0.18)) * 0.35;
        ctx.beginPath();
        ctx.arc(chaseX, 320, 17, mouth * Math.PI, (2 - mouth) * Math.PI);
        ctx.lineTo(chaseX, 320);
        ctx.closePath();
        ctx.fillStyle = '#FFD700';
        ctx.fill();

        // fantasmas atrás do pacman
        var cores = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];
        for (var g = 0; g < 4; g++)
            this.desenharFantasmaIntro(chaseX - 58 - g * 44, 320, cores[g]);

        // "PRESS ENTER" piscando
        if (Math.floor(f / 28) % 2 === 0) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 20px monospace';
            ctx.fillText('PRESS  ENTER  TO  START', W / 2, 440);
        }

        // dica de controles
        ctx.fillStyle = '#888';
        ctx.font = '14px monospace';
        ctx.fillText('USE ARROW KEYS TO MOVE', W / 2, 492);

        // crédito
        ctx.fillStyle = '#FFB8FF';
        ctx.font = '14px monospace';
        ctx.fillText('© JOFFAS  2016', W / 2, 545);
    }

    tentarVirar(){
        var d = this.pacman.direcaoDesejada;
        if (!d || d === this.pacman.direcao) return;

        var vel = this.pacman.velocidade;
        var oldLeft = this.pacman.left;
        var oldTop  = this.pacman.top;

        var podeVirar = (snapLeft, snapTop) => {
            this.pacman.left = snapLeft + (d == _DIREITA ? vel : d == _ESQUERDA ? -vel : 0);
            this.pacman.top  = snapTop  + (d == _BAIXO  ? vel : d == _CIMA     ? -vel : 0);
            var colisao = this.atores.some(a => a instanceof Bloco && this.pacman.detectarColisao(a));
            this.pacman.left = oldLeft;
            this.pacman.top  = oldTop;
            return !colisao;
        };

        // Tenta virar na posição atual
        if (podeVirar(oldLeft, oldTop)) {
            this.pacman._direcao = d;
            return;
        }

        // Tenta com snap ao grid de 18px (alinha ao corredor mais próximo)
        var snapLeft = Math.round(oldLeft / 18) * 18;
        var snapTop  = Math.round(oldTop  / 18) * 18;
        if ((snapLeft !== oldLeft || snapTop !== oldTop) && podeVirar(snapLeft, snapTop)) {
            this.pacman.left   = snapLeft;
            this.pacman.top    = snapTop;
            this.pacman._direcao = d;
        }
    }

    reiniciarRodada(){
        var fantasmas = [this.azul, this.vermelho, this.verde, this.rosa, this.roxo];
        this.pacman._morreu = false;
        this.pacman.left = this.pacman.__left;
        this.pacman.top  = this.pacman.__top;
        this.pacman._direcao = 0;
        this.pacman._direcaoDesejada = 0;
        this.pacman.vitaminado = 0;
        this.pacman.imagem = 318;
        fantasmas.forEach(f => {
            f.left = f.__left;
            f.top  = f.__top;
            f._morreu = false;
            f.fraco = false;
        });
        this.tempoDeMorte = 0;
        this.fantasmasComidos = 0;
        this.somGame.currentTime = 0;
    }

    desenharHUD(){
        var hY = 620;
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 600, this.width, 40);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('SCORE  ' + this.score, 10, hY);
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BEST  ' + this.highScore, 290, hY);
        for (var i = 0; i < this.vidas; i++) {
            this.ctx.beginPath();
            this.ctx.arc(430 + i * 28, hY - 6, 9, 0.25 * Math.PI, 1.75 * Math.PI);
            this.ctx.lineTo(430 + i * 28, hY - 6);
            this.ctx.closePath();
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fill();
        }
    }

    init(){
        this.canvas = document.getElementById("canvas");
        if (this.canvas.getContext) {

            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = this.width;
            this.canvas.height = this.height + 40; // +40 para HUD
           
            
            //this.canvas.c
            //Pacman
            this.pacman = new Pacman('pacman',this.ctx);
            //Fantasma
            this.vermelho = new Fantasma('fantasma',this.ctx);
            this.vermelho.velocidade = 0.7;            
			this.vermelho.direcao = 37;
            this.vermelho.imagem = 0; 

            this.verde = new Fantasma('fantasma',this.ctx);
            this.verde.velocidade = 0.8;            
			this.verde.direcao = 38;
            this.verde.imagem = 64;

            this.rosa = new Fantasma('fantasma',this.ctx);
            this.rosa.velocidade = 0.9;            
			this.rosa.direcao = 39;
            this.rosa.imagem = 130;

            this.roxo = new Fantasma('fantasma',this.ctx);
            this.roxo.velocidade = 1.0;            
			this.roxo.direcao = 40;
            this.roxo.imagem = 254;

            this.azul = new Fantasma('fantasma',this.ctx);
            this.azul.velocidade = 1.1;            
			this.azul.direcao = 40;
            this.azul.imagem = 190;

            //Adicionando ao array controlador
            this.atores = new Array();
            this.atores.push(this.pacman);
            this.mapa = new Mapa(this.ctx, this);
			this.atores.push(this.azul);
            this.atores.push(this.vermelho);
            this.atores.push(this.verde);
            this.atores.push(this.rosa);
            this.atores.push(this.roxo);


            this.fruta = new Fruta('fruta', this.ctx);
            this.atores.push(this.fruta);

            this.intervalId = setInterval(this.draw, 10, this);
        }
    }

    draw(self){
        if (!self.inicio){
            self.desenharIntro();
        }
        
        
       if (self.inicio && self.pacman.morreu){
            self.tempoDeMorte++;
            self.clear();
            for (var x in self.atores) {
                if (!(self.atores[x] instanceof Fantasma))
                    self.atores[x].paint();
            }
            self.pacman.paint();
            self.desenharHUD();
            if (self.tempoDeMorte > 150) {
                self.vidas--;
                if (self.vidas <= 0) {
                    if (self.score > self.highScore) {
                        self.highScore = self.score;
                        localStorage.setItem('pacman_highscore', self.highScore);
                    }
                    self.somGame.pause();
                    clearInterval(self.intervalId);
                    self.ctx.fillStyle = '#000';
                    self.ctx.fillRect(0, 0, self.width, self.height + 40);
                    self.ctx.fillStyle = 'red';
                    self.ctx.font = 'bold 48px Arial';
                    self.ctx.textAlign = 'center';
                    self.ctx.fillText('GAME OVER', self.width / 2, self.height / 2 - 20);
                    self.ctx.fillStyle = '#fff';
                    self.ctx.font = '24px Arial';
                    self.ctx.fillText('SCORE: ' + self.score, self.width / 2, self.height / 2 + 30);
                    self.ctx.fillText('BEST: ' + self.highScore, self.width / 2, self.height / 2 + 65);
                } else {
                    self.reiniciarRodada();
                }
            }
            return;
        }

	   if (self.inicio){
           self.clear();
           self.tentarVirar();

           // Countdown vitaminado: uma vez por frame (não por ator)
           if (self.pacman.vitaminado > 0) {
               self.pacman.vitaminado--;
           } else {
               for (var x in self.atores) {
                   if (self.atores[x] instanceof Fantasma)
                       self.atores[x].fraco = false;
               }
           }

        for (var i in self.atores){
            if (self.atores[i] instanceof Vitamina){
                if (self.atores[i].dead(self.pacman)){
                    self.score += 50;
                    self.pacman.vitaminado = 700;
                    self.fantasmasComidos = 0;
                    for (var x in self.atores){
                        if (self.atores[x] instanceof Fantasma)
                            self.atores[x].fraco = true;
                    }
                }
            }
            var pontosVivos = 0;
            if (self.passouFase==false){                
                for (var x in self.atores){
                    if (self.atores[x] instanceof Ponto){
                        if (!self.atores[x].morreu){
                            pontosVivos = pontosVivos + 1;
                        }
                    }
                }
                if  (pontosVivos==0){
                    self.passouFase = true;
                    alert('passou de faase uhhuuuu!!!');
                }

            }
            

            if (self.atores[i] instanceof Fruta){
                self.atores[i].tick();
                if (self.atores[i].ativa && !self.atores[i].morreu){
                    if (self.pacman.detectarColisao(self.atores[i])){
                        self.score += self.atores[i].pontos;
                        self.atores[i]._morreu = true;
                        self.atores[i].ativa = false;
                        self.somFruta.play();
                    }
                }
            }

            if (self.atores[i] instanceof Ponto){
                if (!self.atores[i].morreu){
                    if (self.atores[i].dead(self.pacman)){
                        self.score += 10;
                        self.dotCount++;
                        if (self.dotCount === 70 || self.dotCount === 170){
                            self.fruta.ativar(252, 306, 1);
                        }
                        if (self.pcs==0) {
                            self.somDot1.volume = 0.8;
                            self.pcs = 1;
                            self.somDot1.play();
                        } else if (self.pcs==1) {
                            self.somDot2.volume = 0.8;
                            self.pcs = 2;
                            self.somDot2.play();
                        } else if (self.pcs==2) {
                            self.somDot3.volume = 0.8;
                            self.pcs = 0;
                            self.somDot3.play();
                        }
                                
                    }
                }
            } 
            if (self.atores[i] instanceof Fantasma){
                if (self.atores[i].fraco){
                    if  (self.atores[i].morreu==false){
                        if (self.atores[i].dead(self.pacman)){
                            self.score += 200 * Math.pow(2, self.fantasmasComidos);
                            self.fantasmasComidos++;
                            self.somFantasmaDead.play();
                        }
                    }
                }
            }

            if (self.atores[i] instanceof Fantasma){
                (self.pacman.dead(self.atores[i]))
            }           
            else
                if (self.atores[i] instanceof Bloco){
                    self.pacman.colidiu(self.atores[i]);
                    self.azul.tomadaDeDirecao(self.azul.colidiu(self.atores[i]));
                    self.vermelho.tomadaDeDirecao(self.vermelho.colidiu(self.atores[i]));
                    self.verde.tomadaDeDirecao(self.verde.colidiu(self.atores[i]));
                    self.rosa.tomadaDeDirecao(self.rosa.colidiu(self.atores[i]));
                    self.roxo.tomadaDeDirecao(self.roxo.colidiu(self.atores[i]));
                    //this.azul.direcao = 38
                    //console.log('colidiu');
                }
            

            if (self.pacman.morreu==false){
                if ((self.somGame.currentTime==self.somGame.duration)||
                    (self.somGame.currentTime==0)){
                    self.somGame.volume = 0.5;
                    self.somGame.play();
                }
            }
                    
            self.atores[i].updatePosicaoXY();
            self.atores[i].paint();
        }
        self.desenharHUD();
        }
    }
}


var game = new Game('PacmanShow');

document.onkeydown=function(event){game.keyDown(event)};
document.onkeyup=function(event){game.keyUp(event)};

//game.initAnimationEvent

function init() {
	game.init();
}