import { useMemo, useState } from 'react';
import {
  FiDownload,
  FiUsers,
  FiLayers,
  FiDollarSign,
  FiCpu,
  FiCoffee,
  FiTool
} from 'react-icons/fi';

const departmentOptions = [
  { id: 'All Departments', label: 'All Departments', hint: 'Company-wide view', icon: <FiUsers /> },
  { id: 'Admin & General', label: 'Admin & General', hint: 'Operations hub', icon: <FiLayers /> },
  { id: 'Finance', label: 'Finance', hint: 'Approvals & audits', icon: <FiDollarSign /> },
  { id: 'Information Technology', label: 'Information Technology', hint: 'Service desk + infra', icon: <FiCpu /> },
  { id: 'Food & Beverage', label: 'Food & Beverage', hint: 'Front-of-house teams', icon: <FiCoffee /> },
  { id: 'Engineering', label: 'Engineering', hint: 'Product & field teams', icon: <FiTool /> }
];

const departmentRoster = [
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
  const [activeDepartment, setActiveDepartment] = useState('All Departments');

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
  }, []);

  const filteredRoster = activeDepartment === 'All Departments'
    ? departmentRoster
    : departmentRoster.filter(user => user.department === activeDepartment);

  const activeUsers = filteredRoster.filter(user => user.status === 'Active').length;
  const pendingUsers = filteredRoster.length - activeUsers;
  const totalDevices = filteredRoster.reduce((sum, user) => sum + user.devices.length, 0);

  const getDepartmentCount = (deptId) => {
    if (deptId === 'All Departments') return departmentRoster.length;
    return departmentStats[deptId]?.people || 0;
  };

  const getInitials = (name) => name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();

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
          </div>
        </div>
      </header>

      <main className="main-content inventory-page">
        <div className="inventory-subnav">
          {departmentOptions.map(option => (
            <button
              key={option.id}
              className={`subnav-btn ${activeDepartment === option.id ? 'active' : ''}`}
              onClick={() => setActiveDepartment(option.id)}
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
                    {filteredRoster.map(user => (
                      <tr key={user.id}>
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
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <aside className="device-users-summary">
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
    </>
  );
}

export default DeviceUsers;
