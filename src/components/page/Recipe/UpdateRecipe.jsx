import HeaderForm from "@/components/common/HederForm"
import { useRepiceUpdate } from "@/service/recipe/mutation"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import UpdateFormRecipe from "./components/UpdateFormRecipe"

function UpdateRecipe() {
  const navigate = useNavigate()
  const mutation = useRepiceUpdate()

  const handleSubmit = async (id, data) => {
    const formData = new FormData()
    const { categoryIds, content, title, file } = data

    formData.append("title", title)
    formData.append("content", content)
    if (file) {
      formData.append("file", file)
    }

    categoryIds.forEach((id) => {
      formData.append("categoryIds", id.toString())
    })
    try {
      await mutation.mutateAsync({ id, data })
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      maxWidth={1000}
      marginX="auto"
      marginBottom={10}
    >
      <HeaderForm
        title={"Cập nhật công thức"}
        isBack
        marginTop={4}
        marginBottom={10}
      />
      <UpdateFormRecipe onSubmit={handleSubmit} />
    </Box>
  )
}

export default UpdateRecipe
