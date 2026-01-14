import HeaderForm from "@/components/common/HederForm"
import { useRecipeCreate } from "@/service/recipe/mutation"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FormRecipe from "./components/FormRecipe"

function AddRecipe() {
  const navigate = useNavigate()
  const createMutation = useRecipeCreate()

  const handleSubmit = async (payload) => {
    return
    // try {
    //   const formData = new FormData()

    //   formData.append("title", payload.title)
    //   formData.append("content", payload.content)
    //   formData.append("file", payload.file)
    //   payload.categoryIds.forEach((id) => {
    //     formData.append("categoryIds", id.toString())
    //   })

    //   await createMutation.mutateAsync(formData)
    //   navigate("/recipe-list")
    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <Box
      maxWidth={800}
      marginX="auto"
    >
      <HeaderForm
        title={"Thêm công thức"}
        url={"/recipe-list"}
        marginTop={4}
        marginBottom={4}
      />

      <FormRecipe onSubmit={handleSubmit} />
    </Box>
  )
}

export default AddRecipe
