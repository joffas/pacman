class Ator {
	
	constructor(tipoAtor, ctx) {
		this.tipo = tipoAtor;
		this.velocidade = 2;/*Define a velocidade que o ator vai ir para esquerda, direita, cima ou baixo*/
		this.direcao = 0;//parado
		this.left = 0; /*DEFINE A POSIÇÃO PARA DIREITA OU ESQUERDA*/
		this.top = 0; /*DEFINE A POSIÇÃO PARA CIMA OU PARA BAIXO*/
		this.width = 32;
		this.height = 32;
		this.canvas = ctx;
		this.sprite = new Image();
		this.sprite.src = 'sprites.png';				
	}
		
	dead(outro){		
		if (this.detectarColisao(outro))
			return this.morreu = true;
	}						
		
	detectarColisao(outro){
		
		if ((this.left==undefined)||
			(outro.left==undefined)) 
			return false;

		if  ((this.left+this.width<outro.left)||
			(this.left>outro.left+outro.width)||
			(this.top+this.height<outro.top)||
			(this.top>outro.top+outro.height)) 
			return false;

		return true;
	}

	colidiu(outro){
		if (this.detectarColisao(outro)==true){
			if (this.paraDireita){
				this.left = this.left-2;
			}
			if (this.paraEsquerda){
				this.left = this.left+2;
			}			
			if (this.paraCima){
				this.top = this.top+2;
			}			
			if (this.paraBaixo){
				this.top = this.top-2;
			}		
		}
	}

	get tipo(){
		return this._tipo;
	}
		
	set tipo(value){
		this._tipo = value;
	}		
				
	get sprite(){
		return this._sprite;
	}
	
	set sprite(value){
		this._sprite = value;
	}
				
	set spriteName(Nome){
		this.sprite.src = Nome;
	}		
		
		
	set direcao(tecla){		
		this._direcao = 0;//parado
		if (tecla == 39){ 
			this._direcao = 1;//Direita
		}
		if (tecla == 37){
			this._direcao = 2;//Esquerda
		}
		if (tecla == 38){ 
			this._direcao = 3;//Cima
		}
		if (tecla == 40){ 
			this._direcao = 4;//Baixo
		}
	}
		
	updatePosicaoXY(){
		if (this.direcao==1) { this.left += this.velocidade }//Direita
		if (this.direcao==2) { this.left -= this.velocidade }//Esquerda
		if (this.direcao==3) { this.top -= this.velocidade }//Cima
		if (this.direcao==4) { this.top += this.velocidade }//Baixo
	}

	get direcao(){
		return this._direcao;
	}		
				
	set velocidade(value){ 
		this._velocidade = value;
	}

	get velocidade(){ 
		return this._velocidade;
	}
	
	set canvas(value){ 
		this._canvas = value;
	}

	get canvas(){ 
		return this._canvas;
	}

	set left(value){ 
		this._left = value;
	}
	
	get left(){ 
		return this._left; 
	}

	set top(value){ 
		this._top = value; 
	}

	get top(){ 
		return this._top; 
	}

	set width(value){ 
		this._width = value; 
	}
		
	get width(){ 
		return this._width; 
	}

	set height(value){ 
		this._height = value; 
	}	
		
	get height(){ 
		return this._height; 
	}				
		
	paint(){
		//this.canvas.beginPath();		
	}
		
	get paraDireita(){ 
		return this.direcao==1; 
	}
		
	get paraEsquerda(){ 
		return this.direcao==2; 
	}				
		
	get paraCima(){ 
		return this.direcao==3; 
	}				

	get paraBaixo(){ 
		return this.direcao==4; 
	}				

}
