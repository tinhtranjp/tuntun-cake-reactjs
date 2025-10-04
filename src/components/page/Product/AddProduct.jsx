import HeaderForm from "@/components/common/HederForm"
import { Box } from "@mui/material"
import FormProduct from "./components/FormProduct"
import { useProductCreate } from "@/service/product/mutation"
import { useNavigate } from "react-router"

function AddProduct() {
  const navigate = useNavigate()
  const createMutation = useProductCreate()
  const handleSubmit = async (data) => {
    // Tạo FormData
    const formData = new FormData()

    // Append basic fields
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("status", data.status)
    formData.append("type", data.type)
    formData.append("categoryId", data.categoryId.toString())
    formData.append("thumbnail", data.thumbnail)
    // Append variants as JSON string
    // formData.append("variants", JSON.stringify(data.variants));

    // Hoặc append từng variant riêng lẻ
    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}].variantName`, variant.variantName)
      formData.append(`variants[${index}].flavor`, variant.flavor)
      formData.append(`variants[${index}].isDefault`, variant.isDefault ? "true" : "false")

      // Handle images
      if (Array.isArray(variant.images)) {
        variant.images.forEach((image) => {
          formData.append(`variants[${index}].images`, image.file) // ✅ chỉ file
        })
      }
    })

    try {
      await createMutation.mutateAsync(formData)
      navigate("/product-list")
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
        title={"Thêm sản phẩm"}
        url={"/product-list"}
        marginTop={4}
        marginBottom={4}
      />

      <FormProduct onSubmit={handleSubmit} />
    </Box>
  )
}

export default AddProduct
