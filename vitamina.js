class Vitamina extends Ator {
	
	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.spriteName = 'cenario.png';		
		this.height = 16;
		this.width = 16;
        this.tempoOlhos = 0;
        this.imagem = 228;
	}	

	paint(){
		super.paint;

		if (this.tempoOlhos<=20) {
			var left = this.imagem;
			this.tempoOlhos ++;
		} else {
				this.tempoOlhos ++;
				var left = this.imagem+32;	 
				if (this.tempoOlhos>=60) {
					this.tempoOlhos = 0;					
			}
		}							
        
		
		var posSprite = [left,68,24,24];
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