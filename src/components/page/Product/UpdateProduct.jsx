import { Box } from "@mui/material"
import UpdateFormProduct from "./components/UpdateFormProduct"
import HeaderForm from "@/components/common/HederForm"
import { useNavigate, useParams } from "react-router"
import { useProductUpdate } from "@/service/product/mutation"
function UpdateProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const updateMutation = useProductUpdate()

  const handleSubmit = async (data) => {
    console.log(data)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("status", data.status)
    formData.append("type", data.type)
    data.categoryIds.forEach((id) => {
      formData.append("categoryIds", id.toString())
    })

    data.images.forEach((image, iIndex) => {
      if (image.file) {
        formData.append(`images[${iIndex}].file`, image.file)
      } else if (typeof image.id === "number" && !isNaN(image.id)) {
        formData.append(`images[${iIndex}].id`, image.id)
        formData.append(`images[${iIndex}].url`, image.url)
      }
    })

    data.variants.forEach((variant, vIndex) => {
      formData.append(`variants[${vIndex}].variantName`, variant.variantName)
      formData.append(`variants[${vIndex}].isDefault`, variant.isDefault)

      variant.images.forEach((image, iIndex) => {
        if (image.file) {
          // ✅ File mới - gửi file
          formData.append(`variants[${vIndex}].images[${iIndex}].file`, image.file)
        } else if (image.id) {
          // ✅ Ảnh cũ - chỉ gửi id
          formData.append(`variants[${vIndex}].images[${iIndex}].id`, image.id)
          formData.append(`variants[${vIndex}].images[${iIndex}].url`, image.url)
        }
      })
    })

    try {
      await updateMutation.mutateAsync({ data: formData, id })
      navigate(-1)
    } catch (error) {
      console.error("Validation error:", error)
    }
  }

  return (
    <Box
      maxWidth={1000}
      mx="auto"
    >
      <HeaderForm
        title={"Sửa sản phẩm"}
        isBack
        marginTop={4}
        marginBottom={4}
      />

      <UpdateFormProduct onSubmit={handleSubmit} />
    </Box>
  )
}

export default UpdateProduct
