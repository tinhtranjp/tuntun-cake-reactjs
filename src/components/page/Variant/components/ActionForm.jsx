import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { AdjustmentSchema, ImportSchema, updateSchema } from "./schema"
import { toast } from "sonner"
import { useAddItemToType } from "@/store/PurchaseStore"

function ActionForm({ variant, onClose, type = "import" }) {
  let schema = ImportSchema
  if (type == "adjustment") {
    schema = AdjustmentSchema
  } else if (type == "update") {
    schema = updateSchema
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      itemId: variant.id,
      sku: variant.sku,
      discountPercent: 0,
      discountAmount: 0,
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  })

  const onFormSubmit = (data) => {
    useAddItemToType("import", data)
    toast.success("Thêm thành công.")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid
        container
        spacing={2}
      >
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
        <Grid size={12}>
          <TextFieldCustom
            label="Giá nhập"
            name="costPrice"
            control={control}
          />
        </Grid>
        <Grid size={12}>
          <TextFieldCustom
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
          <TextFieldCustom
            label="( amout ) khuyến mãi"
            name="discountAmount"
            control={control}
            type="number"
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
