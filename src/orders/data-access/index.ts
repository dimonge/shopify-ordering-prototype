import mongodb from "mongodb";

import buildOrderDb from "./order-db";
import buildWebhookDb from "./webhook-db";
const MongoClient = mongodb.MongoClient;

const uri: string = process.env.MONGO_DB_REST || "mongodb://localhost:27017"; // "mongodb+srv://admin:fipfK6wDopCvU9nS@moapi-dev-wsqca.gcp.mongodb.net/test?retryWrites=true"

const orderDbName: string = process.env.ORDER_DB_NAME || "dev-orders";
const webhookDbName: string = process.env.WEBHOOK_DB_NAME || "dev-webhooks";

export async function connectToDatabase() {
  try {
    const client = await new MongoClient(uri, {
      useNewUrlParser: true,
      poolSize: 50
    });
    console.log("Connected successfully to database");
    return client;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export function makeBuildDb(dbName: any) {
  return async function makeDb(): Promise<any> {
    const client = await connectToDatabase();
    if (!client.isConnected()) {
      await client.connect();
    }
    return client.db(dbName);
  };
}

const ordersDb = buildOrderDb({
  makeDb: makeBuildDb(orderDbName),
  dbName: orderDbName
});

const webhooksDb = buildWebhookDb({
  makeDb: makeBuildDb(webhookDbName),
  dbName: webhookDbName
});

const db = Object.freeze({
  webhooksDb,
  ordersDb
});

export default db;

export { webhooksDb, ordersDb };
