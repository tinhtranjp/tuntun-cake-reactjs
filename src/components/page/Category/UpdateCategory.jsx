import { useCategoryUpdate } from "@/service/category/mutation"
import UpdateFormCategory from "./components/UpdateFormCategory"
import { Box } from "@mui/material"
import { useNavigate, useParams } from "react-router"
import HeaderForm from "@/components/common/HederForm"
function UpdateCategory() {
  const navigate = useNavigate()
  const updateMutation = useCategoryUpdate()
  const { id } = useParams()

  const handleSubmit = async (payload) => {
    try {
      await updateMutation.mutateAsync({ id, data: payload })
      navigate("/category-list")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
      <HeaderForm
        title="Chỉnh sửa công thức"
        isBack
      />
      <UpdateFormCategory onSubmit={handleSubmit} />
    </Box>
  )
}

export default UpdateCategory
