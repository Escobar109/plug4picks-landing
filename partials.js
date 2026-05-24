/* ============================================================
   Shared markup builders for the calc card + weekly card + storm
   Called by each variant during HTML build (inline via JS)
   ============================================================ */

function buildStormOverlay() {
  return `
  <div class="ambient-glow"></div>
  <div class="lp-flash-overlay" style="position:absolute;inset:0;pointer-events:none;z-index:1;background:radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.32) 0%, rgba(63,216,255,0.10) 30%, transparent 65%);"></div>
  <svg preserveAspectRatio="none" viewBox="0 0 1440 940" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;">
    <defs>
      <filter id="lp-storm-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="b1"/>
        <feGaussianBlur stdDeviation="7" result="b2"/>
        <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="lp-storm-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stop-color="#9BF0C0"/>
        <stop offset="40%" stop-color="#4ADE80"/>
        <stop offset="85%" stop-color="#FFD24A"/>
        <stop offset="100%" stop-color="#E8C467"/>
      </linearGradient>
    </defs>
    <g class="lp-bolt lp-b1" filter="url(#lp-storm-glow)">
      <path d="M 120 -10 L 108 60 L 134 95 L 96 155 L 128 205 L 88 270 L 122 330 L 78 415 L 116 490 L 70 580 L 108 670 L 60 770 L 98 870 L 56 960" stroke="rgba(74,222,128,0.45)" stroke-width="5.5" stroke-linecap="round" fill="none"/>
      <path d="M 120 -10 L 108 60 L 134 95 L 96 155 L 128 205 L 88 270 L 122 330 L 78 415 L 116 490 L 70 580 L 108 670 L 60 770 L 98 870 L 56 960" stroke="url(#lp-storm-grad)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M 96 155 L 60 180 L 80 220 L 30 260" stroke="url(#lp-storm-grad)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <path d="M 122 330 L 165 360 L 145 405" stroke="url(#lp-storm-grad)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    </g>
    <g class="lp-bolt lp-b2" filter="url(#lp-storm-glow)">
      <path d="M 1020 -10 L 1006 70 L 1042 120 L 998 195 L 1036 265 L 992 345 L 1028 425 L 980 510 L 1016 590 L 968 685 L 1010 780 L 974 880 L 1014 960" stroke="rgba(74,222,128,0.45)" stroke-width="5.5" stroke-linecap="round" fill="none"/>
      <path d="M 1020 -10 L 1006 70 L 1042 120 L 998 195 L 1036 265 L 992 345 L 1028 425 L 980 510 L 1016 590 L 968 685 L 1010 780 L 974 880 L 1014 960" stroke="url(#lp-storm-grad)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M 1036 265 L 1090 300 L 1070 360 L 1130 410 L 1100 480" stroke="url(#lp-storm-grad)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    </g>
    <g class="lp-bolt lp-b3" filter="url(#lp-storm-glow)">
      <path d="M 1340 -10 L 1326 75 L 1358 130 L 1316 210 L 1348 280 L 1308 360 L 1344 440 L 1304 535 L 1338 620 L 1296 720 L 1326 820 L 1290 960" stroke="rgba(74,222,128,0.42)" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 1340 -10 L 1326 75 L 1358 130 L 1316 210 L 1348 280 L 1308 360 L 1344 440 L 1304 535 L 1338 620 L 1296 720 L 1326 820 L 1290 960" stroke="url(#lp-storm-grad)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
      <path d="M 1316 210 L 1378 245 L 1360 305 L 1410 350" stroke="url(#lp-storm-grad)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    </g>
  </svg>`;
}

function buildHero(opts = {}) {
  const taglineHtml = opts.tagline || `Receipts-based picks. Tracked systems. Real outcomes.<br/>Your access to this data <em>COMING SOON.</em>`;
  const logoSrc = opts.logoSrc || '';
  return `
  <span class="phrase-track">
    <span class="phrase-item phrase-static">GET PLUGGED IN</span>
  </span>

  <h1 class="h1">
    <span class="hero-line hero-line-1">
      <span class="word word-plug">Plug&nbsp;</span><span class="word word-white">In.</span>
    </span>
    <span class="hero-line hero-line-2">
      <span class="word word-cash">Cash&nbsp;</span><span class="word word-white">Out.</span>
    </span>
  </h1>

  <div class="logo-wrap">
    <div class="logo-halo halo-breathe"></div>
    <div class="logo-rim"></div>
    <img class="logo-img" src="${logoSrc}" alt="Plug4Picks"/>
  </div>

  <p class="tagline">${taglineHtml}</p>`;
}

function buildEmailForm() {
  return `
  <div class="email-section">
    <div class="email-label"><span class="dot pulse-dot"></span>Get Notified When My App Launches!</div>
    <div class="beehiiv-embed"></div>
  </div>`;
}

function buildCalcCard() {
  return `
  <div class="calc-card">
    <div class="calc-field">
      <label>Enter Total Bankroll ($) <span class="hint">YOUR FULL BETTING STASH</span></label>
      <input type="number" id="bankroll" placeholder="2000" inputmode="numeric" min="0" oninput="calculate()"/>
    </div>

    <div class="calc-output">
      <div class="calc-output-label">$ Amount Per Unit</div>
      <div class="calc-output-value" id="result">—</div>
      <div class="calc-output-sub" id="result-sub">Select a risk style below</div>
    </div>

    <div class="risk-tabs">
      <div class="risk-tab active-low" id="tab-1" onclick="selectRisk(1)">
        <div class="tab-sublabel">Conservative</div>
        <div class="tab-pct">1%</div>
        <div class="tab-amt" id="amt-1">—</div>
        <div class="tab-desc">Long runway,<br/>survives any streak</div>
      </div>
      <div class="risk-tab" id="tab-2" onclick="selectRisk(2)">
        <div class="tab-sublabel">Balanced</div>
        <div class="tab-pct">2%</div>
        <div class="tab-amt" id="amt-2">—</div>
        <div class="tab-desc">Steady growth,<br/>manageable swings</div>
      </div>
      <div class="risk-tab" id="tab-3" onclick="selectRisk(3)">
        <div class="tab-sublabel">Aggressive</div>
        <div class="tab-pct">3%</div>
        <div class="tab-amt" id="amt-3">—</div>
        <div class="tab-desc">Max recommended,<br/>highest variance</div>
      </div>
    </div>

    <div class="warning-section">
      <div class="warn-header">
        <span style="color:var(--red);font-size:14px">⚡</span>
        <span class="warn-title">Choose Your Unit Size Wisely</span>
      </div>
      <p class="warn-sub">Losing streaks hit <strong>everyone</strong> (even sharp bettors). See how fast a higher unit % drains your bankroll vs. how a smaller unit rides out the wave.</p>
      <div class="streak-chart-wrap">
        <div class="chart-title">Bankroll After Consecutive Losses — Starting $1,000</div>
        <canvas id="streakChart" height="165"></canvas>
        <div class="chart-legend">
          <div class="legend-item"><div class="legend-dot" style="background:#4ADE80;box-shadow:0 0 6px #4ADE80"></div>1% Unit</div>
          <div class="legend-item"><div class="legend-dot" style="background:#D4A94A;box-shadow:0 0 6px #D4A94A"></div>2% Unit</div>
          <div class="legend-item"><div class="legend-dot" style="background:#3FD8FF;box-shadow:0 0 6px #3FD8FF"></div>3% Unit</div>
        </div>
      </div>
    </div>

    <div class="how-i-bet">
      <div class="hib-title">How I Bet</div>
      <p class="method-note" id="method-note"><strong>Risking a unit</strong> locks your exposure at exactly <span class="green">$100/bet</span>, no surprises. On a losing streak, your max loss per bet is always the same.</p>

      <div class="method-tabs">
        <div class="method-tab active-risk" id="mtab-risk" onclick="selectMethod('risk')">
          <div class="mt-label">⚡ Risk a Unit</div>
          <div class="mt-sub">Always put $1U at risk.<br/>Winnings vary by odds.</div>
        </div>
        <div class="method-tab" id="mtab-win" onclick="selectMethod('win')">
          <div class="mt-label">🎯 Win a Unit</div>
          <div class="mt-sub">Always aim to win $1U.<br/>Risk varies by odds.</div>
        </div>
      </div>

      <div class="scenario-label">7W – 3L Winning Streak &nbsp;|&nbsp; Near -110 Lines</div>
      <div class="compare-wrap">
        <div class="compare-box highlight-risk" id="win-risk-box">
          <div class="compare-box-header win-header">Risk $100 / Bet</div>
          <div class="bet-rows" id="win-risk-rows"></div>
          <div class="net-row net-pos" id="win-risk-net"></div>
        </div>
        <div class="compare-box" id="win-win-box">
          <div class="compare-box-header win-header">Win $100 / Bet</div>
          <div class="bet-rows" id="win-win-rows"></div>
          <div class="net-row net-pos" id="win-win-net"></div>
        </div>
      </div>

      <div class="scenario-label" style="margin-top:14px">3W – 7L Losing Streak &nbsp;|&nbsp; Near -110 Lines</div>
      <div class="compare-wrap">
        <div class="compare-box highlight-risk" id="loss-risk-box">
          <div class="compare-box-header loss-header">Risk $100 / Bet</div>
          <div class="bet-rows" id="loss-risk-rows"></div>
          <div class="net-row net-neg" id="loss-risk-net"></div>
        </div>
        <div class="compare-box" id="loss-win-box">
          <div class="compare-box-header loss-header">Win $100 / Bet</div>
          <div class="bet-rows" id="loss-win-rows"></div>
          <div class="net-row net-neg" id="loss-win-net"></div>
        </div>
      </div>
    </div>
  </div>`;
}

/* Same calc card BUT: no method-tab toggle, both styles shown side-by-side
   for the same record. Pairs with initSideBySide() in app.js. */
function buildCalcCardSideBySide() {
  return `
  <div class="calc-card">
    <div class="calc-top-grid">
      <div class="calc-field">
        <label>Total Bankroll ($) <span class="hint">YOUR FULL STASH</span></label>
        <input type="number" id="bankroll" placeholder="2000" inputmode="numeric" min="0" oninput="calculate()"/>
      </div>

      <div class="calc-output">
        <div class="calc-output-label">$ Per Unit</div>
        <div class="calc-output-value" id="result">—</div>
        <div class="calc-output-sub" id="result-sub">Select a risk style below</div>
      </div>
    </div>

    <div class="risk-tabs force-3col">
      <div class="risk-tab active-low" id="tab-1" onclick="selectRisk(1)">
        <div class="tab-sublabel">Conservative</div>
        <div class="tab-pct">1%</div>
        <div class="tab-desc">Long runway,<br/>survives any streak</div>
      </div>
      <div class="risk-tab" id="tab-2" onclick="selectRisk(2)">
        <div class="tab-sublabel">Balanced</div>
        <div class="tab-pct">2%</div>
        <div class="tab-desc">Steady growth,<br/>manageable swings</div>
      </div>
      <div class="risk-tab" id="tab-3" onclick="selectRisk(3)">
        <div class="tab-sublabel">Aggressive</div>
        <div class="tab-pct">3%</div>
        <div class="tab-desc">Max recommended,<br/>highest variance</div>
      </div>
    </div>

    <div class="warning-section">
      <div class="warn-header">
        <span style="color:var(--red);font-size:14px">⚡</span>
        <span class="warn-title">Choose Your Unit Size Wisely</span>
      </div>
      <p class="warn-sub">Losing streaks hit <strong>everyone</strong> (even sharp bettors). See how fast a higher unit % drains your bankroll vs. how a smaller unit rides out the wave.</p>
      <div class="streak-chart-wrap">
        <div class="chart-title">Bankroll After Consecutive Losses — Starting $1,000</div>
        <canvas id="streakChart" height="165"></canvas>
        <div class="chart-legend">
          <div class="legend-item"><div class="legend-dot" style="background:#4ADE80;box-shadow:0 0 6px #4ADE80"></div>1% Unit</div>
          <div class="legend-item"><div class="legend-dot" style="background:#D4A94A;box-shadow:0 0 6px #D4A94A"></div>2% Unit</div>
          <div class="legend-item"><div class="legend-dot" style="background:#3FD8FF;box-shadow:0 0 6px #3FD8FF"></div>3% Unit</div>
        </div>
      </div>
    </div>

    <div class="how-i-bet sbs" data-focus="risk">
      <div class="hib-title">How Should You Bet With Units?</div>
      <p class="method-note method-note-center">Same 10-pick record. Different <span class="dollar-mark">$</span> totals.</p>
      <p class="method-sub-center">For this example, 1 Unit = $100.</p>

      <div class="style-key">
        <button type="button" class="style-key-item active-risk" id="skey-risk" onclick="setBettingStyle('risk')">
          <span class="key-swatch key-swatch-risk"></span>
          <div class="key-text">
            <div class="key-title">Risk a Unit</div>
            <div class="key-desc">Keep your <strong>wager</strong> at <strong>$100</strong> every time. Your <strong>winnings</strong> scale with the <strong>odds</strong>.</div>
          </div>
        </button>
        <button type="button" class="style-key-item" id="skey-win" onclick="setBettingStyle('win')">
          <span class="key-swatch key-swatch-win"></span>
          <div class="key-text">
            <div class="key-title">Win a Unit</div>
            <div class="key-desc">Target at least <strong>$100</strong> in <strong>winnings</strong> every time. Your <strong>wager</strong> scales with the <strong>odds</strong>.</div>
          </div>
        </button>
      </div>

      <!-- Scenario 1: Winning streak -->
      <div class="scenario-block">
        <div class="scenario-head">
          <span class="scenario-pill scenario-pill-win">7W – 3L · Winning Streak</span>
        </div>
        <div class="compare-wrap sbs-grid">
          <div class="compare-box highlight-risk">
            <div class="compare-box-header win-header">Risk $100 / Bet</div>
            <div class="bet-rows" id="win-risk-rows"></div>
            <div class="net-row net-pos" id="win-risk-net"></div>
          </div>
          <div class="compare-box highlight-win">
            <div class="compare-box-header win-header">Win $100 / Bet</div>
            <div class="bet-rows" id="win-win-rows"></div>
            <div class="net-row net-pos" id="win-win-net"></div>
          </div>
        </div>
      </div>

      <!-- Scenario 2: Losing streak -->
      <div class="scenario-block">
        <div class="scenario-head">
          <span class="scenario-pill scenario-pill-loss">3W – 7L · Losing Streak</span>
        </div>
        <div class="compare-wrap sbs-grid">
          <div class="compare-box highlight-risk">
            <div class="compare-box-header loss-header">Risk $100 / Bet</div>
            <div class="bet-rows" id="loss-risk-rows"></div>
            <div class="net-row net-neg" id="loss-risk-net"></div>
          </div>
          <div class="compare-box highlight-win">
            <div class="compare-box-header loss-header">Win $100 / Bet</div>
            <div class="bet-rows" id="loss-win-rows"></div>
            <div class="net-row net-neg" id="loss-win-net"></div>
          </div>
        </div>
      </div>

      <p class="sbs-takeaway" style="display:none">
        <span class="takeaway-label">⚡ The takeaway</span>
        On <span class="green">winning</span> streaks both styles look similar, but on <span class="red">losing</span> streaks "Win a Unit" loses ~10% more per chalk bet. Pick your style and stay consistent.
      </p>
    </div>
  </div>`;
}

function buildSeasonCard() {
  return `
  <div class="season-card">
    <div class="season-head">
      <div class="season-label"><span class="dot pulse-dot"></span>Plug4Picks Record</div>
      <div class="season-toggle" role="tablist">
        <button class="season-tab active" data-period="season" onclick="setSeasonPeriod('season')">Season</button>
        <button class="season-tab" data-period="month" onclick="setSeasonPeriod('month')">Month</button>
      </div>
    </div>

    <div class="season-body">
      <div class="season-hero">
        <div class="season-pct" id="seasonPct">—</div>
        <div class="season-record" id="seasonRecord">—</div>
        <div class="season-pl" id="seasonPl">—</div>
        <div class="season-period-label" id="seasonPeriodLabel">—</div>
      </div>

      <div class="season-breakdown">
        <div class="ss-row"><span class="ss-k">Sides</span><span class="ss-v" id="ssSidesRec">—</span><span class="ss-u" id="ssSidesU">—</span></div>
        <div class="ss-row"><span class="ss-k">Totals</span><span class="ss-v" id="ssTotalsRec">—</span><span class="ss-u" id="ssTotalsU">—</span></div>
        <div class="ss-row"><span class="ss-k">Batter Props</span><span class="ss-v" id="ssBatterPropsRec">—</span><span class="ss-u" id="ssBatterPropsU">—</span></div>
        <div class="ss-row"><span class="ss-k">Pitcher Props</span><span class="ss-v" id="ssPitcherPropsRec">—</span><span class="ss-u" id="ssPitcherPropsU">—</span></div>
      </div>
    </div>
  </div>`;
}

function buildWeeklyCard() {
  return `
  <div class="weekly-card">
    <div class="weekly-head">
      <div class="weekly-label"><span class="dot pulse-dot"></span>Previous Week</div>
      <div class="weekly-range" id="weeklyRange">—</div>
    </div>
    <div class="weekly-hero">
      <div class="weekly-record" id="weeklyRecord">—</div>
      <div class="weekly-meta">
        <div class="weekly-units" id="weeklyUnits">—</div>
        <div class="weekly-hit" id="weeklyHit">— hit rate</div>
      </div>
      <div class="weekly-u-hint" title="A unit is your standard bet size — a fixed % of your bankroll">
        <span class="hint-glyph">u</span>
        <span class="hint-body"><strong>= unit</strong> · a fixed % of your bankroll</span>
      </div>
    </div>
    <div class="weekly-breakdown-label">This Week Breakdown</div>
    <div class="weekly-stats">
      <div class="stat-card" data-cat="sides"><div class="stat-k">SIDES</div><div class="stat-rec" id="statSidesRec">—</div><div class="stat-pct" id="statSidesPct">—</div><div class="stat-u" id="statSidesU">—</div></div>
      <div class="stat-card" data-cat="totals"><div class="stat-k">TOTALS</div><div class="stat-rec" id="statTotalsRec">—</div><div class="stat-pct" id="statTotalsPct">—</div><div class="stat-u" id="statTotalsU">—</div></div>
      <div class="stat-card" data-cat="batter"><div class="stat-k">BATTER&nbsp;PROPS</div><div class="stat-rec" id="statBatterPropsRec">—</div><div class="stat-pct" id="statBatterPropsPct">—</div><div class="stat-u" id="statBatterPropsU">—</div></div>
      <div class="stat-card" data-cat="pitcher"><div class="stat-k">PITCHER&nbsp;PROPS</div><div class="stat-rec" id="statPitcherPropsRec">—</div><div class="stat-pct" id="statPitcherPropsPct">—</div><div class="stat-u" id="statPitcherPropsU">—</div></div>
    </div>
    <div class="weekly-nav">
      <button class="weekly-nav-btn" id="prevWeek" aria-label="Previous week">← Prev</button>
      <div class="weekly-nav-range" id="weeklyNavRange">—</div>
      <button class="weekly-nav-btn" id="nextWeek" aria-label="Next week">Next →</button>
    </div>
  </div>`;
}

function buildCtaRow() {
  return `
  <div class="cta-row">
    <div class="cta-box cta-box-gold">
      <div class="cta-head">Join the journey.</div>
      <div class="cta-sub">Daily picks &amp; weekly recaps</div>
      <div class="cta-buttons">
        <a class="cta-btn cta-btn-x" href="https://x.com/Plug_4_Picks" target="_blank" rel="noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>Follow on X</span>
        </a>
        <a class="cta-btn cta-btn-ig" href="https://www.instagram.com/plug4picks" target="_blank" rel="noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
          <span>Follow on IG</span>
        </a>
      </div>
    </div>
    <div class="cta-box cta-box-blue">
      <div class="cta-badge">FREE</div>
      <div class="cta-head">Join the Telegram.</div>
      <div class="cta-sub">Every pick sent right to your phone</div>
      <div class="cta-buttons">
        <a class="cta-btn cta-btn-tg" href="https://t.me/Plug4picks" target="_blank" rel="noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21.93 4.34a1.4 1.4 0 0 0-1.85-1.39L2.6 9.78a1 1 0 0 0 .08 1.88l4.4 1.46 1.7 5.45a.8.8 0 0 0 1.32.32l2.66-2.47 4.55 3.34a1.4 1.4 0 0 0 2.18-.81z"/></svg>
          <span>Join the channel</span>
        </a>
      </div>
    </div>
  </div>`;
}

function buildFoot() {
  return `<div class="foot">© Plug4Picks · Plug In · Cash Out</div>`;
}
