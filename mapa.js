class Mapa {
	
	constructor(ctx, self) {
        this.larguraLinhas = 9;
        this.tamanho = this.larguraLinhas*2;
        this.width = this.tamanho*32;
        this.height = this.tamanho*32;
        this.corredor = this.tamanho*2;
		var bloco = null;
        var ponto = null;
        var vitamina = null;
		var bloco = new Bloco('bloco',ctx);

        var iSpaco = this.tamanho*2;
        var iMargem = this.larguraLinhas;

        self.pacman.left = this.tamanho*15;
        self.pacman.top = this.tamanho*24-this.larguraLinhas+2;
        self.pacman.__left = self.pacman.left;
        self.pacman.__top = self.pacman.top;
        

        self.azul.left = this.tamanho*15;
        self.azul.top = this.tamanho*14;
        self.rosa.left = this.tamanho*15;
        self.rosa.top = this.tamanho*14;
        self.roxo.left = this.tamanho*15;
        self.roxo.top = this.tamanho*14;
        self.vermelho.left = this.tamanho*15;
        self.vermelho.top = this.tamanho*14;
        self.verde.left = this.tamanho*15;
        self.verde.top = this.tamanho*14;

        self.azul.__left = self.azul.left;
        self.azul.__top = self.azul.top;
        self.rosa.__left = self.rosa.left;
        self.rosa.__top = self.rosa.top;
        self.roxo.__left = self.roxo.left;
        self.roxo.__top = self.roxo.top;
        self.vermelho.__left = self.vermelho.left;
        self.vermelho.__top = self.vermelho.top;
        self.verde.__left = self.verde.left;
        self.verde.__top = self.verde.top;
        

        //linha de cima
        bloco = new Bloco('bloco',ctx);        
        bloco.left = 0;
        bloco.top = 0;
        bloco.height = this.larguraLinhas;
        bloco.width = this.width;
        self.atores.push(bloco);

        //linha baixo
        bloco = new Bloco('bloco',ctx);        
        bloco.left = 0;
        bloco.top = this.height-this.larguraLinhas;
        bloco.height = this.larguraLinhas;
        bloco.width = this.width;
        self.atores.push(bloco);

        //Linha Esquerda1
        bloco = new Bloco('bloco',ctx);
        bloco.top = 0;
        bloco.height = this.tamanho*11+this.larguraLinhas;
        bloco.width = this.larguraLinhas;
        self.atores.push(bloco);

        //Linha Esquerda2
        bloco = new Bloco('bloco',ctx);
        bloco.top = this.tamanho*20;
        bloco.height = this.tamanho*11+this.larguraLinhas;
        bloco.width = this.larguraLinhas;
        self.atores.push(bloco);

        //Linha Direita1
        bloco = new Bloco('bloco',ctx);
        bloco.top = 0;
        bloco.left = this.width-this.larguraLinhas;
        bloco.height = this.tamanho*11+this.larguraLinhas;
        bloco.width = this.larguraLinhas;
        self.atores.push(bloco);

        //Linha Direita2
        bloco = new Bloco('bloco',ctx);
        bloco.top = this.tamanho*20;
        bloco.left = this.width-this.larguraLinhas;
        bloco.height = this.tamanho*11+this.larguraLinhas;
        bloco.width = this.larguraLinhas;
        self.atores.push(bloco);

        //******************************************************* */
        //Primeira faixa de blocos de cima para baixo        

        var blocoPeq = new Bloco('bloco',ctx);        
        blocoPeq.left =  this.corredor+this.larguraLinhas;
        blocoPeq.top = blocoPeq.left;
        blocoPeq.height = this.tamanho*3;
        blocoPeq.width = this.tamanho*3;
        self.atores.push(blocoPeq);

        var b2 = blocoPeq;    
        var blocoGrd = new Bloco('bloco',ctx);        
        blocoGrd.left = b2.left+this.corredor+b2.width;
        blocoGrd.top = b2.top;
        blocoGrd.height = b2.height;
        blocoGrd.width = b2.width*2;
        self.atores.push(blocoGrd);        

        //Meio baixo
        var b2 = blocoGrd;    
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = 0;
        bloco.height = this.larguraLinhas+this.tamanho*5;
        bloco.width = this.tamanho;
        self.atores.push(bloco);        
        iLeft = bloco.left + bloco.width + iSpaco;

        var b2 = self.atores[self.atores.length-1];    
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = blocoGrd.top;
        bloco.height = blocoGrd.height;
        bloco.width = blocoGrd.width;
        self.atores.push(bloco);        

        var b2 = self.atores[self.atores.length-1];    
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = blocoPeq.top;
        bloco.height = blocoPeq.height;
        bloco.width = blocoPeq.width;
        self.atores.push(bloco);        
        
        var iTop = bloco.top + this.corredor+blocoPeq.height;

        //******************************************************* */
        //Segunda faixa de blocos de cima para baixo
        //var iTop = bloco.top + iMargem + iSpaco + iSpaco;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.corredor+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = blocoPeq.width;
        self.atores.push(bloco);

        b2 = blocoPeq;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = iTop;
        bloco.height = this.tamanho*7;
        bloco.width = this.tamanho;
        self.atores.push(bloco);
        
        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*11;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.tamanho*5;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);
        
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = iTop;
        bloco.height = this.tamanho*7;
        bloco.width = this.tamanho;
        self.atores.push(bloco);
        
        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*3;
        self.atores.push(bloco);

        //******************************************************* */
        //3 - Terceira faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = 0;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5+this.larguraLinhas;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.tamanho*4+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*3;
        bloco.width = this.tamanho;
        self.atores.push(bloco);               

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width+this.tamanho*4;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5;
        self.atores.push(bloco);       


        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.corredor+b2.width+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 


        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5+this.larguraLinhas;
        self.atores.push(bloco); 

        //******************************************************* */
        //4 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = 0;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5+this.larguraLinhas;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor*2+this.tamanho;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*4;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor+this.tamanho;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*4;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+this.tamanho*3;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*27;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5;
        self.atores.push(bloco);       

        //******************************************************* */

        //******************************************************* */
        //5 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = 0;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5+this.larguraLinhas;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.larguraLinhas+this.tamanho*4;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor+this.tamanho;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*10;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*27;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*23+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*26+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.larguraLinhas+this.tamanho*10;
        bloco.top = iTop-this.tamanho;
        bloco.height = this.tamanho*2;
        bloco.width = this.tamanho*4;
        bloco.pintar = false;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.larguraLinhas+this.tamanho*17;
        bloco.top = iTop-this.tamanho;
        bloco.height = this.tamanho*2;
        bloco.width = this.tamanho*4;
        bloco.pintar = false;
        self.atores.push(bloco); 

        //******************************************************* */
        //6 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);        
        bloco.left = 0;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5+this.larguraLinhas;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.larguraLinhas+this.tamanho*4;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 
//aqui
        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*11;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.larguraLinhas+this.tamanho*15;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);         

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*27;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*5;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*23+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho;
        self.atores.push(bloco);       

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*26+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho;
        self.atores.push(bloco);       
        //******************************************************* */
        
        //******************************************************* */
        //7 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);  
        bloco.left = this.larguraLinhas+this.corredor;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*2;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);
        bloco.left = this.larguraLinhas+this.tamanho*4;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*6;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*18+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*6;
        self.atores.push(bloco); 

        bloco = new Bloco('bloco',ctx);  
        bloco.left = this.tamanho*26+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco);

        bloco = new Bloco('bloco',ctx);  
        bloco.left = this.tamanho*26+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*3;
        self.atores.push(bloco);
        
        //******************************************************* */

        //******************************************************* */
        //8 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);  
        bloco.left = this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*2;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);
        bloco.left = this.larguraLinhas+this.tamanho*7;
        bloco.top = iTop;
        bloco.height = this.tamanho*3;
        bloco.width = this.tamanho;
        self.atores.push(bloco);

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = b2.left+b2.width+this.corredor;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*6;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*15+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*4;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*15+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*6;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*23+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho*3;
        bloco.width = this.tamanho;
        self.atores.push(bloco); 

        b2 = bloco;
        bloco = new Bloco('bloco',ctx);        
        bloco.left = this.tamanho*29+this.larguraLinhas;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*2;
        self.atores.push(bloco); 
                
        //******************************************************* */

        //******************************************************* */
        //9 - Quarta faixa de blocos de cima para baixo        
        var iTop = bloco.top + bloco.height + iSpaco;
        var iLeft = 0;

        bloco = new Bloco('bloco',ctx);  
        bloco.left = this.larguraLinhas+this.tamanho*2;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*11;
        self.atores.push(bloco);

        bloco = new Bloco('bloco',ctx);  
        bloco.left = this.larguraLinhas+this.tamanho*18;
        bloco.top = iTop;
        bloco.height = this.tamanho;
        bloco.width = this.tamanho*11;
        self.atores.push(bloco);
                
        //******************************************************* */

        //pontos esquerda para direita
        
        for (var i = 0; i < 20; i++) {            
            if (i>0 && i<=8){
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho;
                self.atores.push(ponto);                
            }
            if (i>=10 && i<=17){
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho;
                self.atores.push(ponto);                
            } 
             
            //segunda linha 
            if (i>=0 && i<=18){          
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*6;
                self.atores.push(ponto);
            }

            //terceira
            if (i>=0 && i<=3) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*9;
                self.atores.push(ponto);                                    
            }            
            
            if (i>=5 && i<=8) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*9;
                self.atores.push(ponto);                                    
            }            
            if (i>=11 && i<=14) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*9;
                self.atores.push(ponto);                                    
            }            

            if (i>=16 && i<=20) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*9;
                self.atores.push(ponto);                                    
            }            

            //quarta
            if (i>=5 && i<=13) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*12;
                self.atores.push(ponto);                                    
            }            

            //quinta
            if (i>=0 && i<=8) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*21;
                self.atores.push(ponto);                                    
            }            
            if (i>=11 && i<=28) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*21;
                self.atores.push(ponto);                                    
            }            

            //anti-penultima
            if (i>=0 && i<=1) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*24;
                self.atores.push(ponto);                                    
            }            
            
            if (i>=3 && i<=7) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*24;
                self.atores.push(ponto);                                    
            }            
            if (i>=12 && i<=16) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*24;
                self.atores.push(ponto);                                    
            }            

            if (i>=18 && i<=20) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*24;
                self.atores.push(ponto);                                    
            }            

            //penultima
            if (i>=0 && i<=3) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*27;
                self.atores.push(ponto);                                    
            }            
            
            if (i>=5 && i<=8) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*27;
                self.atores.push(ponto);                                    
            }            
            if (i>=11 && i<=14) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*27;
                self.atores.push(ponto);                                    
            }            

            if (i>=16 && i<=20) {
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2);
                ponto.top = this.tamanho*27;
                self.atores.push(ponto);                                    
            }            
            //ultima
            if (i>=1 && i<=17) {            
                ponto = new Ponto('ponto',ctx);        
                ponto.left = (i*ponto.width*2)+this.tamanho+this.larguraLinhas;
                ponto.top = this.tamanho*30;
                self.atores.push(ponto);
            }            
        }


        vitamina = new Vitamina('Vitamina',ctx);        
        vitamina.left = this.tamanho;
        vitamina.top = this.tamanho;
        self.atores.push(vitamina);
        
        vitamina = new Vitamina('Vitamina',ctx);        
        vitamina.left = this.tamanho*30;
        vitamina.top = this.tamanho;
        self.atores.push(vitamina);

        vitamina = new Vitamina('Vitamina',ctx);        
        vitamina.left = this.tamanho;
        vitamina.top = this.tamanho*30;
        self.atores.push(vitamina);
        
        vitamina = new Vitamina('Vitamina',ctx);        
        vitamina.left = this.tamanho*30;
        vitamina.top = this.tamanho*30;
        self.atores.push(vitamina);


	}

}
