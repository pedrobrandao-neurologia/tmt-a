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

  * **Layout fixo e padronizado:** os 25 estímulos seguem **formas pré-definidas e verificadas**, não
    posições aleatórias. Isso elimina a variação de dificuldade entre aplicações.
  * **Trilha que nunca se cruza:** o caminho 1→25 é uma poligonal simples (sem auto-interseções),
    gerada por uma caminhada auto-evitante.
  * **Distância constante entre estímulos:** todos os segmentos consecutivos têm **exatamente o mesmo
    comprimento**, e esse comprimento é **idêntico em todas as tentativas** (verificado
    automaticamente). Estímulos próximos e regulares evitam que a distância influencie o escore.
  * **6 versões alternadas:** seis formas diferentes (mesma estrutura de distâncias) são aplicadas em
    rodízio automático a cada nova tentativa no dispositivo, mitigando o **efeito de aprendizado** em
    reteste.
  * **Área quadrada responsiva:** os estímulos são mapeados numa área quadrada centralizada, de modo
    que as distâncias permanecem iguais em qualquer tela/orientação; ao redimensionar/girar, o layout
    é reescalado proporcionalmente, sem sobreposição e sem sair da área.
  * **Sem customização que afete o construto:** não há ajustes de tamanho de círculo, trilha ou
    contraste — tudo é padronizado para garantir comparabilidade dos escores.

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

  * **Equivalência não presumida:** comparar a versão digital às normas de papel é apenas indicativo.
    Para uso clínico, é necessário estabelecer **invariância de medida** e **normas próprias** em
    amostra pareada.
  * **Construto vs. aparência:** o componente grafomotor digital (clicar/tocar) difere do desenho à
    mão livre da versão em papel; a padronização das distâncias também aproxima a tarefa de uma de
    sequenciamento/atenção mais "limpa", com menor busca visual ampla do que a folha clássica.
  * **Confundimento motor:** a decomposição decisão/movimento ajuda a separar cognição de
    motricidade, mas respostas dependentes de destreza fina ainda podem penalizar pacientes com
    bradicinesia/tremor/hemiparesia.
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
