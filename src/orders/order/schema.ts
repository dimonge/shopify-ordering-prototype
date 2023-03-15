export default function buildDBSchema({ validator, currentDateTime }: any) {
  /**
   * const schema = {
    id: {type: "objectID", ObjectID: Id.makeId},
    storeId: {type: "objectID"},
    customer: {

    },
    externalId: { type: "string" },
    customerNoteForStore: {type: "string", optional: true},
    createdAt: {type: "date"},
    modifiedAt: {type: "date"},
    deletedAt: {type: "date", optional: true, default: () => date},
    modifiedBy: {type: "string", optional: true},
    deletedBy: {type: "string", optional: true}
  }
  
   */
  return validator.object({
    id: validator.objectId().required(),
    storeId: validator.objectId().required(),
    customer: validator.object({
      name: validator.string(),
      phone: validator.string(),
      email: validator.string().email(),
      zipCode: validator.string(),
      country: validator.string(),
      address: validator.string(),
      latitude: validator.number(),
      longitude: validator.number()
    }),
    externalId: validator.string().required(),
    customerNoteForStore: validator.string(),
    createdAt: validator.date().iso().default(currentDateTime).required(), // change to date
    modifiedAt: validator.date().iso().default(currentDateTime).required(), // change to date
    deletedAt: validator.date().iso().default(null), // change to date
    modifiedBy: validator.string(),
    deletedBy: validator.string()
  });
}

/*
    id: Id.makeId(),
    storeId:, // get the information from token
    customer: {},
    externalId: null, // // shopify or wix order id
    customerNoteForStore: "",
    createdAt: Date.now(),
    modifiedAt: Date.now() // timestamp
    deletedAt: "" // timestamp
    modifiedBy: "" // objectId from token
    deletedBy: "" // objectId from token 
  
}


### customer & store information

id
storeId: 
customer: {
  "address": {}
} 
external_id: 
name //
customerNoteForStore: // get the information from token

timestamp (createdAt, modifiedAt, deletedAt) 

integrationId
status: 
external_url:
orderNumber:
items: []
*/
