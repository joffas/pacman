class Game {

    constructor(name){
        this.name = name;
        this.atores = null;
        this.width  = 800;
        this.height = 600;
        this.pacman = null;
        this.azul = null;
        this.vermelho = null;
        this.Mapa = null;
        this.somGame = new Audio('pacman_chomp.wav');
        //Atores
        //this.pacman = null;
        this.atores = new Array();
    }

    get fullName() {
        return this.name + "something";
    }

    set fullName(value) {
        this.name = value;
    }
	
	set pacman(value){
		this._pacman = value;
	}
	
	get pacman(){
		return this._pacman;
	}

    keyDown(evt){
        this.pacman.direcao = evt.keyCode;//true
    }

    keyUp(evt){
        this.pacman.direcao = evt.keyCode;//,false);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    init(){
        this.canvas = document.getElementById("canvas");
        if (this.canvas.getContext) {

            this.ctx = this.canvas.getContext("2d");

            this.canvas.width = this.width;
            this.canvas.height = this.height;
            //Pacman
            this.pacman = new Pacman('pacman',this.ctx);
            //Fantasma
            this.vermelho = new Fantasma('fantasma',this.ctx);
            this.vermelho.left = 500;
            this.vermelho.top = 400;
            this.vermelho.velocidade = 16;            
			this.vermelho.direcao = 37;
            this.vermelho.imagem = 0; 

            this.verde = new Fantasma('fantasma',this.ctx);
            this.verde.left = 500;
            this.verde.top = 400;
            this.verde.velocidade = 5;            
			this.verde.direcao = 38;
            this.verde.imagem = 64;

            this.rosa = new Fantasma('fantasma',this.ctx);
            this.rosa.left = 500;
            this.rosa.top = 400;
            this.rosa.velocidade = 1;            
			this.rosa.direcao = 39;
            this.rosa.imagem = 130;

            this.roxo = new Fantasma('fantasma',this.ctx);
            this.roxo.left = 500;
            this.roxo.top = 400;
            this.roxo.velocidade = 4;            
			this.roxo.direcao = 40;
            this.roxo.imagem = 254;

            this.azul = new Fantasma('fantasma',this.ctx);
            this.azul.left = 500;
            this.azul.top = 400;
            this.azul.velocidade = 3;            
			this.azul.direcao = 40;
            this.azul.imagem = 190;

            //Adicionando ao array controlador
            this.atores = new Array();
            this.atores.push(this.pacman);
			this.atores.push(this.azul);
            this.atores.push(this.vermelho);
            this.atores.push(this.verde);
            this.atores.push(this.rosa);
            this.atores.push(this.roxo);
            this.mapa = new Mapa(this.ctx, this);
            return setInterval(this.draw, 10, this/*Deve ser passado por parametro para usar no draw*/);
        }
    }

    draw(self){
       self.clear();
	   
       for (var i in self.atores){
          if (self.atores[i] instanceof Ponto){
            self.atores[i].dead(self.pacman);
          }             
          if (self.atores[i] instanceof Fantasma){
            (self.pacman.dead(self.atores[i]))
          } 
          else
            if (self.atores[i] instanceof Bloco){
                self.pacman.colidiu(self.atores[i]);
                self.azul.tomadaDeDirecao(self.azul.colidiu(self.atores[i]));
                self.vermelho.tomadaDeDirecao(self.vermelho.colidiu(self.atores[i]));
                self.verde.tomadaDeDirecao(self.verde.colidiu(self.atores[i]));
                self.rosa.tomadaDeDirecao(self.rosa.colidiu(self.atores[i]));
                self.roxo.tomadaDeDirecao(self.roxo.colidiu(self.atores[i]));
                  //this.azul.direcao = 38
                  //console.log('colidiu');
              }
        

          if (self.pacman.morreu==false){
              self.somGame.play();
          }
		  /*
		  if (self.atores[i] instanceof Fantasma){
			if (self.atores[i].left>400){
				self.atores[i].velocidade = 2;
				self.atores[i].direcao = 37;
			}else if (self.atores[i].left<=40){
				self.atores[i].velocidade = 2;
				self.atores[i].direcao = 39;
			}
		}*/
                
         
 
            self.atores[i].updatePosicaoXY();
          self.atores[i].paint();
       }

	}
}


var game = new Game('PacmanShow');

document.onkeydown=function(event){game.keyDown(event)};
document.onkeyup=function(event){game.keyUp(event)};

//game.initAnimationEvent

function init() {
	game.init();
}

//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
