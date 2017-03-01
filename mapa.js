class Mapa {
	
	constructor(ctx, self) {
		var bloco = null;
		var bloco = new Bloco('bloco',ctx);
		self.atores.push(bloco);
		//bloco.left = 100;

    /* bug
        for (var i = 0; i < 14; i++) {
            bloco = new Bloco('bloco',ctx);
            bloco.left = i*bloco.height;
            bloco.top = i*bloco.height;
            self.atores.push(bloco);
        } 
        */   

        //cima   
        for (var i = 0; i < 44; i++) {
            bloco = new Bloco('bloco',ctx);        
            bloco.left = i*bloco.width;
            self.atores.push(bloco);
        }

        //Esquerda
        for (var i = 0; i < 30; i++) {
            bloco = new Bloco('bloco',ctx);
            bloco.top = (i*bloco.height)+bloco.height;
            self.atores.push(bloco);
        } 

        //Direita
        for (var i = 0; i <31; i++) {
            bloco = new Bloco('bloco',ctx);
            bloco.top = 31*bloco.height;
            bloco.left = 43*bloco.width;
            bloco.top = i*bloco.height;
            self.atores.push(bloco);
        }                

        //baixo
        for (var i = 0; i < 44; i++) {
            bloco = new Bloco('bloco',ctx);
            bloco.top = 31*bloco.height;
            bloco.left = i*bloco.width;
            self.atores.push(bloco);
        }    


        //Meio baixo
        bloco = new Bloco('bloco',ctx);
        bloco.height = 180;
        bloco.top = 16;
        bloco.left = bloco.width*22;
        self.atores.push(bloco);


        bloco = new Bloco('bloco',ctx);        
        bloco.left = 61;
        bloco.top = 60;
        bloco.height = 60;
        bloco.width = 100;
        self.atores.push(bloco);

        bloco = new Bloco('bloco',ctx);        
        bloco.left = 220;
        bloco.top = 60;
        bloco.height = 60;
        bloco.width = 120;
        self.atores.push(bloco);        

	}

}
