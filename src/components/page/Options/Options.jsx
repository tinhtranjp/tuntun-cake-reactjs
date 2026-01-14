import { usePOGetOrderByIndex } from "@/service/product_option/queries"
import OptionSortDnd from "./OptionsSortDnd"
import { Box, Button, Stack, Typography } from "@mui/material"
import { usePOReorder, usePOToggle } from "@/service/product_option/mutation"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function Option() {
  const { data } = usePOGetOrderByIndex()

  const navigate = useNavigate()
  const toggleMutation = usePOToggle()
  const reorderMutation = usePOReorder()

  const handleSubmit = async (data) => {
    await reorderMutation.mutateAsync(data)
    toast.success("Cập nhật thành công.")
  }

  const handleDelete = async (id) => {
    await toggleMutation.mutateAsync(id)
  }

  return (
    <div>
      <Typography
        variant="h6"
        color="#444"
        mb={4}
      >
        Quản lý thuộc tính
      </Typography>
      <OptionSortDnd
        options={data}
        onSave={handleSubmit}
        onDeleteId={handleDelete}
      />
      <Box py={4}>
        <Typography my={2}>Sắp xếp giá trị thuộc tính của :</Typography>
        <Stack
          spacing={2}
          direction={"row"}
        >
          {data?.map((o) => (
            <Box key={o.id}>
              <Button
                variant="outlined"
                onClick={() => navigate("/options/value/" + o.id)}
              >
                {o.name}
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </div>
  )
}

export default Option
