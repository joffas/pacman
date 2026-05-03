class Fantasma extends Ator {

	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.tempoOlhos = 0;
		this.left = 50;
		this.top = 50;
		this.imagem = 254;
	}

	// Quando morreu: navega em linha reta de volta ao spawn e renasce ao chegar
	updatePosicaoXY() {
		if (!this.morreu) {
			super.updatePosicaoXY();
			return;
		}
		var speed = this.velocidade * 2;
		var dx = this.__left - this.left;
		var dy = this.__top  - this.top;
		if (Math.abs(dx) < speed && Math.abs(dy) < speed) {
			this.left   = this.__left;
			this.top    = this.__top;
			this.morreu = false;
			this.fraco  = false;
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
				if (this.tempoOlhos>=60) {
					this.tempoOlhos = 0;
			}
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
		}
		if (this.morreu){
			// olhos apontam na direção do movimento; left=448 = sprite de olhos no sheet
			left = 448;
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