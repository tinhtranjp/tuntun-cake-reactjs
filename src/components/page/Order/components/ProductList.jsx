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
  const keyword = searchParams.get("keyword") ?? ""
  const categoryIds = searchParams.get("categoryIds")

  const { data, isLoading } = useProductSearchOrders({
    keyword,
    categoryIds,
  })

  const handleOpenModal = (productId) => {
    setOpen(true)
    setSelectedId(productId)
  }

  const currentProduct = data?.find((product) => product.id === selectedId)
  if (isLoading) return <Box>Loading...</Box>

  return (
    <Grid
      container
      spacing={2}
      sx={{ mr: "400px" }}
    >
      {data &&
        data.map((product) => (
          <Grid
            size={2}
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
        minWidth={currentProduct?.variants?.length == 1 ? "300px" : "450px"}
        maxWidth={currentProduct?.variants?.length == 1 ? "300px" : "90vw"}
      >
        <Stack
          flexDirection={"row"}
          gap={2}
        >
          {currentProduct &&
            currentProduct.variants.map((v) => (
              <VariantItem
                length={currentProduct?.variants?.length}
                imgUrl={currentProduct?.images[0]?.url}
                productName={currentProduct?.name}
                variant={v}
                key={v.id}
                onClose={() => setOpen(false)}
              />
            ))}{" "}
        </Stack>
      </ProductModal>
    </Grid>
  )
}

export default ProductList
