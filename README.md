Teste de Trilhas - Parte A (TMT-A) - Versão Otimizada e Corrigida
Esta é uma versão refatorada e sucinta do TMT-A digital, focada na essência da avaliação neuropsicológica, com um código mais leve e correções importantes para aumentar a validade do teste.

O projeto continua autocontido em um único arquivo HTML, sem dependências, garantindo máxima portabilidade e facilidade de uso.

📋 Índice
Filosofia das Alterações

✨ Funcionalidades Principais

🚀 Tecnologias Utilizadas

🔧 Como Usar

📄 Licença

🧠 Filosofia das Alterações
Esta versão foi reescrita com três objetivos principais em mente:

Foco na Tarefa Essencial: A interface foi simplificada para remover dicas e distrações. A remoção do destaque visual (highlight) do próximo número exige que o participante realize uma busca visual ativa, alinhando a tarefa digital à sua versão original em papel e lápis e medindo de forma mais pura a atenção sustentada e a velocidade de busca.

Validade Psicométrica Aprimorada: O cálculo do percentil foi ajustado para refletir corretamente que, em testes de tempo, um desempenho mais rápido (menor tempo) resulta em um percentil mais alto (melhor classificação). A fórmula anterior estava invertida, o que foi corrigido nesta versão.

Simplicidade e Leveza: O código foi drasticamente enxuto, removendo mais da metade das linhas. Funções complexas como o modal de resultados detalhados, gráficos, múltiplas estatísticas em tempo real e a exportação de dados foram substituídas por uma apresentação de resultados direta e um código-fonte significativamente mais fácil de ler, manter e modificar.

✨ Funcionalidades Principais
Apesar da simplicidade, a ferramenta mantém as funcionalidades cruciais para uma avaliação eficaz:

Fases de Aquecimento e Teste: Uma fase de prática curta (8 números) seguida pelo teste principal (25 números).

Contagem Regressiva: Prepara o participante antes de cada fase, garantindo um início de cronometragem preciso.

Geração Aleatória dos Círculos: A posição dos números é sempre nova a cada teste para evitar o efeito de memorização.

Interface Limpa: Apenas o cronômetro e a contagem de erros são visíveis durante a tarefa, minimizando a carga cognitiva.

Resultados Imediatos e Contextualizados: Ao final do teste, o tempo total e os erros são exibidos. Um seletor de faixa etária permite comparar o desempenho com dados normativos (Tombaugh, 2004) e obter uma classificação e percentil instantaneamente.

🚀 Tecnologias Utilizadas
HTML5: Estrutura semântica do conteúdo.

CSS3: Estilização limpa e responsiva.

JavaScript (ES6+): Lógica do teste em uma classe TMTTest otimizada, sem nenhuma dependência externa.

🔧 Como Usar
A utilização é extremamente simples:

Salve o código como um arquivo .html.

Abra este arquivo em qualquer navegador web moderno (Google Chrome, Firefox, etc.).

O teste está pronto para ser usado.

📄 Licença
Este projeto é distribuído sob a licença MIT.
