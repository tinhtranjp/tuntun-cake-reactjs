import React, { useState } from "react"
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import Typography from "@mui/material/Typography"
import Column from "./Column"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "An com" },
    { id: 2, title: "Di hoc" },
    { id: 3, title: "Di lam" },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) return

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <div>
      <Typography>Task</Typography>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <Column
          id="todo"
          tasks={tasks}
        />
      </DndContext>
    </div>
  )
}

export default Home
