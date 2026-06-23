'use strict';
/*
 * layoutGenerator.js — Gerador OFFLINE de formas paralelas para o TMT-A.
 *
 * Objetivo: produzir arranjos de 25 itens geometricamente EQUIVALENTES ao TMT-A
 * original (Reitan), via amostragem-com-rejeição sobre uma grade, controlando os
 * invariantes que tornam duas formas estatisticamente intercambiáveis para reteste
 * longitudinal (Vickers et al. 1996/1998; Gaudino et al. 1995; TMT-L/Rodewald 2020).
 *
 * Invariantes controlados (requisitos 1–6):
 *   1. Não-cruzamento: a trilha-solução 1->25 é uma poligonal simples.
 *   2. Não-sobreposição: distância mínima entre centros >= diâmetro + margem.
 *   3. Cobertura: área do convex hull dentro de uma janela (default casa o original ~66%).
 *   4. Deslocamento N->N+1 ~ Poisson(μ) em unidades de grade grosseira, com piso/teto.
 *   5. Near-distractors: densidade de itens não-alvo num raio crítico (casável entre formas).
 *   6. Distribuição angular das mudanças de direção (casável entre formas).
 *
 * Uso (Node/CLI):
 *   node layoutGenerator.js --count 6 --seedStart 1 --out forms.generated.json
 *
 * Uso (programático):
 *   const G = require('./layoutGenerator.js');
 *   const set = G.generateEquivalentSet({ count: 6, seedStart: 1 });
 *
 * Determinismo: toda forma é função pura de (seed, params). Mesmo seed => mesma forma.
 */

// ───────────────────────────── RNG determinístico ─────────────────────────────
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ───────────────────────────── geometria ─────────────────────────────
function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }

// interseção de segmentos p1p2 x p3p4 (com casos colineares)
function segmentsIntersect(p1, p2, p3, p4) {
    function orient(a, b, c) {
        const v = (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1]);
        if (Math.abs(v) < 1e-12) return 0;
        return v > 0 ? 1 : 2;
    }
    function onSeg(a, b, c) {
        return Math.min(a[0], c[0]) - 1e-9 <= b[0] && b[0] <= Math.max(a[0], c[0]) + 1e-9 &&
               Math.min(a[1], c[1]) - 1e-9 <= b[1] && b[1] <= Math.max(a[1], c[1]) + 1e-9;
    }
    const o1 = orient(p1, p2, p3), o2 = orient(p1, p2, p4), o3 = orient(p3, p4, p1), o4 = orient(p3, p4, p2);
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSeg(p1, p3, p2)) return true;
    if (o2 === 0 && onSeg(p1, p4, p2)) return true;
    if (o3 === 0 && onSeg(p3, p1, p4)) return true;
    if (o4 === 0 && onSeg(p3, p2, p4)) return true;
    return false;
}

// convex hull (monotone chain) -> vértices em ordem
function convexHull(points) {
    const p = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    if (p.length < 3) return p.slice();
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const pt of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], pt) <= 0) lo.pop(); lo.push(pt); }
    for (let i = p.length - 1; i >= 0; i--) { const pt = p[i]; while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], pt) <= 0) hi.pop(); hi.push(pt); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
}

function polygonArea(poly) {
    let a = 0;
    for (let i = 0; i < poly.length; i++) { const j = (i + 1) % poly.length; a += poly[i][0] * poly[j][1] - poly[j][0] * poly[i][1]; }
    return Math.abs(a) / 2;
}

// ───────────────────────────── amostradores ─────────────────────────────
// Poisson(μ) por algoritmo de Knuth
function poissonSample(rand, mu) {
    const L = Math.exp(-mu);
    let k = 0, p = 1;
    do { k++; p *= rand(); } while (p > L);
    return k - 1;
}

// amostrador de mudança de direção (turn) a partir de um histograma de faixas (graus)
function makeAngleSampler(bins) {
    const total = bins.reduce((s, b) => s + b.w, 0);
    return function (rand) {
        let r = rand() * total, acc = 0, chosen = bins[bins.length - 1];
        for (let i = 0; i < bins.length; i++) { acc += bins[i].w; if (r <= acc) { chosen = bins[i]; break; } }
        const deg = chosen.lo + rand() * (chosen.hi - chosen.lo);
        const sign = rand() < 0.5 ? -1 : 1;
        return sign * deg * Math.PI / 180;
    };
}

// ───────────────────────────── referência (TMT-A original) ─────────────────────────────
// Coordenadas normalizadas [0,1] (origem no topo-esquerda), digitalizadas da figura
// clássica do TMT-A. Aproximadas (±); podem ser refinadas sem alterar a lógica.
const REFERENCE_TMT_A = {
    name: 'TMT-A clássico (Reitan) — digitalizado',
    points: [
        [0.677, 0.592], [0.448, 0.710], [0.740, 0.774], [0.731, 0.376], [0.394, 0.398],
        [0.573, 0.492], [0.379, 0.585], [0.231, 0.745], [0.269, 0.868], [0.346, 0.739],
        [0.615, 0.898], [0.112, 0.932], [0.221, 0.489], [0.100, 0.624], [0.081, 0.089],
        [0.235, 0.255], [0.519, 0.077], [0.471, 0.294], [0.779, 0.169], [0.615, 0.161],
        [0.865, 0.077], [0.869, 0.368], [0.875, 0.935], [0.813, 0.576], [0.765, 0.898]
    ]
};

// ───────────────────────────── parâmetros default ─────────────────────────────
// Calibrados para reproduzir o original: Poisson(μ=5) em grade grosseira de 1/16
// => passo médio ≈ 5·0.0625 = 0.3125 (medido no original: 0.304 ± 0.120).
const DEFAULT_PARAMS = {
    count: 25,
    margin: 0.05,            // mantém os círculos dentro do campo
    fineGrid: 0.01,          // grade fina de "snap" (amostragem-com-rejeição)
    coarseUnit: 1 / 16,      // unidade de grade grosseira para o deslocamento
    poissonMu: 5,            // μ do deslocamento (em unidades de grade grosseira)
    floorUnits: 2,           // piso do deslocamento (×coarseUnit ≈ 0.125)
    ceilUnits: 9,            // teto do deslocamento (×coarseUnit ≈ 0.5625)
    minDist: 0.11,           // distância mínima entre centros (≈ minPairwise do original 0.106; evita toque em telas pequenas)
    // histograma de mudanças de direção do ORIGINAL (faixas em graus; pesos = contagem)
    angleHistogram: [
        { lo: 0, hi: 30, w: 2 }, { lo: 30, hi: 60, w: 1 }, { lo: 60, hi: 90, w: 2 },
        { lo: 90, hi: 120, w: 4 }, { lo: 120, hi: 180, w: 14 }
    ],
    nearRadius: 0.20,        // raio crítico de near-distractors (métrica casável)
    triesPerStep: 48,        // candidatos amostrados por passo antes de retroceder
    stepBudget: 600000,      // orçamento de passos do backtracking por tentativa
    // janelas de aceitação global (equivalência ao original)
    hullMin: 0.58, hullMax: 0.72
};

// tolerâncias para isEquivalent (casamento de invariantes)
const DEFAULT_TOLERANCES = {
    crossings: 0,       // exato
    hullPct: 0.06,      // |Δ| em fração de campo
    lengthRel: 0.12,    // |Δ| relativo do comprimento total
    meanStep: 0.035,    // |Δ| absoluto
    sdStep: 0.045,      // |Δ| absoluto
    turnMean: 18,       // |Δ| em graus
    nd: 0.6             // |Δ| de near-distractors no raio crítico
};

// ───────────────────────────── métricas (requisito 8) ─────────────────────────────
function computeMetrics(points, params) {
    params = params || DEFAULT_PARAMS;
    const n = points.length;
    const steps = [];
    for (let i = 1; i < n; i++) steps.push(dist(points[i - 1], points[i]));
    const totalLength = steps.reduce((a, b) => a + b, 0);
    const meanStep = totalLength / steps.length;
    const sdStep = Math.sqrt(steps.reduce((s, v) => s + (v - meanStep) * (v - meanStep), 0) / (steps.length - 1));

    let crossings = 0;
    for (let i = 0; i < n - 1; i++)
        for (let j = i + 2; j < n - 1; j++)
            if (segmentsIntersect(points[i], points[i + 1], points[j], points[j + 1])) crossings++;

    const hull = convexHull(points);
    const hullArea = polygonArea(hull);

    function nd(R) {
        let tot = 0;
        for (let i = 0; i < n - 1; i++) {
            let c = 0;
            for (let j = 0; j < n; j++) { if (j === i || j === i + 1) continue; if (dist(points[i], points[j]) <= R) c++; }
            tot += c;
        }
        return tot / (n - 1);
    }

    const turns = [];
    for (let i = 1; i < n - 1; i++) {
        const a = [points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]];
        const b = [points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]];
        let d = (Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0])) * 180 / Math.PI;
        while (d > 180) d -= 360; while (d < -180) d += 360;
        turns.push(Math.abs(d));
    }
    const turnMean = turns.reduce((a, b) => a + b, 0) / turns.length;
    const turnHistogram = { '0-30': 0, '30-60': 0, '60-90': 0, '90-120': 0, '120-180': 0 };
    turns.forEach(v => {
        if (v < 30) turnHistogram['0-30']++; else if (v < 60) turnHistogram['30-60']++;
        else if (v < 90) turnHistogram['60-90']++; else if (v < 120) turnHistogram['90-120']++;
        else turnHistogram['120-180']++;
    });

    const R = params.nearRadius;
    return {
        totalLength, meanStep, sdStep, minStep: Math.min.apply(null, steps), maxStep: Math.max.apply(null, steps),
        crossings, hullArea, hullPct: hullArea, // campo unitário => fração == área
        nearDistractors: { r15: nd(0.15), r20: nd(0.20), r25: nd(0.25), critical: nd(R) },
        turnMean, turnHistogram
    };
}

const REFERENCE_METRICS = computeMetrics(REFERENCE_TMT_A.points, DEFAULT_PARAMS);

// ───────────────────────────── equivalência (requisito 9) ─────────────────────────────
function isEquivalent(mA, mB, tol) {
    tol = Object.assign({}, DEFAULT_TOLERANCES, tol || {});
    const deltas = {
        crossings: mA.crossings,
        hullPct: Math.abs(mA.hullPct - mB.hullPct),
        lengthRel: Math.abs(mA.totalLength - mB.totalLength) / mB.totalLength,
        meanStep: Math.abs(mA.meanStep - mB.meanStep),
        sdStep: Math.abs(mA.sdStep - mB.sdStep),
        turnMean: Math.abs(mA.turnMean - mB.turnMean),
        nd: Math.abs(mA.nearDistractors.critical - mB.nearDistractors.critical)
    };
    const equivalent =
        mA.crossings === tol.crossings &&
        deltas.hullPct <= tol.hullPct &&
        deltas.lengthRel <= tol.lengthRel &&
        deltas.meanStep <= tol.meanStep &&
        deltas.sdStep <= tol.sdStep &&
        deltas.turnMean <= tol.turnMean &&
        deltas.nd <= tol.nd;
    return { equivalent, deltas };
}

// ───────────────────────────── gerador (requisitos 1–6) ─────────────────────────────
const round5 = v => Math.round(v * 1e5) / 1e5;

function generateLayout(opts) {
    opts = opts || {};
    const params = Object.assign({}, DEFAULT_PARAMS, opts.params || {});
    const seed = (opts.seed == null) ? (Math.random() * 1e9) | 0 : opts.seed;
    const rand = mulberry32(seed);
    const N = params.count;
    const angleSampler = makeAngleSampler(params.angleHistogram);
    const lo = params.margin, hi = 1 - params.margin;
    const fine = params.fineGrid;
    const snap = v => Math.round(v / fine) * fine;

    const pts = [];
    let steps = 0;

    function valid(np) {
        if (np[0] < lo || np[0] > hi || np[1] < lo || np[1] > hi) return false;          // campo
        for (let i = 0; i < pts.length; i++) if (dist(pts[i], np) < params.minDist) return false; // sobreposição
        const a = pts[pts.length - 1];                                                    // não-cruzamento
        for (let i = 0; i < pts.length - 2; i++) if (segmentsIntersect(pts[i], pts[i + 1], a, np)) return false;
        return true;
    }

    function dfs() {
        if (pts.length === N) return true;
        if (steps++ > params.stepBudget) return false;
        const last = pts[pts.length - 1];
        let prevDir = null;
        if (pts.length >= 2) { const a = pts[pts.length - 2]; prevDir = Math.atan2(last[1] - a[1], last[0] - a[0]); }
        for (let k = 0; k < params.triesPerStep; k++) {
            let du = poissonSample(rand, params.poissonMu);
            du = Math.max(params.floorUnits, Math.min(params.ceilUnits, du));
            const d = du * params.coarseUnit;
            const ang = (prevDir == null) ? rand() * Math.PI * 2 : prevDir + angleSampler(rand);
            const np = [snap(last[0] + d * Math.cos(ang)), snap(last[1] + d * Math.sin(ang))];
            if (!valid(np)) continue;
            pts.push(np);
            if (dfs()) return true;
            pts.pop();
        }
        return false;
    }

    pts.push([snap(lo + rand() * (hi - lo)), snap(lo + rand() * (hi - lo))]);
    const ok = dfs();
    if (!ok) return { seed, points: null, metrics: null, accepted: false, attempts: steps };

    const points = pts.map(p => [round5(p[0]), round5(p[1])]);
    const metrics = computeMetrics(points, params);
    const accepted = metrics.crossings === 0 && metrics.hullPct >= params.hullMin && metrics.hullPct <= params.hullMax;
    return { seed, points, metrics, accepted, attempts: steps };
}

// gera N formas equivalentes a uma referência (requisito 9)
function generateEquivalentSet(opts) {
    opts = opts || {};
    const params = Object.assign({}, DEFAULT_PARAMS, opts.params || {});
    const tol = Object.assign({}, DEFAULT_TOLERANCES, opts.tolerances || {});
    const refMetrics = opts.referenceMetrics || REFERENCE_METRICS;
    const count = opts.count || 6;
    const maxTries = opts.maxTries || 60000;
    const forms = [];
    const sigs = new Set();
    let seed = opts.seedStart || 1, tried = 0;
    while (forms.length < count && tried < maxTries) {
        tried++;
        const L = generateLayout({ seed: seed++, params });
        if (!L.accepted) continue;
        const eq = isEquivalent(L.metrics, refMetrics, tol);
        if (!eq.equivalent) continue;
        const sig = L.points.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(';');
        if (sigs.has(sig)) continue;
        sigs.add(sig);
        forms.push({ seed: L.seed, points: L.points, metrics: L.metrics, deltas: eq.deltas, attempts: L.attempts });
    }
    return {
        reference: { name: REFERENCE_TMT_A.name, points: REFERENCE_TMT_A.points, metrics: refMetrics },
        params, tolerances: tol, count: forms.length, triedSeeds: tried, forms
    };
}

// ───────────────────────────── export (requisito 8) ─────────────────────────────
function toJSON(set) { return JSON.stringify(set, null, 2); }

function toCSV(set) {
    const head = ['forma', 'seed', 'comprimento', 'passo_medio', 'passo_dp', 'cruzamentos', 'hull_pct',
        'nd_r15', 'nd_r20', 'nd_r25', 'vira_media', 'h_0_30', 'h_30_60', 'h_60_90', 'h_90_120', 'h_120_180'];
    const rows = [head.join(',')];
    const line = (label, m, seed) => [label, seed, m.totalLength.toFixed(3), m.meanStep.toFixed(3), m.sdStep.toFixed(3),
        m.crossings, (m.hullPct * 100).toFixed(1), m.nearDistractors.r15.toFixed(2), m.nearDistractors.r20.toFixed(2),
        m.nearDistractors.r25.toFixed(2), m.turnMean.toFixed(1), m.turnHistogram['0-30'], m.turnHistogram['30-60'],
        m.turnHistogram['60-90'], m.turnHistogram['90-120'], m.turnHistogram['120-180']].join(',');
    rows.push(line('REFERENCIA', set.reference.metrics, '-'));
    set.forms.forEach((f, i) => rows.push(line('v' + (i + 1), f.metrics, f.seed)));
    return rows.join('\n');
}

// ───────────────────────────── API ─────────────────────────────
const API = {
    mulberry32, dist, segmentsIntersect, convexHull, polygonArea, poissonSample, makeAngleSampler,
    computeMetrics, isEquivalent, generateLayout, generateEquivalentSet, toJSON, toCSV,
    REFERENCE_TMT_A, REFERENCE_METRICS, DEFAULT_PARAMS, DEFAULT_TOLERANCES
};
if (typeof module !== 'undefined' && module.exports) module.exports = API;
if (typeof window !== 'undefined') window.LayoutGenerator = API;

// ───────────────────────────── CLI (Node) ─────────────────────────────
if (typeof module !== 'undefined' && require.main === module) {
    const args = process.argv.slice(2);
    const opt = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) { opt[args[i].slice(2)] = (args[i + 1] && !args[i + 1].startsWith('--')) ? args[++i] : true; }
    }
    const count = parseInt(opt.count || '6', 10);
    const seedStart = parseInt(opt.seedStart || '1', 10);
    const set = generateEquivalentSet({ count, seedStart });
    // também gera uma forma de aquecimento (8 itens), só não-cruzante + espalhada
    let practice = null;
    for (let s = (parseInt(opt.practiceSeed || '7000', 10)); s < 7000 + 4000 && !practice; s++) {
        const L = generateLayout({ seed: s, params: { count: 8, hullMin: 0.35, hullMax: 0.85, poissonMu: 5 } });
        if (L.accepted) practice = L;
    }
    const out = opt.out || 'forms.generated.json';
    const payload = Object.assign({}, set, { practice: practice ? { seed: practice.seed, points: practice.points, metrics: practice.metrics } : null });
    require('fs').writeFileSync(out, toJSON(payload));
    console.log(toCSV(set));
    console.log('\nformas equivalentes geradas: ' + set.count + '/' + count + ' (seeds testados: ' + set.triedSeeds + ')');
    console.log('escrito: ' + out);
}
