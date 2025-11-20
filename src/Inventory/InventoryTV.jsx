import InventoryCategoryView from './InventoryCategoryView';

function InventoryTV({
  title = 'TV Displays Inventory',
  description = 'Conference & signage screens across all locations.',
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

export default InventoryTV;
