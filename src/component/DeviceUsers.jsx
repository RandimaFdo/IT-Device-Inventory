import { useEffect, useMemo, useState } from 'react';
import {
  FiDownload,
  FiUsers,
  FiLayers,
  FiDollarSign,
  FiCpu,
  FiCoffee,
  FiTool,
  FiPlus
} from 'react-icons/fi';

const departmentOptions = [
  { id: 'All Departments', label: 'All Departments', hint: 'Company-wide view', icon: <FiUsers /> },
  { id: 'Admin & General', label: 'Admin & General', hint: 'Operations hub', icon: <FiLayers /> },
  { id: 'Finance', label: 'Finance', hint: 'Approvals & audits', icon: <FiDollarSign /> },
  { id: 'Information Technology', label: 'Information Technology', hint: 'Service desk + infra', icon: <FiCpu /> },
  { id: 'Food & Beverage', label: 'Food & Beverage', hint: 'Front-of-house teams', icon: <FiCoffee /> },
  { id: 'Engineering', label: 'Engineering', hint: 'Product & field teams', icon: <FiTool /> }
];

const initialDepartmentRoster = [
  { id: 1, name: 'Ava Dias', role: 'Operations Manager', department: 'Admin & General', devices: ['MacBook Pro', 'Logitech Headset'], status: 'Active' },
  { id: 2, name: 'Jordan Perera', role: 'Finance Analyst', department: 'Finance', devices: ['Surface Laptop', 'Smartphone'], status: 'Active' },
  { id: 3, name: 'Ishan Rodrigo', role: 'Systems Engineer', department: 'Information Technology', devices: ['ThinkPad', 'iPad', 'Network Toolkit'], status: 'Active' },
  { id: 4, name: 'Maya Ferdinands', role: 'F&B Supervisor', department: 'Food & Beverage', devices: ['iPhone', 'POS Tablet'], status: 'Active' },
  { id: 5, name: 'Samali Fernando', role: 'Engineering Lead', department: 'Engineering', devices: ['Precision Laptop', 'Field Sensor Kit'], status: 'Leave' },
  { id: 6, name: 'Liam Jayasinghe', role: 'Admin Coordinator', department: 'Admin & General', devices: ['Dell Latitude'], status: 'Onboarding' },
  { id: 7, name: 'Kavya Gomez', role: 'IT Support', department: 'Information Technology', devices: ['Mac Mini', 'Service Phone'], status: 'Active' },
  { id: 8, name: 'Dinara Liyanage', role: 'Finance Controller', department: 'Finance', devices: ['MacBook Air'], status: 'Active' }
];

function DeviceUsers() {
  const [departmentRoster, setDepartmentRoster] = useState(initialDepartmentRoster);
  const [activeDepartment, setActiveDepartment] = useState('All Departments');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [deviceInput, setDeviceInput] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const closeUserModal = () => {
    setSelectedUserId(null);
    setIsEditingUser(false);
    setEditableUser(null);
    setDeviceInput('');
    setIsCreatingUser(false);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && selectedUserId !== null) {
        closeUserModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedUserId]);

  const departmentStats = useMemo(() => {
    const stats = departmentRoster.reduce((acc, user) => {
      const dept = user.department;
      if (!acc[dept]) {
        acc[dept] = { people: 0, devices: 0 };
      }
      acc[dept].people += 1;
      acc[dept].devices += user.devices.length;
      return acc;
    }, {});

    const totalPeople = departmentRoster.length;
    const totalDevices = departmentRoster.reduce((sum, user) => sum + user.devices.length, 0);
    stats['All Departments'] = { people: totalPeople, devices: totalDevices };
    return stats;
  }, [departmentRoster]);

  const filteredRoster = activeDepartment === 'All Departments'
    ? departmentRoster
    : departmentRoster.filter(user => user.department === activeDepartment);

  const isNewUser = selectedUserId === 'new';
  const selectedUser = isNewUser ? null : departmentRoster.find(user => user.id === selectedUserId) || null;
  const modalUser = isNewUser ? editableUser : selectedUser;
  const selectedUserDevices = editableUser?.devices ?? selectedUser?.devices ?? [];

  useEffect(() => {
    if (selectedUserId && selectedUser) {
      setEditableUser({ ...selectedUser, devices: [...selectedUser.devices] });
      setDeviceInput('');
      setIsEditingUser(false);
      setIsCreatingUser(false);
    }
  }, [selectedUserId, selectedUser]);

  const activeUsers = filteredRoster.filter(user => user.status === 'Active').length;
  const pendingUsers = filteredRoster.length - activeUsers;
  const totalDevices = filteredRoster.reduce((sum, user) => sum + user.devices.length, 0);

  const getDepartmentCount = (deptId) => {
    if (deptId === 'All Departments') return departmentRoster.length;
    return departmentStats[deptId]?.people || 0;
  };

  const getInitials = (name = '') => (
    name.trim().length
      ? name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
      : 'NU'
  );

  const startCreateUser = () => {
    const defaultDepartment = departmentOptions.find(option => option.id !== 'All Departments')?.id || 'Admin & General';
    const newUserTemplate = {
      id: Date.now(),
      name: '',
      role: '',
      department: defaultDepartment,
      devices: [],
      status: 'Active'
    };
    setEditableUser(newUserTemplate);
    setSelectedUserId('new');
    setIsEditingUser(true);
    setIsCreatingUser(true);
    setDeviceInput('');
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Device Users</h1>
            <p className="welcome-text">Track which teams are holding devices and their readiness.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <FiDownload className="btn-icon" />
              <span>Export roster</span>
            </button>
            <button className="btn btn-primary" onClick={startCreateUser}>
              <FiPlus className="btn-icon" />
              <span>Add user</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content inventory-page">
        <div className="inventory-subnav">
          {departmentOptions.map(option => (
            <button
              key={option.id}
              className={`subnav-btn ${activeDepartment === option.id ? 'active' : ''}`}
              onClick={() => {
                setActiveDepartment(option.id);
                setSelectedUserId(null);
              }}
            >
              <div className="subnav-header">
                <span className="subnav-icon">{option.icon}</span>
                <span className="subnav-count">{getDepartmentCount(option.id)}</span>
              </div>
              <div className="subnav-details">
                <span className="subnav-label">{option.label}</span>
                <span className="subnav-hint">{option.hint}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="device-users-grid">
          <div className="inventory-list">
            <div className="list-header">
              <div>
                <h2>{activeDepartment}</h2>
                <p className="list-description">
                  {filteredRoster.length} {filteredRoster.length === 1 ? 'person' : 'people'} · {totalDevices} devices checked out
                </p>
              </div>
            </div>

            <div className="table-container">
              {filteredRoster.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-heading">No users found</div>
                  <p>Assign devices to this department to see them listed here.</p>
                </div>
              ) : (
                <table className="device-users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Department</th>
                      <th>Assigned devices</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoster.map(user => {
                      const isSelected = selectedUser?.id === user.id;
                      return (
                        <tr
                          key={user.id}
                          className={`selectable-row ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedUserId(user.id)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setSelectedUserId(user.id);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-selected={isSelected}
                        >
                          <td>
                            <div className="item-info">
                              <div className="item-icon avatar-pill">{getInitials(user.name)}</div>
                              <div>
                                <div className="item-name">{user.name}</div>
                                <div className="item-sku">{user.role}</div>
                              </div>
                            </div>
                          </td>
                          <td>{user.department}</td>
                          <td>
                            <div className="device-chip-group">
                              {user.devices.map(device => (
                                <span key={device} className="status-badge neutral">{device}</span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${user.status.toLowerCase().replace(' ', '-')}`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <aside className="device-users-summary">
            <div className="summary-card profile-card hint-card">
              <h3>User insights</h3>
              <p className="summary-meta">
                Choose a teammate from the roster to open their profile in a focused popup with device history.
              </p>
              <small>{modalUser ? 'Press Esc or use the close button to dismiss the profile.' : 'No user selected yet.'}</small>
            </div>

            <div className="summary-card">
              <h3>Department snapshot</h3>
              <ul>
                <li>
                  <span>People</span>
                  <strong>{filteredRoster.length}</strong>
                </li>
                <li>
                  <span>Active</span>
                  <strong>{activeUsers}</strong>
                </li>
                <li>
                  <span className="detail-label">Department</span>
                  <strong>{editableUser?.department || selectedUser?.department || '—'}</strong>
                </li>
                <li>
                  <span>Pending / leave</span>
                  <strong>{pendingUsers}</strong>
                </li>
                <li>
                  <span>Devices issued</span>
                  <strong>{totalDevices}</strong>
                </li>
              </ul>
            </div>

            <div className="summary-card light">
              <h4>Utilization</h4>
              <p className="summary-meta">
                {departmentStats[activeDepartment]?.devices || 0} total devices allocated to this department.
              </p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${Math.min(100, (totalDevices / Math.max(1, departmentStats[activeDepartment]?.devices || totalDevices)) * 100)}%` }}
                />
              </div>
              <small>Counts update automatically when devices are re-assigned.</small>
            </div>
          </aside>
        </div>
      </main>

      {modalUser && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={closeUserModal}
        >
          <div
            className="modal-content user-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="userModalTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={closeUserModal} aria-label="Close user details">
              ×
            </button>

            <header className="modal-header">
              <div className="item-info">
                <div className="item-icon avatar-pill large">{getInitials(modalUser.name)}</div>
                <div>
                  <h2 id="userModalTitle" className="item-name">{modalUser.name || 'New team member'}</h2>
                  <p className="item-sku">{modalUser.role || 'Define their role'}</p>
                </div>
              </div>
              <span className={`status-badge ${modalUser.status.toLowerCase().replace(' ', '-')}`}>
                {modalUser.status}
              </span>
            </header>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="input-group">
                  <label htmlFor="userName">Name</label>
                  <input
                    id="userName"
                    type="text"
                    value={editableUser?.name || ''}
                    onChange={(event) => setEditableUser(prev => ({ ...prev, name: event.target.value }))}
                    disabled={!isEditingUser}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="userRole">Role</label>
                  <input
                    id="userRole"
                    type="text"
                    value={editableUser?.role || ''}
                    onChange={(event) => setEditableUser(prev => ({ ...prev, role: event.target.value }))}
                    disabled={!isEditingUser}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="userDepartment">Department</label>
                  <input
                    id="userDepartment"
                    type="text"
                    value={editableUser?.department || ''}
                    onChange={(event) => setEditableUser(prev => ({ ...prev, department: event.target.value }))}
                    disabled={!isEditingUser}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="userStatus">Status</label>
                  <select
                    id="userStatus"
                    value={editableUser?.status || ''}
                    onChange={(event) => setEditableUser(prev => ({ ...prev, status: event.target.value }))}
                    disabled={!isEditingUser}
                  >
                    <option value="Active">Active</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
              </div>

              <div className="user-device-section">
                <h4>Assigned devices</h4>
                {isEditingUser && (
                  <form
                    className="device-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!deviceInput.trim()) return;
                      setEditableUser(prev => ({
                        ...prev,
                        devices: [...prev.devices, deviceInput.trim()]
                      }));
                      setDeviceInput('');
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Add device name"
                      value={deviceInput}
                      onChange={(event) => setDeviceInput(event.target.value)}
                    />
                    <button type="submit" className="btn btn-primary small">Add</button>
                  </form>
                )}

                {selectedUserDevices.length > 0 ? (
                  <ul className="modal-device-list editable">
                    {selectedUserDevices.map(device => (
                      <li key={device}>
                        <span className="status-badge neutral">{device}</span>
                        {isEditingUser && (
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => setEditableUser(prev => ({
                              ...prev,
                              devices: prev.devices.filter(item => item !== device)
                            }))}
                            aria-label={`Remove ${device}`}
                          >
                            ×
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="detail-muted">No devices assigned</p>
                )}
              </div>

              <div className="modal-actions">
                {isEditingUser ? (
                  <>
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => {
                        if (isNewUser) {
                          closeUserModal();
                          return;
                        }
                        setIsEditingUser(false);
                        setEditableUser({ ...selectedUser, devices: [...selectedUser.devices] });
                        setDeviceInput('');
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        if (!editableUser?.name?.trim()) {
                          return;
                        }
                        setDepartmentRoster(prev => {
                          const exists = prev.some(user => user.id === editableUser.id);
                          if (exists) {
                            return prev.map(user => (user.id === editableUser.id ? { ...editableUser } : user));
                          }
                          return [...prev, { ...editableUser }];
                        });
                        setIsEditingUser(false);
                        setIsCreatingUser(false);
                        setSelectedUserId(editableUser.id);
                      }}
                    >
                      Save changes
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => setIsEditingUser(true)}
                    disabled={!selectedUser}
                  >
                    Edit user
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeviceUsers;
