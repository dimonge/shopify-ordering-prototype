import { ORDER, UTILS, STORE } from "@modeliver_admin/models-util";
import crypto from "crypto";

function parseRequestBody(req: any) {
  return new Promise((resolve, reject) => {
    req.body = "";

    req.on("data", function (chunk: any) {
      req.body += chunk.toString("utf8");
    });
    req.on("end", function () {
      resolve(req);
    });
    req.on("error", function () {
      reject(req);
    });
  });
}

export function verifyShopifyHook(req: any, secretKey: any) {
  var digest = crypto
    .createHmac("SHA256", secretKey)
    .update(new Buffer(req.body, "utf8"))
    .digest("base64");
  return digest === req.get("X-Shopify-Hmac-Sha256");
}

export const validateRequest = async ({ request, store }: any) => {
  const secretKey = UTILS.get(store, STORE.API_FIELD_SECRET_KEY);
  const req = await parseRequestBody(request);
  return {
    isValid: verifyShopifyHook(req, secretKey),
    body: req?.body
  };
};

export default async function run({ store, request, response }: any) {
  // convert shopify data to modeliver order datastructure
  const { isValid, body } = await validateRequest({ request, response, store });
  if (!isValid) {
    return response.status(403).send();
  }
  response.status(200).send();
  return transformData({ data: JSON.parse(body), store });
}

export const transformData = ({ data, store }: any) => {
  const storeId = UTILS.get(store, STORE.API_FIELD_ID);
  const order = ORDER.transformShopifyData(data);
  return {
    ...order,
    [ORDER.API_FIELD_STORE_ID]: storeId
  };
};
