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
        this.somIntermission = new Audio('pacman_intermission.wav');
        this.somVidaExtra = new Audio('pacman_extrapac.wav');
        this.fruta = null;
        this.pausado = false;
        this.frameRodada = 0;
        this.nivel = 1;
        this.duracaoVitamina = 700;
        this.tempoIntermissao = 0;
        this.proximaVidaExtra = 10000; // vida extra a cada 10.000 pontos
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
        // P ou Esc: pausa/despausa (só durante o jogo, não na morte)
        if ((evt.keyCode==80 || evt.keyCode==27) && this.inicio && this.pacman && !this.pacman.morreu){
            this.pausado = !this.pausado;
            if (this.pausado) this.somGame.pause();
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
        // Usa <= / >= para que borda-tocando-borda não seja colisão
        // (sem alterar o hitbox real do personagem).
        var testPos = (tl, tt) => {
            var nl = tl + (d == _DIREITA ? vel : d == _ESQUERDA ? -vel : 0);
            var nt = tt + (d == _BAIXO   ? vel : d == _CIMA     ? -vel : 0);
            var hit = this.atores.some(a => {
                if (!(a instanceof Bloco)) return false;
                return !(nl + 32 <= a.left || nl >= a.left + a.width ||
                         nt + 32 <= a.top  || nt >= a.top  + a.height);
            });
            return !hit;
        };

        // 1. Posição exata atual
        if (testPos(oldLeft, oldTop)) {
            this.pacman._direcao = d;
            return;
        }

        // 2. Snap à grade de 8px no eixo perpendicular (máx ±8px).
        // A posição é fracionária (velocidade 1.2), então offsets inteiros
        // nunca alinhavam exato com corredores de 32px — testa os múltiplos
        // de 8 mais próximos, que é onde os corredores começam.
        var base     = isVertical ? oldLeft : oldTop;
        var alinhado = Math.round(base / 8) * 8;
        for (var k = -1; k <= 1; k++) {
            var c = alinhado + k * 8;
            if (Math.abs(c - base) > 8.01) continue;
            var tl = isVertical ? c : oldLeft;
            var tt = isVertical ? oldTop : c;
            if (testPos(tl, tt)) {
                if (isVertical) this.pacman.left = tl; else this.pacman.top = tt;
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
        this.pacman.morteProgresso = 0;
        fantasmas.forEach(f => {
            f.left     = f.__left;
            f.top      = f.__top;
            f.morreu   = false;
            f.fraco    = false;
            f.piscando = false;
            f.preso    = true;
            f.saindo   = false;
        });
        this.tempoDeMorte = 0;
        this.fantasmasComidos = 0;
        this.frameRodada = 0;
        this.pausado = false;
        this.somGame.currentTime = 0;
    }

    // Marca como mortos pontos fora do canvas ou dentro de blocos visíveis.
    filtrarPontosInvalidos(){
        this.atores.forEach(ponto => {
            if (!(ponto instanceof Ponto) || ponto.morreu) return;
            var cx = ponto.left + ponto.width  / 2;
            var cy = ponto.top  + ponto.height / 2;
            // Centro fora do canvas → nunca alcançável
            if (cx < 0 || cx >= this.width || cy < 0 || cy >= this.height) {
                ponto.morreu = true;
                return;
            }
            var dentro = this.atores.some(b =>
                b instanceof Bloco && b.pintar !== false &&
                cx > b.left && cx < b.left + b.width &&
                cy > b.top  && cy < b.top  + b.height
            );
            if (dentro) ponto.morreu = true;
        });
    }

    proximaFase(){
        this.nivel++;
        this.passouFase = false;
        this.dotCount = 0;
        // ressuscita bolinhas e vitaminas; elimina de novo os que estão em paredes
        for (var x in this.atores){
            var a = this.atores[x];
            if (a instanceof Ponto || a instanceof Vitamina) a.morreu = false;
        }
        this.filtrarPontosInvalidos();
        // some com a fruta, se houver
        if (this.fruta){ this.fruta.ativa = false; this.fruta._morreu = true; }
        // fantasmas mais rápidos a cada fase; vitamina dura menos (mínimo 200)
        [this.azul, this.vermelho, this.verde, this.rosa, this.roxo]
            .forEach(f => { f.velocidade += 0.1; });
        this.duracaoVitamina = Math.max(200, 700 - (this.nivel - 1) * 100);
        // reposiciona Pacman e fantasmas
        this.reiniciarRodada();
    }

    desenharHUD(){
        var hY = this.height + 25;
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, this.height, this.width, 40);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 13px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('SCORE ' + this.score, 6, hY);
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BEST ' + this.highScore, 180, hY);
        this.ctx.fillStyle = '#00FFFF';
        this.ctx.fillText('FASE ' + this.nivel, 300, hY);
        // ícones de vida (mini-pacmans) à direita
        for (var i = 0; i < this.vidas; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.width - 80 + i * 26, hY - 5, 8, 0.25 * Math.PI, 1.75 * Math.PI);
            this.ctx.lineTo(this.width - 80 + i * 26, hY - 5);
            this.ctx.closePath();
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fill();
        }
    }

    // Escala o canvas para caber na janela mantendo a proporção
    ajustarEscala(){
        if (!this.canvas) return;
        var escala = Math.min(
            window.innerWidth  / this.canvas.width,
            window.innerHeight / this.canvas.height
        );
        this.canvas.style.transformOrigin = 'top center';
        this.canvas.style.transform = 'scale(' + escala + ')';
        this.canvas.style.display = 'block';
        this.canvas.style.margin = '0 auto';
    }

    // Controles de toque (celular): swipe move, toque curto inicia/despausa.
    // Direção avaliada no touchmove (primeiro movimento significativo) e na
    // tela inteira — flick rápido ou segundo dedo não invertem mais o gesto.
    configurarToque(){
        var self = this;
        var ini = null;
        this.canvas.style.touchAction = 'none';
        document.body.style.touchAction = 'none';
        document.body.style.overscrollBehavior = 'none';
        document.addEventListener('touchstart', function(e){
            var t = e.changedTouches[0];
            ini = { x: t.clientX, y: t.clientY, usado: false };
        }, { passive: true });
        document.addEventListener('touchmove', function(e){
            if (!ini || ini.usado) return;
            var t = e.changedTouches[0];
            var dx = t.clientX - ini.x, dy = t.clientY - ini.y;
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
            var tecla = (Math.abs(dx) > Math.abs(dy))
                ? (dx > 0 ? 39 : 37)
                : (dy > 0 ? 40 : 38);
            if (self.pacman) self.pacman.direcaoDesejada = tecla;
            ini.usado = true;
        }, { passive: true });
        document.addEventListener('touchend', function(){
            if (ini && !ini.usado){
                // toque curto: começa o jogo ou despausa
                if (!self.inicio){ self.inicio = true; self.somInicio.play(); }
                else if (self.pausado){ self.pausado = false; }
            }
            ini = null;
        }, { passive: true });
    }

    init(){
        this.canvas = document.getElementById("canvas");
        if (this.canvas.getContext) {

            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = this.width;
            this.canvas.height = this.height + 40; // +40 para HUD
            this.ajustarEscala();
            this.configurarToque();
            window.addEventListener('resize', () => this.ajustarEscala());
           
            
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


            // Personalidades e ordem de saída da casa (escalonada)
            this.vermelho.perfil = 'cacador';  this.vermelho.tempoSaida = 0;
            this.rosa.perfil     = 'emboscar'; this.rosa.tempoSaida     = 60;
            this.azul.perfil     = 'cacador';  this.azul.tempoSaida     = 120;
            this.verde.perfil    = 'timido';   this.verde.tempoSaida    = 180;
            this.roxo.perfil     = 'cacador';  this.roxo.tempoSaida     = 240;
            [this.vermelho, this.rosa, this.azul, this.verde, this.roxo]
                .forEach(f => { f.preso = true; }); // todos saem roteirizados na sua vez

            this.fruta = new Fruta('fruta', this.ctx);
            this.atores.push(this.fruta);
            this.filtrarPontosInvalidos(); // elimina pontos dentro de paredes

            this.intervalId = setInterval(this.draw, 10, this);
        }
    }

    draw(self){
        if (!self.inicio){
            self.desenharIntro();
        }

        // PAUSA: redesenha o estado atual com overlay e congela
        if (self.inicio && self.pausado){
            self.clear();
            for (var x in self.atores) self.atores[x].paint();
            self.desenharHUD();
            self.ctx.fillStyle = 'rgba(0,0,0,0.6)';
            self.ctx.fillRect(0, 0, self.width, self.height);
            self.ctx.fillStyle = '#FFD700';
            self.ctx.font = 'bold 44px Arial';
            self.ctx.textAlign = 'center';
            self.ctx.fillText('PAUSADO', self.width / 2, self.height / 2);
            self.ctx.fillStyle = '#888';
            self.ctx.font = '16px Arial';
            self.ctx.fillText('P para continuar', self.width / 2, self.height / 2 + 36);
            return;
        }

        // INTERMISSÃO entre fases: animação e avança ao próximo nível
        if (self.inicio && self.passouFase){
            self.tempoIntermissao++;
            var f   = self.tempoIntermissao;
            var ctx = self.ctx;
            var W   = self.width, H = self.height + 40;

            // fundo escurecendo da cor da fase para preto
            var fade = Math.min(f / 30, 1);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, W, H);

            // estrelas de fundo animadas (reusa as da intro)
            if (!self._introStars) {
                self._introStars = [];
                for (var s = 0; s < 35; s++)
                    self._introStars.push({ x: Math.random()*W, y: Math.random()*H,
                        r: Math.random()*2+1, phase: Math.random()*Math.PI*2 });
            }
            for (var s = 0; s < self._introStars.length; s++) {
                var st = self._introStars[s];
                var a  = (0.15 + 0.2*Math.sin(f*0.05+st.phase)) * fade;
                ctx.beginPath();
                ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(255,210,0,'+a+')';
                ctx.fill();
            }

            // título quicando "FASE N COMPLETA!"
            var entrar = Math.min(f / 18, 1);
            var bounce = Math.sin(f * 0.12) * (f < 40 ? 0 : 6) * entrar;
            ctx.save();
            ctx.translate(W/2, H/2 - 60 + (1-entrar)*120);
            ctx.scale(entrar, entrar);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 44px Arial';
            ctx.shadowColor = '#FF8800';
            ctx.shadowBlur = 18;
            ctx.fillText('FASE ' + self.nivel + ' COMPLETA!', 0, bounce);
            ctx.restore();

            // pontuação aparece depois de 20 frames
            if (f > 20) {
                var ap = Math.min((f-20)/15, 1);
                ctx.globalAlpha = ap;
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 26px Arial';
                ctx.shadowColor = 'transparent';
                ctx.fillText('SCORE: ' + self.score, W/2, H/2 + 20);
                ctx.globalAlpha = 1;
            }

            // barra de progresso para próxima fase
            if (f > 40) {
                var prog = Math.min((f - 40) / 140, 1);
                var bx = W/2 - 120, bw = 240, by = H/2 + 65, bh = 14;
                ctx.fillStyle = '#222';
                ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 7); ctx.fill();
                ctx.fillStyle = '#00FFFF';
                ctx.beginPath(); ctx.roundRect(bx, by, bw*prog, bh, 7); ctx.fill();
                ctx.fillStyle = '#aaa';
                ctx.font = '13px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('FASE ' + (self.nivel+1) + '...', W/2, by + bh + 18);
            }

            // fogos: partículas simples
            if (!self._particulas) self._particulas = [];
            if (f === 1 || f === 25 || f === 50) {
                var cores = ['#FFD700','#FF4444','#00FFFF','#FF88FF','#88FF88'];
                for (var p = 0; p < 30; p++) {
                    var ang = Math.random()*Math.PI*2;
                    var spd = Math.random()*4+1;
                    self._particulas.push({
                        x: W/2 + (Math.random()-0.5)*80,
                        y: H/2 - 60,
                        vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd - 2,
                        cor: cores[Math.floor(Math.random()*cores.length)],
                        vida: 40 + Math.random()*40
                    });
                }
            }
            self._particulas = self._particulas.filter(p => {
                p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.vida--;
                if (p.vida <= 0) return false;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
                ctx.fillStyle = p.cor;
                ctx.globalAlpha = p.vida/60;
                ctx.fill();
                ctx.globalAlpha = 1;
                return true;
            });

            if (f > 180){
                self._particulas = [];
                self.proximaFase();
            }
            return;
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

           // Saída escalonada da casa + aviso de piscar no fim da vitamina
           self.frameRodada++;
           var fants = [self.azul, self.vermelho, self.verde, self.rosa, self.roxo];
           var piscar = self.pacman.vitaminado > 0 && self.pacman.vitaminado < 200;
           fants.forEach(f => {
               if (f.preso && self.frameRodada >= f.tempoSaida) {
                   f.preso  = false;
                   f.saindo = true; // sobe roteirizado até o corredor
               }
               f.piscando = piscar;
           });

           // Countdown vitaminado: uma vez por frame (não por ator)
           if (self.pacman.vitaminado > 0) {
               self.pacman.vitaminado--;
           } else {
               for (var x in self.atores) {
                   if (self.atores[x] instanceof Fantasma)
                       self.atores[x].fraco = false;
               }
           }

        // Verifica vitória antes do loop de atores (uma vez por frame)
        if (!self.passouFase) {
            var pontosVivos = 0;
            for (var x in self.atores)
                if (self.atores[x] instanceof Ponto && !self.atores[x].morreu) pontosVivos++;
            if (pontosVivos === 0) {
                self.passouFase = true;
                self.tempoIntermissao = 0;
                if (self.score > self.highScore) {
                    self.highScore = self.score;
                    localStorage.setItem('pacman_highscore', self.highScore);
                }
                self.somGame.pause();
                self.somIntermission.play();
                return;
            }
        }

        for (var i in self.atores){
            if (self.atores[i] instanceof Vitamina){
                if (self.atores[i].dead(self.pacman)){
                    self.score += 50;
                    self.pacman.vitaminado = self.duracaoVitamina;
                    self.fantasmasComidos = 0;
                    for (var x in self.atores){
                        if (self.atores[x] instanceof Fantasma)
                            self.atores[x].fraco = true;
                    }
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

            if (self.atores[i] instanceof Fantasma && !self.atores[i].morreu){
                (self.pacman.dead(self.atores[i]))
            }           
            else
                if (self.atores[i] instanceof Bloco){
                    self.pacman.colidiu(self.atores[i]);
                    [self.azul, self.vermelho, self.verde, self.rosa, self.roxo].forEach(f => {
                        if (!f.preso && !f.morreu && !f.saindo)
                            f.aoColidirBloco(self.atores[i], self.pacman);
                    });
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
        // Vida extra ao atingir cada marco de pontuação
        if (self.score >= self.proximaVidaExtra){
            self.vidas++;
            self.somVidaExtra.play();
            self.proximaVidaExtra += 10000;
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