function Settings({ settingsOptions, toggleSetting }) {
  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Workspace Settings</h1>
            <p className="welcome-text">Control notifications, automation, and lifecycle policies.</p>
          </div>
        </div>
      </header>

      <main className="main-content settings-page">
        <div className="settings-grid">
          <div className="panel-card">
            <h3>Automation</h3>
            <div className="toggle-row">
              <div>
                <p>Auto-assign devices</p>
                <span className="toggle-description">Send newly added assets to the request queue.</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settingsOptions.autoAssign}
                  onChange={() => toggleSetting('autoAssign')}
                />
                <span></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <p>Send outage alerts</p>
                <span className="toggle-description">Notify admins when devices go offline.</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settingsOptions.outageAlerts}
                  onChange={() => toggleSetting('outageAlerts')}
                />
                <span></span>
              </label>
            </div>
          </div>

          <div className="panel-card">
            <h3>Policies & Updates</h3>
            <div className="toggle-row">
              <div>
                <p>Maintenance lock</p>
                <span className="toggle-description">Prevent edits while audits are running.</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settingsOptions.maintenanceLock}
                  onChange={() => toggleSetting('maintenanceLock')}
                />
                <span></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <p>Weekly digest</p>
                <span className="toggle-description">Receive a summary every Monday.</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settingsOptions.weeklyDigest}
                  onChange={() => toggleSetting('weeklyDigest')}
                />
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;
