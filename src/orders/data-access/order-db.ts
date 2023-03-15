import Id from "../Id";

type Iinsert = {
  id: string;
};
type IRemove = {
  id: string;
};
type IfindAll = {
  isDeleted: boolean;
};

type IfindByStoreId = {
  storeId: string;
};

type IfindById = {
  id: string;
  isDeleted: boolean;
};

export default function buildOrderDb({ makeDb, dbName }: any) {
  return Object.freeze({
    insert,
    remove,
    update,
    findAll,
    findByStoreId,
    findById,
    findBy
  });

  async function insert({ id: _id, ...orderInfo }: Iinsert) {
    const db = await makeDb();
    const result = await db.collection(dbName).insertOne({ _id, ...orderInfo });
    const { _id: id, ...orders } = result.ops[0];
    return { id, ...orders };
  }

  async function remove({ id: _id }: IRemove) {
    const db = await makeDb();
    const result = await db.collection(dbName).deleteOne({ _id });
    return result.deletedCount;
  }

  async function update({ id: _id, ...orderInfo }: Iinsert) {
    const db = await makeDb();
    const result = await db
      .collection(dbName)
      .updateOne({ _id }, { $set: { ...orderInfo } });
    return result.modifiedCount > 0 ? { _id, ...orderInfo } : null;
  }

  async function findAll({ isDeleted = true }: IfindAll) {
    const db = await makeDb();
    const result = await db.collection(dbName).find({});
    return (await result.toArray()).map(({ _id: id, ...orderInfo }: any) => ({
      id,
      ...orderInfo
    }));
  }

  async function findByStoreId({ storeId }: IfindByStoreId) {
    const db = await makeDb();
    const result = await db.collection(dbName).find({ storeId });
    return (await result.toArray()).map(({ _id: id, ...orderInfo }: any) => ({
      id,
      ...orderInfo
    }));
  }

  async function findById({ id: _id, isDeleted = true }: IfindById) {
    const db = await makeDb();
    const result = await db.collection(dbName).findOne({ _id });
    return await result
      .toArray()
      .map(({ _id: id, ...info }: any) => ({
        id,
        ...info
      }))
      .filter((item: any) => isDeleted && item.deletedAt === null);
  }
  async function findBy(value: any) {
    const db = await makeDb();
    const result = await db.collection(dbName).findOne(value);
    return await result;
    /*.toArray().map(({ _id: id, ...info }: any) => ({
      id,
      ...info
    }));*/
  }
}
