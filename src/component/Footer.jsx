function Footer({ isDarkMode, setIsDarkMode, currentYear }) {
  return (
    <footer className="app-footer">
      <div className="footer-content compact">
        <div className="footer-brand-small">
          <div className="footer-logo">
            <span>Uga</span> IT Inventory
          </div>
          <p className="footer-description">
            Purpose-built tools to keep every device accounted for.
          </p>
        </div>

        <div className="footer-links-inline">
          <a href="#" className="footer-link">Docs</a>
          <a href="#" className="footer-link">Status</a>
          <a href="#" className="footer-link">Support</a>
        </div>

        <div className="footer-actions compact">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
          <span className="version">© {currentYear} Uga IT · v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
