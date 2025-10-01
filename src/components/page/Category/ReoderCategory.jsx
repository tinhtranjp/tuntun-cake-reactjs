import React, { useEffect, useState } from "react"
import { useCategoryGetAll } from "@/service/category/queries"
import { Box, Button } from "@mui/material"
import { useCategoryReorder } from "@/service/category/mutation"
import { useNavigate } from "react-router"
import HeaderForm from "@/components/common/HederForm"
import DndTasks from "@/components/dnd/task/DndTasks"

function ReoderCategory() {
  const [cates, setCates] = useState([])
  const { data } = useCategoryGetAll()
  const navigate = useNavigate()
  const reorderMutation = useCategoryReorder()
  useEffect(() => {
    if (data) {
      const initialTasks = data.map((cate) => ({
        id: cate.id,
        title: cate.name,
      }))

      setCates(initialTasks)
    }
  }, [data])

  const handleReorder = async () => {
    try {
      const categoryIdList = cates.map((c) => c.id)
      await reorderMutation.mutateAsync(categoryIdList)
    } catch (error) {}
  }

  return (
    <div>
      <HeaderForm
        title={"Thể loại"}
        url={"/category-list"}
        marginTop={2}
      />
      {data && (
        <DndTasks
          idColumn="category"
          initialTasks={data.map((cate) => ({ id: cate.id, title: cate.name }))}
          onChangeTasks={setCates}
          isGrid={true}
        />
      )}
      <Box sx={{ display: "flex", marginTop: "40px" }}>
        <Button
          variant="contained"
          onClick={handleReorder}
        >
          Sắp xếp
        </Button>
      </Box>
    </div>
  )
}

export default ReoderCategory
