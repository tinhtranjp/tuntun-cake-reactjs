import React, { useEffect, useState } from "react"
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import Column from "./Column"

function DndTasks({ idColumn, initialTasks, onChangeTasks, isGrid = true }) {
  const [tasks, setTasks] = useState(initialTasks || [])

  useEffect(() => {
    if (tasks) {
      onChangeTasks(tasks)
    }
  }, [tasks])

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
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      <Column
        isGrid={isGrid}
        id={idColumn}
        tasks={tasks}
      />
    </DndContext>
  )
}

export default DndTasks
