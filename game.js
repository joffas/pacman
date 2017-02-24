class Game {

    constructor(name){
        this.name = name;
        this.atores = null;
        this.width  = 800;
        this.height = 600;
        this.pacman = null;
        this.azul = null;
        this.Mapa = null;
        this.somGame = new Audio('pacman_chomp.wav');
        //Atores
        //this.pacman = null;
        this.azul = null;
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
            this.azul = new Fantasma('fantasma',this.ctx);
            this.azul.left = 500;            
			
            //Adicionando ao array controlador
            this.atores = new Array();
            this.atores.push(this.pacman);
//            this.atores.push(this.bloco);
			this.atores.push(this.azul);
            //this.atores.push(this.mapa);
            console.log(this.atores);

            this.mapa = new Mapa(this.ctx, this);
            console.log(this.atores);
            /*
            for (var i = 0; i < 10; i++) {
                this.bloco = new Bloco('bloco',this.ctx);
                this.bloco.left = (i*this.bloco.width)+this.bloco.left;
                this.bloco.top = 0;
                this.atores.push(this.bloco);
            }
            */

/*
            this.azul = new Azul.Class;
            this.azul.setCanvasAtor(this.ctx);
            this.azul.setX(600);
            this.azul.setY(200);
            this.atores.push(this.azul);

            for (var i = 0; i < 1; i++) {
                this.bloco = new Bloco.Class;
                this.bloco.setCanvasAtor(this.ctx);
                this.bloco.setW(600);
                this.bloco.setH(20);
                this.bloco.setX(i*this.bloco.getW());
                this.bloco.setY(0);
                this.atores.push(this.bloco);
            }
			*/
            return setInterval(this.draw, 10, this/*Deve ser passado por parametro para usar no draw*/);
        }
    }

    draw(self){
       self.clear();
	   
       for (var i in self.atores){
          if (self.atores[i] instanceof Fantasma)
            (self.pacman.dead(self.atores[i]))
          else
            if (self.atores[i] instanceof Bloco)
               (self.pacman.colidiu(self.atores[i]));

          if (self.pacman.morreu==false){
              self.somGame.play();
          }
		  
		  if (self.atores[i] instanceof Fantasma){
			if (self.atores[i].left>400){
				self.atores[i].velocidade = 2;
				self.atores[i].direcao = 37;
			}else if (self.atores[i].left<=40){
				self.atores[i].velocidade = 4;
				self.atores[i].direcao = 39;;
			}
		}
		  
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
