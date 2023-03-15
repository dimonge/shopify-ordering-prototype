import { Prisma, PrismaClient, Task } from "@prisma/client";

export default function makeTasksDb({ tasksDb }: any) {
  return Object.freeze({
    insert,
    update
  })

  const db: PrismaClient = await tasksDb()

  async function insert(info: Prisma.TaskCreateInput) {
    const result = await db.task.create({data: info})
    return result;
  }

  async function update(info: Prisma.TaskUpdateInput) {
    const result = await db.task.update({data: info})
    return result;
  }
}