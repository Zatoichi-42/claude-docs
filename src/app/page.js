'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { NAV_SECTIONS, ALL_PAGES, getAdjacentPages } from '../data/nav';
import { PAGES } from '../data/pages';

/* ═══════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════ */
function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('cc-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cc-theme', next);
  };

  return (
    <button className="theme-toggle" onClick={toggle} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

/* ═══════════════════════════════
   SEARCH COMPONENT
   ═══════════════════════════════ */
function Search({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);

  const results = query.length > 1
    ? ALL_PAGES.filter(p => {
        const q = query.toLowerCase();
        const content = (PAGES[p.slug]?.searchText || '').toLowerCase();
        return p.title.toLowerCase().includes(q)
          || p.section.toLowerCase().includes(q)
          || content.includes(q);
      }).slice(0, 12)
    : [];

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (!open) { setQuery(''); setActiveIdx(0); }
  }, [open]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const select = (slug) => { onNavigate(slug); setOpen(false); };

  if (!open) return (
    <button className="search-trigger" onClick={() => setOpen(true)}>
      <span>🔍</span> <span>Search docs...</span> <kbd>⌘K</kbd>
    </button>
  );

  return (
    <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="search-box">
        <input
          ref={inputRef}
          placeholder="Search docs, commands, hooks, workflows..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
            if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
            if (e.key === 'Enter' && results[activeIdx]) select(results[activeIdx].slug);
          }}
        />
        <div className="search-results">
          {query.length > 1 && results.length === 0 && (
            <div className="search-empty">No results for "{query}"</div>
          )}
          {results.map((r, i) => (
            <div
              key={r.slug}
              className={`search-result${i === activeIdx ? ' active' : ''}`}
              onClick={() => select(r.slug)}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <div className="title">{r.title}</div>
              <div className="section">{r.section}</div>
            </div>
          ))}
          {query.length <= 1 && (
            <div className="search-empty">Type to search across all docs</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   SIDEBAR — with clear section groups
   ═══════════════════════════════ */
function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      {NAV_SECTIONS.map(section => (
        <div key={section.label} className="sidebar-section-group">
          <div className="sidebar-section">{section.label}</div>
          {section.items.map(item => (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              className={activePage === item.slug ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onNavigate(item.slug); onClose(); }}
            >
              {item.title}
              {item.badge && <span className={`badge badge-${item.badge}`}>{item.badge}</span>}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}

/* ═══════════════════════════════
   MAIN APP
   ═══════════════════════════════ */
export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useCallback((slug) => {
    setActivePage(slug);
    window.location.hash = slug;
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && (hash === 'home' || ALL_PAGES.find(p => p.slug === hash))) {
      setActivePage(hash);
    }
    const handler = () => {
      const h = window.location.hash.slice(1);
      if (h) setActivePage(h);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const adj = activePage !== 'home' ? getAdjacentPages(activePage) : { prev: null, next: null };
  const pageData = PAGES[activePage];

  return (
    <>
      <header className="site-header">
        <button className="hamburger" onClick={() => setSidebarOpen(o => !o)}>☰</button>
        <a className="header-logo" href="#home" onClick={e => { e.preventDefault(); navigate('home'); }}>
          <span className="logo-icon">CC</span>
          Claude Code Docs <span className="dim">by C9PG</span>
        </a>
        <div className="header-spacer" />
        <Search onNavigate={navigate} />
        <ThemeToggle />
        <nav className="header-nav">
          <a href="#getting-started"        onClick={e => { e.preventDefault(); navigate('getting-started'); }}>Setup</a>
          <a href="#tutorials/core-commands" onClick={e => { e.preventDefault(); navigate('tutorials/core-commands'); }}>Tutorials</a>
          <a href="#workflows/daily"         onClick={e => { e.preventDefault(); navigate('workflows/daily'); }}>Workflows</a>
          <a href="#reference/commands"      onClick={e => { e.preventDefault(); navigate('reference/commands'); }}>Reference</a>
        </nav>
      </header>

      <div className="page-wrap">
        <Sidebar
          activePage={activePage}
          onNavigate={navigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="main">
          {pageData ? pageData.render(navigate) : <HomepageContent navigate={navigate} />}

          {activePage !== 'home' && (
            <div className="nav-footer">
              {adj.prev ? (
                <a href={`#${adj.prev.slug}`} onClick={e => { e.preventDefault(); navigate(adj.prev.slug); }}>
                  ← {adj.prev.title}
                </a>
              ) : <span />}
              {adj.next ? (
                <a href={`#${adj.next.slug}`} onClick={e => { e.preventDefault(); navigate(adj.next.slug); }}>
                  {adj.next.title} →
                </a>
              ) : <span />}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

/* ═══════════════════════════════
   HOMEPAGE
   ═══════════════════════════════ */
function HomepageContent({ navigate }) {
  const Link = ({ to, children, ...props }) => (
    <a href={`#${to}`} onClick={e => { e.preventDefault(); navigate(to); }} {...props}>{children}</a>
  );

  return (
    <>
      <div className="hero">
        <h1>Claude Code for Real Teams</h1>
        <p>Organized for real adoption: setup, tutorials, daily workflow, configuration, team rollout, and deep reference — in the order a team can actually absorb it.</p>
        <p className="version-tag" style={{textAlign:'center',marginTop:'8px'}}>April 2026 · v3.0 · provided by <a href="http://c9pg.com" target="_blank" rel="noopener noreferrer">Cloud9 Payment Gateway</a> — your AI payment processing gateway</p>
        <div className="hero-actions">
          <Link to="getting-started" className="btn btn-primary">Start Setup →</Link>
          <Link to="tutorials/core-commands" className="btn btn-glass">Tutorials</Link>
          <Link to="reference/commands" className="btn btn-glass">Reference</Link>
          <Link to="reference/best-links" className="btn btn-glass">Best Links</Link>
        </div>
      </div>

      <h2>The Six-Step Loop</h2>
      <p>The backbone of every reliable Claude Code session. No production behavior change until a failing verification artifact exists.</p>
      <div className="loop-grid">
        {[
          ['1','Explore','Read code, ask questions'],
          ['2','Plan','Detail the approach'],
          ['3','RED','Failing verification'],
          ['4','GREEN','Minimal implementation'],
          ['5','Review','/simplify + checks'],
          ['6','Ship','Commit with evidence'],
        ].map(([n,l,d]) => (
          <div className="loop-step" key={n}>
            <span className="step-num">{n}</span>
            <span className="step-label">{l}</span>
            <span className="step-desc">{d}</span>
          </div>
        ))}
      </div>

      <h2>What's New in v3</h2>
      <div className="bento-grid">
        <Link to="tutorials/todo-and-tasks" className="bento-card">
          <span className="card-icon">📋</span>
          <h3>TODO Lists & Tasks</h3>
          <p>Use Claude's built-in task tracking to ensure complete execution of multi-step work. The #1 underused reliability feature.</p>
        </Link>
        <Link to="workflows/ratchet" className="bento-card">
          <span className="card-icon">🔒</span>
          <h3>The Ratchet Pattern</h3>
          <p>Quality only moves forward — never backward. Once a gate passes, it must keep passing. The pattern top teams use.</p>
        </Link>
        <Link to="tutorials/context-mastery" className="bento-card">
          <span className="card-icon">🧠</span>
          <h3>Context Mastery</h3>
          <p>The #1 resource to manage is your context window. Learn /btw, subagents, compaction, and targeted reading.</p>
        </Link>
        <Link to="tutorials/company-mcp" className="bento-card">
          <span className="card-icon">🏢</span>
          <h3>Company MCP Servers</h3>
          <p>Connect Claude Code to GitHub, Jira, Notion, Sentry, and your team's internal tools safely.</p>
        </Link>
      </div>

      <h2>Learning Path</h2>
      <p>Follow this order. Each step builds on the last — no big jumps.</p>
      <div className="bento-grid">
        <Link to="getting-started" className="bento-card">
          <h3>1. Getting Started</h3>
          <p>Install, sign in, terminal setup, bootstrap with /init</p>
        </Link>
        <Link to="tutorials/core-commands" className="bento-card">
          <h3>2. Tutorials (13 pages)</h3>
          <p>Commands → features → TODO → context → skills → MCP → hooks → project setup</p>
        </Link>
        <Link to="workflows/daily" className="bento-card">
          <h3>3. Daily Workflow</h3>
          <p>The repeatable loop for everyday coding with the six-step rhythm</p>
        </Link>
        <Link to="configuration" className="bento-card">
          <h3>4. Configuration</h3>
          <p>Repo baseline only after the workflow is comfortable</p>
        </Link>
      </div>

      <h2>Guiding Principles</h2>
      <div className="callout callout-tip">
        <strong>🎯 Verification First — the single highest-leverage thing you can do</strong>
        <p>Claude performs dramatically better when it can verify its own work — run tests, compare screenshots, validate outputs. Without success criteria, you become the only feedback loop and every mistake requires your attention. <em>— Official Anthropic Best Practices</em></p>
      </div>
      <div className="callout callout-warn">
        <strong>🧠 Context Is Everything</strong>
        <p>Claude's context window holds your entire conversation, every file read, every command output. It fills up fast and performance degrades as it fills. Managing context is the most important operational skill you can develop.</p>
      </div>
      <div className="callout callout-info">
        <strong>📐 Workflow Before Configuration</strong>
        <p>Learn the session loop first. Add shared repo structure only after the team understands how good Claude Code work feels day to day. Configuration you don't understand becomes mysterious friction.</p>
      </div>

      <h2>Quick Bootstrap</h2>
      <p>If you just want to get the recommended project files into your repo right now:</p>
      <pre><code>{`# 1. Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# 2. Start Claude Code and sign in with the team account
claude

# 3. Bootstrap the project (generates CLAUDE.md from your codebase)
/init

# 4. Download the starter kit from the Project Setup page →
#    Unzip into your repo root to get .claude/ with hooks, rules, skills, and agent`}</code></pre>
    </>
  );
}
