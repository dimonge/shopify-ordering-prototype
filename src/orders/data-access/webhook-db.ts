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
  isDeleted?: boolean;
};

export default function buildWebhookDb({ makeDb, dbName }: any) {
  return Object.freeze({
    insert,
    remove,
    update,
    findAll,
    findByStoreId,
    findById
  });

  async function insert({ id: _id, ...info }: Iinsert) {
    const db = await makeDb();
    const result = await db.collection(dbName).insertOne({ _id, ...info });
    const { _id: id, ...webhook } = result.ops[0];
    return { id, ...webhook };
  }

  async function remove({ id: _id }: IRemove) {
    const db = await makeDb();
    const result = await db.collection(dbName).deleteOne({ _id });
    return result.deletedCount;
  }

  async function update({ id: _id, ...info }: Iinsert) {
    const db = await makeDb();
    const result = await db
      .collection(dbName)
      .updateOne({ _id }, { $set: { ...info } });
    return result.modifiedCount > 0 ? { _id, ...info } : null;
  }

  async function findAll({ isDeleted = true }: IfindAll) {
    const db = await makeDb();
    const result = await db.collection(dbName).find({});
    return (await result.toArray()).map(({ _id: id, ...info }: any) => ({
      id,
      ...info
    }));
  }

  async function findByStoreId({ storeId }: IfindByStoreId) {
    const db = await makeDb();
    const result = await db.collection(dbName).find({ storeId });
    return (await result.toArray()).map(({ _id: id, ...info }: any) => ({
      id,
      ...info
    }));
  }

  async function findById({ id: _id, isDeleted = true }: IfindById) {
    const db = await makeDb();
    const result = await db.collection(dbName).findOne({ _id });
    return !!result
      ? await result
          .toArray()
          .map(({ _id: id, ...info }: any) => ({
            id,
            ...info
          }))
          .filter((item: any) => isDeleted && item.deletedAt === null)
      : null;
  }
}
