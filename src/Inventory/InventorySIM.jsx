import InventoryCategoryView from './InventoryCategoryView';

function InventorySIM({
  title = 'SIM Card Inventory',
  description = 'Data and voice plans assigned to employees.',
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

export default InventorySIM;
