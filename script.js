// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Initialize from localStorage, falling back to system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

themeToggle.addEventListener('click', () => {
  setTheme(!document.documentElement.classList.contains('dark'));
});

// ===== Chat panel =====
function openChatPanel() {
  document.getElementById('chatHistory').style.display = 'block';
}

function closeChatPanel() {
  document.getElementById('chatHistory').style.display = 'none';
}

// ===== AI + chat logic =====
function appendMsg(type, text) {
  const chat = document.getElementById('chatArea');
  const div = document.createElement('div');
  div.className = type; // 'ai-user' or 'ai-msg'
  div.textContent = text; // safe text (no HTML injection)
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  openChatPanel();
}

function normalize(s) { return (s || '').toLowerCase().trim(); }

function getAnswer(raw) {
  const q = normalize(raw);
  const has = (w) => q.includes(w);

  if (has('experience')) {
    return 'Jessima brings 6+ years of experience across insurance and financial services, leading cross-functional delivery from requirement definition through release and post-production stabilization.';
  }

  if (has('fit') || has('good fit') || has('right fit') || has('What roles is she a fit for?')) {
    return 'Jessima is a strong fit for product or product analyst roles requiring stakeholder alignment, structured requirement gathering, Agile execution, and hands-on coordination with UX, engineering, and QA teams.';
  }

  if (has('agile')) {
    return 'Strong in Agile/SAFe environments — backlog refinement, sprint planning, PI prep, story clarity, demos, and cross-team coordination.';
  }

  if (has('requirement')) {
    return 'Experienced in running requirement workshops, clarifying scope and dependencies, documenting acceptance criteria, and translating business needs into clear epics and stories.';
  }

  if (has('ux')) {
    return 'Partners closely with UX teams to align on flows, edge cases, acceptance criteria, and user-centered delivery outcomes.';
  }

  if (has('delivery')) {
    return 'Owns delivery end-to-end — from discovery and requirement clarity through sprint execution, UAT validation, and release readiness.';
  }

  if (has('product')) {
    return 'Product-focused mindset with strong stakeholder communication, prioritization skills, and execution discipline.';
  }

  if (has('year')) {
    return '6+ years of experience across regulated industries including insurance and financial services.';
  }

  if (has('cms')) {
    return 'Hands-on experience with Sitecore CMS — supporting content workflows, updates, and production mitigation coordination.';
  }

  if (has('uat') || has('qa')) {
    return 'Strong in UAT/QA coordination — defining acceptance criteria, supporting test cycles, validating release readiness, and mitigating production risks.';
  }

  if (has('contact')) {
    return 'Preferred contact: Email first. Phone available upon request.';
  }

  if (has('strategic')) {
    return 'Jessima balances both strategy and execution. She contributes to roadmap discussions and prioritization while also driving hands-on delivery — refining backlog, clarifying requirements, coordinating with UX and engineering, and ensuring smooth UAT and releases. She is execution-strong with strategic awareness.';
  }

  if (has('user stories')) {
    return 'She not only writes user stories but ensures they are actionable, testable, and aligned with business value — reducing ambiguity and minimizing rework during development.';
  }

  if (has('availability')) {
    return 'Available for weekday interviews with at least 3 business days\' notice.';
  }

  if (has('work status') || has('status') || has('us work')) {
    return 'U.S. Citizen — no sponsorship required.';
  }

  return 'Try asking about Experience, Agile, Delivery, Requirements, CMS, QA/UAT, Availability, or Work status.';
}

function askAI(raw) {
  appendMsg('ai-user', raw);
  const answer = getAnswer(raw);
  setTimeout(() => appendMsg('ai-msg', answer), 140);
}

function sendTyped() {
  const input = document.getElementById('aiInput');
  const val = input.value;
  if (!val.trim()) return;
  input.value = '';
  askAI(val);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const active = document.activeElement;
    if (active && active.id === 'aiInput') {
      e.preventDefault();
      sendTyped();
    }
  }
  if (e.key === 'Escape') {
    closeChatPanel();
  }
});
