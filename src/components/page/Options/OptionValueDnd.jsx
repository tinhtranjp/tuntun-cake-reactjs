import { useEffect, useState } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { Button, IconButton, Stack, Typography } from "@mui/material"
// 1️⃣ Component cho từng item sortable
function SortableItem({ item, onDeleteId }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "4px",
    marginBottom: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#fff",
    cursor: "grab",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={4}
        sx={{ padding: "4px 16px", background: item.softDelete ? "#ffcdd2" : "#fff" }}
      >
        <Typography>{item.value}</Typography>
        <IconButton
          onClick={() => onDeleteId(item.id)}
          {...{
            onPointerDown: (e) => e.stopPropagation(),
          }}
        >
          {item.softDelete ? <AddIcon /> : <DeleteIcon />}
        </IconButton>
      </Stack>
    </div>
  )
}

// 2️⃣ Main component
export default function OptionValueDnd({ options = [], onSave, onDeleteId }) {
  const [items, setItems] = useState([])

  // 3️⃣ Khi options thay đổi, sort theo orderIndex
  useEffect(() => {
    if (options?.length) {
      setItems([...options].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)))
    }
  }, [options])

  const sensors = useSensors(useSensor(PointerSensor))

  // 4️⃣ Khi kéo xong
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)

    const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({ ...item, orderIndex: index + 1 }))

    setItems(newItems)
  }

  // 5️⃣ Submit
  const handleSubmit = () => {
    if (!items?.length) return

    // map lại orderIndex nếu null -> dựa trên thứ tự hiện tại
    const payload = items.map((item, index) => ({
      id: item.id,
      orderIndex: index + 1,
    }))

    onSave(payload)
  }

  const handleDelete = (id) => {
    // Toggle softDelete của item có id tương ứng
    const newItems = items.map((item) => (item.id === id ? { ...item, softDelete: !item.softDelete } : item))
    setItems(newItems)

    // Nếu cần gửi lên backend ngay
    onDeleteId(id)
  }
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)} // ✅ chỉ truyền mảng id cho SortableContext
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onDeleteId={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleSubmit}
      >
        Lưu vị trí
      </Button>
    </div>
  )
}
