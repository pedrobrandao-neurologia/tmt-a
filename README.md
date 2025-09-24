Claro\! Aqui está uma proposta de `README.md` bem completa para o seu projeto, escrita em português e formatada em Markdown.

-----

# Trail Making Test - Parte A (TMT-A) - Implementação Digital 🧠

Esta é uma implementação digital e interativa do **Teste de Trilhas Parte A (TMT-A)**, uma ferramenta neuropsicológica clássica usada para avaliar a velocidade de processamento visual, atenção, sequenciamento e busca visual.

Este projeto foi desenvolvido como uma aplicação web autocontida (single-file), utilizando apenas HTML, CSS e JavaScript puro, sem a necessidade de dependências externas, garantindo portabilidade e facilidade de uso.

## 📋 Índice

  * [Sobre o Projeto](https://www.google.com/search?q=%23sobre-o-projeto)
  * [✨ Funcionalidades](https://www.google.com/search?q=%23-funcionalidades)
  * [🚀 Tecnologias Utilizadas](https://www.google.com/search?q=%23-tecnologias-utilizadas)
  * [🔧 Como Usar](https://www.google.com/search?q=%23-como-usar)
  * [📊 Dados e Métricas Coletadas](https://www.google.com/search?q=%23-dados-e-m%C3%A9tricas-coletadas)
  * [📤 Exportação de Dados](https://www.google.com/search?q=%23-exporta%C3%A7%C3%A3o-de-dados)
  * [💻 Comandos para Desenvolvedores](https://www.google.com/search?q=%23-comandos-para-desenvolvedores)
  * [🤝 Contribuição](https://www.google.com/search?q=%23-contribui%C3%A7%C3%A3o)
  * [📄 Licença](https://www.google.com/search?q=%23-licen%C3%A7a)

-----

## Sobre o Projeto

O TMT-A consiste em conectar, o mais rápido possível, uma sequência de 25 números distribuídos aleatoriamente em uma página. Esta versão digital não apenas replica a tarefa principal, mas também a enriquece com coleta de dados detalhada, análise de desempenho em tempo real e um relatório de resultados robusto.

A aplicação inclui:

1.  **Fase de Instruções:** Orientações claras para o usuário.
2.  **Fase de Prática:** Um teste mais curto (8 números) para familiarização.
3.  **Fase de Teste:** O teste completo com 25 números e tempo limite de 5 minutos.
4.  **Fase de Resultados:** Um modal com análise detalhada do desempenho.

-----

## ✨ Funcionalidades

  * **Modo de Prática e Teste:** Permite que o usuário se familiarize com a interface antes de iniciar o teste principal.
  * **Geração Aleatória dos Círculos:** Os números são posicionados de forma aleatória a cada novo teste, garantindo a novidade da tarefa e evitando o efeito de memorização da disposição.
  * **Feedback em Tempo Real:** O usuário acompanha o tempo, o número de erros e o progresso durante a execução do teste.
  * **Relatório de Resultados Detalhado:** Ao final, um relatório completo é apresentado, incluindo:
      * Desempenho Geral (tempo, erros).
      * Análise Temporal (velocidade média, variabilidade, velocidade inicial vs. final).
      * **Comparação com Dados Normativos** baseados em faixas etárias (referência: Tombaugh, 2004).
  * **Opções de Acessibilidade:**
      * Modo de **Alto Contraste**.
      * Opção para **Círculos Maiores**.
      * Ativar/Desativar **efeitos sonoros**.
      * Mostrar/Ocultar as **trilhas** de conexão.
  * **Múltiplos Formatos de Exportação:** Os resultados podem ser exportados em CSV, JSON ou gerados em um formato amigável para impressão (PDF).
  * **Salvamento de Sessões no Navegador:** Opção para salvar os resultados de cada teste no `localStorage` do navegador para análise posterior.
  * **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a tablets.

-----

## 🚀 Tecnologias Utilizadas

  * **HTML5:** Estrutura semântica do conteúdo.
  * **CSS3:** Estilização moderna, com variáveis CSS, Flexbox, Grid Layout e animações.
  * **JavaScript (ES6+):** Lógica do teste, manipulação do DOM, cálculo de métricas e interatividade, tudo estruturado em uma classe `TMTTest`.

-----

## 🔧 Como Usar

Como este projeto é um único arquivo HTML, usá-lo é extremamente simples:

1.  Clone este repositório ou simplesmente baixe o arquivo `index.html`.
2.  Abra o arquivo `index.html` em qualquer navegador web moderno (Google Chrome, Firefox, Safari, Edge).
3.  Siga as instruções na tela para iniciar o teste.

-----

## 📊 Dados e Métricas Coletadas

A aplicação vai além do tempo total e coleta diversas métricas para uma análise mais rica:

  * **Tempo Total:** Tempo em segundos para completar o teste.
  * **Total de Erros:** Número de cliques incorretos.
  * **Taxa de Erro:** Percentual de cliques que foram erros.
  * **Tempo Médio por Conexão:** Média de tempo entre cliques corretos consecutivos.
  * **Variabilidade (CV):** Coeficiente de variação dos tempos de conexão, indicando a consistência do ritmo.
  * **Velocidade Inicial vs. Final:** Comparação do tempo médio de conexão no primeiro e no último terço do teste, útil para analisar efeitos de fadiga ou aprendizado.
  * **Eficiência Espacial:** Razão entre a distância ideal (linha reta entre números) e a distância percorrida pelo mouse (a ser implementada), indicando a eficiência do traçado.
  * **Tipos de Erros:** Classificação dos erros em:
      * `repetition`: Clicar em um número já conectado.
      * `anticipation`: Clicar no número N+2 em vez de N+1.
      * `sequence`: Outros erros de sequência.

-----

## 📤 Exportação de Dados

Os resultados podem ser salvos e analisados externamente através dos seguintes formatos:

  * **CSV:** Ideal para planilhas (Excel, Google Sheets) e análise estatística (R, Python). Inclui um resumo e dados brutos de cada clique.
  * **JSON:** Formato estruturado, útil para integração com outras aplicações e para armazenamento de dados completos da sessão.
  * **Gerar PDF:** Utiliza a funcionalidade de impressão do navegador para criar um relatório visualmente limpo e pronto para ser salvo como PDF.
  * **Salvar Localmente:** Armazena os dados da sessão no `localStorage` do navegador para consulta futura através do console.

-----

## 💻 Comandos para Desenvolvedores

Para pesquisadores e desenvolvedores, algumas funções utilitárias estão disponíveis no console do navegador:

  * **`TMTUtils.analyzeAllSessions()`:** Mostra uma análise agregada de todas as sessões salvas localmente.
  * **`TMTUtils.exportAllData()`:** Exporta um arquivo JSON contendo os dados de todas as sessões salvas.
  * **`TMTUtils.clearAllData()`:** Limpa todos os dados de sessões e configurações salvas no navegador (pede confirmação).

-----

## 🤝 Contribuição

Contribuições são bem-vindas\! Se você tem sugestões para melhorar o teste, adicionar novas funcionalidades ou corrigir bugs, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

-----

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
