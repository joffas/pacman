# TODO — Melhorias e funcionalidades pendentes

[![README](https://img.shields.io/badge/📖-README-blue)](README.md)

Lista priorizada de tudo que falta ou precisa ser melhorado no projeto.

---

## CRÍTICO (quebra a jogabilidade)

### ~~1. Canvas com tamanho errado~~ ✅
- ~~`jogo.html` define o canvas como `300x300`, mas o jogo usa `580x600`~~
- Corrigido: `width="580" height="600"` em `jogo.html`

### ~~2. Pacman morreu mas o jogo continua~~ ✅
- ~~Quando um fantasma encosta no Pacman, `pacman.morreu = true` é setado~~
- ~~O loop continua rodando normalmente — não para, não mostra tela de game over, não desconta vida~~
- Corrigido: loop detecta `pacman.morreu`, para o interval, para a sirene e exibe "GAME OVER" no canvas

### ~~3. Vitaminado dura tempo absurdo~~ ✅
- ~~`vitaminado` começa em `150000` e é decrementado 1 por frame~~
- ~~A 100fps isso daria ~25 minutos de poder~~
- Corrigido: valor ajustado para `700` (~7 segundos a 100fps)

### ~~4. Som dos pontos com bug~~ ✅
- ~~O contador `pcs` passa de 0→1 e imediatamente entra no bloco `pcs==1` no mesmo frame~~
- ~~Os dois sons disparam ao mesmo tempo~~
- Corrigido: `if/if/if` substituído por `if/else if/else if`, cada estado usa seu próprio Audio (`somDot1`, `somDot2`, `somDot3`)

---

## ALTA PRIORIDADE (funcionalidades pedidas)

### ~~5. Sistema de pontuação (score)~~ ✅
- Corrigido: bolinha +10, vitamina +50, fantasma combo 200/400/800/1600 pts
- HUD exibe score (esquerda) e high score (centro) — high score salvo em `localStorage`

### ~~6. Sistema de vidas~~ ✅
- Corrigido: Pacman começa com 3 vidas; ao morrer aguarda 1,5s de animação, decrementa vida e reposiciona todos os atores
- Ao perder todas as vidas: exibe GAME OVER com score final e high score no canvas
- HUD exibe mini-pacmans amarelos como ícones de vida (canto direito)

### ~~7. Frutas bônus~~ ✅
- Corrigido: classe `Fruta` criada em `fruta.js`; aparece após 70 e 170 bolinhas comidas, fica ativa ~10s e some se não for comida
- Pontuação por nível: cereja 100, morango 300, laranja 500, maçã 700, melão 1000
- Som `pacman_eatfruit.wav` ao comer; desenhada no canvas com círculo colorido + caule (sem depender de sprite)

### ~~8. Navegação mais fluida (buffer de direção)~~ ✅
- ~~Atualmente o Pacman trava se o jogador pressiona uma direção onde há parede~~
- Corrigido: `set direcao` em `Pacman` agora guarda em `_direcaoDesejada` (buffer); `game.js` chama `tentarVirar()` a cada frame que testa a posição atual e com snap ao grid de 18px — vira quando o corredor estiver livre, sem precisar acertar o pixel exato

### ~~9. Inteligência dos fantasmas~~ ✅
- Corrigido: ao bater na parede o fantasma escolhe direção por **pesos** (não aleatório puro):
  - Evita inverter o caminho de onde veio (peso 0.05) — acaba o "vai e vem"
  - Tende ao alvo (peso maior para direções que aproximam do Pacman)
  - Quando vulnerável (`fraco`), inverte a lógica e **foge** do Pacman
- Personalidades por perfil em `fantasma.js`:
  - **vermelho/azul/roxo (`cacador`)**: perseguem a posição atual do Pacman
  - **rosa (`emboscar`)**: mira ~4 células à frente do Pacman
  - **verde (`timido`)**: persegue de longe, foge para o canto quando chega perto
- Futuro: BFS/A* nos cruzamentos para pathfinding real

---

## MÉDIA PRIORIDADE (experiência de jogo)

### ~~10. Fantasma morto volta para casa~~ ✅
- Corrigido: ao ser comido o fantasma vira "olhos" (`left=448`) e navega em linha reta de volta ao spawn em velocidade dobrada; ao chegar renasce (`morreu=false`, `fraco=false`) com comportamento normal
- Durante o retorno, o fantasma morto não mata o Pacman

### ~~11. Tela de Game Over e de vitória~~ ✅
- Corrigido: `alert()` substituído por tela desenhada no canvas
- Tela de vitória: "VOCÊ VENCEU!" com score e best; high score salvo
- Tela de game over já desenhada no canvas com score final e best

### 12. Múltiplos níveis
- Ao passar de fase, aumentar velocidade dos fantasmas levemente
- Reduzir duração da vitamina a cada nível
- Exibir número da fase no HUD

### ~~13. Pausa~~ ✅
- Corrigido: tecla `P` ou `Esc` pausa/despausa; overlay escurecido com "PAUSADO" no centro
- Enquanto pausado o jogo congela (não atualiza posições nem toca a sirene)

### ~~14. Fantasmas saem da casa em momentos diferentes~~ ✅
- Corrigido: cada fantasma tem `tempoSaida` (0/60/120/180/240 frames) e fica `preso` na casa até a sua vez
- Liberação escalonada controlada por `frameRodada`; reinicia a cada rodada

---

## BAIXA PRIORIDADE (polimento)

### ~~15. Animação de morte do Pacman~~ ✅
- Corrigido: a animação bugada por sprite foi substituída por desenho no canvas — a boca abre progressivamente (`morteProgresso`) até o corpo desaparecer
- `morteProgresso` reseta a cada rodada

### ~~16. Fantasmas vulneráveis piscam antes de acabar o efeito~~ ✅
- Corrigido: quando `vitaminado < 200` os fantasmas recebem `piscando=true` e alternam entre o sprite azul (`left=384`) e branco (`left=416`) a cada ~8 frames

### 17. HUD completo
- Exibir no canvas: Score | High Score | Fase | Vidas
- Reservar uma faixa de 40px no topo ou rodapé para o HUD sem sobrepor o labirinto

### 18. Sons faltando
- `pacman_extrapac.wav` (vida extra) — nunca é tocado
- `pacman_eatfruit.wav` — nunca é tocado (frutas não implementadas)
- `pacman_intermission.wav` — nunca é tocado (tela entre fases não existe)
- Após implementar as funcionalidades correspondentes, conectar os sons

### 19. Responsividade / escala
- O jogo usa coordenadas fixas em pixels — em telas pequenas fica cortado
- Implementar escala baseada no tamanho da janela usando `canvas.style.transform: scale()`

### 20. Tecla Enter no keydown quebra se `pacman` ainda é `null`
- Em `game.js:39`, `this.pacman.direcao = evt.keyCode` é chamado antes de qualquer verificação
- Se Enter for pressionado muito cedo pode causar erro — adicionar `if (this.pacman)` como guarda

---

## IDEIA FUTURA

- **Mapa dinâmico a partir de imagem** (já anotado no README original): ler pixels de uma imagem PNG e gerar o labirinto automaticamente
- **Multiplayer local**: dois Pacmans no mesmo mapa, competindo por pontos
- **Editor de mapa**: interface para desenhar labirintos customizados
