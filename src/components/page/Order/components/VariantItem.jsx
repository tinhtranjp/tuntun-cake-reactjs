import { useAddItemToOrder } from "@/store/OrderStore"
import { Box, Card, Chip, Stack, Typography } from "@mui/material"
import { v4 as uuidv4 } from "uuid"

function VariantItem({ variant, productName, imgUrl, onClose, length }) {
  const addItemToOrder = useAddItemToOrder()
  const handleAddToOrder = () => {
    const orderDetail = {
      id: uuidv4(),
      itemId: variant.id,
      itemName: productName,
      productImage: imgUrl,
      size: variant.variantName,
      sku: variant.sku,
      quantity: 1,
      price: variant.price,
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        maxWidth: length == 1 ? "300px" : "216px",
        "&:hover": {
          opacity: [0.9],
          transition: "box-shadow 0.2s",
          boxShadow: 6,
        },
      }}
    >
      <Box
        component="img"
        src={imgUrl}
        alt={variant.variantName}
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
          mt={1}
          variant="body2"
        >
          ( {variant.variantName} ) {productName}
        </Typography>
        <Stack
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography textAlign={"end"}>{variant.price.toLocaleString("vi-VN")} ₫</Typography>{" "}
          <Chip
            label={variant.variantName}
            color="primary"
            size="small"
          />
        </Stack>
      </Stack>
    </Card>
  )
}

export default VariantItem
