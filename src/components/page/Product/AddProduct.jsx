import HeaderForm from "@/components/common/HederForm"
import { Box } from "@mui/material"
import FormProduct from "./components/FormProduct"

function AddProduct() {
  const handleSubmit = () => {
    console.log("ahahha")
  }
  return (
    <Box>
      <HeaderForm
        title={"Thêm công thức"}
        url={"/product-list"}
        marginTop={4}
        marginBottom={4}
      />

      <FormProduct onSubmit={handleSubmit} />
    </Box>
  )
}

export default AddProduct
