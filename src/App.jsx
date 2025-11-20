import { useState, useEffect, useRef } from 'react';
import { FiGrid, FiMonitor, FiCpu, FiMousePointer, FiSmartphone, FiLayers, FiMail, FiTrendingUp, FiShield, FiBox, FiTrash2 } from 'react-icons/fi';
import './App.css';
import NavBar from './component/NavBar';
import Dashboard from './component/Dashboard';
import Inventory from './component/Inventory';
import Reports from './component/Reports';
import Settings from './component/Settings';
import Footer from './component/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Conference TV', category: 'Display', status: 'Active', assetType: 'TV' },
    { id: 2, name: 'Laptop', category: 'Hardware', status: 'Back Up', assetType: 'Laptop' },
    { id: 3, name: 'Mouse', category: 'Peripheral', status: 'Active', assetType: 'Mouse' },
    { id: 4, name: 'iPhone 15', category: 'Phones', status: 'Disposed', assetType: 'Phones' }
  ]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Hardware',
    status: 'Active',
    assetType: 'Laptop'
  });
  const [settingsOptions, setSettingsOptions] = useState({
    autoAssign: true,
    outageAlerts: true,
    maintenanceLock: false,
    weeklyDigest: true
  });
  const [activeInventoryType, setActiveInventoryType] = useState('All');
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const inventorySectionRef = useRef(null);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getDefaultAssetType = () => (isAllInventoryView ? assetTypeOptions[0] || 'Laptop' : activeInventoryType);

  const resetNewItem = () => {
    setNewItem({
      name: '',
      category: 'Hardware',
      status: 'Active',
      assetType: getDefaultAssetType()
    });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;

    if (editingItemId) {
      setInventory(prev => prev.map(item => (
        item.id === editingItemId ? { ...item, ...newItem } : item
      )));
      setEditingItemId(null);
    } else {
      setInventory([...inventory, { ...newItem, id: Date.now() }]);
    }

    resetNewItem();
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = inventory.find(item => item.id === itemId);
    if (!itemToEdit) return;

    setEditingItemId(itemId);
    setNewItem({
      name: itemToEdit.name,
      category: itemToEdit.category,
      status: itemToEdit.status,
      assetType: itemToEdit.assetType
    });

    if (!isAllInventoryView && activeInventoryType !== itemToEdit.assetType) {
      setActiveInventoryType(itemToEdit.assetType);
    }

    inventorySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    resetNewItem();
  };

  const removeItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
    if (editingItemId === id) {
      cancelEdit();
    }
  };

  const toggleSetting = (key) => {
    setSettingsOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentYear = new Date().getFullYear();
  const activeAssets = inventory.filter(item => item.status === 'Active').length;
  const backupAssets = inventory.filter(item => item.status === 'Back Up').length;
  const disposedAssets = inventory.filter(item => item.status === 'Disposed').length;
  const totalQuantity = inventory.length;
  const uniqueCategories = new Set(inventory.map(item => item.category)).size;
  const inventoryUtilization = inventory.length ? Math.round((activeAssets / inventory.length) * 100) : 0;
  const categoryTotals = inventory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const dashboardHighlights = [
    { label: 'Total devices tracked', value: totalQuantity, meta: `${uniqueCategories} categories`, icon: <FiBox /> },
    { label: 'Active assets', value: activeAssets, meta: `${inventoryUtilization}% utilization`, icon: <FiTrendingUp /> },
    { label: 'Back up pool', value: backupAssets, meta: 'Ready for deployment', icon: <FiShield /> },
    { label: 'Disposed this quarter', value: disposedAssets, meta: 'Awaiting recycle', icon: <FiTrash2 /> }
  ];

  const activityLog = [
    { title: 'New laptop assigned', detail: 'Dell Latitude to Marketing team', time: '10:20 AM' },
    { title: 'Backup devices audited', detail: '6 peripherals verified', time: 'Yesterday' },
    { title: 'Asset retired', detail: 'Monitor #INV-203 moved to disposal', time: '2 days ago' }
  ];

  const lifecycleBreakdown = [
    { label: 'Active assets', value: activeAssets, className: 'active' },
    { label: 'Back up assets', value: backupAssets, className: 'back-up' },
    { label: 'Disposed assets', value: disposedAssets, className: 'disposed' }
  ];

  const subNavOptions = [
    { id: 'All', label: 'All devices', hint: 'Every asset category', icon: <FiGrid /> },
    { id: 'TV', label: 'TV Displays', hint: 'Conference & signage screens', icon: <FiMonitor /> },
    { id: 'Laptop', label: 'Laptops', hint: 'Portable workstations', icon: <FiCpu /> },
    { id: 'Mouse', label: 'Mice', hint: 'Pointing devices', icon: <FiMousePointer /> },
    { id: 'Phones', label: 'Phones', hint: 'Corporate mobiles', icon: <FiSmartphone /> },
    { id: 'SIM', label: 'SIM Cards', hint: 'Data & voice plans', icon: <FiLayers /> },
    { id: 'Email', label: 'Email Accounts', hint: 'Mailbox provisioning', icon: <FiMail /> }
  ];
  const inventoryTitleMap = {
    All: 'All',
    TV: 'TV',
    Laptop: 'Laptop',
    Mouse: 'Mice',
    Phones: 'Phones',
    SIM: 'SIM',
    Email: 'Email'
  };
  const assetTypeOptions = subNavOptions.filter(option => option.id !== 'All').map(option => option.id);
  const isAllInventoryView = activeInventoryType === 'All';
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const hasSearchQuery = normalizedSearchQuery.length > 0;

  const isEditing = Boolean(editingItemId);

  const filteredInventoryByType = isAllInventoryView
    ? inventory
    : inventory.filter(item => item.assetType === activeInventoryType);

  const filteredInventory = hasSearchQuery
    ? filteredInventoryByType.filter(item => {
        const haystack = `${item.name} ${item.category} ${item.status} ${item.assetType}`.toLowerCase();
        return haystack.includes(normalizedSearchQuery);
      })
    : filteredInventoryByType;

  const filteredActivityLog = hasSearchQuery
    ? activityLog.filter(item =>
        `${item.title} ${item.detail} ${item.time}`.toLowerCase().includes(normalizedSearchQuery)
      )
    : activityLog;
  const assetCounts = inventory.reduce((acc, item) => {
    acc[item.assetType] = (acc[item.assetType] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    if (!isAllInventoryView) {
      setNewItem(prev => ({
        ...prev,
        assetType: activeInventoryType
      }));
    }
  }, [activeInventoryType, isAllInventoryView]);

  const getTypeCount = (type) => (type === 'All' ? inventory.length : assetCounts[type] || 0);
  const getInventoryHeading = () => {
    const label = inventoryTitleMap[activeInventoryType] || activeInventoryType;
    return `${label} Inventory`;
  };

  const reportsSummary = [
    { title: 'Assets in use', value: activeAssets, meta: '+4% vs last month' },
    { title: 'Back up coverage', value: backupAssets, meta: 'Spare devices available' },
    { title: 'Disposals pending', value: disposedAssets, meta: 'Awaiting recycler pickup' }
  ];

  const monthlyMovements = [
    { month: 'Jan', value: 72 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 68 },
    { month: 'Apr', value: 74 },
    { month: 'May', value: 61 },
    { month: 'Jun', value: 78 }
  ];

  const reportInsights = [
    { title: 'Inventory accuracy', value: '99.3%', meta: 'Audit completed 6 days ago', trend: '+1.2% vs Q2' },
    { title: 'Avg refresh age', value: '26 mo', meta: 'Target < 30 months', trend: '-4 mo YoY' },
    { title: 'Tickets resolved', value: '42', meta: 'SLA met for 94%', trend: '+8 this week' },
    { title: 'Backlog risk', value: 'Low', meta: '4 approvals pending', trend: 'Stable' }
  ];

  const complianceSnapshot = [
    { title: 'Lifecycle compliance', value: '98%', status: 'On track', meta: 'Policy threshold 95%', progress: 98, level: 'good' },
    { title: 'Security posture', value: '92%', status: 'Monitor', meta: '2 patch waves outstanding', progress: 92, level: 'warn' },
    { title: 'Warranty coverage', value: '88%', status: 'Renew', meta: '11 devices expiring in 30 days', progress: 88, level: 'warn' }
  ];

  const vendorSpend = [
    { vendor: 'Dell', spend: '$38K', change: '+12% QoQ', coverage: 36 },
    { vendor: 'Apple', spend: '$22K', change: '+4% QoQ', coverage: 21 },
    { vendor: 'HP', spend: '$18K', change: '-3% QoQ', coverage: 17 },
    { vendor: 'Lenovo', spend: '$15K', change: '+9% QoQ', coverage: 14 }
  ];

  const refreshSchedule = [
    { assetType: 'Laptops', window: 'Q1 2026', count: 18, status: 'Coordinating' },
    { assetType: 'Displays', window: 'Q3 2025', count: 12, status: 'Scheduled' },
    { assetType: 'Mobile devices', window: 'Q4 2025', count: 20, status: 'Planning' }
  ];

  const incidentFeed = [
    { title: 'Laptop loss reported', detail: 'Marketing · asset INV-554', severity: 'high', status: 'Investigating', time: '2h ago' },
    { title: 'Battery recall notice', detail: 'Lenovo lot #8127', severity: 'medium', status: 'Action required', time: 'Yesterday' },
    { title: 'Patch window complete', detail: 'Exchange servers', severity: 'low', status: 'Closed', time: '2 days ago' }
  ];

  const handleNavigate = (sectionId) => {
    if (sectionId === 'inventory') {
      setTimeout(() => {
        if (inventorySectionRef.current) {
          inventorySectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  };

  const renderPageContent = () => {
    switch (activeTab) {
      case 'inventory':
        return (
          <Inventory
            subNavOptions={subNavOptions}
            activeInventoryType={activeInventoryType}
            setActiveInventoryType={setActiveInventoryType}
            getTypeCount={getTypeCount}
            newItem={newItem}
            handleInputChange={handleInputChange}
            addItem={addItem}
            isAllInventoryView={isAllInventoryView}
            assetTypeOptions={assetTypeOptions}
            inventorySectionRef={inventorySectionRef}
            getInventoryHeading={getInventoryHeading}
            filteredInventory={filteredInventory}
            removeItem={removeItem}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            isEditing={isEditing}
            onEditItem={handleEditItem}
            onCancelEdit={cancelEdit}
          />
        );
      case 'reports':
        return (
          <Reports
            reportsSummary={reportsSummary}
            monthlyMovements={monthlyMovements}
            categoryTotals={categoryTotals}
            reportInsights={reportInsights}
            complianceSnapshot={complianceSnapshot}
            vendorSpend={vendorSpend}
            refreshSchedule={refreshSchedule}
            incidentFeed={incidentFeed}
          />
        );
      case 'settings':
        return (
          <Settings
            settingsOptions={settingsOptions}
            toggleSetting={toggleSetting}
          />
        );
      default:
        return (
          <Dashboard
            dashboardHighlights={dashboardHighlights}
            activityLog={filteredActivityLog}
            lifecycleBreakdown={lifecycleBreakdown}
            totalQuantity={totalQuantity}
            backupAssets={backupAssets}
            disposedAssets={disposedAssets}
            isMenuOpen={isMenuOpen}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {renderPageContent()}

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
    </div>
  );
}

export default App;