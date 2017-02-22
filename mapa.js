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
    for (var i = 0; i < 18; i++) {
        bloco = new Bloco('bloco',ctx);
        bloco.left = i*bloco.width;
        self.atores.push(bloco);
    }

    //Esquerda
    for (var i = 0; i < 14; i++) {
        bloco = new Bloco('bloco',ctx);
        bloco.top = i*bloco.height;
        self.atores.push(bloco);
    } 

    //Direita
    for (var i = 0; i < 15; i++) {
        bloco = new Bloco('bloco',ctx);
        bloco.left = 18*bloco.width;
        bloco.top = i*bloco.height;
        self.atores.push(bloco);
    }        

    //baixo
    for (var i = 0; i < 18; i++) {
        bloco = new Bloco('bloco',ctx);
        bloco.top = 14*bloco.width;
        bloco.left = i*bloco.width;
        self.atores.push(bloco);
    }    

	}	

}
