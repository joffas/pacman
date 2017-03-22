const _DIREITA = 1;
const _ESQUERDA = 2;
const _CIMA = 3;
const _BAIXO = 4;

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
		this.direcaoAnterior = 0;				
		this.morreu = false;
		this.fraco = false;
		this.vitaminado = 0;
	}
	
	dead(outro){
		if (outro.fraco!=true){
			if (this.detectarColisao(outro)){
				return this.morreu = true;
			}
		}
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
				this.left = this.left-this.velocidade;
			}
			if (this.paraEsquerda){
				this.left = this.left+this.velocidade;
			}			
			if (this.paraCima){
				this.top = this.top+this.velocidade;
			}			
			if (this.paraBaixo){
				this.top = this.top-this.velocidade;
			}		
			return this.direcao;
		}else{
			return 0;
		}
	}

	vaiColidir(outro){
		
		if ((this.left==undefined)||
			(outro.left==undefined)) 
			return false;

		if  ((this.left+this.velocidade+this.width<outro.left)||
			(this.left+this.velocidade>outro.left+outro.width)||
			(this.top+this.velocidade+this.height<outro.top)||
			(this.top+this.velocidade>outro.top+outro.height)) 
			return false;

		return true;
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

	get fraco(){
		return this._fraco;
	}	

	set fraco(value){
		this._fraco = value;
	}		
		
	set direcao(tecla){		
		this._direcao = 0;//parado
		if (tecla == 39){ 
			this._direcao = _DIREITA;//Direita
		}
		if (tecla == 37){
			this._direcao = _ESQUERDA;//Esquerda
		}
		if (tecla == 38){ 
			this._direcao = _CIMA;//Cima
		}
		if (tecla == 40){ 
			this._direcao = _BAIXO;//Baixo
		}
	}

	tomadaDeDirecao(Value){	 
		if (Value == _DIREITA){ 
			this._direcao = Math.floor(Math.random() * 4 + 1);
		}else if (Value == _ESQUERDA){
			this._direcao = Math.floor(Math.random() * 4 + 1);
		}else if (Value == _CIMA){
			this._direcao = Math.floor(Math.random() * 4 + 1);
			this.direcaoAnterior = 3;
		}else if (Value == _BAIXO){
			this._direcao = Math.floor(Math.random() * 4 + 1);
		}
	}	
		
	updatePosicaoXY(){
		if (this.direcao==_DIREITA) { 
			this.left += this.velocidade;
			if (this.left>600){
				this.left=0;
			} 
		}//Direita
		if (this.direcao==_ESQUERDA) { 
			this.left -= this.velocidade;
			if (this.left<-32){
				this.left=600;
			} 
		}//Esquerda
		if (this.direcao==_CIMA) { this.top -= this.velocidade }//Cima
		if (this.direcao==_BAIXO) { this.top += this.velocidade }//Baixo
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
		return this.direcao==_DIREITA; 
	}
		
	get paraEsquerda(){ 
		return this.direcao==_ESQUERDA; 
	}				
		
	get paraCima(){ 
		return this.direcao==_CIMA; 
	}				

	get paraBaixo(){ 
		return this.direcao==_BAIXO; 
	}				

}