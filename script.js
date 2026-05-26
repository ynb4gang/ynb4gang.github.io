const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const progress = $('#progressBar');
const cursor = $('#cursor');
const cursorText = $('#cursorText');
const sections = $$('.screen');
const railLinks = $$('.section-rail a');
const navLinks = $$('.nav__links a');
const burger = $('#burger');
const mobileMenu = $('#mobileMenu');
const dialog = $('#detailDialog');
const detailKicker = $('#detailKicker');
const detailTitle = $('#detailTitle');
const detailLead = $('#detailLead');
const detailGrid = $('#detailGrid');

const details = {
  discovery: {
    kicker: 'Data engineering + analytics', title: 'Analysis that finds the real data pain',
    lead: 'Before building anything, I separate symptoms from root causes: broken definitions, slow access, missing lineage, low BI adoption or unstable pipelines.',
    items: [
      ['Inputs', ['Source systems', 'Current dashboards and reports', 'Incident history', 'Manual Excel flows']],
      ['Outputs', ['Problem statement', 'User groups', 'Metric conflicts', 'Initial KPI tree']],
      ['Questions', ['Who owns the metric?', 'What decision depends on it?', 'What happens if it is late?', 'How is trust measured?']],
      ['Result', 'A clear analytical scope instead of a random list of technical tasks.']
    ]
  },
  prioritize: {
    kicker: 'Data engineering + analytics', title: 'Data modeling with value and risk',
    lead: 'A data backlog needs engineering discipline. I model data by business value, SLA risk, BI adoption, data quality impact and implementation feasibility.',
    items: [
      ['Scoring', ['Business value', 'Reliability risk', 'Data quality impact', 'Effort and dependencies']],
      ['Model', ['Staging layer', 'Core entities', 'Data marts', 'Executive metrics']],
      ['Trade-offs', ['Speed vs governance', 'Custom report vs scalable mart', 'Manual fix vs reusable pipeline']],
      ['Result', 'A DWH model that engineering can maintain and business can trust.']
    ]
  },
  deliver: {
    kicker: 'Data engineering + analytics', title: 'Delivery that connects engineering and analytics',
    lead: 'Delivery is not only task tracking. It is release scope, acceptance criteria, data contracts, observability and rollout communication.',
    items: [
      ['Artifacts', ['DWH model', 'Acceptance criteria', 'Data contract', 'Release notes']],
      ['Engineering', ['Airflow DAGs', 'DWH layers', 'Data marts', 'BI layer', 'Quality checks']],
      ['Controls', ['SLA', 'Freshness', 'Backfill plan', 'Monitoring', 'Rollback logic']],
      ['Result', 'Pipelines land as a stable analytical system, not as isolated scripts.']
    ]
  },
  measure: {
    kicker: 'Data engineering + analytics', title: 'Reliability after release',
    lead: 'A shipped pipeline is only useful if people trust and use it. I track BI adoption, reliability, freshness, latency and incident reduction.',
    items: [
      ['BI usage', ['Dashboard usage', 'Active users', 'Repeat usage', 'Manual work removed']],
      ['Reliability', ['SLA compliance', 'Pipeline success rate', 'Data freshness', 'MTTR']],
      ['Quality', ['Validation pass rate', 'Duplicates removed', 'Metric discrepancies', 'DQ score']],
      ['Result', 'The data platform becomes a measurable business capability.']
    ]
  },
  sources: {
    kicker: 'Architecture layer', title: 'Sources', lead: 'The pipeline starts with understanding source ownership, data contracts and failure modes.',
    items: [['Systems', ['CRM', 'ERP', 'Billing', 'APIs', 'Event streams']], ['Controls', ['Owner', 'Schema', 'Update frequency', 'Critical fields']], ['DE/DA focus', 'Define which sources are business-critical and which can stay secondary.'], ['Risk', 'Unclear source logic creates downstream metric disputes.']]
  },
  ingestion: {
    kicker: 'Architecture layer', title: 'Ingestion', lead: 'Ingestion must be observable, retryable and aligned with freshness requirements.',
    items: [['Tools', ['Airflow', 'Kafka', 'NiFi', 'CDC', 'Batch jobs']], ['Controls', ['Retries', 'Idempotency', 'Backfill', 'Alerts']], ['DE/DA focus', 'Prioritize ingestion based on business freshness and SLA.'], ['Risk', 'Invisible ingestion failures destroy dashboard trust.']]
  },
  processing: {
    kicker: 'Architecture layer', title: 'Processing', lead: 'Transformations should turn raw data into validated, documented and testable entities.',
    items: [['Tools', ['Spark', 'SQL', 'Python', 'DQ checks']], ['Controls', ['Tests', 'Data quality rules', 'Deduplication', 'Normalization']], ['DE/DA focus', 'Map processing logic to metric definitions and user decisions.'], ['Risk', 'Business logic hidden in SQL becomes impossible to govern.']]
  },
  serving: {
    kicker: 'Architecture layer', title: 'Serving', lead: 'Serving layers are where data becomes reusable: DWH, marts, OLAP and APIs.',
    items: [['Storage', ['PostgreSQL', 'Greenplum', 'ClickHouse', 'Data marts']], ['Controls', ['Partitioning', 'Indexes', 'Aggregations', 'Access model']], ['DE/DA focus', 'Choose reusable marts over one-off extracts.'], ['Risk', 'Poor serving design creates slow dashboards and duplicated logic.']]
  },
  consumption: {
    kicker: 'Architecture layer', title: 'Consumption', lead: 'Consumption is the business interface: BI, alerts, AI assistants and APIs.',
    items: [['Channels', ['Power BI', 'Tableau', 'Grafana', 'Superset', 'AI/RAG']], ['Controls', ['Metric definitions', 'Dashboard adoption', 'Alert relevance']], ['DE/DA focus', 'Track whether users actually make better decisions.'], ['Risk', 'A dashboard without adoption is not a decision tool.']]
  },
  'case-dwh': {
    kicker: 'Case 01', title: 'DWH performance optimization', lead: 'Slow analytical reporting was converted into a faster, more predictable DWH layer with measurable performance improvement.',
    items: [['Problem', ['Heavy SQL queries', 'Slow marts', 'Unstable reporting windows', 'High business waiting time']], ['Analytical decision', ['Prioritize critical executive queries', 'Define performance SLA', 'Separate hot marts from historical layers']], ['Engineering solution', ['Partitioning', 'Indexing', 'Query plan tuning', 'Aggregation redesign']], ['Metrics', ['Up to 80% faster critical queries', 'More predictable reporting cycle', 'Lower operational friction']], ['Stack', ['Greenplum', 'PostgreSQL', 'SQL', 'Airflow']], ['Outcome', 'The platform became faster not only technically, but also more useful for recurring business decisions.']]
  },
  'case-dq': {
    kicker: 'Case 02', title: 'Data quality pipeline', lead: 'Messy counterparty records became a controlled data-quality flow with validation, deduplication and auditability.',
    items: [['Problem', ['Duplicates', 'Inconsistent names', 'Manual checks', 'Low trust from legal/procurement']], ['Analytical decision', ['Treat DQ as a pipeline capability', 'Define quality rules and ownership', 'Make changes auditable']], ['Engineering solution', ['Cleansing', 'Normalization', 'Validation', 'Matching to external registries']], ['Metrics', ['Fewer duplicates', 'Higher validation pass rate', 'Transparent change history']], ['Stack', ['Python', 'SQL', 'PostgreSQL', 'Airflow']], ['Outcome', 'Business teams can trust critical counterparty data instead of manually rechecking it.']]
  },
  'case-ai': {
    kicker: 'Case 03', title: 'AI analytics assistant', lead: 'Manual Q&A and scattered knowledge can be transformed into a structured AI analytics assistant with RAG and BI context.',
    items: [['Problem', ['Repeated questions', 'Scattered documentation', 'Slow answer cycle', 'Manual analyst load']], ['Analytical decision', ['Define user groups', 'Set answer boundaries', 'Connect BI and knowledge base', 'Measure answer usefulness']], ['Engineering solution', ['RAG layer', 'Document indexing', 'Dashboard context', 'Audit logs']], ['Metrics', ['Time-to-answer', 'Question deflection rate', 'Answer quality score', 'Adoption']], ['Stack', ['PostgreSQL', 'Qdrant', 'LLM/RAG', 'Airflow', 'BI']], ['Outcome', 'Managers get faster answers while analysts focus on deeper work.']]
  },
  'case-exec': {
    kicker: 'Case 04', title: 'Executive metrics layer', lead: 'Raw technical and business signals are turned into an accountable KPI layer for leadership decisions.',
    items: [['Problem', ['Different teams used different KPI definitions', 'Dashboards showed conflicting numbers', 'Executives could not see freshness and quality risk']], ['Analytical decision', ['Define metric ownership', 'Build KPI tree', 'Separate operational and executive views', 'Add adoption and trust metrics']], ['Engineering solution', ['Metric mart', 'Aggregated BI layer', 'Freshness checks', 'Incident/status indicators']], ['Metrics', ['Dashboard adoption', 'Data freshness', 'SLA compliance', 'Metric discrepancy rate']], ['Stack', ['SQL', 'PostgreSQL/Greenplum', 'Airflow', 'BI', 'Grafana']], ['Outcome', 'Leadership gets a clear view of business performance and data reliability in one controlled surface.']]
  }
};


function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
}
updateProgress();
addEventListener('scroll', updateProgress, { passive: true });

function setActive(id) {
  sections.forEach(s => s.classList.toggle('is-active', s.id === id));
  [...railLinks, ...navLinks].forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
}

if (!('IntersectionObserver' in window)) {
  sections.forEach(section => {
    section.classList.add('is-active');
    $$('.reveal', section).forEach(el => el.classList.add('is-visible'));
  });
}
const sectionObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    setActive(entry.target.id);
    $$('.reveal', entry.target).forEach(el => el.classList.add('is-visible'));
    $$('.count', entry.target).forEach(animateCount);
  });
}, { threshold: 0.35 }) : null;
if (sectionObserver) sections.forEach(section => sectionObserver.observe(section));

function animateCount(el) {
  if (el.dataset.done) return;
  const target = parseFloat(el.dataset.value || '0');
  const suffix = el.dataset.suffix || '';
  const decimals = String(target).includes('.') ? 1 : 0;
  const start = performance.now();
  const duration = 1200;
  function step(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
    else { el.textContent = `${target.toFixed(decimals)}${suffix}`; el.dataset.done = '1'; }
  }
  requestAnimationFrame(step);
}

burger?.addEventListener('click', () => {
  const open = mobileMenu.hasAttribute('hidden');
  if (open) mobileMenu.removeAttribute('hidden');
  else mobileMenu.setAttribute('hidden', '');
  burger.setAttribute('aria-expanded', String(open));
});
$$('#mobileMenu a').forEach(a => a.addEventListener('click', () => { mobileMenu.setAttribute('hidden', ''); burger?.setAttribute('aria-expanded', 'false'); }));

$$('.cockpit__tabs button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    $$('.cockpit__tabs button').forEach(b => b.classList.toggle('active', b === button));
    $$('.cockpit__panel').forEach(panel => panel.classList.toggle('active', panel.id === `tab-${tab}`));
  });
});

function renderDetail(key) {
  const data = details[key];
  if (!data || !dialog) return;
  detailKicker.textContent = data.kicker;
  detailTitle.textContent = data.title;
  detailLead.textContent = data.lead;
  detailGrid.innerHTML = data.items.map(([label, content]) => `
    <article class="detail-item">
      <small>${label}</small>
      ${Array.isArray(content) ? `<ul>${content.map(x => `<li>${x}</li>`).join('')}</ul>` : `<p>${content}</p>`}
    </article>
  `).join('');
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

$$('.open-card').forEach(card => card.addEventListener('click', () => renderDetail(card.dataset.card)));
$('#closeDialog')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

if (cursor) {
  addEventListener('pointermove', e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
  $$('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('pointerenter', () => { cursor.classList.add('is-text'); cursor.style.transform = 'translate(-50%,-50%) scale(1.55)'; });
    el.addEventListener('pointerleave', () => { cursor.classList.remove('is-text'); cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
}

$$('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});

$$('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

$('#copyEmail')?.addEventListener('click', async () => {
  const email = 'cartibenz6@gmail.com';
  try { await navigator.clipboard.writeText(email); showToast('Email copied'); }
  catch { showToast(email); }
});

function showToast(text) {
  const node = $('#toast');
  if (!node) return;
  node.textContent = text;
  node.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => node.classList.remove('show'), 1400);
}

setActive('hero');

const flipWord = $('#flipWord');
const rotatingWords = ['executives', 'analysts', 'data teams', 'operations', 'data leaders', 'BI users'];
let wordIndex = 0;
if (flipWord) {
  setInterval(() => {
    wordIndex = (wordIndex + 1) % rotatingWords.length;
    flipWord.classList.add('is-changing');
    setTimeout(() => {
      flipWord.textContent = rotatingWords[wordIndex];
      flipWord.classList.remove('is-changing');
    }, 190);
  }, 2400);
}

const timelineSteps = $$('.timeline-step');
let timelineIndex = 0;
if (timelineSteps.length) {
  setInterval(() => {
    timelineSteps.forEach((step, index) => step.classList.toggle('active', index === timelineIndex));
    timelineIndex = (timelineIndex + 1) % timelineSteps.length;
  }, 1500);
}

const commandDialog = $('#commandDialog');
const openCommand = $('#openCommand');
const closeCommand = $('#closeCommand');
function openCommandPalette() {
  if (!commandDialog) return;
  if (typeof commandDialog.showModal === 'function') commandDialog.showModal();
  else commandDialog.setAttribute('open', '');
}
function closeCommandPalette() {
  if (!commandDialog) return;
  if (typeof commandDialog.close === 'function') commandDialog.close();
  else commandDialog.removeAttribute('open');
}
openCommand?.addEventListener('click', openCommandPalette);
closeCommand?.addEventListener('click', closeCommandPalette);
commandDialog?.addEventListener('click', (e) => { if (e.target === commandDialog) closeCommandPalette(); });
$$('[data-command-target]').forEach((button) => {
  button.addEventListener('click', () => {
    closeCommandPalette();
    document.querySelector(button.dataset.commandTarget)?.scrollIntoView({ behavior: 'smooth' });
  });
});
$$('[data-command]').forEach((button) => {
  button.addEventListener('click', async () => {
    const command = button.dataset.command;
    if (command === 'copyEmail') {
      try { await navigator.clipboard.writeText('cartibenz6@gmail.com'); showToast('Email copied'); }
      catch { showToast('cartibenz6@gmail.com'); }
    }
    closeCommandPalette();
  });
});


window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
  if (e.key === 'Escape') closeCommandPalette();
});

const trustScore = $('#trustScore');
function animateTrustScore() {
  if (!trustScore || trustScore.dataset.done) return;
  const start = 42;
  const end = 91;
  const started = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - started) / 1200);
    const eased = 1 - Math.pow(1 - p, 3);
    trustScore.textContent = String(Math.round(start + (end - start) * eased));
    if (p < 1) requestAnimationFrame(tick);
    else trustScore.dataset.done = '1';
  }
  requestAnimationFrame(tick);
}
const metricsSection = $('#metrics');
if (metricsSection) {
  const scoreObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) animateTrustScore(); });
  }, { threshold: 0.55 });
  scoreObserver.observe(metricsSection);
}

const nav = $('.nav');
function updateNavState(){ if(!nav) return; nav.classList.toggle('nav--compact', scrollY > 28); }
updateNavState();
addEventListener('scroll', updateNavState, { passive:true });
