import { useParams } from "react-router-dom"
import FormVariant from "./components/FormVariant"
import { useProductGetDetail } from "@/service/product/queries"
import { usePVCreate } from "@/service/product-variant/mutation"
import { Box, Card, CardMedia, Divider, Grid, Stack, Typography } from "@mui/material"
import { getValue } from "@/helper/product"

function AddVariant() {
  const { id } = useParams()
  const { data } = useProductGetDetail(id)

  const mutation = usePVCreate()

  const handleSubmit = async (payload) => {
    // Tạo FormData
    const formData = new FormData()

    // Append basic fields
    formData.append("productId", data.id)

    if (Array.isArray(payload.images)) {
      payload.images.forEach((image) => {
        formData.append(`images`, image.file) // ✅ chỉ file
      })
    }

    payload.optionValues.forEach((opt, i) => {
      formData.append(`optionValues[${i}].optionCode`, opt.optionCode)
      formData.append(`optionValues[${i}].valueCode`, opt.valueCode)
    })

    try {
      await mutation.mutateAsync(formData)
    } catch (error) {
      console.error("Validation error:", error)
    }
  }

  if (!data) return <div>Loading...</div>

  return (
    <div>
      <FormVariant
        product={data}
        onSubmit={handleSubmit}
      />
      <Grid
        container
        spacing={2}
        mt={6}
      >
        <Grid size={3}>
          <Typography>Tên sản phẩm : {data?.name}</Typography>
          <Typography>Trạng thái : {getValue(data?.status)}</Typography>
          <Typography>Kiểu : {getValue(data?.productType)}</Typography>
          <Stack
            mt={2}
            direction={"row"}
            gap={2}
            flexWrap={"wrap"}
          >
            {data?.images?.map((i) => (
              <CardMedia
                key={i.id}
                sx={{ height: 140, width: 140, borderRadius: "10px" }}
                image={i.url}
              />
            ))}
          </Stack>
        </Grid>
        <Grid size={9}>
          <Typography mb={1}>
            {" "}
            {data?.pvDetails?.length ? "Sản phẩm con hiện có : " : "Hiện chưa có sản phẩm nào !"}
          </Typography>
          <Stack
            direction="row"
            gap={2}
            flexWrap={"wrap"}
          >
            {data?.pvDetails?.map((pv, index) => (
              <Box
                key={index}
                sx={{ border: 1, borderColor: "#999", borderRadius: "10px", p: 1 }}
              >
                <PvDetailImgs imgs={pv.images} />
                <PvDetail poDetails={pv.poDetails} />
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}

function PvDetailImgs({ imgs }) {
  if (imgs.length === 0) {
    return (
      <Box
        sx={{
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: 1,
          borderBottomColor: "#999",
        }}
      >
        <Typography sx={{ width: 140, textAlign: "center" }}>Hiện sản phẩm chưa có ảnh nào</Typography>
      </Box>
    )
  }
  return (
    <Box sx={{ display: "flex", gap: "0 10px" }}>
      {imgs?.map((i) => (
        <CardMedia
          key={i.id}
          sx={{ height: 140, width: 140, borderRadius: "10px" }}
          image={i.url}
        />
      ))}
    </Box>
  )
}

function PvDetail({ poDetails }) {
  return (
    <Box mt={2}>
      {poDetails?.map((po) => (
        <Box
          key={po.id}
          sx={{ display: "flex", gap: 2 }}
        >
          <Typography>{po.name} :</Typography>
          {po?.povDetails.map((pov) => (
            <Box key={pov.id}>{pov.value}</Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
export default AddVariant
