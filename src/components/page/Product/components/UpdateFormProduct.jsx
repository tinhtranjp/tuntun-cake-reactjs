import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { mappedStringToObj } from "@/helper/product"
import { useCategoryGetAll } from "@/service/category/queries"
import { useProductGetById, useProductGetStatus, useProductGetType } from "@/service/product/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid } from "@mui/material"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { ProductVariantField } from "./ProductVariantField"
import { schemaUpdate } from "./schema"
import { useEffect } from "react"
import InputFileUpload from "@/components/input-common/InputFileUpload"

function UpdateFormProduct({ onSubmit }) {
  const { id } = useParams()
  const { data: categories } = useCategoryGetAll()
  const { data: status } = useProductGetStatus()
  const { data: types } = useProductGetType()
  const { data } = useProductGetById(id)

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      variants: [],
      basePrice: 0,
    },
    mode: "onSubmit",
    resolver: zodResolver(schemaUpdate),
  })

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  })

  useEffect(() => {
    if (data && categories && status && types) {
      const { basePrice, category, description, name, status, type, variants } = data
      reset({
        name,
        description,
        status: status?.toLocaleUpperCase(),
        type: type?.toLocaleUpperCase(),
        basePrice,
        categoryId: category.id,
        variants: variants.map((variant) => ({
          flavor: variant.flavor,
          variantName: variant.variantName,
          images: variant.images.map((img) => ({
            id: img.id,
            url: img.url,
            file: null,
          })),
          isDefault: variant.isDefault,
        })),
      })
    }
  }, [data, categories, status, types])

  // Function để append variant
  const appendVariant = () => {
    append({
      variantName: "",
      flavor: "",
      stockQuantity: 0,
      price: 0,
      images: [],
      sku: "",
    })
  }

  useEffect(() => {
    if (errors?.variants?.message && fields.length === 0) {
      // Tự động append variant khi có lỗi và chưa có variant nào
      appendVariant()
    }
  }, [errors?.variants?.message, fields.length])

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
                value={field.value}
                folder="product"
                onChange={(value) => field.onChange(value)}
                label="Mô tả"
                messError={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <InputFileUpload
            label="Ảnh nền"
            control={control}
            imageUrl={data?.thumbnail || null}
            name="thumbnail"
            multiple={false}
          />
        </Grid>
      </Grid>

      <Box>
        {fields.map((field, index) => (
          <div key={field.id}>
            <ProductVariantField
              isUpdate={field.variantName != ""}
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
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default UpdateFormProduct
