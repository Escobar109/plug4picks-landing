/* ============================================================
   Plug4Picks Merged — Shared JS
   Unit Calculator + Streak Chart + Weekly Results + Lightning
   ============================================================ */

// ─── CALC: DATA ────────────────────────────────────────────────
const WIN_BETS = [
  {line:-110,res:'W'},{line:-110,res:'W'},{line:-115,res:'L'},
  {line:-110,res:'W'},{line:-105,res:'W'},{line:-110,res:'L'},
  {line:-112,res:'W'},{line:-108,res:'W'},{line:-115,res:'L'},
  {line:-110,res:'W'}
];
const LOSS_BETS = [
  {line:-110,res:'L'},{line:-110,res:'W'},{line:-115,res:'L'},
  {line:-110,res:'L'},{line:-105,res:'W'},{line:-110,res:'L'},
  {line:-112,res:'L'},{line:-108,res:'L'},{line:-115,res:'L'},
  {line:-110,res:'W'}
];

function calcPnl(line, res, method) {
  const odds = Math.abs(line);
  if (res === 'W') return method === 'risk' ? (100 / odds) * 100 : 100;
  if (res === 'L') return method === 'risk' ? -100 : -(odds);
  return 0;
}
function fmtSign(n) { return (n >= 0 ? '+' : '') + '$' + Math.abs(n).toFixed(2); }
function fmtDollar(n) { return '$' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }

function renderRows(bets, rowsId, netId, method) {
  const container = document.getElementById(rowsId);
  const netEl = document.getElementById(netId);
  if (!container || !netEl) return;
  container.innerHTML = '';
  let total = 0;
  let risked = 0;
  bets.forEach(b => {
    const pnl = calcPnl(b.line, b.res, method);
    total += pnl;
    risked += (method === 'risk') ? 100 : Math.abs(b.line);
    const row = document.createElement('div');
    row.className = 'bet-row ' + (b.res === 'W' ? 'won' : 'lost');
    row.innerHTML =
      '<span class="br-line">' + b.line + '</span>' +
      '<span class="br-out">' + fmtSign(pnl) + '</span>';
    container.appendChild(row);
  });
  const roi = risked > 0 ? (total / risked) * 100 : 0;
  const roiStr = (roi >= 0 ? '+' : '') + roi.toFixed(1) + '%';
  const riskedStr = '$' + risked.toLocaleString('en-US');
  netEl.className = 'net-row ' + (total >= 0 ? 'net-pos' : 'net-neg');
  netEl.innerHTML =
    '<div class="net-side net-left">' +
      '<div class="net-k">Risked</div>' +
      '<div class="net-v net-v-neutral">' + riskedStr + '</div>' +
    '</div>' +
    '<div class="net-side net-mid">' +
      '<div class="net-k">ROI</div>' +
      '<div class="net-v net-v-roi">' + roiStr + '</div>' +
    '</div>' +
    '<div class="net-side net-right">' +
      '<div class="net-k">$ Total</div>' +
      '<div class="net-v net-v-total">' + fmtSign(total) + '</div>' +
    '</div>';
}

let currentMethod = 'risk';

function selectMethod(m) {
  currentMethod = m;
  const mr = document.getElementById('mtab-risk');
  const mw = document.getElementById('mtab-win');
  if (mr) mr.className = 'method-tab' + (m === 'risk' ? ' active-risk' : '');
  if (mw) mw.className = 'method-tab' + (m === 'win'  ? ' active-win'  : '');
  ['win-risk-box','loss-risk-box'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    el.classList.remove('highlight-risk','highlight-win');
    if (m === 'risk') el.classList.add('highlight-risk');
  });
  ['win-win-box','loss-win-box'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    el.classList.remove('highlight-risk','highlight-win');
    if (m === 'win') el.classList.add('highlight-win');
  });
  renderRows(WIN_BETS,  'win-risk-rows',  'win-risk-net',  'risk');
  renderRows(WIN_BETS,  'win-win-rows',   'win-win-net',   'win');
  renderRows(LOSS_BETS, 'loss-risk-rows', 'loss-risk-net', 'risk');
  renderRows(LOSS_BETS, 'loss-win-rows',  'loss-win-net',  'win');

  const note = document.getElementById('method-note');
  if (note) {
    if (m === 'risk') {
      note.innerHTML = '<strong>Risking a unit</strong> locks your exposure at exactly <span class="green">$100/bet</span>, no surprises. On a losing streak, your max loss per bet is always the same.';
    } else {
      note.innerHTML = '<strong>Betting to win a unit</strong> means losses grow with the odds — at -115 you lose <span class="red">$115</span>. Bad runs cost more than you think, especially off non-standard lines.';
    }
  }
}

let currentRisk = 1;
function calculate() {
  const brEl = document.getElementById('bankroll');
  if (!brEl) return;
  const br = parseFloat(brEl.value);
  const r = document.getElementById('result'), s = document.getElementById('result-sub');
  [1,2,3].forEach(p => {
    const a = document.getElementById('amt-'+p);
    if (a) a.textContent = isNaN(br) || br <= 0 ? '—' : fmtDollar(br*p/100);
  });
  if (!r) return;
  if (isNaN(br) || br <= 0) { r.textContent = '—'; if (s) s.textContent = 'Select a risk style below'; return; }
  const u = br * currentRisk / 100;
  r.textContent = fmtDollar(u);
  if (s) s.textContent = currentRisk + '% of ' + fmtDollar(br) + ' bankroll';
  r.classList.remove('pulse'); void r.offsetWidth; r.classList.add('pulse');
}

function selectRisk(p) {
  currentRisk = p;
  [1,2,3].forEach(x => {
    const el = document.getElementById('tab-'+x);
    if (el) el.classList.remove('active-low','active-mid','active-high');
  });
  const target = document.getElementById('tab-'+p);
  if (target) target.classList.add(p===1?'active-low':p===2?'active-mid':'active-high');
  calculate();
  // Highlight the matching line in the streak chart
  if (document.getElementById('streakChart')) drawStreakChart(p - 1);
}

// ─── STREAK CHART ──────────────────────────────────────────────
function drawStreakChart(activeIdx) {
  const canvas = document.getElementById('streakChart');
  if (!canvas) return;
  if (typeof activeIdx !== 'number') activeIdx = (typeof currentRisk === 'number' ? currentRisk - 1 : 0);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.parentElement.clientWidth - 28, H = 165;
  canvas.width = W*dpr; canvas.height = H*dpr;
  canvas.style.width = W+'px'; canvas.style.height = H+'px';
  ctx.scale(dpr,dpr);
  const start=1000, losses=10;
  const pcts=[0.01,0.02,0.03], clrs=['#4ADE80','#D4A94A','#3FD8FF'];
  const series = pcts.map(p => { let b=start; const pts=[b]; for(let i=0;i<losses;i++){ b-=start*p; pts.push(Math.max(0,b)); } return pts; });
  const pad = {t:10, r:42, b:30, l:52};
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  const minV=650, maxV=1050;
  const xP = i => pad.l + (i/losses)*cW;
  const yP = v => pad.t + (1-(v-minV)/(maxV-minV))*cH;
  ctx.strokeStyle = 'rgba(255,235,200,0.08)'; ctx.lineWidth = 0.5;
  [700,800,900,1000].forEach(v => {
    ctx.beginPath(); ctx.moveTo(pad.l,yP(v)); ctx.lineTo(pad.l+cW,yP(v)); ctx.stroke();
    ctx.fillStyle = 'rgba(245,239,227,0.36)'; ctx.font = '9px "JetBrains Mono", monospace'; ctx.textAlign = 'right';
    ctx.fillText('$'+v, pad.l-5, yP(v)+3);
  });
  ctx.fillStyle = 'rgba(245,239,227,0.36)'; ctx.font = '9px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
  for (let i=0; i<=losses; i+=2) ctx.fillText(i===0?'Start':'-'+i, xP(i), H-10);
  ctx.strokeStyle = 'rgba(255,235,200,0.10)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t+cH); ctx.lineTo(pad.l+cW, pad.t+cH); ctx.stroke();

  // Draw inactive lines first (dimmed), then the active one on top (bright)
  const drawOrder = [0,1,2].filter(i => i !== activeIdx).concat([activeIdx]);
  drawOrder.forEach(si => {
    const pts = series[si];
    const c = clrs[si];
    const isActive = (si === activeIdx);
    ctx.save();
    if (isActive) {
      ctx.shadowColor = c; ctx.shadowBlur = 18;
      ctx.strokeStyle = c; ctx.lineWidth = 3.5;
      ctx.globalAlpha = 1;
    } else {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = c; ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.28;
    }
    ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach((v,i) => i===0 ? ctx.moveTo(xP(i),yP(v)) : ctx.lineTo(xP(i),yP(v)));
    ctx.stroke(); ctx.restore();

    pts.forEach((v,i) => {
      ctx.save();
      if (isActive) {
        ctx.shadowColor = c; ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(xP(i),yP(v),3.5,0,Math.PI*2);
      } else {
        ctx.globalAlpha = 0.35;
        ctx.beginPath(); ctx.arc(xP(i),yP(v),2,0,Math.PI*2);
      }
      ctx.fillStyle = c; ctx.fill();
      ctx.restore();
    });
    const last = pts[pts.length-1];
    ctx.save();
    ctx.fillStyle = c;
    ctx.globalAlpha = isActive ? 1 : 0.45;
    ctx.font = isActive ? 'bold 10.5px "JetBrains Mono", monospace' : 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('$'+Math.round(last), xP(losses)+5, yP(last)+3);
    ctx.restore();
  });

  // Also update the legend dot opacities if present
  document.querySelectorAll('.legend-item').forEach((el, i) => {
    el.style.opacity = (i === activeIdx) ? '1' : '0.4';
    el.style.fontWeight = (i === activeIdx) ? '800' : '600';
  });
}

// ─── WEEKLY RESULTS HELPERS ────────────────────────────────────
let weekIdx = 0;
function fmtU(u) { return (u > 0 ? '+' : (u < 0 ? '' : '')) + u.toFixed(2) + 'u'; }
function pctRec(w,l) { const t=w+l; return t ? Math.round((w/t)*100)+'%' : '—'; }
function uClass(u) { return u > 0 ? 'pos' : (u < 0 ? 'neg' : ''); }
function renderWeek() {
  const w = WEEKS[weekIdx];
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('weeklyRange', w.range);
  setEl('weeklyNavRange', w.range.replace(/, \d{4}$/, ''));
  setEl('weeklyRecord', w.overall.w + 'W – ' + w.overall.l + 'L');
  const wu = document.getElementById('weeklyUnits');
  if (wu) { wu.textContent = fmtU(w.overall.u); wu.className = 'weekly-units ' + uClass(w.overall.u); }
  setEl('weeklyHit', pctRec(w.overall.w, w.overall.l) + ' hit rate');
  // 4 categories now — Props split into Batter Props + Pitcher Props
  [['Sides','sides'],['Totals','totals'],['BatterProps','batter'],['PitcherProps','pitcher']].forEach(([key, cat]) => {
    const data = w[cat];
    setEl('stat'+key+'Rec', data.w+'–'+data.l);
    setEl('stat'+key+'Pct', '(' + pctRec(data.w, data.l) + ')');
    const u = document.getElementById('stat'+key+'U');
    if (u) { u.textContent = fmtU(data.u); u.className = 'stat-u ' + uClass(data.u); }
  });
  const prevBtn = document.getElementById('prevWeek');
  const nextBtn = document.getElementById('nextWeek');
  if (prevBtn) prevBtn.disabled = weekIdx >= WEEKS.length - 1;
  if (nextBtn) nextBtn.disabled = weekIdx <= 0;
}

// ─── EMAIL FORM ────────────────────────────────────────────────
function wireEmail(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;
  form.addEventListener('submit', function (e) {
    const action = form.getAttribute('action') || '';
    if (action.indexOf('YOUR_FORM_ID') !== -1 || !action) {
      e.preventDefault();
      form.classList.add('submitted');
      if (success) success.classList.add('show');
    }
  });
}

// ─── WEEKLY DATA — live from Supabase (v_landing_weekly_stats) ────────────
const SUPABASE_URL = 'https://nyhagyscvqpxmuwhdfzz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_K3OJ_70JGOLfSNsxu_FNmw_RochSF92';
let WEEKS = [];

async function loadWeeks() {
  try {
    const res = await fetch(SUPABASE_URL + '/rest/v1/v_landing_weekly_stats?select=*&order=week_start.desc', {
      headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY }
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const rows = await res.json();
    WEEKS = rows.map(r => ({
      range: r.range_label,
      weekStart: r.week_start,
      overall: { w: r.overall_w, l: r.overall_l, u: parseFloat(r.overall_u) },
      sides:   { w: r.sides_w,   l: r.sides_l,   u: parseFloat(r.sides_u) },
      totals:  { w: r.totals_w,  l: r.totals_l,  u: parseFloat(r.totals_u) },
      batter:  { w: r.batter_w,  l: r.batter_l,  u: parseFloat(r.batter_u) },
      pitcher: { w: r.pitcher_w, l: r.pitcher_l, u: parseFloat(r.pitcher_u) }
    }));
  } catch (err) {
    console.error('loadWeeks failed:', err);
  }
}

// Aggregate a set of weeks into a single record (overall + per-category)
function aggregateWeeks(weeks) {
  const r = { w:0, l:0, u:0,
    sides:   { w:0, l:0, u:0 },
    totals:  { w:0, l:0, u:0 },
    batter:  { w:0, l:0, u:0 },
    pitcher: { w:0, l:0, u:0 } };
  weeks.forEach(wk => {
    r.w += wk.overall.w; r.l += wk.overall.l; r.u += wk.overall.u;
    ['sides','totals','batter','pitcher'].forEach(c => {
      r[c].w += wk[c].w; r[c].l += wk[c].l; r[c].u += wk[c].u;
    });
  });
  return r;
}
function pctRecCat(rec) { const t = rec.w + rec.l; return t ? Math.round((rec.w/t)*100) + '%' : '—'; }

// Season = sum of ALL tracked weeks
const SEASON_AGG = () => aggregateWeeks(WEEKS);

// Month = weeks whose week_start falls in the current calendar month.
// Falls back to the most recent month with data if the current month is empty.
// Returns { weeks, year, month (0-indexed), fallback }.
function MONTH_AGG() {
  const inMonth = (w, y, m) => {
    if (!w.weekStart) return false;
    const parts = w.weekStart.split('-');
    return Number(parts[0]) === y && (Number(parts[1]) - 1) === m;
  };
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let weeks = WEEKS.filter(w => inMonth(w, year, month));
  let fallback = false;
  if (weeks.length === 0) {
    const dates = WEEKS.map(w => w.weekStart).filter(Boolean).sort();
    const latest = dates[dates.length - 1];
    if (latest) {
      const parts = latest.split('-');
      year = Number(parts[0]);
      month = Number(parts[1]) - 1;
      weeks = WEEKS.filter(w => inMonth(w, year, month));
      fallback = true;
    }
  }
  return { weeks, year, month, fallback };
}

let currentPeriod = 'season';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderSeason() {
  let d, label;
  if (currentPeriod === 'month') {
    const m = MONTH_AGG();
    d = aggregateWeeks(m.weeks);
    label = MONTH_NAMES[m.month] + ' ' + m.year + (m.fallback ? ' · Last Full Month' : '');
  } else {
    d = SEASON_AGG();
    label = (new Date().getFullYear()) + ' Season';
  }
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const total = d.w + d.l;
  const pct = total ? (d.w / total * 100) : 0;
  set('seasonPct',          pct.toFixed(1) + '%');
  set('seasonRecord',       d.w + 'W – ' + d.l + 'L');
  const pl = document.getElementById('seasonPl');
  if (pl) {
    const sign = d.u >= 0 ? '+' : '';
    pl.innerHTML = 'P&amp;L: <strong>' + sign + d.u.toFixed(2) + 'u</strong>';
    pl.className = 'season-pl ' + (d.u >= 0 ? 'pos' : 'neg');
  }
  set('seasonPeriodLabel',  label.toUpperCase());

  // Category breakdown — 4 categories now
  [['Sides','sides'],['Totals','totals'],['BatterProps','batter'],['PitcherProps','pitcher']].forEach(([key, cat]) => {
    set('ss' + key + 'Rec', d[cat].w + '–' + d[cat].l);
    set('ss' + key + 'U',   (d[cat].u >= 0 ? '+' : '') + d[cat].u.toFixed(2) + 'u');
    const uEl = document.getElementById('ss' + key + 'U');
    if (uEl) uEl.className = 'ss-u ' + (d[cat].u > 0 ? 'pos' : d[cat].u < 0 ? 'neg' : '');
  });

  document.querySelectorAll('.season-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.period === currentPeriod);
  });
}
function setSeasonPeriod(p) {
  currentPeriod = p;
  renderSeason();
}

// ─── SIDE-BY-SIDE CALC: render both methods always, no toggle ──
function renderAllSideBySide() {
  renderRows(WIN_BETS,  'win-risk-rows',  'win-risk-net',  'risk');
  renderRows(WIN_BETS,  'win-win-rows',   'win-win-net',   'win');
  renderRows(LOSS_BETS, 'loss-risk-rows', 'loss-risk-net', 'risk');
  renderRows(LOSS_BETS, 'loss-win-rows',  'loss-win-net',  'win');
}

// Toggle which betting style is "focused" — visually highlights its boxes,
// dims the other style. Both stay visible at all times.
function setBettingStyle(style) {
  const root = document.querySelector('.how-i-bet.sbs');
  if (!root) return;
  root.dataset.focus = style;
  const sr = document.getElementById('skey-risk');
  const sw = document.getElementById('skey-win');
  if (sr) sr.className = 'style-key-item' + (style === 'risk' ? ' active-risk' : '');
  if (sw) sw.className = 'style-key-item' + (style === 'win'  ? ' active-win'  : '');
}

// ─── INIT ──────────────────────────────────────────────────────
function injectBeehiivLoader() {
  if (document.querySelector('script[data-beehiiv-loader]')) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://subscribe-forms.beehiiv.com/embed.js';
  s.setAttribute('data-beehiiv-loader', '1');
  document.body.appendChild(s);
}

async function initMerged() {
  injectBeehiivLoader();
  await loadWeeks();
  // season card (if present)
  if (document.getElementById('seasonPct')) renderSeason();
  // calc — if side-by-side markup is present, render both styles; else use toggle
  if (document.querySelector('.how-i-bet.sbs')) {
    renderAllSideBySide();
    setBettingStyle('risk');
  } else if (document.getElementById('mtab-risk')) {
    selectMethod('risk');
  }
  selectRisk(1);
  drawStreakChart();
  // weekly
  renderWeek();
  const prev = document.getElementById('prevWeek');
  const next = document.getElementById('nextWeek');
  if (prev) prev.addEventListener('click', () => { if (weekIdx < WEEKS.length-1) { weekIdx++; renderWeek(); } });
  if (next) next.addEventListener('click', () => { if (weekIdx > 0) { weekIdx--; renderWeek(); } });
}
document.addEventListener('DOMContentLoaded', initMerged);
