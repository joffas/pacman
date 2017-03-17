class Mapa {
	
	constructor(ctx, self) {
		var bloco = null;
        var ponto = null;
        var vitamina = null;
		var bloco = new Bloco('bloco',ctx);

        var iSpaco = 50;
        var iMargem = 8;

        //******************************************************* */
        //Primeira faixa de blocos de cima para baixo        

        var iLeft = iMargem+iSpaco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = 58;
        bloco.height = 64;
        bloco.width = 64;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = 58;
        bloco.height = 64;
        bloco.width = 128;
        self.atores.push(bloco);        
        iLeft = bloco.left + bloco.width + iSpaco;

        //Meio baixo
        bloco = new Bloco('bloco',ctx);
        bloco.height = 122;
        bloco.width = 24;
        bloco.top = 0;
        bloco.left = iLeft;
        var iMeio = iLeft;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = 58;
        bloco.height = 64;
        bloco.width = 128;
        self.atores.push(bloco);        
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = 58;
        bloco.height = 64;
        bloco.width = 64;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;
        var iTop = bloco.top + iMargem + iSpaco + iSpaco;

        //Direita
        for (var i = 0; i <31; i++) {
            bloco = new Bloco('bloco',ctx);
            bloco.top = 31*bloco.height;
            bloco.left = iLeft;//43*bloco.width;
            bloco.top = i*bloco.height;
            self.atores.push(bloco);
        }                

        //******************************************************* */
        //Segunda faixa de blocos de cima para baixo
        //var iTop = bloco.top + iMargem + iSpaco + iSpaco;

        iLeft = iMargem+iSpaco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 64;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 160;
        bloco.width = 24;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;
        
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 220;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 160;
        bloco.width = 24;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;        
        
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 64;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        
        //******************************************************* */
        //3 - Terceira faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        iLeft = iMargem;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 118;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft + iMargem + iMargem;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 96;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;
        
        bloco = new Bloco('bloco',ctx);        
        //bloco.left = iLeft;
        bloco.left = iMeio;
        bloco.top = iTop - 56;
        bloco.height = 80;
        bloco.width = 24;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft+iMargem;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 96;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft+24;        
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 118;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        //Linha Esquerda
        bloco = new Bloco('bloco',ctx);
        bloco.top = 0;
        bloco.height = 264;
        self.atores.push(bloco);
       

        //******************************************************* */
        //4 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;


        iLeft = iMargem;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 118;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width - 24;

       
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft;
        bloco.top = iTop - 56;
        bloco.height = 80;
        bloco.width = 24;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft+iMargem;
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 96;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        
        bloco = new Bloco('bloco',ctx);        
        bloco.left = iLeft+24;        
        bloco.top = iTop;
        bloco.height = 24;
        bloco.width = 118;
        self.atores.push(bloco);
        iLeft = bloco.left + bloco.width + iSpaco;

        


        //cima   
        for (var i = 0; i < 40; i++) {
            bloco = new Bloco('bloco',ctx);        
            bloco.left = i*bloco.width;
            self.atores.push(bloco);
        }

        


        //baixo
        for (var i = 0; i < 44; i++) {
            bloco = new Bloco('bloco',ctx);
            bloco.top = 31*bloco.height;
            bloco.left = i*bloco.width;
            self.atores.push(bloco);
        }    



        for (var i = 0; i < 50; i++) {
            ponto = new Ponto('ponto',ctx);        
            ponto.left = (i*ponto.width)+32;
            ponto.top = 260;
            self.atores.push(ponto);

            ponto = new Ponto('ponto',ctx);        
            ponto.left = (i*ponto.width)+32;
            ponto.top = 292;
            self.atores.push(ponto);            
        }

        vitamina = new Vitamina('Vitamina',ctx);        
        vitamina.left = 32;
        vitamina.top = 32;
        self.atores.push(vitamina);
        
        vitamina = new Vitamina('Vitamina',ctx);        
        vitamina.left = 680;
        vitamina.top = 32;
        self.atores.push(vitamina);


	}

}
