import InventoryCategoryView from './InventoryCategoryView';

function InventoryMouse({
  title = 'Peripheral Inventory',
  description = 'Pointing devices and accessories in circulation.',
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

export default InventoryMouse;
