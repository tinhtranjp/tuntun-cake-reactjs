import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Task from "./Task"

function Column({ tasks }) {
  return (
    <div>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
          />
        ))}
      </SortableContext>
    </div>
  )
}

export default Column
