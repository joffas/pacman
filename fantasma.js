class Fantasma extends Ator {

	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.tempoOlhos = 0;
		this.left = 50;
		this.top = 50;
		this.imagem = 254;
		this.perfil = 'cacador';   // cacador | emboscar | timido
		this.tempoSaida = 0;       // frames até sair da casa
		this.preso = false;        // segurado na casa até liberar
		this.saindo = false;       // saída roteirizada: sobe até o corredor
		this.piscando = false;     // pisca quando a vitamina vai acabar
	}

	reverso(d) {
		if (d === _DIREITA)  return _ESQUERDA;
		if (d === _ESQUERDA) return _DIREITA;
		if (d === _CIMA)     return _BAIXO;
		if (d === _BAIXO)    return _CIMA;
		return 0;
	}

	// Alvo de perseguição conforme a personalidade do fantasma
	alvoMira(pacman) {
		if (this.perfil === 'emboscar') {
			// mira ~4 células à frente do Pacman (emboscada estilo Pinky)
			var off = 64, ax = pacman.left, ay = pacman.top;
			if      (pacman.direcao === _DIREITA)  ax += off;
			else if (pacman.direcao === _ESQUERDA) ax -= off;
			else if (pacman.direcao === _CIMA)     ay -= off;
			else if (pacman.direcao === _BAIXO)    ay += off;
			return { x: ax, y: ay };
		}
		if (this.perfil === 'timido') {
			// persegue de longe, mas foge para o canto quando chega perto (estilo Clyde)
			var dist = Math.hypot(pacman.left - this.left, pacman.top - this.top);
			if (dist < 130) return { x: this.__left, y: this.__top };
		}
		return { x: pacman.left, y: pacman.top };
	}

	direcaoAproxima(d, alvoX, alvoY) {
		var dx = alvoX - this.left, dy = alvoY - this.top;
		if (d === _DIREITA)  return dx > 0;
		if (d === _ESQUERDA) return dx < 0;
		if (d === _BAIXO)    return dy > 0;
		if (d === _CIMA)     return dy < 0;
		return false;
	}

	// Ao bater na parede escolhe nova direção: evita inverter e tende ao alvo.
	// Usa pesos (não escolha fixa) para nunca travar oscilando no mesmo ponto.
	escolherDirecao(pacman) {
		var fugir = this.fraco; // vulnerável: foge do Pacman
		var alvo  = fugir ? { x: pacman.left, y: pacman.top } : this.alvoMira(pacman);
		var rev   = this.reverso(this._direcao);
		var cands = [_DIREITA, _ESQUERDA, _CIMA, _BAIXO];
		var pesos = [], total = 0;
		for (var k = 0; k < cands.length; k++) {
			var d = cands[k], peso;
			if (d === rev) {
				peso = 0.05; // raramente volta pelo caminho de onde veio
			} else {
				var aproxima = this.direcaoAproxima(d, alvo.x, alvo.y);
				if (fugir) peso = aproxima ? 0.25 : 1.0; // foge: prefere se afastar
				else       peso = aproxima ? 1.0  : 0.25; // caça: prefere se aproximar
			}
			pesos.push(peso); total += peso;
		}
		var r = Math.random() * total;
		for (var k = 0; k < cands.length; k++) {
			r -= pesos[k];
			if (r <= 0) { this._direcao = cands[k]; return; }
		}
	}

	aoColidirBloco(bloco, pacman) {
		var dir = this.colidiu(bloco);
		if (dir) this.escolherDirecao(pacman);
	}

	updatePosicaoXY() {
		if (this.preso) return; // ainda na casa, aguardando liberação

		if (this.saindo) {
			// Saída roteirizada: sobe alinhado ao spawn até o corredor acima
			// da casa (y=184), ignorando colisões; depois a IA assume
			this.left = this.__left;
			this.top -= this.velocidade;
			if (this.top <= 184) {
				this.top = 184;
				this.saindo = false;
				this._direcao = Math.random() < 0.5 ? _ESQUERDA : _DIREITA;
			}
			return;
		}

		if (!this.morreu) {
			super.updatePosicaoXY();
			return;
		}
		// Morto: volta em linha reta ao spawn (velocidade dobrada) e renasce ao chegar
		var speed = this.velocidade * 2;
		var dx = this.__left - this.left;
		var dy = this.__top  - this.top;
		if (Math.abs(dx) < speed && Math.abs(dy) < speed) {
			this.left   = this.__left;
			this.top    = this.__top;
			this.morreu = false;
			this.fraco  = false;
			this.saindo = true; // renasceu dentro da casa: sai roteirizado
		} else {
			if      (dx > 0) this.left += speed;
			else if (dx < 0) this.left -= speed;
			if      (dy > 0) this.top  += speed;
			else if (dy < 0) this.top  -= speed;
		}
	}

	paint(){
		super.paint;

		if (this.tempoOlhos<=25) {
			var left = this.imagem;
			this.tempoOlhos ++;
		} else {
			this.tempoOlhos ++;
			var left = this.imagem+32;
			if (this.tempoOlhos>=60) this.tempoOlhos = 0;
		}
		var top = 0;
		switch (this.direcao) {
		case _DIREITA:  top = 0;  break;
		case _ESQUERDA: top = 64; break;
		case _CIMA:     top = 96; break;
		case _BAIXO:    top = 32; break;
		default: break;
		}
		if (this.fraco){
			top = 0;
			left = 384;
			// pisca azul/branco nos últimos instantes da vitamina
			if (this.piscando && Math.floor(this.tempoOlhos / 8) % 2 === 0)
				left = 416;
		}
		if (this.morreu){
			left = 448; // olhos apontando na direção do movimento
		}

		for (var i=0; i<=25; i++){
			this.canvas.moveTo(this.left, this.top);
				this.canvas.drawImage(this.sprite,
					left,top,32,32,
					this.left, this.top,
					this.width,this.height
				);
		}
	}
}
