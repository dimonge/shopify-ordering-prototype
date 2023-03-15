export default function buildMakeOrder({
  ID,
  schema,
  validate,
  currentDateTime
}: any) {
  return async function makeOrder({
    id = ID.makeId(),
    storeId,
    customer,
    externalId,
    customerNoteForStore,
    modifiedBy,
    createdAt,
    modifiedAt,
    deletedAt
  }: any = {}) {
    const value = await validate({
      schema,
      data: {
        id,
        storeId,
        customer,
        externalId,
        customerNoteForStore,
        modifiedBy,
        deletedAt,
        modifiedAt,
        createdAt
      }
    });

    return Object.freeze({
      getId: () => value.id,
      getStoreId: () => value.storeId,
      getCustomer: () => value.customer,
      getExternalId: () => value.externalId,
      getCustomerNoteForStore: () => value.customerNoteForStore,
      getModifiedBy: () => value.modifiedBy,
      setDeletedAt: () => {
        deletedAt = currentDateTime;
      },
      getDeletedAt: () => value.deletedAt,
      getCreatedAt: () => value.createdAt
    });
  };
}
