export type makePostOrderType = {
  addOrder: any;
  getWebhook: any;
  parseIntegration: any;
};
export default function makePostOrder({
  addOrder,
  getWebhook,
  parseIntegration
}: makePostOrderType) {
  // POST request from /webhooks/:id
  // validate the
  // Use the id to fetch the webhook object with storeId
  // post order to model with the store id
  return async function postOrder(request: any, response: any) {
    if (!request) {
      return;
    }
    const { id } = request.params;
    console.log("request: ", request);
    const webhook = await getWebhook({ id });
    if (!webhook) {
      // no webhook found, return false;
      response.send("OK");
      return false;
    }
    const ecommerce = webhook?.storeId?.ecommerceType;

    return addOrder(
      parseIntegration({
        connector: ecommerce,
        store: webhook?.storeId,
        request,
        response
      })
    );
  };
}
