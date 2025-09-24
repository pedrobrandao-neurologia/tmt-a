-----

# Teste de Trilhas - Parte A (TMT-A) - Versão Digital Aprimorada 🧠

[](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Esta é uma implementação digital aprimorada do **Teste de Trilhas Parte A (TMT-A)**, uma ferramenta de avaliação neuropsicológica. Esta versão foi projetada com foco nas melhores práticas de aplicação para garantir uma avaliação mais padronizada, clara e confortável para o participante.

O projeto é autocontido em um único arquivo HTML, não exigindo dependências externas, o que facilita sua distribuição e uso em diferentes ambientes.

## 📋 Índice

  * [Princípios Neuropsicológicos Aplicados](https://www.google.com/search?q=%23-princ%C3%ADpios-neuropsicol%C3%B3gicos-aplicados)
  * [✨ Funcionalidades](https://www.google.com/search?q=%23-funcionalidades)
  * [🚀 Tecnologias Utilizadas](https://www.google.com/search?q=%23-tecnologias-utilizadas)
  * [🔧 Como Usar](https://www.google.com/search?q=%23-como-usar)
  * [📊 Dados e Métricas Coletadas](https://www.google.com/search?q=%23-dados-e-m%C3%A9tricas-coletadas)
  * [📤 Exportação de Dados](https://www.google.com/search?q=%23-exporta%C3%A7%C3%A3o-de-dados)
  * [💻 Comandos para Desenvolvedores](https://www.google.com/search?q=%23-comandos-para-desenvolvedores)
  * [🤝 Contribuição](https://www.google.com/search?q=%23-contribui%C3%A7%C3%A3o)
  * [📄 Licença](https://www.google.com/search?q=%23-licen%C3%A7a)

-----

## 🧠 Princípios Neuropsicológicos Aplicados

Esta versão foi aprimorada para ir além da simples digitalização, incorporando princípios que aumentam a validade e a confiabilidade da avaliação:

1.  **Padronização das Instruções:** O teste apresenta um script de instruções fixo e em linguagem acolhedora, garantindo que todos os participantes recebam as mesmas orientações, reduzindo a variabilidade do aplicador.

2.  **Redução da Carga Cognitiva Irrelevante:** Durante a execução da tarefa, elementos visuais que não são essenciais (como estatísticas de progresso e erros) são ocultados. Isso permite que o participante foque 100% na tarefa principal, minimizando distrações.

3.  **Feedback Construtivo e Não Punitivo:** Ao cometer um erro, a mensagem de feedback foi cuidadosamente elaborada para ser diretiva ("Atenção\! Por favor, continue a partir do número X") em vez de alarmante ("Erro\!"). Isso reduz a ansiedade de desempenho, que poderia impactar negativamente o resultado.

4.  **Preparação e Ritmo:** Uma contagem regressiva ("3, 2, 1, JÁ\!") foi adicionada antes de cada fase. Isso permite que o participante se prepare mentalmente, posicione o cursor e inicie a tarefa em um estado de prontidão, melhorando a precisão da cronometragem inicial.

5.  **Resultados Contextualizados:** O relatório final agora inclui um seletor de faixa etária, que personaliza a comparação com os dados normativos. Isso torna a análise mais relevante e fácil de interpretar, além de incluir uma explicação clara do que é o "percentil".

-----

## ✨ Funcionalidades

  * **Fases de Aquecimento e Teste:** Um aquecimento com 8 números garante a compreensão da tarefa antes do teste principal com 25 números.
  * **Contagem Regressiva Preparatória:** Prepara o participante e estabelece um ponto de partida claro para a cronometragem.
  * **Interface Focada:** Durante a tarefa, apenas o cronômetro e a área de teste ficam visíveis para maximizar a concentração.
  * **Relatório de Resultados Personalizado:**
      * Apresenta um resumo completo do desempenho (tempo, erros, eficiência).
      * Inclui um seletor de faixa etária que compara o desempenho diretamente com o grupo normativo correspondente (Tombaugh, 2004).
      * Fornece uma classificação de desempenho e o percentil com uma explicação clara.
  * **Análise Temporal Avançada:** Calcula métricas como tempo médio por conexão, variabilidade de ritmo (CV) e a diferença entre a velocidade inicial e final.
  * **Opções de Acessibilidade:**
      * Modo de **Alto Contraste**.
      * Opção para **Círculos Maiores**.
      * Controle de **efeitos sonoros** e visualização das **trilhas**.
  * **Múltiplos Formatos de Exportação:** Os resultados podem ser exportados em **CSV**, **JSON** ou preparados para impressão em **PDF**.
  * **Salvamento de Sessões:** Os dados de cada teste podem ser salvos localmente no navegador para análises longitudinais.

-----

## 🚀 Tecnologias Utilizadas

  * **HTML5:** Estrutura semântica e acessível.
  * **CSS3:** Estilização moderna e responsiva com Variáveis CSS, Flexbox e Grid.
  * **JavaScript (ES6+):** Lógica do teste, manipulação do DOM e cálculos, tudo encapsulado em uma classe `TMTTest` **sem dependências externas**.

-----

## 🔧 Como Usar

A utilização é extremamente simples:

1.  Baixe o arquivo `index.html` (ou o nome que você deu a ele).
2.  Abra o arquivo em qualquer navegador web moderno (Google Chrome, Firefox, Safari, Edge).
3.  O teste está pronto para ser usado. Siga as instruções na tela.

-----

## 📊 Dados e Métricas Coletadas

A aplicação coleta uma variedade de dados para uma análise detalhada:

  * **Desempenho Geral:** Tempo total, total de erros, taxa de erro (%), números conectados.
  * **Métricas Temporais:** Tempo médio por conexão, variabilidade (CV), velocidade no primeiro terço vs. último terço do teste.
  * **Métricas Espaciais:** Eficiência do traçado (relação entre a distância ideal e a percorrida).
  * **Análise de Erros:** Classificação dos erros em `repetição`, `antecipação` ou `sequência`.
  * **Dados Brutos:** Timestamp de cada clique, qual número foi clicado e qual era o esperado.

-----

## 📤 Exportação de Dados

Os resultados podem ser salvos para análise externa:

  * **CSV:** Ideal para planilhas e software estatístico.
  * **JSON:** Formato estruturado para armazenamento completo dos dados da sessão.
  * **Gerar PDF:** Utiliza a funcionalidade de impressão do navegador para criar um relatório limpo.
  * **Salvar Localmente:** Armazena os dados no `localStorage` do navegador.

-----

## 💻 Comandos para Desenvolvedores

Para pesquisadores e usuários avançados, funções utilitárias estão disponíveis no console do navegador:

  * **`TMTUtils.analyzeAllSessions()`:** Exibe uma análise agregada de todas as sessões salvas.
  * **`TMTUtils.exportAllData()`:** Faz o download de um arquivo JSON com os dados de todas as sessões.
  * **`TMTUtils.clearAllData()`:** Apaga todos os dados de testes e configurações salvas no navegador (pede confirmação).

-----

## 🤝 Contribuição

Contribuições são bem-vindas. Se você tiver sugestões para melhorar o teste, adicionar funcionalidades ou corrigir bugs, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

-----

## 📄 Licença

Este projeto é distribuído sob a licença MIT.
