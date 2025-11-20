import InventoryCategoryView from './InventoryCategoryView';

function InventoryEmail({
  title = 'Email Accounts',
  description = 'Mailbox provisioning and seat tracking.',
  showForm = false,
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

export default InventoryEmail;
