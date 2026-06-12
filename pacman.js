
class Pacman extends Ator {

    constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tempoBoca = 0;
		this.left = 132;
		this.top = 350;
		this.somMorreu = new Audio('pacman_death.wav');
		this.morreu = false;
		this.tempoBoca = 0;
		this.controlaBoca = 0;
		this.velocidade = 1.2;
		this.tempoOlhos = 0;
		this.imagem = 318;
		this._direcaoDesejada = 0;
    }

	// Buffer separado: keyDown seta direcao (imediato, via Ator) + direcaoDesejada (buffer).
	// tentarVirar() aplica direcaoDesejada quando o corredor estiver livre.
	set direcaoDesejada(tecla) {
		if      (tecla == 39) this._direcaoDesejada = _DIREITA;
		else if (tecla == 37) this._direcaoDesejada = _ESQUERDA;
		else if (tecla == 38) this._direcaoDesejada = _CIMA;
		else if (tecla == 40) this._direcaoDesejada = _BAIXO;
	}

	get direcaoDesejada() {
		return this._direcaoDesejada;
	}

	get controlaBoca(){
		return this._controlaBoca;
	}
			
	set controlaBoca(value){
		this._controlaBoca = value;
	}	
	
	get tempoBoca(){
		return this._tempoBoca;
	}
			
	set tempoBoca(value){
		this._tempoBoca = value;
	}
	
		
	get morreu(){
		return this._morreu;
	}
	
		
	set morreu(value){
		this._morreu = value;
		if (this._morreu)
			this.somMorreu.play();
			
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
		//Pinta a boca aberta
		var top = 0;
		switch (this.direcao) {
		case _DIREITA://direita
			top = 0; break;
		case _ESQUERDA://esquerda
			top = 64; break;
		case _CIMA://cima
			top = 96; break;
		case _BAIXO://baixo
			top = 32; break;					
		default: break;
		}
		if (this.fraco){
			top = 0;
			left = 384;
		}
		if (this.morreu){
			// Animação de morte: boca abre até o corpo desaparecer (desenhada no canvas)
			var ctx = this.canvas;
			this.morteProgresso = (this.morteProgresso || 0) + 0.015;
			var p = Math.min(this.morteProgresso, 1);
			var cx = this.left + 16, cy = this.top + 16, r = 16;
			var mouth = p * Math.PI; // meia-abertura cresce até fechar o corpo
			ctx.beginPath();
			ctx.moveTo(cx, cy);
			ctx.arc(cx, cy, r, -Math.PI / 2 + mouth, 3 * Math.PI / 2 - mouth);
			ctx.closePath();
			ctx.fillStyle = '#FFD700';
			ctx.fill();
			return; // não desenha o sprite normal
		}

		for (var i=0; i<=25; i++){
			this.canvas.moveTo(this.left, this.top);
				this.canvas.drawImage(this.sprite,
					//corte boca aberta - Azul
					//Left, Top, Width, Height
					left,top,32,32,			
					//onde ele esta agora
					this.left, this.top,
					//tamanho do personagem
					this.width,this.height
				);						
		}	
	}
}