import makeAddTask from "@/tasks/use-cases/add_task";

import taskDb from "@/tasks/data-access"

const addTask = makeAddTask({ taskDb })

const taskService = Object.freeze({
  addTask
})

export default taskService

export { addTask }