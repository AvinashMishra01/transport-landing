/* ============================================
   FOOTER SCRIPT (Reusable)
   - Auto-loads footer.html into <div id="footer-placeholder">
   - Highlights the active link based on current page
   ============================================ */

(function () {
  // ---- 1. Load footer HTML dynamically ----
  function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    fetch('footer.html')
      .then(res => {
        if (!res.ok) throw new Error('Footer not found');
        return res.text();
      })
      .then(html => {
        placeholder.innerHTML = html;
        highlightActiveLink();
      })
      .catch(err => console.error('Footer load error:', err));
  }

  // ---- 2. Highlight active page link ----
  function highlightActiveLink() {
    const currentPage = getCurrentPageKey();
    const links = document.querySelectorAll('.footer-links a[data-page]');

    links.forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  // ---- 3. Detect current page ----
  function getCurrentPageKey() {
    const path = window.location.pathname.split('/').pop().toLowerCase();

    if (path === '' || path === 'index.html') return 'home';
    if (path.includes('about')) return 'about';
    if (path.includes('privacy')) return 'privacy';
    if (path.includes('terms')) return 'terms';
    if (path.includes('refund')) return 'refund';
    if (path.includes('contact')) return 'contact';
    if (path.includes('package')) return 'packages';
    if (path.includes('destination')) return 'destinations';

    return '';
  }

  // ---- Run on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
})();