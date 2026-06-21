# Teste de Trilhas - Parte A (TMT-A) - Versão Aprimorada 🧠

Uma implementação digital interativa do **Trail Making Test Parte A (TMT-A)**, ferramenta
neuropsicológica clássica usada para avaliar atenção visual, velocidade de processamento e
sequenciamento. Esta versão foi reescrita com foco em **rigor de cronometria**, **layout responsivo
sem sobreposição de estímulos** e nas **boas práticas de adaptação papel→digital** descritas na
literatura (AACN/NAN; ITC; AERA/APA *Standards*).

> ⚠️ **Aviso metodológico e clínico.** Uma versão digital de um teste tradicional é,
> psicometricamente, um **teste novo**. Esta ferramenta **não tem finalidade diagnóstica** e não
> substitui a avaliação neuropsicológica presencial. As normas exibidas baseiam-se na versão em
> **papel** (Tombaugh, 2004) e servem apenas como referência aproximada — a equivalência de medida e
> normas próprias da versão digital ainda precisam ser estabelecidas.

-----

## ✨ Recursos Principais

  * **Fases do teste:** Instruções → **Aquecimento obrigatório** → **Teste Principal** →
    **Relatório**. O teste principal só é liberado após a conclusão do aquecimento.
  * **Layout responsivo anti-sobreposição:** os estímulos são posicionados por um algoritmo de
    **grade com *jitter*** que **garante ausência de sobreposição** em qualquer tamanho de tela. Ao
    redimensionar/girar o dispositivo, o layout é **reescalado** (via `ResizeObserver`) mantendo a
    folga entre círculos e sem que nenhum estímulo saia da área de teste.
  * **Cronometria de alta resolução:** todas as medidas de tempo usam `performance.now()`
    (monotônico, sub-ms), com o *timestamp* capturado no `pointerdown` (evento mais próximo do
    input). A taxa de atualização efetiva do display (Hz) é medida e registrada.
  * **Dissociação cognição × motricidade:** para mouse, cada conexão é decomposta em **tempo de
    decisão** (latência até o início do movimento) e **tempo de movimento** (execução motora) —
    importante para minimizar o confundimento motor em transtornos do movimento. Em toque/teclado,
    esses componentes aparecem como `N/A`.
  * **Eficiência de trajetória real:** quando há trajetória de ponteiro (mouse), calcula-se a razão
    entre a distância ótima e a distância efetivamente percorrida. Sem trajetória (toque/teclado),
    é exibida como `N/A`.
  * **Métricas avançadas:** tempo médio/menor/maior por conexão, variabilidade (CV), velocidade
    inicial/mediana/final, índice de fadiga e análise de erros por tipo (repetição, antecipação,
    sequência).
  * **Indicadores de validade:** sinalização de respostas implausivelmente rápidas (< 150 ms),
    perdas de foco da janela durante o teste e redimensionamento de tela — resumidos num veredito de
    validade no relatório.
  * **Comparação normativa:** percentil e classificação por faixa etária (Tombaugh, 2004), com
    ressalva explícita de que são normas de papel (uso indicativo).
  * **Metadados de dispositivo/ambiente:** modalidade de resposta, taxa de atualização, *pixel
    ratio*, viewport, fuso, etc., registrados como covariáveis na exportação.
  * **Exportação de dados:** **CSV** (incluindo *trial-by-trial*), **JSON** completo (com trajetória
    e metadados) e impressão/PDF.
  * **Acessibilidade:** modo de **alto contraste** funcional, opção de **círculos maiores**,
    estímulos como `<button>` com `aria-label`, ativação por **teclado** (Enter/Espaço), regiões
    `aria-live` e respeito a `prefers-reduced-motion`.
  * **Privacidade (LGPD):** todo o processamento é **local no navegador**; nenhum dado é enviado a
    servidores ou serviços de terceiros. "Salvar" grava apenas no armazenamento local do dispositivo
    (com metadados minimizados, sem `userAgent`).

-----

## 🚀 Como Usar

A aplicação é independente e não requer instalação nem conexão de rede.

1.  **Abra o arquivo** `index.html` em um navegador moderno (Chrome, Firefox, Edge, Safari).
2.  **Leia as instruções e o aviso metodológico** na tela inicial.
3.  **Faça o aquecimento** (obrigatório) clicando em **"Começar Aquecimento"**. Recomenda-se repetir
    o aquecimento se houver muitos erros.
4.  **Inicie o teste** em **"Começar Teste Principal"** (uma contagem regressiva prepara o início).
5.  **Execute a tarefa:** clique/toque nos círculos em ordem crescente (1, 2, 3, ...) o mais rápido
    e precisamente possível.
6.  **Veja o relatório** detalhado, exibido automaticamente ao final.

-----

## 🛠️ Tecnologias

Construído sem dependências externas, em um único arquivo:

  * **HTML5**, **CSS3** (variáveis, Grid/Flexbox, *media queries*) e **JavaScript (ES6+)** puro,
    organizado na classe `TMTTest`.

-----

## 👨‍💻 Para Desenvolvedores e Pesquisadores

Utilitários disponíveis no console do navegador:

  * `TMTUtils.analyzeAllSessions()` — resumo das sessões salvas no `localStorage`.
  * `TMTUtils.getStatistics()` — estatísticas detalhadas (tempo, erros, acurácia).
  * `TMTUtils.exportAllData()` — baixa um JSON com todas as sessões salvas.
  * `TMTUtils.clearAllData()` — remove todos os dados locais (com confirmação).

-----

## 📏 Notas Psicométricas e Limitações

  * **Equivalência não presumida:** comparar a versão digital às normas de papel é apenas
    indicativo. Para uso clínico, é necessário estabelecer **invariância de medida** e **normas
    próprias** em amostra pareada.
  * **Construto vs. aparência:** o componente grafomotor digital (clicar/tocar) difere do desenho à
    mão livre da versão em papel; interprete com isso em mente.
  * **Confundimento motor:** a decomposição decisão/movimento ajuda a separar cognição de
    motricidade, mas respostas dependentes de destreza fina ainda podem penalizar pacientes com
    bradicinesia/tremor/hemiparesia. Considere a modalidade de resposta adequada a cada caso.
  * **Validade de esforço:** escores baixos só são interpretáveis com esforço adequado; observe os
    indicadores de validade do relatório.
  * **Quando não usar a versão digital:** limitações sensório-motoras, afasia ou desconforto com
    dispositivos podem tornar a testagem por examinador preferível.

-----

## 📂 Estrutura do Projeto

  * `index.html` — estrutura HTML, estilos CSS e lógica JavaScript (tudo em um arquivo).

-----

## 📄 Licença

Licenciado sob a Licença MIT.
