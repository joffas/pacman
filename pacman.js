
class Pacman extends Ator {

    constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tempoBoca = 0;
		this.left = 150;
		this.top = 250;
		this.somMorreu = new Audio('pacman_death.wav');
		this.morreu = false;
		this.tempoBoca = 0;
		this.controlaBoca = 0;
		this.velocidade = 2;
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
		
		//console.log(this);
		if (this.morreu){
			this.canvas.drawImage(this.sprite,
				//corte boca aberta - pacman
				414,64,32,32,
				//onde ele esta agora
				this.left, this.top,
				//tamanho do personagem
				this.width,this.height
			);				
		}
		else if (this.tempoBoca<=15) {
			this.tempoBoca ++;	 
								  
			//Pinta a boca aberta
			if ((this.paraDireita)||
				(this.paraEsquerda)){
				for (var i=0; i<=15; i++) {  
					this.canvas.moveTo(this.left, this.top);
					if (this.paraDireita){ 
						this.controlaBoca = 0;
						this.canvas.drawImage(this.sprite,
							//corte boca aberta - pacman
							350,0,32,32,			
							//onde ele esta agora
							this.left, this.top,
							//tamanho do personagem
							this.width,this.height
							);
					} 
					else if (this.paraEsquerda){ 
						this.controlaBoca = 64;						
						this.canvas.drawImage(this.sprite,
							//corte boca aberta - pacman
							350,64,32,32,			
							//onde ele esta agora
							this.left, this.top,
							//tamanho do personagem
							this.width,this.height
						);

					} 			  
				}
			}else 
				//Pinta a boca aberta
				if ((this.paraBaixo)||(this.paraCima)) {
					for (var i=0; i<=15; i++) {  
						this.canvas.moveTo(this.left, this.top);
						if (this.paraBaixo){ 
							this.controlaBoca = 32;
							this.canvas.drawImage(this.sprite,
								//corte boca aberta - pacman
								350,32,32,32,			
								//onde ele esta agora
								this.left, this.top,
								//tamanho do personagem
								this.width,this.height
								);
								  
						} 
						else if (this.paraCima) { 
							this.controlaBoca = 96;
							this.canvas.drawImage(this.sprite,
								//corte boca aberta - pacman
								350,96,32,32,			
								//onde ele esta agora
								this.left, this.top,
								//tamanho do personagem
								this.width,this.height
								);
								
						} 			  
					}
				} else{				
					this.canvas.drawImage(this.sprite,
						//corte boca aberta - pacman
						318,this.controlaBoca,32,32,			
						//onde ele esta agora
						this.left, this.top,
						//tamanho do personagem
						this.width,this.height
						);

				}  
		} else {
			this.tempoBoca ++;	 

			this.canvas.drawImage(this.sprite,
				//corte boca aberta - pacman
				318,this.controlaBoca,32,32,			
				//onde ele esta agora
				this.left, this.top,
				//tamanho do personagem
				this.width,this.height
			);

			if (this.tempoBoca>=30) {
				this.tempoBoca = 0;
			}
			
		}	
	}
}
