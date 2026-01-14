import { useAddItemToOrder } from "@/store/OrderStore"
import { Box, Card, Chip, Stack, Typography } from "@mui/material"
import { v4 as uuidv4 } from "uuid"

function VariantItem({ variant, onClose, currentProduct }) {
  const length = currentProduct?.pvDetails?.length

  const addItemToOrder = useAddItemToOrder()

  const handleAddToOrder = () => {
    const orderDetail = {
      id: uuidv4(),
      itemId: variant.id,
      itemName: currentProduct?.name,
      productImage: currentProduct?.images[0]?.url,
      quantity: 1,
      price: variant.salePrice,
      size: variant?.poDetails?.map((po) => po.povDetails[0]?.value).join(" x "),
      discountAmount: 0,
      discountPercent: 0,
      note: "",
    }

    addItemToOrder(orderDetail)
    onClose()
  }
  return (
    <Card
      onClick={handleAddToOrder}
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        width: length == 1 ? "300px" : "220px",
        "&:hover": {
          opacity: [0.9],
          transition: "box-shadow 0.2s",
          boxShadow: 6,
        },
      }}
    >
      <Box
        component="img"
        src={variant?.images[0]?.url || currentProduct?.images[0]?.url}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = "/no_image.jpeg"
        }}
        sx={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
      />
      <Stack sx={{ p: 1, justifyContent: "space-between", flexGrow: 1 }}>
        <Typography
          my={1}
          variant="body1"
          color="#333"
        >
          {currentProduct?.name}
        </Typography>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
        >
          {variant?.poDetails?.map((po) => (
            <Chip
              key={po.id}
              label={po.povDetails[0]?.value}
              color="primary"
              size="small"
            />
          ))}
        </Stack>
        <Typography
          mt={2}
          textAlign={"end"}
        >
          {variant.salePrice.toLocaleString("vi-VN")} ₫
        </Typography>{" "}
      </Stack>
    </Card>
  )
}

export default VariantItem
