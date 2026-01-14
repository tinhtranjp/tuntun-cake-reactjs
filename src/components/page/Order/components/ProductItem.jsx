import { Box, Card, Stack, Typography } from "@mui/material"

export default function ProductItem({ product }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        "&:hover": {
          opacity: [0.9],
          transition: "box-shadow 0.2s",
          boxShadow: 6,
        },
      }}
    >
      <Box
        component="img"
        src={product.images?.[0]?.url}
        alt={product.name}
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
        <Typography sx={{ mt: "2px" }}>{product.name}</Typography>
        <Typography
          textAlign={"end"}
          mt={2}
          variant="body2"
        >
          {product.minPrice.toLocaleString("vi-VN")} - {product.maxPrice.toLocaleString("vi-VN")} đ
        </Typography>
      </Stack>
    </Card>
  )
}
