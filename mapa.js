var Mapa = {

	Class : function() {
		Ator.Class.apply(this);
		var raio = 12;
		var tempo_boca = 0;
		var parent_paint = this.paint;
		
		var bloco_Horizontal = [224,0,92,32];
		var bloco_vertical = [190,0,32,92];
		var bloco_quadrado1 = [0,0,92,92];
		var bloco_quadrado2 = [96,0,92,92];
		var bloco_quadrado3 = [228,36,24,24];		
		var bloco_vitamina1 = [228,70,24,24];		
		var bloco_vitamina2 = [260,70,24,24];		
		

		this.paint = function(){
			ctx = this.getCanvasAtor();
			ctx.beginPath();
			this.setSpriteName('cenario.png');
			var i = 1;
			
			
			posSprite = bloco_quadrado1;					
			ctx.drawImage(this.getSprite(),
			//corte do sprite
			posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
			//onde ele esta agora
			i, 0,
			//tamanho do personagem
			posSprite[2],posSprite[3]
			);
			
			i = i+96;
			posSprite = bloco_quadrado2;					
			ctx.drawImage(this.getSprite(),
			//corte do sprite
			posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
			//onde ele esta agora
			i, 0,
			//tamanho do personagem
			posSprite[2],posSprite[3]
			);
				
			i = i+96;				
			posSprite = bloco_quadrado3;					
			ctx.drawImage(this.getSprite(),
			//corte do sprite
			posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
			//onde ele esta agora
			i, 0,
			//tamanho do personagem
			posSprite[2],posSprite[3]
			);

			
			i = i+96;
			posSprite = bloco_Horizontal;					
			ctx.drawImage(this.getSprite(),
			//corte do sprite
			posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
			//onde ele esta agora
			i, 0,
			//tamanho do personagem
			posSprite[2],posSprite[3]
			);
					
			i = i+96;
			posSprite = bloco_vertical;					
			ctx.drawImage(this.getSprite(),
			//corte do sprite
			posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
			//onde ele esta agora
			i, 0,
			//tamanho do personagem
			posSprite[2],posSprite[3]
			);

			if (tempo_boca<=30) {
				tempo_boca ++;	 			
				i = i+96;
				posSprite = bloco_vitamina2;					
				ctx.drawImage(this.getSprite(),
				//corte do sprite
				posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
				//onde ele esta agora
				i, 0,
				//tamanho do personagem
				posSprite[2],posSprite[3]
				);
			} else {	
				if (tempo_boca>=80) {
					tempo_boca = 0;					
				}
				tempo_boca ++;
				i = i+96;
				posSprite = bloco_vitamina1;					
				ctx.drawImage(this.getSprite(),
				//corte do sprite
				posSprite[0],posSprite[1],posSprite[2],posSprite[3],			
				//onde ele esta agora
				i, 0,
				//tamanho do personagem
				posSprite[2],posSprite[3]
				);
			}
			
			
					/*
			for (var i=0; i<=15; i++) {  
				ctx.drawImage(this.getSprite(),
					//corte do sprite
					0,0,96,96,			
					//onde ele esta agora
					i*32, 0,
					//tamanho do personagem
					32,32
					);
/*
				ctx.drawImage(this.getSprite(),
					//corte do sprite
					0,0,96,96,			
					//onde ele esta agora
					0, i*32,
					//tamanho do personagem
					32,32
					);

				ctx.drawImage(this.getSprite(),
					//corte do sprite
					0,0,96,96,			
					//onde ele esta agora
					370, i*32,
					//tamanho do personagem
					32,32
					);*/
/*
				ctx.drawImage(this.getSprite(),
					//corte do sprite
					200,0,96,20,			
					//onde ele esta agora
					i*96, 370,
					//tamanho do personagem
					96,20
					);


				ctx.drawImage(this.getSprite(),
					//corte do sprite
					0,0,96,96,			
					//onde ele esta agora
					270, i*32,
					//tamanho do personagem
					32,32
					);



					
			}*/

		}
	}
}