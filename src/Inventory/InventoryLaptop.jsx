import InventoryCategoryView from './InventoryCategoryView';

function InventoryLaptop({
  title = 'Laptop Inventory',
  description = 'Portable workstations issued to teams and departments.',
  showForm = true,
  ...rest
}) {
  return (
    <InventoryCategoryView
      {...rest}
      title={title}
      description={description}
      showForm={showForm}
    />
  );
}

export default InventoryLaptop;
