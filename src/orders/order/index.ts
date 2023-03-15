const Joi = require("joi");

import ID from "../Id";
import { IOSDate } from "../utils/dateFormat";
import buildMakeOrder from "./order";
import buildDBSchema from "./schema";

Joi.objectId = require("joi-objectid")(Joi);

const schema = buildDBSchema({ validator: Joi, currentDateTime: IOSDate });
const makeOrder = buildMakeOrder({ ID, validate, schema });

export default makeOrder;

async function validate({ schema, data }: any) {
  const result = await schema.validateAsync(data);
  return result;
}
