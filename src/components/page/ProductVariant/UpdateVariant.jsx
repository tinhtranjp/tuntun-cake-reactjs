import TableImage from "@/components/table/TableImage"
import { getValue } from "@/helper/product"
import { usePVUpdateImages, usePVUpdateStatus } from "@/service/product-variant/mutation"
import { usePvGetDetails } from "@/service/product-variant/queries"
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import UpdateFormVariant from "./components/UpdateFormVariant"
import { useEffect, useState } from "react"
import HeaderForm from "@/components/common/HederForm"

function UpdateVariant() {
  const { id } = useParams()
  const { data: variant } = usePvGetDetails(id)
  const [stt, setStt] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (variant) {
      setStt(variant?.status)
    }
  }, [variant])

  const updateMutation = usePVUpdateImages()
  const updateStatus = usePVUpdateStatus()

  const handleSubmit = async (data) => {
    const formData = new FormData()
    data.images.forEach((image, iIndex) => {
      if (image.file) {
        formData.append(`images[${iIndex}].file`, image.file)
      } else if (typeof image.id === "number" && !isNaN(image.id)) {
        formData.append(`images[${iIndex}].id`, image.id)
        formData.append(`images[${iIndex}].url`, image.url)
      }
    })

    await updateMutation.mutateAsync({ data: formData, id })
    navigate(-1)
  }

  const handleChangeStatus = async (e) => {
    await updateStatus.mutateAsync({
      id,
      data: { status: e.target.value },
    })
    setStt(e.target.value)
  }

  if (!variant) return <div>Loading...</div>

  return (
    <div>
      <HeaderForm
        title={"Cập nhật sản phẩm"}
        isBack
        marginTop={1}
        marginBottom={4}
      />
      <Typography variant="h6">{variant?.productName}</Typography>
      <TableImage src={variant?.thumbnail} />
      <Typography mt={1}>Kiểu : {getValue(variant?.productType)}</Typography>
      <Box
        maxWidth={600}
        mt={1}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid size={6}>
            <Typography>Số lượng trong kho : {variant?.quantity}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>Giá nhập : {variant?.costPrice}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>Giá niên yết : {variant?.originalPrice}</Typography>{" "}
          </Grid>
          <Grid size={6}>
            <Typography>Giá bán : {variant?.salePrice}</Typography>
          </Grid>
        </Grid>
      </Box>
      <FormControl
        sx={{ width: 180, mb: 1, mt: 4 }}
        size="small"
      >
        <InputLabel id="status">Status</InputLabel>

        <Select
          labelId="status"
          id="demo-simple-status"
          value={stt}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="INACTIVE">Ngừng Bán</MenuItem>
          <MenuItem value="OUT_OF_STOCK">Hết Hàng</MenuItem>
          <MenuItem value="DISCONTINUED">Ngừng Sản Xuất</MenuItem>
        </Select>
      </FormControl>
      <UpdateFormVariant
        images={variant?.images}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default UpdateVariant
