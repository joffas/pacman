
class Bloco extends Ator {
	
	constructor(tipoAtor, ctx) {
		super(tipoAtor, ctx);
		this.tipo = tipoAtor;
		this.spriteName = 'cenario.png';		
		this.height = 18;
		this.width = 18;
		this.pintar = true;
	}	

	paint(){
		super.paint;
		
		var bloco_Horizontal = [244,0,60,32];
		var bloco_vertical = [190,0,32,92];
		var bloco_quadrado1 = [0,0,92,92];
		var bloco_quadrado2 = [96,0,92,92];
		var bloco_quadrado3 = [228,36,24,24];
		var bloco_vitamina1 = [228,70,24,24];
		var bloco_vitamina2 = [260,70,24,24];
		var bloco_quadrado = [15,15,60,60];

		var blocoCantoSuperiorEsquerdo = [250,0,50,32];		

		var posSprite = bloco_quadrado;

		if (this.pintar)
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
