import { useProductSearchOrders } from "@/service/product/queries"
import { Box, Grid, Stack } from "@mui/material"
import { useSearchParams } from "react-router"
import ProductItem from "./ProductItem"
import ProductModal from "./ProductModal"
import { useState } from "react"
import VariantItem from "./VariantItem"

function ProductList() {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [searchParams] = useSearchParams()

  const name = searchParams.get("name") ?? ""
  const categoryId = searchParams.get("categoryId")

  const { data, isLoading } = useProductSearchOrders({
    name,
    categoryId,
  })

  const handleOpenModal = (productId) => {
    setOpen(true)
    setSelectedId(productId)
  }

  const currentProduct = data?.find((product) => product.id === selectedId)

  const currentLength = currentProduct?.variants?.length ?? 0

  if (isLoading) return <Box>Loading...</Box>
  const minWidth = currentLength < 2 ? "300px" : currentLength < 5 ? "450px" : "1100px"
  return (
    <Grid
      container
      spacing={2}
      sx={{ mr: "400px" }}
    >
      {data &&
        data.map((product) => (
          <Grid
            size={3}
            key={product.id}
            onClick={() => handleOpenModal(product.id)}
          >
            <ProductItem product={product} />
          </Grid>
        ))}
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        title="Thông tin sản phẩm"
        minWidth={minWidth}
        maxWidth="90vw"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            overflowY: "auto",
            pr: 2,
          }}
        >
          <Stack
            flexDirection={"row"}
            gap={2}
            sx={{ flexWrap: "wrap", pb: 4 }}
          >
            {currentProduct &&
              currentProduct.pvDetails.map((v) => (
                <VariantItem
                  currentProduct={currentProduct}
                  variant={v}
                  key={v.id}
                  onClose={() => setOpen(false)}
                />
              ))}{" "}
          </Stack>
        </Box>
      </ProductModal>
    </Grid>
  )
}

export default ProductList
