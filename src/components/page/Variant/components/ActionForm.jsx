import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Chip, Grid, Stack } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { AdjustmentSchema, ImportSchema, updateSchema } from "./schema"
import { toast } from "sonner"
import { useAddItemToType } from "@/store/PurchaseStore"
import RHFTextNumber from "@/components/input-common/RHFTextNumber"
import { usePurchaseOrderLastedDetails } from "@/service/purchase-oder/queries"
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
  let schema = ImportSchema
  if (type == "adjustment") {
    schema = AdjustmentSchema
  } else if (type == "update") {
    schema = updateSchema
  }

  const { data: lastedDetails } = usePurchaseOrderLastedDetails({ sku: variant?.sku, qtt: 3 })

  const mapped = lastedDetails?.reduce(
    (acc, item) => {
      acc.basePrice.push(item.basePrice)
      acc.unit.push(item.unit)
      acc.variantName.push(item.variantName)
      acc.costPrice.push(item.costPrice)
      return acc
    },
    { basePrice: [], unit: [], variantName: [], costPrice: [] },
  )

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: variant?.name || "",
      thumbnail: variant?.thumbnail || "",
      itemId: variant?.id,
      unit: variant?.unit ?? "",
      costPrice: variant?.costPrice ?? "",
      basePrice: variant?.price ?? "",
      sku: variant.sku,
      discountPercent: variant?.discountPercent ?? 0,
      discountAmount: variant?.discountAmount ?? 0,
      productImage: variant?.thumbnail ?? null,
      itemName: variant?.name ?? null,
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
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
          data={mapped?.unit}
          onClick={(val) => setValue("unit", val)}
        />
        <Grid size={12}>
          <TextFieldCustom
            label="Hộp, cái, kg ..."
            name="unit"
            control={control}
          />
        </Grid>
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
          data={mapped?.basePrice}
          onClick={(val) => setValue("basePrice", val)}
          isNumber
        />
        <Grid size={12}>
          <RHFTextNumber
            label="Giá bán"
            name="basePrice"
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
                folder="purchase-import"
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
