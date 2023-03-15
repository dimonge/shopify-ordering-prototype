type integration = "Shopify" | "Woocommerce" | "Wix";

interface integrationProps {
  connector: integration;
  request: any;
  response: any;
  store: any;
}

export default function connectEcommerceShop({
  connector,
  store,
  request,
  response
}: integrationProps) {
  const process = require(`./${connector}.ts`);
  return process.run({ store, request, response });
}
