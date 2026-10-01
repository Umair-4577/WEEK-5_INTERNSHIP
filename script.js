const app = document.getElementById('app');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

const routes = {
  home: {
    title: 'Build once. Navigate smoothly.',
    content: `
      <section class="page hero">
        <div>
          <span class="badge">WEEK 5 · SPA PROJECT</span>
          <h1>A faster way to experience the web.</h1>
          <p class="lead">NovaSPA is a single-page application simulation that updates content dynamically, changes the browser URL, and supports back/forward navigation without full page reloads.</p>
          <div class="actions">
            <a class="btn primary" href="/services" data-link>Explore Services</a>
            <a class="btn secondary" href="/about" data-link>How it works</a>
          </div>
        </div>
        <div class="visual" aria-label="SPA interface illustration">
          <div class="visual-window">
            <div class="dots"><i></i><i></i><i></i></div>
            <div class="mock-card"><strong>Dynamic Content</strong><div class="mock-line"></div><div class="mock-line short"></div></div>
            <div class="mock-card"><strong>Client-side Routing</strong><div class="mock-line"></div><div class="mock-line short"></div></div>
            <div class="mock-card"><strong>History API</strong><div class="mock-line"></div></div>
          </div>
        </div>
      </section>`
  },
  about: {
    title: 'About',
    content: `
      <section class="page">
        <div class="section-title"><span class="badge">ABOUT THE PROJECT</span><h2>A simple SPA architecture with a clear purpose.</h2><p class="lead">The project uses one HTML shell, one stylesheet and one JavaScript router. JavaScript selects the correct view and replaces the main application content whenever the route changes.</p></div>
        <div class="grid">
          <article class="card"><div class="icon">⚡</div><h3>No Full Reload</h3><p>Navigation is intercepted and content is rendered directly into the application container.</p></article>
          <article class="card"><div class="icon">🔗</div><h3>URL Routing</h3><p>History API methods update the address bar while keeping the application running.</p></article>
          <article class="card"><div class="icon">↩️</div><h3>Back & Forward</h3><p>The popstate event restores the correct view when browser navigation is used.</p></article>
        </div>
        <div class="stats"><div class="stat"><strong>1</strong>HTML shell</div><div class="stat"><strong>4</strong>SPA routes</div><div class="stat"><strong>0</strong>Full page reloads</div></div>
      </section>`
  },
  services: {
    title: 'Services',
    content: `
      <section class="page">
        <div class="section-title"><span class="badge">FEATURES</span><h2>Everything needed for a smooth SPA simulation.</h2><p class="lead">Each feature demonstrates a core concept required by the task specification.</p></div>
        <div class="grid">
          <article class="card"><div class="icon">🧭</div><h3>Client-side Routing</h3><p>Routes such as /about and /services are mapped to views inside JavaScript.</p></article>
          <article class="card"><div class="icon">🎨</div><h3>Responsive UI</h3><p>Flexible grids, mobile navigation and accessible controls adapt to different screens.</p></article>
          <article class="card"><div class="icon">✨</div><h3>Transitions</h3><p>New views use a subtle entrance animation to make navigation feel continuous.</p></article>
          <article class="card"><div class="icon">🛡️</div><h3>Error Handling</h3><p>Unknown paths display a friendly 404 view instead of leaving the application blank.</p></article>
          <article class="card"><div class="icon">💾</div><h3>State Awareness</h3><p>The current route is derived from the URL so refreshing or using browser navigation remains predictable.</p></article>
          <article class="card"><div class="icon">♿</div><h3>Accessibility</h3><p>Semantic landmarks, labels, focus states and aria attributes improve usability.</p></article>
        </div>
      </section>`
  },
  contact: {
    title: 'Contact',
    content: `
      <section class="page">
        <div class="section-title"><span class="badge">GET IN TOUCH</span><h2>Test the SPA form interaction.</h2><p class="lead">This demonstration form is handled locally by JavaScript, so submitting it does not reload the page.</p></div>
        <form class="form" id="contactForm">
          <div class="field"><label for="name">Name</label><input id="name" name="name" required placeholder="Enter your name"></div>
          <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required placeholder="you@example.com"></div>
          <div class="field"><label for="message">Message</label><textarea id="message" name="message" required placeholder="Write your message..."></textarea></div>
          <button class="btn primary" type="submit">Send Message</button>
          <div class="error-box" id="formMessage" role="status"></div>
        </form>
      </section>`
  }
};

function routeFromPath(path = window.location.pathname) {
  const clean = path.replace(/\/+$/, '') || '/';
  if (clean === '/') return 'home';
  return clean.slice(1).split('/')[0] || 'home';
}

function render(route, updateHistory = false) {
  const view = routes[route];
  if (!view) {
    app.innerHTML = `<section class="not-found page"><span class="badge">404 · ROUTE NOT FOUND</span><h1>Oops!</h1><p class="lead">The page you requested does not exist in this SPA.</p><a href="/" data-link class="btn primary">Return Home</a></section>`;
    document.title = '404 | NovaSPA';
    setActiveRoute(null);
  } else {
    app.innerHTML = view.content;
    document.title = `${view.title} | NovaSPA`;
    setActiveRoute(route);
    if (route === 'contact') attachFormHandler();
  }
  if (updateHistory) history.pushState({ route }, '', route === 'home' ? '/' : `/${route}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMenu();
}

function navigate(path) { render(routeFromPath(path), true); }

function setActiveRoute(route) {
  document.querySelectorAll('[data-route]').forEach(link => {
    const active = link.dataset.route === route;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function attachFormHandler() {
  const form = document.getElementById('contactForm');
  const message = document.getElementById('formMessage');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = new FormData(form).get('name');
    message.textContent = `Thanks, ${name}! Your demo message was submitted without a page reload.`;
    message.style.display = 'block';
    form.reset();
  });
}

function closeMenu() {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', event => {
  const link = event.target.closest('[data-link]');
  if (!link) return;
  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;
  event.preventDefault();
  navigate(url.pathname);
});

window.addEventListener('popstate', () => render(routeFromPath(), false));

render(routeFromPath(), false);
