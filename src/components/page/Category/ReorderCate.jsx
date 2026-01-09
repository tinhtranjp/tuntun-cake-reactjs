import { SortableList } from "@/components/dnd/SimpleReorder/SortableList"
import { useCategoryGetAll } from "@/service/category/queries"
import DeleteIcon from "@mui/icons-material/Delete"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useCategoryReorder, useCategoryToggle } from "@/service/category/mutation"
function ReorderCate() {
  const [items, setItems] = useState([])
  const { data } = useCategoryGetAll()
  const navigate = useNavigate()

  console.log(data)

  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])

  const reorderMutation = useCategoryReorder()
  const toggleMutation = useCategoryToggle()

  const handleDeleteCategory = async (id) => {
    try {
      await toggleMutation.mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReorder = async () => {
    try {
      const categoryIdList = items.map((c) => c.id)
      await reorderMutation.mutateAsync(categoryIdList)
    } catch (error) {}
  }

  const goToUpdatePage = (id) => {
    navigate(`/category/${id}/update`)
  }
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, pb: 4 }}>
      <Button
        sx={{ display: "flex", my: { lg: 4 }, ml: "auto" }}
        variant="contained"
        onClick={handleReorder}
      >
        Sắp xếp
      </Button>

      <Box sx={{ maxWidth: 800, mx: "auto", mt: 2 }}>
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => {
            const index = items.findIndex((i) => i.id === item.id) // ✅ đảm bảo luôn có index đúng
            return (
              <Box
                key={item.id}
                sx={{
                  position: "relative",
                }}
              >
                <SortableList.Item id={item.id}>
                  <Typography
                    pr={10}
                    sx={{ color: item.isDeleted ? "#777" : "" }}
                  >
                    {index + 1}. {item.name} {item.isDeleted ? "(Đã xóa)" : ""}
                  </Typography>
                  <IconButton
                    onClick={() => goToUpdatePage(item.id)}
                    sx={{ position: "absolute", top: "12px", right: 100 }}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteCategory(item.id)}
                    sx={{ position: "absolute", top: "12px", right: 50 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <SortableList.DragHandle />
                </SortableList.Item>
              </Box>
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default ReorderCate
