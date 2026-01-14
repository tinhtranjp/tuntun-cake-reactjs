import { useEffect, useState } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material"
import TableImage from "@/components/table/TableImage"
// 1️⃣ Component cho từng item sortable
function SortableItem({ item }) {
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

  // {
  //     "id": 13,
  //     "status": "ACTIVE",
  //     "costPrice": 0.00,
  //     "originalPrice": 0.00,
  //     "salePrice": 0.00,
  //     "quantity": 0.00,
  //     "orderIndex": null,
  //     "images": [],
  //     "poDetails": [
  //         {
  //             "id": 1,
  //             "code": "SIZE",
  //             "name": "kích thước",
  //             "povDetails": [
  //                 {
  //                     "id": 3,
  //                     "code": "16",
  //                     "value": "16cm"
  //                 }
  //             ]
  //         }
  //     ]
  // }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Box minWidth={150}>
        <TableImage
          src={item?.images[0]?.url}
          width={"100%"}
        />
        <Box mt={1}>
          {item?.poDetails?.map((po) => (
            <Box
              key={po.id}
              sx={{ mb: 1, display: "flex", gap: 1 }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 500, mb: 0.5 }}
              >
                {po.name}:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
              >
                {po.povDetails?.map((pov) => (
                  <Chip
                    key={pov.id}
                    label={`${pov.value}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
        <Typography>tồn kho : {item.quantity}</Typography>
      </Box>
    </div>
  )
}

// 2️⃣ Main component
export default function VariantSortDnd({ options = [], onSave, onDeleteId }) {
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
          strategy={horizontalListSortingStrategy} // ✅ horizontal
        >
          <div style={{ display: "flex", alignItems: "stretch", gap: 10, flexWrap: "wrap" }}>
            {items.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onDeleteId={handleDelete}
              />
            ))}
          </div>
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
