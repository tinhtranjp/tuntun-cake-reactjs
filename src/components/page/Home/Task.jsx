import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function Task({ id, title }) {
  const { attributes, setNodeRef, listeners, transform, transition } = useSortable({ id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {title}
    </div>
  )
}
export default Task
