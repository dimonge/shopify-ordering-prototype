import makeTask from "@/tasks/model";
import { Prisma } from "@prisma/client";

export default function makeAddTask({ taskDb }: Prisma.TaskSelect) {
  return async function addTask(taskInfo) {
    const task = makeTask(taskInfo)

    const exists = await taskDb.findFirst({id: task.getId()})

    if (exists) {
      return exists
    }

    return taskDb.insert({
      
    })

  }
}