# TODO — Melhorias e funcionalidades pendentes

Lista priorizada de tudo que falta ou precisa ser melhorado no projeto.

---

## CRÍTICO (quebra a jogabilidade)

### 1. Canvas com tamanho errado
- `jogo.html` define o canvas como `300x300`, mas o jogo usa `580x600`
- O jogo está cortado — precisa corrigir o HTML para `width="580" height="600"`

### 2. Pacman morreu mas o jogo continua
- Quando um fantasma encosta no Pacman, `pacman.morreu = true` é setado
- O loop continua rodando normalmente — não para, não mostra tela de game over, não desconta vida
- Precisa detectar a morte e pausar o jogo / reiniciar a rodada

### 3. Vitaminado dura tempo absurdo
- `vitaminado` começa em `150000` e é decrementado 1 por frame
- A 100fps isso daria ~25 minutos de poder — precisa ajustar para ~5–10 segundos (~500–1000 frames a 100fps)

### 4. Som dos pontos com bug
- O contador `pcs` passa de 0→1 e imediatamente entra no bloco `pcs==1` no mesmo frame
- Os dois sons disparam ao mesmo tempo — precisa de `else if` ou lógica de alternância correta

---

## ALTA PRIORIDADE (funcionalidades pedidas)

### 5. Sistema de pontuação (score)
- Nenhum ponto é contabilizado ao comer bolinhas, vitaminas ou fantasmas
- Implementar variável `score` no `Game`
- Valores sugeridos (originais do arcade):
  - Bolinha: 10 pts
  - Vitamina: 50 pts
  - Fantasma (1º): 200, (2º): 400, (3º): 800, (4º): 1600 pts
  - Fruta: varia por nível (ver item de frutas)
- Exibir score no topo do canvas em texto
- Guardar high score na `localStorage`

### 6. Sistema de vidas
- Pacman deve começar com 3 vidas
- Ao morrer: tocar animação de morte, decrementar vida, reposicionar todos os atores, reiniciar rodada
- Ao perder todas as vidas: mostrar tela de **Game Over** com score final e opção de reiniciar
- Exibir ícones de vida restantes no HUD (bolinhas ou mini-pacmans)

### 7. Frutas bônus
- No original, uma fruta aparece no centro do mapa após o Pacman comer 70 bolinhas (e novamente aos 170)
- Criar classe `Fruta` extendendo `Ator` (similar à `Vitamina`)
- Frutas por nível: cereja (100pts), morango (300pts), laranja (500pts), maçã (700pts), melão (1000pts)
- A fruta fica no mapa por ~10 segundos e some se não for comida
- Exibir sprite correspondente ao nível atual

### 8. Navegação mais fluida (buffer de direção)
- Atualmente o Pacman trava se o jogador pressiona uma direção onde há parede
- O original guarda a "próxima direção desejada" e só aplica quando o corredor estiver disponível
- Implementar `direcaoDesejada` no Pacman: ao pressionar uma tecla, salva em buffer; a cada frame, tenta aplicar a direção do buffer antes da direção atual; se a nova direção for livre, muda; senão, continua na direção atual
- Isso elimina a necessidade de acertar o pixel exato da entrada do corredor

### 9. Inteligência dos fantasmas
- Hoje os fantasmas mudam para uma direção **aleatória** ao colidir com parede — sem estratégia
- No original cada fantasma tem personalidade distinta:
  - **Blinky (vermelho)**: persegue o Pacman diretamente (segue posição atual)
  - **Pinky (rosa)**: mira 4 células à frente do Pacman (tenta emboscar)
  - **Inky (azul)**: comportamento híbrido entre Blinky e o próprio Inky
  - **Clyde (laranja)**: persegue quando longe, foge quando perto
- Mínimo viável: em vez de aleatório puro, proibir o fantasma de voltar pelo caminho de onde veio (elimina o "vai e vem"), e ocasionalmente buscar a direção do Pacman
- Ideal: implementar BFS/A* simples nos cruzamentos para pathfinding real

---

## MÉDIA PRIORIDADE (experiência de jogo)

### 10. Fantasma morto volta para casa
- Quando um fantasma é comido, deve se tornar "olhos" e navegar de volta ao ponto de spawn
- Ao chegar em casa, renasce com velocidade e comportamento normais
- Hoje o fantasma morre e fica parado no lugar onde morreu

### 11. Tela de Game Over e de vitória
- Hoje ao acabar os pontos aparece um `alert()` — substituir por uma tela desenhada no canvas
- Tela de vitória: "Fase Concluída!", score, tempo, continuar
- Tela de game over: score final, high score, botão reiniciar

### 12. Múltiplos níveis
- Ao passar de fase, aumentar velocidade dos fantasmas levemente
- Reduzir duração da vitamina a cada nível
- Exibir número da fase no HUD

### 13. Pausa
- Tecla `P` ou `Escape` pausa/despausa o jogo
- Exibir texto "PAUSADO" no centro do canvas

### 14. Fantasmas saem da casa em momentos diferentes
- Hoje os 5 fantasmas nascem no mesmo ponto ao mesmo tempo
- No original eles saem da "casa dos fantasmas" em intervalos e ordem específicos
- Implementar fila de saída com delay entre cada fantasma

---

## BAIXA PRIORIDADE (polimento)

### 15. Animação de morte do Pacman
- A animação atual é bugada (incrementa `imagem` de 318 até 400 sem frames reais)
- Implementar sequência de frames do sprite de morte corretamente (frame por frame com timer)

### 16. Fantasmas vulneráveis piscam antes de acabar o efeito
- Nos últimos 2 segundos de vitamina, os fantasmas devem piscar entre azul e branco como aviso
- Implementar alternância de sprite quando `vitaminado < 200` (por exemplo)

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
