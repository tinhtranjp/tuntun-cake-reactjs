import { useCategoryGetAll } from "@/service/category/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { productSchema } from "./schema"
import { Box, Button, FormHelperText, Grid } from "@mui/material"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import { mappedStringToObj } from "@/helper/product"
import { useProductGetStatus, useProductGetType } from "@/service/product/queries"
import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import ImageDnd from "@/components/dnd/img/ImageDnd"

function FormProduct({ onSubmit }) {
  const { data: categories } = useCategoryGetAll()
  const { data: status } = useProductGetStatus()
  const { data: types } = useProductGetType()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      basePrice: 0,
      categoryIds: [],
    },
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
  })

  const onFormSubmit = async (data) => {
    await onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid
        container
        spacing={2}
      >
        <Grid size={12}>
          <TextFieldCustom
            label="Tên bánh"
            name="name"
            control={control}
          />
        </Grid>
        <Grid size={4}>
          {categories && (
            <AutocompleteRHF
              control={control}
              label="Thể loại"
              name="categoryIds"
              options={categories?.map((c) => ({ value: c.id, label: c.name }))}
              multiple
            />
          )}
        </Grid>
        <Grid size={4}>
          <AutocompleteRHF
            label="Trạng thái"
            name="status"
            multiple={false}
            control={control}
            options={mappedStringToObj(status) ?? []}
          />
        </Grid>
        <Grid size={4}>
          <AutocompleteRHF
            label="Loại sản phẩm"
            name="type"
            multiple={false}
            control={control}
            options={mappedStringToObj(types) ?? []}
          />
        </Grid>
        <Grid size={12}>
          <ImageDnd
            onChange={(files) => {
              setValue(`images`, files, {
                shouldValidate: true,
              })
            }}
            type="add"
            sx={{ my: 2 }}
            isError={!!errors?.images?.message}
          />
          {errors?.images && <FormHelperText error>{errors?.images?.message}</FormHelperText>}
        </Grid>
        <Grid size={12}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <CkeditorCustom
                folder="product/desc"
                onChange={(value) => field.onChange(value)}
                label="Mô tả"
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
          sx={{ my: 10 }}
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default FormProduct
