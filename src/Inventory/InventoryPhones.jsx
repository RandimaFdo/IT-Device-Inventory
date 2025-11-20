import InventoryCategoryView from './InventoryCategoryView';

function InventoryPhones({
  title = 'Corporate Phones',
  description = 'Provisioned smartphones and voice devices.',
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

export default InventoryPhones;
