
class Ponto extends Ator {
	
	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.spriteName = 'cenario.png';		
		this.height = 14;
		this.width = 14;
	}	

	paint(){
		super.paint;
		
		var posSprite = [296,72,14,14];
        if (!this.morreu){
		    this.canvas.drawImage(this.sprite,
			    //corte do sprite
			    posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
			    //onde ele esta agora
			    this.left, this.top,
			    //tamanho do personagem
			    this.width,this.height
			    );	
        }
	}
}
