
class Fantasma extends Ator {
	
	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.tempoImagem = 0;
		this.tempoOlhos = 0;
		this.left = 50;
		this.top = 50;
		this.imagem = 254;
		this.imagemOld = 0;
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

	get imagem(){
		return this._imagem;
	}
			
	set imagem(value){
		if ((this.fraco)&&(this.imagemOld==0))
			this.imagemOld = this._imagem;
		this._imagem = value;
	}
	

	paint(){
		super.paint;		

		if (this.tempoOlhos<=25) {
			this.tempoOlhos ++;

			if (this.fraco){
				this.imagem = 384;
				this.velocidade = 1;
				this.tempoImagem = 0;
				this.canvas.drawImage(this.sprite,
					//corte boca aberta - Azul
					this.imagem,0,32,32,			
					//onde ele esta agora
					this.left, this.top,
					//tamanho do personagem
					32,32
				);
			}else{//vivo
				if (this.imagemOld!=0)
					this.imagem = this.imagemOld;
								  
				//Pinta a boca aberta
				if ((this.paraDireita)||
					(this.paraEsquerda)){
					for (var i=0; i<=25; i++){  
						this.canvas.moveTo(this.left, this.top);
						if (this.paraDireita){ 
							this.tempoImagem = 0;
							this.canvas.drawImage(this.sprite,
								//corte boca aberta - Azul
								this.imagem,0,32,32,			
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
								this.imagem,64,32,32,			
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
								this.imagem,32,32,32,			
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
								this.imagem,96,32,32,			
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
						this.imagem+32,this.tempoImagem,32,32,			
						//onde ele esta agora
						this.left, this.top,
						//tamanho do personagem
						32,32
					);
				}
			}
			} else {
				this.tempoOlhos ++;	 
					
				this.canvas.drawImage(this.sprite,
					//corte boca aberta - Azul
					this.imagem+32,this.tempoImagem,32,32,			
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