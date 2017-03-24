
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
			if (this.imagem<400)
				this.imagem = this.imagem +1;
			else
				this.imagem = 0;
			//this.tempoOlhos = 0;
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