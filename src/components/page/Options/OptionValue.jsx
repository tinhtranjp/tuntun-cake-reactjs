import HeaderForm from "@/components/common/HederForm"
import { usePOGetValueByIndex } from "@/service/product_option/queries"
import { Box, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router"
import OptionValueDnd from "./OptionValueDnd"
import { usePOReorderValue, usePOToggleValue } from "@/service/product_option/mutation"
import { toast } from "sonner"

function OptionValue() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = usePOGetValueByIndex(id)

  const toggleMutation = usePOToggleValue()

  const reorderMutation = usePOReorderValue()

  const handleSubmit = async (payload) => {
    await reorderMutation.mutateAsync(payload)
    toast.success("Cập nhật thành công.")
    navigate(-1)
  }

  const handleDelete = async (id) => {
    await toggleMutation.mutateAsync(id)
  }

  if (!data) return <div>Loading...</div>

  return (
    <Box sx={{ maxWidth: "850px", mx: "auto" }}>
      <HeaderForm
        title={"Sắp xếp giá trị của thuộc tính"}
        isBack
        marginBottom={2}
      />
      <Typography
        my={2}
        fontSize={20}
      >
        {data.options.name}
      </Typography>

      <Box maxWidth={240}>
        <OptionValueDnd
          onSave={handleSubmit}
          options={data.optionValues}
          onDeleteId={handleDelete}
        />
      </Box>
    </Box>
  )
}

export default OptionValue
