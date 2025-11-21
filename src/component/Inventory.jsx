import { useEffect, useState } from 'react';
import { FiDownload, FiPlus, FiChevronDown, FiSearch, FiFilter } from 'react-icons/fi';

const categoryContentMap = {
  All: {
    title: 'All Inventory',
    description: 'Complete overview of every asset category across your workspace.',
    showForm: true
  },
  TV: {
    title: 'TV Displays Inventory',
    description: 'Conference & signage screens across all locations.',
    showForm: true
  },
  Laptop: {
    title: 'Laptop Inventory',
    description: 'Portable workstations issued to teams and departments.',
    showForm: true
  },
  Mouse: {
    title: 'Peripheral Inventory',
    description: 'Pointing devices and other accessories ready for deployment.',
    showForm: true
  },
  Phones: {
    title: 'Corporate Phones',
    description: 'Provisioned smartphones and voice devices.',
    showForm: true
  },
  SIM: {
    title: 'SIM & Connectivity',
    description: 'Managed SIM cards for data and voice plans.',
    showForm: true
  },
  Email: {
    title: 'Email Accounts',
    description: 'Mailbox provisioning and license tracking.',
    showForm: true
  }
};

function InventoryCategoryView({
  title,
  description,
  showForm,
  newItem,
  handleInputChange,
  isAllInventoryView,
  assetTypeOptions,
  activeInventoryType,
  inventorySectionRef,
  getInventoryHeading,
  filteredInventory,
  removeItem,
  searchQuery,
  onSearchChange,
  onEditItem,
  onCancelEdit,
  isEditing,
  editingItemId,
  isDeviceFormOpen,
  onDeviceFormSubmit,
  onCancelDeviceForm,
  onOpenDeviceForm
}) {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const selectedDevice = filteredInventory.find(item => item.id === selectedDeviceId) || null;

  const closeDeviceModal = () => {
    setSelectedDeviceId(null);
  };

  useEffect(() => {
    if (!selectedDeviceId) {
      return undefined;
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDeviceModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedDeviceId]);
  const heading = title || getInventoryHeading();
  const formTitle = isEditing ? 'Update Device' : 'Add Device';
  const primaryBtnLabel = isEditing ? 'Save Changes' : 'Add Device';

  const totalDevices = filteredInventory.length;
  const activeDevices = filteredInventory.filter(item => item.status === 'Active').length;
  const backupDevices = filteredInventory.filter(item => item.status === 'Back Up').length;
  const disposedDevices = filteredInventory.filter(item => item.status === 'Disposed').length;
  const assignedDevices = filteredInventory.filter(item => Boolean(item.assignedTo)).length;
  const unassignedDevices = Math.max(0, totalDevices - assignedDevices);
  const assignmentProgress = totalDevices ? Math.min(100, Math.round((assignedDevices / totalDevices) * 100)) : 0;

  return (
    <div className="device-users-grid inventory-grid" id="inventory-section" ref={inventorySectionRef}>
      <div className="inventory-list">
        <div className="list-header">
          <div>
            <h2>{heading}</h2>
            <p className="list-description">
              {totalDevices} {totalDevices === 1 ? 'device' : 'devices'} · {activeDevices} active · {unassignedDevices} unassigned
            </p>
          </div>
          <div className="list-actions">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search devices..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
            <button className="btn btn-outline">
              <FiFilter className="btn-icon" />
              <span>Filters</span>
            </button>
            <button className="btn btn-primary" onClick={onOpenDeviceForm}>
              <FiPlus className="btn-icon" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        <div className="table-container">
          {filteredInventory.length === 0 ? (
            <div className="empty-state">
              <div className="empty-heading">No devices found</div>
              <p>
                {searchQuery
                  ? `We couldn't find any matches for “${searchQuery}”. Try another keyword or clear the search.`
                  : 'Add a new asset or switch filters to see matching inventory.'}
              </p>
            </div>
          ) : (
            <table className="device-users-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Serial No</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => {
                  const isActive = editingItemId === item.id || selectedDeviceId === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`selectable-row ${isActive ? 'active' : ''}`.trim()}
                      onClick={() => setSelectedDeviceId(item.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelectedDeviceId(item.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-selected={isActive}
                    >
                      <td>
                        <div className="item-info">
                          <div className="item-icon">
                            {item.category === 'Hardware' ? '💻' :
                             item.category === 'Software' ? '💾' :
                             item.category === 'Peripheral' ? '🖱️' :
                             item.category === 'Networking' ? '📡' : '🖥️'}
                          </div>
                          <div>
                            <div className="item-name">{item.name}</div>
                            <div className="item-sku">SKU: {Math.floor(100000 + Math.random() * 900000)}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.serialNumber || `SN-${item.id.toString().padStart(6, '0')}`}</td>
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.assignedTo ? (
                          <span className="status-badge neutral">{item.assignedTo}</span>
                        ) : (
                          <span className="detail-muted">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isDeviceFormOpen && (
        <div className="modal-overlay" role="presentation" onClick={() => onCancelDeviceForm?.()}>
          <div
            className="modal-content user-modal device-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deviceFormTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => onCancelDeviceForm?.()} aria-label="Close device form">
              ×
            </button>

            <header className="modal-header">
              <h2 id="deviceFormTitle" className="item-name">{formTitle}</h2>
              <span className="detail-muted">Fill in the device details below</span>
            </header>

            <form className="modal-body" onSubmit={(event) => onDeviceFormSubmit?.(event)}>
              <div className="modal-grid">
                <div className="input-group">
                  <label>Device Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Enter item name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={newItem.serialNumber || ''}
                    onChange={handleInputChange}
                    placeholder="Enter serial number"
                  />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <div className="select-wrapper">
                    <select
                      name="status"
                      value={newItem.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Back Up">Back Up</option>
                      <option value="Disposed">Disposed</option>
                    </select>
                    <FiChevronDown className="select-arrow" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Asset Type</label>
                  {isAllInventoryView ? (
                    <div className="select-wrapper">
                      <select
                        name="assetType"
                        value={newItem.assetType}
                        onChange={handleInputChange}
                      >
                        {assetTypeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <FiChevronDown className="select-arrow" />
                    </div>
                  ) : (
                    <div className="readonly-pill">
                      {activeInventoryType}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => onCancelDeviceForm?.()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiPlus className="btn-icon" />
                  {primaryBtnLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <aside className="device-users-summary inventory-summary">
        <div className="summary-card" style={{ marginBottom: '1.5rem' }}>
          <div className="summary-header">
            <div className="summary-icon">📊</div>
            <h3>Inventory Overview</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{totalDevices}</div>
              <div className="stat-label">Total Devices</div>
            </div>
            <div className="stat-item active">
              <div className="stat-value">{activeDevices}</div>
              <div className="stat-label">Active</div>
            </div>
            <div className="stat-item backup">
              <div className="stat-value">{backupDevices}</div>
              <div className="stat-label">Back Up</div>
            </div>
            <div className="stat-item disposed">
              <div className="stat-value">{disposedDevices}</div>
              <div className="stat-label">Disposed</div>
            </div>
          </div>
          <div className="assignment-stats">
            <div className="assignment-item">
              <span className="assignment-label">Assigned</span>
              <span className="assignment-value">{assignedDevices}</span>
            </div>
            <div className="assignment-item">
              <span className="assignment-label">Available</span>
              <span className="assignment-value">{unassignedDevices}</span>
            </div>
          </div>
        </div>

        <div className="summary-card utilization-card">
          <div className="summary-header">
            <div className="summary-icon">🎯</div>
            <h4>Device Utilization</h4>
          </div>
          <div className="utilization-metrics">
            <div className="metric-primary">
              <div className="metric-value">{assignmentProgress}%</div>
              <div className="metric-label">Allocation Rate</div>
            </div>
            <div className="metric-details">
              <div className="metric-detail">
                <span>In Use</span>
                <strong>{assignedDevices}</strong>
              </div>
              <div className="metric-detail">
                <span>Total Pool</span>
                <strong>{totalDevices}</strong>
              </div>
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-label">Current Utilization</div>
            <div className="progress-bar modern">
              <div className="progress" style={{ width: `${assignmentProgress}%` }} />
              <div className="progress-glow" style={{ width: `${assignmentProgress}%` }} />
            </div>
            <div className="progress-text">{assignedDevices} of {totalDevices} devices allocated</div>
          </div>
          <div className="utilization-footer">
            <div className="status-indicator">
              <div className={`status-dot ${assignmentProgress >= 80 ? 'high' : assignmentProgress >= 50 ? 'medium' : 'low'}`}></div>
              <span>
                {assignmentProgress >= 80 ? 'High utilization' : assignmentProgress >= 50 ? 'Moderate utilization' : 'Low utilization'}
              </span>
            </div>
          </div>
        </div>
      </aside>
      {selectedDevice && (
        <div className="modal-overlay" role="presentation" onClick={closeDeviceModal}>
          <div
            className="modal-content user-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deviceModalTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={closeDeviceModal} aria-label="Close device details">
              ×
            </button>

            <header className="modal-header">
              <div className="item-info">
                <div className="item-icon">
                  {selectedDevice.category === 'Hardware' ? '💻' :
                   selectedDevice.category === 'Software' ? '💾' :
                   selectedDevice.category === 'Peripheral' ? '🖱️' :
                   selectedDevice.category === 'Networking' ? '📡' : '🖥️'}
                </div>
                <div>
                  <h2 id="deviceModalTitle" className="item-name">{selectedDevice.name}</h2>
                  <p className="item-sku">{selectedDevice.assetType}</p>
                </div>
              </div>
              <span className={`status-badge ${selectedDevice.status.toLowerCase().replace(' ', '-')}`}>
                {selectedDevice.status}
              </span>
            </header>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="input-group">
                  <label>Serial No</label>
                  <input type="text" value={selectedDevice.serialNumber || ''} disabled />
                </div>
                <div className="input-group">
                  <label>Asset Type</label>
                  <input type="text" value={selectedDevice.assetType} disabled />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <input type="text" value={selectedDevice.status} disabled />
                </div>
                <div className="input-group">
                  <label>Assigned To</label>
                  <input type="text" value={selectedDevice.assignedTo || 'Unassigned'} disabled />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    onEditItem?.(selectedDevice.id);
                    onOpenDeviceForm?.();
                    closeDeviceModal();
                  }}
                >
                  Edit Device
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    removeItem(selectedDevice.id);
                    closeDeviceModal();
                  }}
                >
                  Delete Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Inventory(props) {
  const {
    subNavOptions,
    activeInventoryType,
    setActiveInventoryType,
    getTypeCount,
    inventorySectionRef,
    newItem,
    handleInputChange,
    addItem,
    isAllInventoryView,
    assetTypeOptions,
    getInventoryHeading,
    filteredInventory,
    removeItem,
    searchQuery,
    onSearchChange,
    onEditItem,
    onCancelEdit,
    resetNewItem,
    isEditing
  } = props;

  const { title, description, showForm } = categoryContentMap[activeInventoryType] || categoryContentMap.All;
  const [isDeviceFormOpen, setIsDeviceFormOpen] = useState(false);

  const openCreateDeviceModal = () => {
    if (isEditing) {
      onCancelEdit?.();
    }
    resetNewItem?.();
    setIsDeviceFormOpen(true);
  };

  const handleDeviceFormSubmit = (event) => {
    addItem(event);
    setIsDeviceFormOpen(false);
  };

  const handleCancelDeviceForm = () => {
    if (isEditing) {
      onCancelEdit?.();
    }
    resetNewItem?.();
    setIsDeviceFormOpen(false);
  };

  const handleEditDevice = (itemId) => {
    onEditItem?.(itemId);
    setIsDeviceFormOpen(true);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Inventory Workspace</h1>
            <p className="welcome-text">Add new hardware and maintain accurate records.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <FiDownload className="btn-icon" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content inventory-page">
        <div className="inventory-subnav">
          {subNavOptions.map(option => (
            <button
              key={option.id}
              className={`subnav-btn ${activeInventoryType === option.id ? 'active' : ''}`}
              onClick={() => setActiveInventoryType(option.id)}
            >
              <div className="subnav-header">
                <span className="subnav-icon">{option.icon}</span>
                <span className="subnav-count">{getTypeCount(option.id)}</span>
              </div>
              <div className="subnav-details">
                <span className="subnav-label">{option.label}</span>
                <span className="subnav-hint">{option.hint}</span>
              </div>
            </button>
          ))}
        </div>

        <InventoryCategoryView
          {...props}
          title={title}
          description={description}
          showForm={showForm}
          newItem={newItem}
          handleInputChange={handleInputChange}
          isAllInventoryView={isAllInventoryView}
          assetTypeOptions={assetTypeOptions}
          getInventoryHeading={getInventoryHeading}
          filteredInventory={filteredInventory}
          removeItem={removeItem}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onEditItem={handleEditDevice}
          onCancelEdit={onCancelEdit}
          isEditing={isEditing}
          isDeviceFormOpen={isDeviceFormOpen}
          onDeviceFormSubmit={handleDeviceFormSubmit}
          onCancelDeviceForm={handleCancelDeviceForm}
          onOpenDeviceForm={() => setIsDeviceFormOpen(true)}
        />
      </main>
    </>
  );
}

export default Inventory;
