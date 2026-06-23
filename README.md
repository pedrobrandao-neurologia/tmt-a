# Teste de Trilhas - Parte A (TMT-A) - Versão Padronizada 🧠

Uma implementação digital **padronizada** do **Trail Making Test Parte A (TMT-A)**, ferramenta
neuropsicológica clássica usada para avaliar atenção visual, velocidade de processamento e
sequenciamento. Esta versão prioriza **padronização do estímulo**, **cronometria de alta resolução**
e as **boas práticas de adaptação papel→digital** (AACN/NAN; ITC; AERA/APA *Standards*).

> ⚠️ **Aviso metodológico e clínico.** Uma versão digital de um teste tradicional é,
> psicometricamente, um **teste novo**. Esta ferramenta **não tem finalidade diagnóstica** e não
> substitui a avaliação neuropsicológica presencial. As normas exibidas baseiam-se na versão em
> **papel** (Tombaugh, 2004) e servem apenas como referência aproximada — a equivalência de medida e
> normas próprias da versão digital ainda precisam ser estabelecidas.

-----

## ✨ Características da Padronização

  * **Formas paralelas equivalentes ao original:** os 25 estímulos vêm de **formas geradas e vetadas**
    por `layoutGenerator.js`, **geometricamente equivalentes** à figura clássica do TMT-A (Reitan).
    Em vez de casar distância por distância, as versões casam os **invariantes que determinam a
    dificuldade** (comprimento de trilha, variância de distância, distribuição angular, cobertura por
    convex hull, densidade de near-distractors), dentro de janelas de tolerância. São aplicadas em
    rodízio a cada tentativa, mitigando o **efeito de aprendizado** sem alterar a dificuldade.
  * **Geometria realista (como o original):** distâncias **variadas** (saltos curtos e longos, dp alto)
    e **viradas acentuadas** do caminho (média ~110°), reproduzindo a carga de busca visual da folha
    clássica — e não um traçado suave e previsível.
  * **Trilha-solução sem auto-cruzamento:** o caminho 1→25 é uma poligonal simples (invariante #1,
    garantido por construção e verificado).
  * **Reprodutibilidade por seed:** cada forma é função determinística de um *seed* (registrado em
    `FORM_META` e no relatório/export), permitindo recriar exatamente qualquer instância.
  * **Arena quadrada responsiva:** a área de teste é sempre um quadrado que se ajusta à viewport
    (`min(92vw, 62vh)`); ao redimensionar/girar, reescala sem sobreposição e sem sair da área.
  * **Interface escura e imersiva:** fundo preto, alto contraste, fonte Inter, com **feedback sonoro**
    (tons distintos para acerto/erro/conclusão), **modo tela inteira** e **adaptação ao dispositivo**
    (celular, tablet ou computador — inclusive alvos de toque maiores em telas sensíveis).

## 📊 Métricas e Boas Práticas

  * **Cronometria de alta resolução:** todas as medidas usam `performance.now()` (monotônico, sub-ms),
    com o *timestamp* capturado no `pointerdown` (evento mais próximo do input). A taxa de atualização
    efetiva do display (Hz) é medida e registrada.
  * **Dissociação cognição × motricidade:** para mouse, cada conexão é decomposta em **tempo de
    decisão** (latência até o início do movimento) e **tempo de movimento** (execução motora) —
    importante para minimizar o confundimento motor em transtornos do movimento. Em toque/teclado,
    esses componentes aparecem como `N/A`.
  * **Eficiência de trajetória real** (mouse); `N/A` para toque/teclado.
  * **Métricas avançadas:** tempo médio/menor/maior por conexão, variabilidade (CV), velocidade
    inicial/mediana/final, índice de fadiga e análise de erros por tipo (repetição, antecipação,
    sequência).
  * **Indicadores de validade:** respostas implausivelmente rápidas (< 150 ms), perdas de foco da
    janela e redimensionamento de tela, resumidos num veredito de validade no relatório.
  * **Aquecimento obrigatório:** o teste principal só é liberado após a conclusão do aquecimento
    (8 estímulos), com recomendação de repetir se houver muitos erros.
  * **Comparação normativa:** percentil e classificação por faixa etária (Tombaugh, 2004), com
    ressalva explícita de que são normas de papel (uso indicativo).
  * **Metadados de dispositivo/ambiente** registrados como covariáveis na exportação.
  * **Exportação:** **CSV** (incluindo *trial-by-trial* e a forma aplicada), **JSON** completo (com
    trajetória, coordenadas e metadados) e impressão/PDF.
  * **Acessibilidade:** estímulos como `<button>` com `aria-label`, ativação por **teclado**
    (Enter/Espaço), regiões `aria-live`, foco visível e respeito a `prefers-reduced-motion`.
  * **Privacidade (LGPD):** todo o processamento é **local no navegador**; nenhum dado é enviado a
    servidores ou serviços de terceiros. "Salvar" grava apenas no armazenamento local do dispositivo
    (metadados minimizados, sem `userAgent`).

-----

## 🧩 Gerador de Formas Paralelas (`layoutGenerator.js`)

Módulo **offline**, sem dependências, determinístico por *seed*, que produz arranjos de 25 itens via
**amostragem-com-rejeição sobre grade**, controlando os invariantes geométricos que tornam duas formas
estatisticamente equivalentes para reteste longitudinal (Reitan; Vickers et al. 1996/1998; Gaudino et
al. 1995; TMT-L/Rodewald 2020).

### Invariantes controlados
1. **Não-cruzamento** — a trilha-solução 1→25 é uma poligonal simples (rejeita candidato cujo novo
   segmento cruze um anterior).
2. **Não-sobreposição** — distância mínima entre centros ≥ `minDist` (diâmetro do círculo + margem).
3. **Cobertura (convex hull)** — área do *hull* dentro de uma janela (default **58–72%**, casando o
   original medido ~66%).
4. **Deslocamento controlado** — passo N→N+1 ~ **Poisson(μ)** em unidades de grade grosseira, com
   **piso/teto**. Com μ=5 e grade de 1/16, o passo médio ≈ 0.31 — igual ao original (0.304 ± 0.120).
5. **Near-distractors** — densidade média de itens não-alvo num raio crítico por passo (parâmetro
   casável entre formas, não acaso).
6. **Distribuição angular** — as mudanças de direção são amostradas de um histograma calibrado ao
   original (viradas predominantemente 120–180°), e registradas para casamento.

### Referência e equivalência
`REFERENCE_TMT_A` guarda as coordenadas digitalizadas da figura clássica; `REFERENCE_METRICS` o seu
vetor de invariantes. `isEquivalent(metricsA, metricsB, tolerances)` aceita uma forma só se ela cair
nas janelas de tolerância de **todos** os invariantes. As tolerâncias default vivem em
`DEFAULT_TOLERANCES` (hull ±0.06; comprimento ±12%; passo médio ±0.035; dp ±0.045; viradas ±18°;
near-distractors ±0.6; cruzamentos = 0).

### Métricas expostas (objeto + CSV/JSON)
`computeMetrics(points)` retorna: comprimento total da trilha; distância média e desvio entre
consecutivos; nº de cruzamentos (0); área do convex hull (absoluta e % do campo); near-distractors em
R∈{0.15, 0.20, 0.25}; média e histograma das mudanças de direção.

### Como gerar um conjunto equivalente (CLI)
```bash
# 6 formas equivalentes à referência, a partir do seed 1, + forma de aquecimento
node layoutGenerator.js --count 6 --seedStart 1 --out forms.generated.json
```
Saída: tabela de métricas (referência + cada forma) no console e o banco em `forms.generated.json`
(coordenadas + métricas + *seed* de cada forma). Para **reproduzir uma forma exata**, basta o seed:
```js
const G = require('./layoutGenerator.js');
const forma = G.generateLayout({ seed: 19 });        // determinístico
const set   = G.generateEquivalentSet({ count: 6, seedStart: 1, tolerances: { turnMean: 15 } });
```

### QA visual (`qa.html`)
Abra `qa.html` no navegador: ele carrega `layoutGenerator.js`, gera N formas a partir de um *seed*,
mostra **referência + formas lado a lado** (SVG) e uma **tabela de métricas com selo de equivalência**
(vermelho = invariante fora da janela). Botões exportam CSV/JSON. Use para inspecionar/casar formas
antes de "congelar" o banco no app.

### Como o banco entra no app
As coordenadas vetadas são **congeladas** em `index.html` (constante `FORMS` + `FORM_META` com o seed e
as métricas de cada forma) e `forms.generated.json` fica versionado para rastreabilidade. O app **não**
gera em runtime (escolha de padronização clínica); toda a administração — cronometria, ordem de
cliques, detecção de erro, validade, export — permanece intacta.

-----

## 🚀 Como Usar

A aplicação é independente e não requer instalação nem conexão de rede.

1.  **Abra o arquivo** `index.html` em um navegador moderno (Chrome, Firefox, Edge, Safari).
2.  **Leia as instruções e o aviso metodológico** na tela inicial.
3.  **Faça o aquecimento** (obrigatório) clicando em **"Começar Aquecimento"**.
4.  **Inicie o teste** em **"Começar Teste Principal"** (uma contagem regressiva prepara o início).
5.  **Execute a tarefa:** clique/toque nos círculos em ordem crescente (1, 2, 3, ...) o mais rápido e
    precisamente possível. Uma linha conecta automaticamente os números já ligados.
6.  **Veja o relatório** detalhado, exibido automaticamente ao final.

-----

## 🛠️ Tecnologias

Construído sem dependências externas:

  * **HTML5**, **CSS3** (variáveis, Grid/Flexbox, *media queries*) e **JavaScript (ES6+)** puro.
  * `index.html` — aplicação (classe `TMTTest`): administração, cronometria, render e relatório.
  * `layoutGenerator.js` — gerador offline de formas paralelas (Node + browser), determinístico.
  * `qa.html` — página de QA visual da equivalência.
  * `forms.generated.json` — banco congelado de formas vetadas (coordenadas + métricas + seeds).

-----

## 👨‍💻 Para Desenvolvedores e Pesquisadores

Utilitários disponíveis no console do navegador:

  * `TMTUtils.analyzeAllSessions()` — resumo das sessões salvas no `localStorage`.
  * `TMTUtils.getStatistics()` — estatísticas detalhadas (tempo, erros, acurácia).
  * `TMTUtils.exportAllData()` — baixa um JSON com todas as sessões salvas.
  * `TMTUtils.clearAllData()` — remove todos os dados locais (com confirmação).

-----

## 📏 Notas Psicométricas e Limitações

  * **Equivalência não presumida:** comparar a versão digital às normas de papel é apenas indicativo.
    Para uso clínico, é necessário estabelecer **invariância de medida** e **normas próprias** em
    amostra pareada.
  * **Construto vs. aparência:** o componente grafomotor digital (clicar/tocar) difere do desenho à
    mão livre da versão em papel. As distâncias variadas e o espalhamento dos estímulos aproximam a
    demanda de busca visual da folha clássica, mas a tendência a não cruzar a trilha e o uso de formas
    paralelas fixas tornam esta uma tarefa distinta da versão em papel.
  * **Confundimento motor:** a decomposição decisão/movimento ajuda a separar cognição de
    motricidade, mas respostas dependentes de destreza fina ainda podem penalizar pacientes com
    bradicinesia/tremor/hemiparesia.
  * **Validade de esforço:** escores baixos só são interpretáveis com esforço adequado; observe os
    indicadores de validade do relatório.
  * **Quando não usar a versão digital:** limitações sensório-motoras, afasia ou desconforto com
    dispositivos podem tornar a testagem por examinador preferível.

-----

## 📂 Estrutura do Projeto

  * `index.html` — aplicação completa (HTML + CSS + JS na classe `TMTTest`); embute o banco vetado.
  * `layoutGenerator.js` — gerador offline de formas paralelas (módulo + CLI), determinístico por seed.
  * `qa.html` — QA visual: referência + formas lado a lado, métricas e selo de equivalência.
  * `forms.generated.json` — banco congelado (coordenadas, métricas e seeds das formas vetadas).

-----

## 📄 Licença

Licenciado sob a Licença MIT.
