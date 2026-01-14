import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import RHFTextNumber from "@/components/input-common/RHFTextNumber"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { usePurchaseOrderLastedDetails } from "@/service/purchase-oder/queries"
import { useAddItemToType } from "@/store/PurchaseStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Chip, Grid, Stack } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { purchaseSchema } from "./schema"
const RenderChips = ({ data, onClick, isNumber = false }) => {
  if (!data?.length) return null
  return (
    <Stack
      direction="row"
      spacing={1}
      mb={1}
    >
      {data.map((item, i) => (
        <Chip
          key={i}
          label={isNumber ? `${item.toLocaleString("vi-VN")} ₫` : item}
          color="primary"
          variant="filled"
          size="small"
          onClick={() => onClick(item)}
        />
      ))}
    </Stack>
  )
}

function ActionForm({ variant, onClose, type = "import" }) {
  const { data: lastedDetails } = usePurchaseOrderLastedDetails({
    id: variant?.id,
    type: type.toLocaleUpperCase(),
    qtt: 3,
  })

  const mapped = lastedDetails?.reduce(
    (acc, item) => {
      acc.quantity.push(item.quantity)
      acc.costPrice.push(item.costPrice)
      acc.originalPrice.push(item.originalPrice)
      acc.salePrice.push(item.salePrice)
      return acc
    },
    { quantity: [], costPrice: [], originalPrice: [], salePrice: [] },
  )

  let productName = variant.productName
  variant?.poDetails?.forEach((po) => {
    productName += ` - ${po.name} x ${po.povDetails[0].value}`
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      itemId: variant.id,
      name: productName,
      thumbnail: variant.thumbnail,
      note: "",
      quantity: "",
      costPrice: variant?.costPrice ?? "",
      originalPrice: variant?.originalPrice ?? "",
      salePrice: variant?.salePrice ?? "",
      discountAmount: variant?.discountAmount ?? 0,
      discountPercent: variant?.discountPercent ?? 0,
    },
    mode: "onSubmit",
    resolver: zodResolver(purchaseSchema),
  })

  const add = useAddItemToType()

  const onFormSubmit = (data) => {
    if (type == "import") {
      add("import", data)
    } else if (type == "adjustment") {
      add("adjustment", data)
    } else {
      add("update", data)
    }

    toast.success("Thêm thành công.")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid
        container
        spacing={2}
      >
        <RenderChips
          data={mapped?.quantity}
          onClick={(val) => setValue("quantity", val)}
        />
        <Grid size={12}>
          <TextFieldCustom
            label="Số lượng"
            name="quantity"
            control={control}
          />
        </Grid>
        <RenderChips
          data={mapped?.costPrice}
          onClick={(val) => setValue("costPrice", val)}
          isNumber
        />
        <Grid size={12}>
          <RHFTextNumber
            label="Giá nhập"
            name="costPrice"
            control={control}
          />
        </Grid>

        <RenderChips
          data={mapped?.originalPrice}
          onClick={(val) => setValue("originalPrice", val)}
          isNumber
        />
        <Grid size={12}>
          <RHFTextNumber
            label="Giá niêm yết"
            name="originalPrice"
            control={control}
          />
        </Grid>
        <RenderChips
          data={mapped?.salePrice}
          onClick={(val) => setValue("salePrice", val)}
          isNumber
        />
        <Grid size={12}>
          <RHFTextNumber
            label="Giá bán"
            name="salePrice"
            control={control}
          />
        </Grid>
        <Grid size={12}>
          <TextFieldCustom
            label="% khuyến mãi"
            name="discountPercent"
            control={control}
            type="number"
          />
        </Grid>
        <Grid size={12}>
          <RHFTextNumber
            label="( amout ) khuyến mãi"
            name="discountAmount"
            control={control}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => (
              <CkeditorCustom
                folder="purchase-import/note"
                onChange={(value) => field.onChange(value)}
                label="Ghi chú"
                messError={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ my: 6 }}
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default ActionForm
