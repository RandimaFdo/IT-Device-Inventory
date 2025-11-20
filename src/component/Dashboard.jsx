import { FiDownload, FiPlus, FiBox, FiShield, FiTrash2 } from 'react-icons/fi';

function Dashboard({ dashboardHighlights, activityLog, lifecycleBreakdown, totalQuantity, backupAssets, disposedAssets, isMenuOpen }) {
  const backupPercentage = totalQuantity ? Math.min(100, Math.round((backupAssets / totalQuantity) * 100)) : 0;
  const disposedPercentage = totalQuantity ? Math.min(100, Math.round((disposedAssets / totalQuantity) * 100)) : 0;

  const quickStats = [
    {
      label: 'Total Units',
      value: totalQuantity,
      subLabel: 'Tracked assets',
      trend: '+5% this month',
      trendClass: 'positive',
      icon: <FiBox />, 
      progress: 100
    },
    {
      label: 'Back Up Pool',
      value: backupAssets,
      subLabel: 'Ready to deploy',
      trend: `${backupPercentage}% of stock`,
      trendClass: 'info',
      icon: <FiShield />,
      progress: backupPercentage
    },
    {
      label: 'Disposed',
      value: disposedAssets,
      subLabel: 'Awaiting recycle',
      trend: `${disposedPercentage}% of stock`,
      trendClass: 'warning',
      icon: <FiTrash2 />,
      progress: disposedPercentage
    }
  ];

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>IT Inventory Management</h1>
            <p className="welcome-text">Welcome back! Here's an overview of your inventory.</p>
            <div className="header-meta">
              <span className="meta-pill primary">Quarterly view</span>
              <span className="meta-pill subtle">Synced 5 min ago</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <FiDownload className="btn-icon" />
              <span>Export</span>
            </button>
            <button className="btn btn-primary">
              <FiPlus className="btn-icon" />
              <span>Add Device</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="dashboard-overview">
          {dashboardHighlights.map(card => (
            <div className="highlight-card" key={card.label}>
              <div className="highlight-icon">{card.icon}</div>
              <div className="highlight-body">
                <span className="highlight-label">{card.label}</span>
                <span className="highlight-value">{card.value}</span>
                <span className="highlight-meta">{card.meta}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="content-wrapper">
          <aside className={`sidebar ${isMenuOpen ? 'mobile-visible' : ''}`}>
            <div className="sidebar-section">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="category-list">
                <li className="category-item active">
                  <span className="category-icon">💻</span>
                  <span>Computers</span>
                  <span className="category-count">24</span>
                </li>
                <li className="category-item">
                  <span className="category-icon">📱</span>
                  <span>Mobile Devices</span>
                  <span className="category-count">18</span>
                </li>
                <li className="category-item">
                  <span className="category-icon">🖥️</span>
                  <span>Monitors</span>
                  <span className="category-count">12</span>
                </li>
                <li className="category-item">
                  <span className="category-icon">⌨️</span>
                  <span>Peripherals</span>
                  <span className="category-count">32</span>
                </li>
                <li className="category-item">
                  <span className="category-icon">📡</span>
                  <span>Networking</span>
                  <span className="category-count">7</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Quick Stats</h3>
              <div className="stats-grid">
                {quickStats.map(stat => (
                  <div key={stat.label} className={`stat-card ${stat.trendClass}`}>
                    <div className="stat-card-header">
                      <div className="stat-icon">{stat.icon}</div>
                      <span className="stat-trend">{stat.trend}</span>
                    </div>
                    <div className="stat-body">
                      <span className="stat-label">{stat.label}</span>
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-subtext">{stat.subLabel}</span>
                    </div>
                    <div className="stat-progress">
                      <div
                        className="stat-progress-fill"
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="main-panel">
            <div className="panel-card">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                {activityLog.map(item => (
                  <li key={item.title} className="activity-item">
                    <div>
                      <p className="activity-title">{item.title}</p>
                      <span className="activity-detail">{item.detail}</span>
                    </div>
                    <span className="activity-time">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-card">
              <h3>Lifecycle Breakdown</h3>
              <div className="status-breakdown">
                {lifecycleBreakdown.map(item => (
                  <div key={item.label} className={`breakdown-pill ${item.className}`}>
                    <span className="pill-value">{item.value}</span>
                    <span className="pill-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
