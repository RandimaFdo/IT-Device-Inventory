import { FiDownload, FiPlus } from 'react-icons/fi';
import InventoryAll from '../Inventory/InventoryAll';
import InventoryTV from '../Inventory/InventoryTV';
import InventoryLaptop from '../Inventory/InventoryLaptop';
import InventoryMouse from '../Inventory/InventoryMouse';
import InventoryPhones from '../Inventory/InventoryPhones';
import InventorySIM from '../Inventory/InventorySIM';
import InventoryEmail from '../Inventory/InventoryEmail';

const categoryComponents = {
  All: InventoryAll,
  TV: InventoryTV,
  Laptop: InventoryLaptop,
  Mouse: InventoryMouse,
  Phones: InventoryPhones,
  SIM: InventorySIM,
  Email: InventoryEmail
};

function Inventory(props) {
  const {
    subNavOptions,
    activeInventoryType,
    setActiveInventoryType,
    getTypeCount,
    inventorySectionRef
  } = props;

  const ActiveCategory = categoryComponents[activeInventoryType] || InventoryAll;

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
            <button
              className="btn btn-primary"
              onClick={() => inventorySectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FiPlus className="btn-icon" />
              <span>Add Item</span>
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

        <ActiveCategory {...props} />
      </main>
    </>
  );
}

export default Inventory;
