import { addOrder, getWebhook } from "../use-cases";
import makePostOrder from "./post-order";
import connectEcommerceShop from "../integration";

const postOrder = makePostOrder({
  addOrder,
  getWebhook,
  parseIntegration: connectEcommerceShop
});

export { postOrder };
