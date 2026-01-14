import { Box, Button, Typography } from "@mui/material"
import FormRecipe from "./components/FormRecipe"
import { useRecipeCreate } from "@/service/recipe/mutation"
import { useNavigate } from "react-router"
import HeaderForm from "@/components/common/HederForm"

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
