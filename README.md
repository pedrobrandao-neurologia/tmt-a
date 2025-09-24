Claro, aqui está um README completo e bem-estruturado para o seu código, escrito em Markdown.

-----

# Teste de Trilhas - Parte A (TMT-A) - Versão Aprimorada 🧠

Uma implementação digital interativa e aprimorada do **Trail Making Test Parte A (TMT-A)**, uma ferramenta neuropsicológica clássica usada para avaliar a atenção visual, velocidade de processamento, e sequenciamento motor.

Este projeto foi desenvolvido como uma ferramenta robusta para pesquisa e avaliação, oferecendo coleta de dados detalhada, feedback em tempo real e um relatório de resultados completo.

## ✨ Recursos Principais

Este projeto vai além de uma simples digitalização do teste, incorporando recursos avançados para uma avaliação mais completa:

  * **Fases do Teste:** Um fluxo claro que inclui **Instruções**, um **Aquecimento** para familiarização, o **Teste Principal** e uma tela de **Resultados Detalhados**.
  * **Coleta de Dados Rica:** Registra não apenas o tempo total e os erros, mas também o tempo de cada conexão, a sequência de cliques e a trajetória do cursor.
  * **Métricas Avançadas:** Calcula automaticamente métricas importantes como:
      * **Eficiência Espacial:** A razão entre a distância ótima e a distância percorrida.
      * **Velocidade de Processamento:** Tempo médio por conexão.
      * **Variabilidade de Desempenho (CV):** Mede a consistência da velocidade ao longo do teste.
      * **Velocidade Inicial vs. Final:** Compara o desempenho no início e no final do teste.
  * **Comparação Normativa:** Permite comparar o desempenho do usuário com dados normativos baseados em faixas etárias (referência: Tombaugh, 2004), fornecendo percentil e classificação.
  * **Relatório de Resultados Completo:** Um modal interativo exibe todos os dados de desempenho, métricas temporais, comparação normativa e um gráfico de padrão de erros.
  * **Exportação de Dados:** Os resultados podem ser exportados em múltiplos formatos para análise posterior: **CSV**, **JSON** e um relatório em **PDF** (via impressão).
  * **Opções de Acessibilidade:**
      * **Modo de Alto Contraste:** Para melhor visibilidade.
      * **Círculos Maiores:** Aumenta o tamanho dos alvos para facilitar o clique.
  * **Feedback Interativo:** Animações e sons (opcionais) para acertos e erros, melhorando a experiência do usuário.
  * **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a tablets.

-----

## 🚀 Como Usar

A aplicação é totalmente independente e não requer instalação.

1.  **Abra o arquivo:** Basta abrir o arquivo `index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge, Safari).
2.  **Leia as Instruções:** A tela inicial explicará a tarefa.
3.  **Faça o Aquecimento:** Clique em **"Começar Aquecimento"** para uma versão mais curta e se familiarizar com a tarefa.
4.  **Inicie o Teste:** Após o aquecimento, clique em **"Começar Teste Principal"**. Uma contagem regressiva preparará você para o início.
5.  **Execute a Tarefa:** Clique nos círculos em ordem numérica crescente (1, 2, 3, ...) o mais rápido e precisamente que puder.
6.  **Veja os Resultados:** Ao final, um relatório detalhado será exibido automaticamente.

-----

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído intencionalmente sem dependências externas para garantir portabilidade e facilidade de uso.

  * **HTML5:** Estrutura semântica do conteúdo.
  * **CSS3:** Estilização moderna com variáveis CSS para fácil customização, animações e layout responsivo (Flexbox e Grid).
  * **JavaScript (ES6+):** Toda a lógica do teste, manipulação do DOM, cálculos de métricas e interatividade são implementados em JavaScript puro, organizado em uma estrutura de classe (`TMTTest`).

-----

## 👨‍💻 Para Desenvolvedores e Pesquisadores

A aplicação inclui um conjunto de funções utilitárias que podem ser acessadas através do console do navegador para gerenciamento de dados salvos localmente.

  * `TMTUtils.analyzeAllSessions()`: Retorna um resumo de todas as sessões salvas no `localStorage`, incluindo média de tempo e erros.
  * `TMTUtils.exportAllData()`: Gera e faz o download de um arquivo JSON contendo os dados de todas as sessões salvas.
  * `TMTUtils.clearAllData()`: Limpa todos os dados de sessões e configurações salvas no `localStorage` (pede confirmação).

-----

## 📂 Estrutura do Projeto

Tudo o que você precisa está em um único arquivo:

  * `index.html`: Contém a estrutura HTML, os estilos CSS e o código JavaScript.

-----

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
