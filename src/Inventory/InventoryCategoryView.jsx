import { FiChevronDown, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

function InventoryCategoryView({
  title,
  description,
  showForm,
  newItem,
  handleInputChange,
  addItem,
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
  editingItemId
}) {
  const heading = title || getInventoryHeading();
  const formTitle = isEditing ? 'Update Device' : 'Add Device';
  const primaryBtnLabel = isEditing ? 'Save Changes' : 'Add Device';

  return (
    <div className="inventory-layout">
      {showForm && (
        <div className="inventory-form">
          <div className="form-header">
            <div>
              <h2>{formTitle}</h2>
              {description && <p className="form-subtitle">{description}</p>}
            </div>
            {isEditing && (
              <button
                className="btn btn-close"
                type="button"
                aria-label="Cancel editing"
                onClick={() => onCancelEdit?.()}
              >
                ×
              </button>
            )}
          </div>
          <form onSubmit={addItem}>
            <div className="form-group">
              <label>Device Name</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  required
                />
              </div>
            </div>

            <div className="form-row single">
              <div className="form-group">
                <label>Category</label>
                <div className="select-wrapper">
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Peripheral">Peripheral</option>
                    <option value="Networking">Networking</option>
                    <option value="Display">Display</option>
                    <option value="Phones">Phones</option>
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
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

              <div className="form-group">
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

            <div className="form-actions">
              {isEditing && (
                <button type="button" className="btn btn-outline" onClick={() => onCancelEdit?.()}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                <FiPlus className="btn-icon" />
                {primaryBtnLabel}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="inventory-list" id="inventory-section" ref={inventorySectionRef}>
        <div className="list-header">
          <div>
            <h2>{heading}</h2>
            {description && !showForm && (
              <p className="list-description">{description}</p>
            )}
          </div>
          <div className="list-actions">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search items..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
            <button className="btn btn-outline">
              <FiFilter className="btn-icon" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="table-container">
          {filteredInventory.length === 0 ? (
            <div className="empty-state">
              <div className="empty-heading">No Devices Found</div>
              <p>
                {searchQuery
                  ? `We couldn't find any matches for “${searchQuery}”. Try another keyword or clear the search.`
                  : 'Add a new asset or switch filters to see matching inventory.'}
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr
                    key={item.id}
                    className={`${item.status.toLowerCase().replace(' ', '-')} ${editingItemId === item.id ? 'editing-row' : ''}`.trim()}
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
                    <td>{item.category}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => onEditItem?.(item.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          className="btn-icon danger"
                          onClick={() => removeItem(item.id)}
                          title="Delete"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryCategoryView;
