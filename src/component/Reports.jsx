import { FiDownload } from 'react-icons/fi';

function Reports() {
  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Reports</h1>
            <p className="welcome-text">IT asset analytics will be back shortly.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" disabled>
              <FiDownload className="btn-icon" />
              <span>Export unavailable</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content reports-page reports-under-maintenance">
        <div className="maintenance-overlay" role="dialog" aria-live="assertive">
          <div className="maintenance-card">
            <span className="maintenance-pill">Under maintenance</span>
            <h2>Asset dashboards are being refreshed</h2>
            <p>
              We’re performing scheduled maintenance on the analytics stack. Please check back later
              or continue working in other sections of the workspace.
            </p>
            <button className="btn btn-primary" onClick={() => window.history.back()}>
              Go back
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reports;
