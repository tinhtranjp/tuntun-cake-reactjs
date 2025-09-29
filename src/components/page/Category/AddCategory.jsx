import Box from "@mui/material/Box"
import FormCategory from "./components/FormCategory"
import { useCategoryCreate } from "@/service/category/mutation"
import HeaderForm from "@/components/common/HederForm"

function AddCategory() {
  const createMutation = useCategoryCreate()

  const handleSubmit = async (payload) => {
    try {
      await createMutation.mutateAsync(payload)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
      <HeaderForm
        title={"Thêm thể loại"}
        url={"/category-list"}
        marginTop={4}
      />
      <FormCategory onSubmit={handleSubmit} />
    </Box>
  )
}

export default AddCategory
