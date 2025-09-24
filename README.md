# TMT-A Web (v2.0) — Trail Making Test A

Implementação **web estática** do **TMT-A** com **treino obrigatório**, temporização por `performance.now()`, **layout reprodutível** (seed por ID), verificação de **interseções do traço (crossings)**, métricas temporais (ICTs), métricas espaciais (comprimento/eficiência implícita do traço), **classificação de erros**, e exportação **CSV (resumo + detalhado)**. Pronto para **GitHub Pages** e compatível com desktop e dispositivos móveis.

> **Arquivo único**: `index.html`
> **Validade clínica**: tarefa **análoga** à versão lápis-papel. Recomenda-se validação local, padronização do ambiente e aprovação ética (CEP/IRB) quando aplicável.

---

## 1) Objetivo e racional

O TMT-A avalia **velocidade de processamento**, **atenção visual**, **busca visuoespacial** e **flexibilidade visuomotora** básica. Nesta versão, além do **tempo total**, registramos características do **trajeto** (comprimento e interseções) e **dinâmica temporal** entre cliques (Inter-Click Times, ICTs), fornecendo indicadores adicionais de **eficiência e consistência** do desempenho.

---

## 2) Como executar

### 2.1 Local

1. Baixe/clone o repositório.
2. Abra `index.html` no navegador (Chrome/Edge/Firefox/Safari atualizados).
3. Para evitar restrições de arquivo local, você pode servir a pasta com:

   ```bash
   python -m http.server 8000
   ```

### 2.2 GitHub Pages (recomendado)

1. Crie um repositório e faça commit do `index.html` na raiz.
2. **Settings → Pages** → *Deploy from a branch* → `main` / `(root)`.
3. Aguarde a publicação e acesse a URL gerada.

---

## 3) Procedimento (participante)

1. Informar **ID do participante** (alfanumérico).
2. **Treino (obrigatório)**: conectar **1→5** para familiarização.
3. **Teste**: conectar **1→25** o mais rápido e preciso possível, sem pular números.
4. Resposta por **clique** ou **Barra de Espaço** (com foco no alvo).
5. Tempo-limite de segurança: **5 minutos**.
6. Ao final, baixar **CSV detalhado** e/ou **CSV resumido**. Opcionalmente, **enviar (POST)** a um endpoint configurado.

**Boas práticas**: usar **tela cheia**, manter a aba ativa, minimizar distrações, garantir iluminação adequada e distância confortável da tela.

---

## 4) Parâmetros e aleatorização

* **Nós**: 1 a 25 (TMT-A).
* **Layout**: distribuição pseudo-aleatória **Poisson-like** com **distância mínima** entre nós (evita sobreposição).
* **Seed**: derivada do **ID do participante** (reprodutível por sujeito).
* **Níveis de densidade**: *Padrão*, *Denso*, *Espaçado* (gap/tamanho ajustáveis).
* **Treino obrigatório** (1→5) antes do teste principal.

---

## 5) Métricas registradas

* **Tempo total** (ms, `performance.now()`): do primeiro clique válido (“1”) até o último alvo.
* **Erros** (contados e classificados):

  * `perseveration` (repetição/antecipação: clica número já passado),
  * `skip_ahead` (salta exatamente 1 número),
  * `sequence` (fora de sequência geral).
* **ICTs** (Inter-Click Times): série temporal entre acertos consecutivos; **média** e **desvio-padrão** (proxy de consistência).
* **Trajeto**:

  * **Comprimento total do traço** (px),
  * **Interseções (crossings)** entre segmentos do próprio traço (indicador de desorganização espacial).
* **Progresso**: fração de nós corretamente conectados.
* **Metadados**: versão, seed, ID, modo de densidade, agente de usuário, dimensões de tela, data/hora ISO.

> Observação: “eficiência espacial” não é reportada diretamente como percentual, mas pode ser inferida do **comprimento do traço** e **crossings**. Valores maiores de comprimento e crossings tendem a refletir busca menos eficiente.

---

## 6) Saída de dados

### 6.1 CSV **resumo** (`tmta_summary_<ID>.csv`)

Primeira linha (comentário): metadados da sessão em JSON.

**Colunas**:

* `pid`, `level`, `training` (0/1), `completed` (0/1),
* `total_ms`, `total_s`,
* `hits` (nº de acertos), `errors` (nº total),
* `trace_len_px` (comprimento do traço), `crossings`,
* `ict_mean_ms`, `ict_sd_ms`,
* `seed`, `version`.

### 6.2 CSV **detalhado** (`tmta_detail_<ID>.csv`)

Primeira linha (comentário): metadados da sessão em JSON.

**Seções**:

1. **Eventos** (uma linha por evento de clique):

   * `pid`,`event` (`hit`/`error`),`n` (clicado),`expected` (esperado),`t_ms_from_start`.

2. **Clicks válidos** (para reconstrução do traço):

   * `idx`,`n`,`t_ms_from_start`.

3. **Erros classificados**:

   * `t_ms_from_start`,`clicked`,`expected`,`type`.

---

## 7) Interpretação e QC (sugestões)

* **Concluir em < 180–240 s** é usual em adultos sem comprometimento (varia por idade/escolaridade; **não usar** estes números como norma local).
* **Erros**: taxas elevadas (`sequence`/`skip_ahead`) e **crossings** numerosos sugerem busca desorganizada.
* **ICT**: maior **média** e **variabilidade** (SD) indicam latências e inconsistência temporal; útil como complemento ao tempo total.
* **Critérios de exclusão/atenção** (ajustar ao protocolo):

  * interrupções externas, trocas de aba, falta de treino, erro técnico,
  * uso de dispositivo com glitches de input,
  * não cumprimento do tempo mínimo ou padrão de respostas claramente aleatórias.

> **Normatividade**: esta versão digital não deve ser equiparada 1:1 a normas de papel-lápis. Se desejar normatização, execute **amostra local** estratificada (idade/escolaridade) e estime **pontos de corte** e **percentis** específicos para o seu ambiente e dispositivo.

---

## 8) Acessibilidade e usabilidade

* **Alto contraste**, **alvos maiores**, controle por **teclado** (Barra de Espaço/Enter com foco no alvo).
* **Feedback sonoro** curto (quando o áudio do navegador estiver liberado pelo usuário).
* **Responsivo** (desktop/tablet/celular). Recomenda-se tela cheia e evitar *low-power mode* em mobile.

---

## 9) Privacidade, ética e segurança

* O **ID** é livre (ex.: código alfanumérico) e compõe a **semente** do layout.
* O app **não** envia dados a servidores por padrão.
* O envio só ocorre se você configurar um endpoint (ver abaixo) **e** clicar em **Enviar (POST)**.
* Use termos de **consentimento** e armazenamento seguro de dados conforme legislação local (LGPD/GDPR).

---

## 10) Integração (opcional): envio de dados (POST)

No topo do `index.html`, defina:

```js
const POST_ENDPOINT = "https://sua-funcao.exemplo/collect";
```

**Payload JSON** inclui:

* `session` (metadados), `nodes` (layout), `clicks` (acertos), `errors` (erros), `detail` (eventos),
* `totals` (comprimento, crossings, tempo).

> Implementações simples: **Google Apps Script** (Web App), **Netlify Functions**, **Cloud Functions**.
> **Não** exponha endpoint público sem rate-limit/validação.

---

## 11) Limitações conhecidas

* Diferenças de **tamanho de tela**, **DPI** e **latência de input** podem afetar tempos e trajetória.
* O **cursor** e o **clique** substituem o traçado lápis-papel; embora o canvas registre o caminho entre nós, micro-trajetos intranós não são capturados.
* “Crossings” são calculados sobre segmentos **entre nós sucessivos** (não avaliam toque fora do caminho).

---

## 12) Desenvolvimento

* **Stack**: HTML/CSS/JS puros, sem dependências.
* **Timing**: `performance.now()`;
* **PRNG**: `mulberry32` com seed FNV-1a(ID|level);
* **Detecção de interseção**: checagem de segmentos sucessivos;
* **Exportação**: `Blob` → download CSV.

### Estrutura do código

* **Geração de posições** com gap mínimo (Poisson-like, *fallback* controlado).
* **Execução**: treino → teste; controle de estado e travas de UI.
* **Métricas**: atualizadas em tempo real; logs para auditoria/reprodutibilidade.

---

## 13) Contribuição

Issues e PRs são bem-vindos: melhorias de UX, critérios de QC, novos índices (p.ex., *nearest-neighbor angle*, *path tortuosity*), internacionalização e integração com bancos de dados.

---

## 14) Licença

Sugestão: **MIT License** (ajuste conforme sua instituição).

---

## 15) Citação sugerida

> Brandão PRP, *et al*. **TMT-A Web (v2.0)**: implementação estática com treino, layout reprodutível, métricas temporais e espaciais e exportação CSV. 2025. Disponível em GitHub Pages.

Formato AMA (exemplo):
Brandão PRP. TMT-A Web (v2.0) \[software]. 2025. Disponível em: *URL do GitHub Pages*. Acessado em: *data*.

---

## 16) Changelog

* **v2.0**

  * Treino obrigatório (1→5) e only-start-on-1
  * `performance.now()` para temporização
  * Layout reprodutível por **seed** (ID|level), Poisson-like spacing
  * **Interseções (crossings)** e comprimento do traço
  * Classificação de erros (perseveration/skip\_ahead/sequence)
  * ICTs (média/SD) + CSV detalhado e resumo com metadados
  * Acessibilidade: alto contraste, alvos maiores, teclado
  * Botão **POST** opcional para coleta remota

---

### Contato

Sugestões, *bug reports* e dúvidas: abra uma *issue* no repositório.
