import InventoryCategoryView from './InventoryCategoryView';

function InventoryAll({
  title = 'All Inventory',
  description = 'Complete overview of every asset category across your workspace.',
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

export default InventoryAll;
