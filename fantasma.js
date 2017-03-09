class Fantasma extends Ator {
	
	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.tempoOlhos = 0;
		this.left = 50;
		this.top = 50;
		this.imagem = 254;
		this.imagemOld = 0;		
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
		if (!this.morreu)

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