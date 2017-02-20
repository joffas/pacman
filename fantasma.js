
class Fantasma extends Ator {
	
	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.tempoImagem = 0;
		this.tempoOlhos = 0;
		this.left = 50;
		this.top = 50;
	}	
	
	get tempoImagem(){
		return this._tempoImagem;
	}
			
	set tempoImagem(value){
		this._tempoImagem = value;
	}	
	
	get tempoOlhos(){
		return this._tempoOlhos;
	}
			
	set tempoOlhos(value){
		this._tempoOlhos = value;
	}
	

	paint(){
		super.paint;
		
			
		if (this.tempoOlhos<=25) {
			this.tempoOlhos ++;	 
								  
			//Pinta a boca aberta
				  
			if ((this.paraDireita)||
				(this.paraEsquerda)){
				for (var i=0; i<=25; i++){  
					this.canvas.moveTo(this.left, this.top);
					if (this.paraDireita){ 
						this.tempoImagem = 0;
						this.canvas.drawImage(this.sprite,
							//corte boca aberta - Azul
							254,0,32,32,			
							//onde ele esta agora
							this.left, this.top,
							//tamanho do personagem
							32,32
						);
				  
					} 
					else if (this.paraEsquerda) { 
						this.tempoImagem = 64;						
						this.canvas.drawImage(this.sprite,
							//corte boca aberta - Azul
							254,64,32,32,			
							//onde ele esta agora
							this.left, this.top,
							//tamanho do personagem
							32,32
						);

					} 			  
				}
			} else if ((this.paraBaixo)||(this.paraCima)){
				for (var i=0; i<=25; i++) {  
					this.canvas.moveTo(this.left, this.top);
					if (this.paraBaixo){ 
						this.tempoImagem = 32;
						this.canvas.drawImage(this.sprite,
							//corte boca aberta - Azul
							254,32,32,32,			
							//onde ele esta agora
							this.left, this.top,
							//tamanho do personagem
							32,32
						);
								  
					} 
					else if (this.paraCima) { 
						this.tempoImagem = 96;
						this.canvas.drawImage(this.sprite,
							//corte boca aberta - Azul
							254,96,32,32,			
							//onde ele esta agora
							this.left, this.top,
							//tamanho do personagem
							32,32
						);
							
					} 			  
				}
			} else{  
				this.canvas.drawImage(this.sprite,
					//corte boca aberta - Azul
					286,this.tempoImagem,32,32,			
					//onde ele esta agora
					this.left, this.top,
					//tamanho do personagem
					32,32
				);
			}
		} else {
			this.tempoOlhos ++;	 
				
			this.canvas.drawImage(this.sprite,
				//corte boca aberta - Azul
				254,this.tempoImagem,32,32,			
				//onde ele esta agora
				this.left, this.top,
				//tamanho do personagem
				32,32
			);
			if (this.tempoOlhos>=60) {
				this.tempoOlhos = 0;
					
			}
		}	
	}
}