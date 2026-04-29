const FRUTAS_INFO = [
    { nome: 'cereja',   pontos: 100,  cor: '#CC0000', corCaule: '#006600' },
    { nome: 'morango',  pontos: 300,  cor: '#AA0033', corCaule: '#006600' },
    { nome: 'laranja',  pontos: 500,  cor: '#FF8800', corCaule: '#006600' },
    { nome: 'maca',     pontos: 700,  cor: '#FF2200', corCaule: '#884400' },
    { nome: 'melao',    pontos: 1000, cor: '#88CC00', corCaule: '#006600' },
];

class Fruta extends Ator {

    constructor(tipoAtor, ctx) {
        super(tipoAtor, ctx);
        this.tipo = tipoAtor;
        this.width = 20;
        this.height = 20;
        this.ativa = false;
        this.tempoRestante = 0;
        this.pontos = 100;
        this.cor = '#CC0000';
        this.corCaule = '#006600';
    }

    ativar(x, y, nivel) {
        var info = FRUTAS_INFO[Math.min((nivel || 1) - 1, FRUTAS_INFO.length - 1)];
        this.pontos = info.pontos;
        this.cor = info.cor;
        this.corCaule = info.corCaule;
        this.left = x;
        this.top = y;
        this._morreu = false;
        this.ativa = true;
        this.tempoRestante = 1000; // ~10s a 100fps
    }

    tick() {
        if (!this.ativa || this.morreu) return;
        this.tempoRestante--;
        if (this.tempoRestante <= 0) {
            this.ativa = false;
        }
    }

    // Fruta não se move
    updatePosicaoXY() {}

    paint() {
        super.paint;
        if (!this.ativa || this.morreu) return;
        var cx = this.left + 10;
        var cy = this.top + 11;
        // corpo
        this.canvas.beginPath();
        this.canvas.arc(cx, cy, 9, 0, Math.PI * 2);
        this.canvas.fillStyle = this.cor;
        this.canvas.fill();
        this.canvas.closePath();
        // caule
        this.canvas.beginPath();
        this.canvas.strokeStyle = this.corCaule;
        this.canvas.lineWidth = 2;
        this.canvas.moveTo(cx, this.top + 2);
        this.canvas.lineTo(cx + 5, this.top - 4);
        this.canvas.stroke();
    }
}
