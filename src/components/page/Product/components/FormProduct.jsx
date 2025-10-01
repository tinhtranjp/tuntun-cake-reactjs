import { useCategoryGetAll } from "@/service/category/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { productSchema } from "./schema"
import { Box, Button, Grid } from "@mui/material"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import { mappedStringToObj } from "@/helper/product"
import { useProductGetStatus, useProductGetType } from "@/service/product/queries"
import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import { useEffect } from "react"
import { ProductVariantField } from "./ProductVariantField"

function FormProduct({ onSubmit }) {
  const { data: categories } = useCategoryGetAll()
  const { data: status } = useProductGetStatus()
  const { data: types } = useProductGetType()

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      variants: [],
      basePrice: 0,
      isHandMake: true,
    },
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
  })

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  })

  const appendVariant = () => {
    append({
      variantName: "",
      flavor: "",
      stockQuantity: 0,
      price: 0,
      images: [],
    })
  }

  useEffect(() => {
    if (errors?.variants?.message && fields.length === 0) {
      // Tự động append variant khi có lỗi và chưa có variant nào
      appendVariant()
    }
  }, [errors?.variants?.message, fields.length])

  const onFormSubmit = async (data) => {
    console.log(data)
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
          <AutocompleteRHF
            label="Thể loại"
            name="categoryId"
            multiple={false}
            control={control}
            options={categories?.map((c) => ({ value: c.id, label: c.name })) || []}
          />
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
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <CkeditorCustom
                folder="product"
                onChange={(value) => field.onChange(value)}
                label="Mô tả"
                messError={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box>
        {fields.map((field, index) => (
          <div key={field.id}>
            <ProductVariantField
              trigger={trigger}
              index={index}
              control={control}
              setValue={setValue}
              errors={errors}
              remove={remove}
            />
          </div>
        ))}
      </Box>
      <Button
        type="button"
        variant="contained"
        size="sm"
        onClick={appendVariant}
        sx={{ mt: 4 }}
      >
        Thêm sản phẩm con
      </Button>

      <Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ my: 10 }}
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default FormProduct
