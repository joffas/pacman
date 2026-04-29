# Pacman — JavaScript / ECMAScript 6

[![TODO](https://img.shields.io/badge/📋-TODO-blue)](TODO.md)

Projeto iniciado em 2016 como exercício prático de aprendizado de JavaScript puro usando Canvas 2D e orientação a objetos com ES6 Classes.

## Tecnologias

- HTML5 Canvas (renderização 2D)
- JavaScript ES6 (Classes, getters/setters, `const`, `let`)
- Web Audio API (sons nativos do browser, sem bibliotecas)
- Sem dependências externas — abre direto no browser

## Como rodar

Basta abrir `jogo.html` em qualquer browser moderno.  
Pressione **Enter** para iniciar o jogo e use as **setas do teclado** para mover o Pacman.

> **Atenção:** por usar `Audio` e `Canvas`, o arquivo precisa ser servido via HTTP local (ex.: extensão Live Server no VS Code, `python3 -m http.server`, etc.) para evitar bloqueios de CORS no carregamento de áudio.

## Estrutura dos arquivos

```
jogo.html        — página principal, instancia o Game
game.js          — loop principal do jogo e gerenciamento dos atores
ator.js          — classe base com movimento, colisão e getters/setters
pacman.js        — sprite e lógica do Pacman
fantasma.js      — sprite e lógica dos fantasmas
mapa.js          — construção do labirinto, posicionamento dos pontos e vitaminas
bloco.js         — paredes do labirinto
ponto.js         — bolinhas colecionáveis
vitamina.js      — power pellets (deixam fantasmas vulneráveis)
sprites.png      — sprite sheet com todos os personagens
cenario.png      — sprite sheet do cenário (blocos, pontos, vitaminas)
*.wav / *.mp3    — efeitos sonoros originais do arcade
```

## O que já funciona

- Labirinto completo com paredes e colisão
- Pacman se move nas quatro direções (setas do teclado)
- 5 fantasmas com velocidades distintas (0.7 → 1.1)
- Colisão Pacman ↔ parede e fantasma ↔ parede
- Vitaminas: ao comer, fantasmas ficam vulneráveis (azuis) por um período
- Pacman pode comer fantasmas vulneráveis
- Bolinhas colecionáveis: ao comer todas, passa de fase
- Túnel lateral (Pacman sai de um lado e entra no outro)
- Efeitos sonoros: início, sirene, morte, comer ponto, comer fantasma
- Tela de início com imagem e pressione Enter

## Histórico de commits relevantes

O projeto evoluiu de um experimento simples de canvas para um clone jogável do Pacman com colisões, sprites, sons e lógica de fases. O histórico inclui desde a primeira tela de início até a detecção de vitaminas e morte dos fantasmas.

---

*Projeto pessoal — aprendizado de JavaScript. Código em português para facilitar o entendimento durante o processo de aprendizado.*
