import makeAddOrder from "./add-order";
import { ordersDb, webhooksDb } from "../data-access";
import integration from "../integration";
import makeGetWebhook from "./get-webhook";

const addOrder = makeAddOrder({ ordersDb, integration });
const getWebhook = makeGetWebhook({ webhooksDb });
const editOrder = null;
const deleteOrder = null;

const orderService = Object.freeze({
  addOrder,
  editOrder,
  deleteOrder
});

export { addOrder, editOrder, deleteOrder, getWebhook };
export default orderService;
