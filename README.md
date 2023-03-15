
## Data Model API

### Folder structure

- src
  - services // where all the business logic lives
  - models // where the data model lives
  - scripts // all the scripts
  - config // all the needed config files
    - index.ts
    - server.ts
  - subscriber // pub-sub pattern for third party services.

### Specifications
- Entities
1. Order
 - fields
 * id
 * storeId
 * customerId
 * name
 * timestamp (createdAt, modifiedAt)
 * integrationId

### Usecases
1. AddOrder
2. editOrder
3. removeOrder
4. listOrders

### Interface Adapters
1. integration
  - Shopify
  - Wix
  - Woocommerce
  - BigCommerce https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview


### DB Access
1. MongoDb Node driver

## utilities
1. Yup
2. 



- controllers
  - delete-task
  - get-tasks
  - post-task
  - patch-task
  
- use_cases
    - addTask
    - editTask
    - removeTask
    - listTasks

