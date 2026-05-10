/* ════════════════════════════════════════════════════════════════
   EFREI Département Informatique — JavaScript Vanilla
   Direction B : Hybride "Code → Produit"
   Auteurs : Deschamps Malo & Toussaint Mathis — TI402
   ════════════════════════════════════════════════════════════════ */

/* ── EASTER EGG CONSOLE ──────────────────────────────────────── */
(function () {
  var art = [
    '  ███████ ███████ ██████  ███████ ██',
    '  ██      ██      ██   ██ ██      ██',
    '  █████   █████   ██████  █████   ██',
    '  ██      ██      ██   ██ ██      ██',
    '  ███████ ██      ██   ██ ███████ ██',
    '  Département Informatique — Paris 2025'
  ].join('\n');
  console.log('%c' + art, 'color:#00FF41;font-family:monospace;font-size:12px;line-height:1.6;');
  console.log(
    '%cBienvenue ingénieur·e. Tape %cefrei()%c dans la console pour un bonus.',
    'color:#888;', 'color:#00FF41;font-weight:bold;', 'color:#888;'
  );
  window.efrei = function () {
    console.log('%c[ok] Projet TI402 — Deschamps Malo (design) & Toussaint Mathis (dev)', 'color:#00FF41;');
    console.log('Commandes disponibles :');
    console.log('  efrei.team()   → auteurs du projet');
    console.log('  efrei.stack()  → stack technique');
    console.log('  efrei.about()  → page à propos (nouvel onglet)');
  };
  window.efrei.team = function () {
    console.log('%cÉquipe projet TI402', 'color:#00FF41;font-weight:bold;');
    console.table([
      { nom: 'Deschamps Malo', role: 'design lead · front-end' },
      { nom: 'Toussaint Mathis', role: 'dev lead · back-of-front' }
    ]);
  };
  window.efrei.stack = function () {
    console.table([
      { technologie: 'HTML5',          usage: 'structure sémantique — 5 pages W3C' },
      { technologie: 'CSS3',           usage: 'grid · flex · custom properties' },
      { technologie: 'JS Vanilla',     usage: 'aucun framework' },
      { technologie: 'Inter',          usage: 'typographie corps — Google Fonts' },
      { technologie: 'JetBrains Mono', usage: 'typographie mono — Google Fonts' }
    ]);
  };
  window.efrei.about = function () {
    console.log('Ouverture de a-propos.html...');
    window.open('a-propos.html', '_blank');
  };
}());

(function () {
  'use strict';

  /* ── 0. THEME TOGGLE ────────────────────────────────────────── */
  var html = document.documentElement;
  if (html.classList.contains('is-dark-pre')) {
    document.body.classList.add('is-dark');
    html.classList.remove('is-dark-pre');
  }
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var themeLabel = themeBtn.querySelector('.theme-toggle__label');
    if (document.body.classList.contains('is-dark') && themeLabel) {
      themeLabel.textContent = 'light';
    }
    themeBtn.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('is-dark');
      if (themeLabel) themeLabel.textContent = isDark ? 'light' : 'dark';
      localStorage.setItem('efrei-theme', isDark ? 'dark' : 'light');
    });
  }

  /* ── 1. MENU MOBILE BURGER ──────────────────────────────── */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ── 2. HERO TERMINAL — TYPING EFFECT ───────────────────── */
  const typedEl = document.getElementById('term-typed');
  if (typedEl) {
    const lines = [
      '> Département Informatique de l\'EFREI Paris.',
      '> Formation d\'ingénieurs depuis 1994.',
      '> 12 cursus · 2 000+ étudiants · 95% d\'insertion.',
      '> [ok] mission : façonner les experts du numérique.'
    ];
    let li = 0, ci = 0, current = '';
    function type() {
      if (li >= lines.length) return;
      const line = lines[li];
      if (ci < line.length) {
        current = lines.slice(0, li).join('\n') + '\n' + line.slice(0, ci + 1);
        typedEl.innerHTML = current
          .split('\n')
          .filter(Boolean)
          .map(function (l) { return '<div>' + l.replace(/\[ok\]/g, '<span class="ok">[ok]</span>') + '</div>'; })
          .join('');
        ci++;
        setTimeout(type, 22 + Math.random() * 20);
      } else {
        li++; ci = 0;
        setTimeout(type, 280);
      }
    }
    setTimeout(type, 250);
  }

  /* ── 3. CARROUSEL CAMPUS ─────────────────────────────────── */
  const carousel = document.getElementById('carousel-viewport');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel__slide');
    const dots = document.querySelectorAll('#carousel-dots .carousel__dot');
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    let idx = 0;
    let timer;

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
    }
    function autoplay() {
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 5000);
    }
    if (prev) prev.addEventListener('click', function () { go(idx - 1); autoplay(); });
    if (next) next.addEventListener('click', function () { go(idx + 1); autoplay(); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        go(parseInt(d.dataset.slide, 10));
        autoplay();
      });
    });
    autoplay();
  }

  /* ── 4. STATS COUNTER (scroll-triggered) ────────────────── */
  const counters = document.querySelectorAll('[data-count-to]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.countTo, 10);
        const unit = el.querySelector('.unit');
        const unitHTML = unit ? unit.outerHTML : '';
        const duration = 1100;
        const start = performance.now();
        function step(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          const val = Math.round(eased * target);
          el.innerHTML = val.toLocaleString('fr-FR') + unitHTML;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { counterObs.observe(c); });
  }

  /* ── 5. REVEAL ANIMATIONS ───────────────────────────────── */
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (r) { revealObs.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-visible'); });
  }

  /* ── 6. FILTRES TABLE FORMATIONS ────────────────────────── */
  const filterChips = document.querySelectorAll('#filters .filter-chip');
  if (filterChips.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        const cat = chip.dataset.filter;
        const rows = document.querySelectorAll('#form-table tbody tr');
        rows.forEach(function (r) {
          if (cat === 'all' || r.dataset.cat === cat) r.style.display = '';
          else r.style.display = 'none';
        });
      });
    });
  }

  /* ── 7. ÉQUIPE — RECHERCHE + FILTRES ────────────────────── */
  const teamSearch = document.getElementById('team-search');
  const teamFilters = document.querySelectorAll('#team-filters .filter-chip');
  const teamCards = document.querySelectorAll('.team-card');
  const teamEmpty = document.getElementById('team-empty');
  let activeDomain = 'all';

  function applyTeamFilters() {
    const q = teamSearch ? teamSearch.value.toLowerCase().trim() : '';
    let visible = 0;
    teamCards.forEach(function (card) {
      const matchDomain = activeDomain === 'all' || card.dataset.domain === activeDomain;
      const text = (card.dataset.name + ' ' + card.textContent).toLowerCase();
      const matchSearch = q === '' || text.indexOf(q) !== -1;
      const show = matchDomain && matchSearch;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    if (teamEmpty) teamEmpty.style.display = visible === 0 ? 'block' : 'none';
  }

  if (teamSearch) teamSearch.addEventListener('input', applyTeamFilters);
  teamFilters.forEach(function (chip) {
    chip.addEventListener('click', function () {
      teamFilters.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      activeDomain = chip.dataset.domain;
      applyTeamFilters();
    });
  });

  /* ── 8. CONTACT FORM VALIDATION ─────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    const success = document.getElementById('form-success');
    const counter = document.getElementById('form-counter');
    const msg = document.getElementById('f-message');

    if (msg && counter) {
      msg.addEventListener('input', function () {
        const len = msg.value.length;
        counter.textContent = len + ' / 20 caractères minimum';
        counter.style.color = len >= 20 ? 'var(--green-ink)' : 'var(--ink-3)';
      });
    }

    function setError(id, has) {
      const field = document.getElementById(id);
      if (!field) return;
      const wrap = field.closest('.field');
      if (wrap) wrap.classList.toggle('field--error', !!has);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      const name = document.getElementById('f-name');
      const email = document.getElementById('f-email');
      const phone = document.getElementById('f-phone');
      const subject = document.getElementById('f-subject');
      const message = document.getElementById('f-message');
      const rgpd = document.getElementById('f-rgpd');

      // Name
      if (!name.value.trim() || name.value.trim().length < 2) { setError('f-name', true); ok = false; }
      else setError('f-name', false);

      // Email — regex simple
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRe.test(email.value.trim())) { setError('f-email', true); ok = false; }
      else setError('f-email', false);

      // Phone — facultatif mais validé si rempli
      if (phone.value.trim() && !/^[+\d\s().-]{6,20}$/.test(phone.value.trim())) {
        setError('f-phone', true); ok = false;
      } else setError('f-phone', false);

      // Subject
      if (!subject.value) { setError('f-subject', true); ok = false; }
      else setError('f-subject', false);

      // Message
      if (message.value.trim().length < 20) { setError('f-message', true); ok = false; }
      else setError('f-message', false);

      // RGPD
      if (!rgpd.checked) { setError('f-rgpd', true); ok = false; }
      else setError('f-rgpd', false);

      if (ok) {
        success.classList.add('is-visible');
        form.reset();
        if (counter) counter.textContent = '0 / 20 caractères minimum';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Note : pas d'envoi réseau — projet académique
      }
    });
  }

  /* ── 9. FAQ ACCORDÉON ───────────────────────────────────── */
  const faq = document.getElementById('faq');
  if (faq) {
    faq.querySelectorAll('.faq__q').forEach(function (q) {
      q.addEventListener('click', function () {
        const item = q.parentElement;
        item.classList.toggle('is-open');
      });
    });
  }

  /* ── 10. TERMINAL INTERACTIF ────────────────────────────── */
  const iterm = document.getElementById('iterm');
  if (iterm) {
    const out = document.getElementById('iterm-output');
    const input = document.getElementById('iterm-input');
    const itermForm = document.getElementById('iterm-form');
    const history = [];
    let histIdx = -1;

    function print(text, cls) {
      const div = document.createElement('div');
      div.className = 'line' + (cls ? ' ' + cls : '');
      div.innerHTML = text;
      out.appendChild(div);
      out.scrollTop = out.scrollHeight;
    }
    function printCmd(cmd) { print(cmd, 'cmd'); }

    const commands = {
      help: function () {
        print('Commandes disponibles :', 'ok');
        print('  help              affiche cette aide');
        print('  whoami            identité du visiteur');
        print('  ls                liste les sections');
        print('  cd &lt;page&gt;         navigue vers une page');
        print('  cat formations    liste les formations');
        print('  cat team          liste l\'équipe pédagogique');
        print('  cat contact       coordonnées du département');
        print('  cat about         à propos du projet');
        print('  stats             chiffres clés');
        print('  date              date et heure courante');
        print('  echo &lt;texte&gt;      répète le texte');
        print('  clear             nettoie l\'écran');
        print('  sudo              ... essaie pour voir');
        print('  efrei             ASCII art du département');
      },
      whoami: function () {
        print('visitor — invité du département informatique EFREI Paris');
      },
      ls: function () {
        print('accueil/  formations/  equipe/  contact/  a-propos/', 'ok');
      },
      cd: function (args) {
        const target = (args[0] || '').replace(/\/$/, '');
        const map = {
          accueil: 'index.html', '~': 'index.html', home: 'index.html',
          formations: 'formations.html',
          equipe: 'equipe.html', 'équipe': 'equipe.html',
          contact: 'contact.html',
          'a-propos': 'a-propos.html', about: 'a-propos.html'
        };
        if (map[target]) {
          print('navigation vers ' + map[target] + ' ...', 'dim');
          setTimeout(function () { window.location.href = map[target]; }, 400);
        } else {
          print('cd: ' + (target || '?') + ': répertoire inconnu. Essaie `ls`.', 'err');
        }
      },
      cat: function (args) {
        const what = args[0];
        switch (what) {
          case 'formations':
            print('Formations disponibles :', 'ok');
            print('  ├── Bachelor Informatique');
            print('  ├── Bachelor Cybersécurité &amp; Réseaux');
            print('  ├── Bachelor Dev Web &amp; IA');
            print('  ├── Cycle ingénieur — IT / Data / Cyber / Embarqué');
            print('  └── Mastères — Data Science / Cloud / IA');
            print('Voir <a href="formations.html">formations.html →</a>', 'dim');
            break;
          case 'team': case 'equipe': case 'équipe':
            print('Équipe pédagogique :', 'ok');
            print('  ├── Khodor Hammoud (Data Engineering)');
            print('  ├── Mohamad Ghassany (Data &amp; IA)');
            print('  ├── Malika Charrad (Data Mining)');
            print('  ├── Ilyes Jenhani (Software Engineering)');
            print('  ├── Mourad Kmimech (Informatique)');
            print('  ├── Cherifa Ben Khelil (Algorithmique)');
            print('  ├── Ralph Bou Nader (Sécurité numérique)');
            print('  └── Boussad Ait Salem (Cybersécurité &amp; Cloud)');
            print('Voir <a href="equipe.html">equipe.html →</a>', 'dim');
            break;
          case 'contact':
            print('30+ avenue de la République, 94800 Villejuif', 'ok');
            print('Tél : +33 1 88 28 84 00 — info-dpt@efrei.fr');
            print('Métro Ligne 7 — Villejuif Louis Aragon');
            print('Voir <a href="contact.html">contact.html →</a>', 'dim');
            break;
          case 'about': case 'a-propos':
            print('Projet TI402 — Deschamps Malo &amp; Toussaint Mathis', 'ok');
            print('Stack : HTML5 + CSS3 + JS vanilla. Aucun framework.');
            print('Voir <a href="a-propos.html">a-propos.html →</a>', 'dim');
            break;
          default:
            print('cat: fichier inconnu : ' + (what || '(rien)') + '. Essaie `cat formations`.', 'err');
        }
      },
      stats: function () {
        print('Chiffres clés du département :', 'ok');
        print('  2 000+  étudiants inscrits');
        print('     95%  satisfaction étudiants');
        print('    200+  partenaires entreprises');
        print('     40+  enseignants-chercheurs');
        print('     30   années d\'existence (depuis 1994)');
      },
      date: function () { print(new Date().toLocaleString('fr-FR')); },
      echo: function (args) { print(args.join(' ')); },
      clear: function () { out.innerHTML = ''; },
      sudo: function () {
        print('[sudo] mot de passe pour visitor :', 'dim');
        setTimeout(function () {
          print('Sorry, visitor is not in the sudoers file. This incident will be reported. 😉', 'err');
        }, 700);
      },
      efrei: function () {
        print('  ███████ ███████ ██████  ███████ ██', 'ok');
        print('  ██      ██      ██   ██ ██      ██', 'ok');
        print('  █████   █████   ██████  █████   ██', 'ok');
        print('  ██      ██      ██   ██ ██      ██', 'ok');
        print('  ███████ ██      ██   ██ ███████ ██', 'ok');
        print('  Département Informatique — Paris, 2025.', 'dim');
      },
      exit: function () {
        print('Tu ne peux pas vraiment partir, mais c\'est l\'intention qui compte.', 'dim');
      }
    };

    function run(rawLine) {
      const line = rawLine.trim();
      if (!line) return;
      printCmd(line);
      history.unshift(line);
      histIdx = -1;
      const parts = line.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      if (commands[cmd]) {
        try { commands[cmd](args); } catch (e) { print('Erreur : ' + e.message, 'err'); }
      } else {
        print(cmd + ': commande inconnue. Tape `help` pour les options.', 'err');
      }
    }

    print('Bienvenue dans le terminal du département. Tape `help` pour commencer.', 'ok');
    print('—', 'dim');

    itermForm.addEventListener('submit', function (e) {
      e.preventDefault();
      run(input.value);
      input.value = '';
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx + 1 < history.length) { histIdx++; input.value = history[histIdx]; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
        else { histIdx = -1; input.value = ''; }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const cur = input.value.trim();
        if (!cur) return;
        const match = Object.keys(commands).find(function (c) { return c.startsWith(cur); });
        if (match) input.value = match;
      }
    });

    iterm.addEventListener('click', function () { input.focus(); });
  }

})();
