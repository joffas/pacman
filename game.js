class Game {

    constructor(name){
        this.name = name;
        this.atores = null;
        this.width  = 512;
        this.height = 512;
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
        if (this.pacman)
            this.pacman.direcaoDesejada = evt.keyCode;
    }

    keyUp(evt){}

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

        // fundo gradiente azul-escuro
        var grad = ctx.createLinearGradient(0, 0, 0, H + 40);
        grad.addColorStop(0, '#0a0030');
        grad.addColorStop(1, '#000015');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H + 40);

        // pontos flutuantes no fundo
        if (!this._introStars) {
            this._introStars = [];
            for (var s = 0; s < 35; s++)
                this._introStars.push({
                    x: Math.random() * W, y: Math.random() * H,
                    r: Math.random() * 2.5 + 1, phase: Math.random() * Math.PI * 2
                });
        }
        for (var s = 0; s < this._introStars.length; s++) {
            var st = this._introStars[s];
            var a = 0.2 + 0.25 * Math.sin(f * 0.03 + st.phase);
            ctx.beginPath();
            ctx.arc(st.x, st.y + Math.sin(f * 0.012 + st.phase) * 6, st.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,210,0,' + a + ')';
            ctx.fill();
        }

        // título — cada letra numa cor de fantasma, quicando
        var letras = 'PACMAN'.split('');
        var cores  = ['#FF4444', '#FFB8FF', '#00FFFF', '#FFB852', '#00FF88', '#FF69B4'];
        ctx.font = 'bold 78px monospace';
        ctx.textAlign = 'left';
        var lw = 62, startX = W / 2 - (letras.length * lw) / 2;
        for (var li = 0; li < letras.length; li++) {
            var bounce = Math.sin(f * 0.06 + li * 0.9) * 8;
            ctx.fillStyle = cores[li];
            ctx.fillText(letras[li], startX + li * lw, 108 + bounce);
        }

        // "BY JOFFAS"
        ctx.textAlign = 'center';
        ctx.font = 'bold 26px monospace';
        ctx.fillStyle = '#00FFFF';
        ctx.fillText('BY  JOFFAS', W / 2, 150);

        // best score
        ctx.font = '15px monospace';
        ctx.fillStyle = '#888';
        ctx.fillText('BEST  SCORE', W / 2, 190);
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(this.highScore, W / 2, 218);

        // animação circular — pacman perseguindo fantasma
        var cx = W / 2, cy = 340, cr = 85, numDots = 18;
        var pacA = (f * 0.032) % (Math.PI * 2);
        var gstA = pacA + Math.PI * 1.15; // fantasma ~200° à frente

        // trilha circular pontilhada
        for (var d = 0; d < numDots; d++) {
            var da = (d / numDots) * Math.PI * 2;
            var rel = (da - pacA + Math.PI * 2) % (Math.PI * 2);
            if (rel > 0.25) { // ainda não comido
                ctx.beginPath();
                ctx.arc(cx + Math.cos(da) * cr, cy + Math.sin(da) * cr, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#FFD700';
                ctx.fill();
            }
        }

        // fantasma na trilha
        var gfx = cx + Math.cos(gstA) * cr;
        var gfy = cy + Math.sin(gstA) * cr;
        this.desenharFantasmaIntro(gfx, gfy, '#FF4444');

        // pacman na trilha
        var px = cx + Math.cos(pacA) * cr;
        var py = cy + Math.sin(pacA) * cr;
        var mouth = Math.abs(Math.sin(f * 0.2)) * 0.35;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pacA + Math.PI / 2);
        ctx.beginPath();
        ctx.arc(0, 0, 16, mouth * Math.PI, (2 - mouth) * Math.PI);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        ctx.restore();

        // "PRESS ENTER" pulsando (escala, não pisca)
        var pulse = 0.88 + 0.12 * Math.sin(f * 0.09);
        ctx.save();
        ctx.translate(W / 2, 468);
        ctx.scale(pulse, pulse);
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS  ENTER  TO  START', 0, 0);
        ctx.restore();

        // dica controles
        ctx.fillStyle = '#555';
        ctx.font = '13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('USE ARROW KEYS TO MOVE', W / 2, 516);
    }

    tentarVirar(){
        var d = this.pacman.direcaoDesejada;
        if (!d) return;

        var cur = this.pacman.direcao;
        if (d === cur) return;

        // Inversão de direção: sempre permite sem testar
        if ((cur == _DIREITA && d == _ESQUERDA) || (cur == _ESQUERDA && d == _DIREITA) ||
            (cur == _CIMA   && d == _BAIXO)    || (cur == _BAIXO   && d == _CIMA)) {
            this.pacman._direcao = d;
            return;
        }

        var vel        = this.pacman.velocidade;
        var oldLeft    = this.pacman.left;
        var oldTop     = this.pacman.top;
        var isVertical = (d == _CIMA || d == _BAIXO);

        // Testa se a posição (tl, tt) permite virar para d.
        // Usa hitbox 1px menor (inset) para não tratar borda-tocando como colisão.
        var testPos = (tl, tt) => {
            this.pacman.left    = tl + (d == _DIREITA ? vel : d == _ESQUERDA ? -vel : 0) + 1;
            this.pacman.top     = tt + (d == _BAIXO   ? vel : d == _CIMA     ? -vel : 0) + 1;
            this.pacman._width  = 30;
            this.pacman._height = 30;
            var hit = this.atores.some(a => a instanceof Bloco && this.pacman.detectarColisao(a));
            this.pacman._width  = 32;
            this.pacman._height = 32;
            this.pacman.left    = oldLeft;
            this.pacman.top     = oldTop;
            return !hit;
        };

        // 1. Posição exata atual
        if (testPos(oldLeft, oldTop)) {
            this.pacman._direcao = d;
            return;
        }

        // 2. Ajustes perpendiculares — cobre até metade da largura do corredor (±16 px)
        for (var off = 2; off <= 16; off += 2) {
            var tlP = isVertical ? oldLeft + off : oldLeft;
            var ttP = isVertical ? oldTop        : oldTop + off;
            if (testPos(tlP, ttP)) {
                if (isVertical) this.pacman.left = tlP; else this.pacman.top = ttP;
                this.pacman._direcao = d;
                return;
            }
            var tlN = isVertical ? oldLeft - off : oldLeft;
            var ttN = isVertical ? oldTop        : oldTop - off;
            if (testPos(tlN, ttN)) {
                if (isVertical) this.pacman.left = tlN; else this.pacman.top = ttN;
                this.pacman._direcao = d;
                return;
            }
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
        var hY = this.height + 20;
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, this.height, this.width, 40);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('SCORE  ' + this.score, 10, hY);
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BEST  ' + this.highScore, this.width / 2, hY);
        for (var i = 0; i < this.vidas; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.width - 90 + i * 28, hY - 6, 9, 0.25 * Math.PI, 1.75 * Math.PI);
            this.ctx.lineTo(this.width - 90 + i * 28, hY - 6);
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
                            self.fruta.ativar(224, 272, 1);
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