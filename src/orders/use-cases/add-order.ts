import makeOrder from "../order";

export default function makeAddOrder({ ordersDb }: any) {
  return async function addOrder({ data }: any) {
    // process the order
    //const processedOrder = await integration({ connector, data });
    const order = await makeOrder(data);
    const exists = await ordersDb.findBy({ externalId: order.getExternalId() });

    if (exists) {
      return exists;
    }

    return ordersDb.insert({
      id: order.getId(),
      storeId: order.getStoreId(),
      customer: order.getCustomer(),
      externalId: order.getExternalId(),
      customerNoteForStore: order.getCustomerNoteForStore(),
      modifiedBy: order.getModifiedBy()
    });
  };
}
