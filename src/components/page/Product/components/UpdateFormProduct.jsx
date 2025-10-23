import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { mappedStringToObj } from "@/helper/product"
import { useCategoryGetAll } from "@/service/category/queries"
import { useProductGetById, useProductGetStatus, useProductGetType } from "@/service/product/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, FormHelperText, Grid } from "@mui/material"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { ProductVariantField } from "./ProductVariantField"
import { schemaUpdate } from "./schema"
import { useEffect } from "react"
import ImageDnd from "@/components/dnd/img/ImageDnd"

function UpdateFormProduct({ onSubmit, type = "self_made" }) {
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
    if (data && status && types) {
      const { basePrice, images, categories, description, name, status, type, variants } = data
      reset({
        name,
        description,
        images,
        status: status?.toLocaleUpperCase(),
        type: type?.toLocaleUpperCase(),
        basePrice,
        categoryIds: categories.map((c) => c.id) || [],
        variants: variants.map((variant) => ({
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
  }, [data, status, types])

  // Function để append variant
  const appendVariant = () => {
    append({
      variantName: "",
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
        {categories && (
          <Grid size={4}>
            <AutocompleteRHF
              control={control}
              label="Thể loại"
              name="categoryIds"
              options={categories?.map((c) => ({ value: c.id, label: c.name }))}
              multiple
            />
          </Grid>
        )}
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
        {data && (
          <Grid size={12}>
            <ImageDnd
              onChange={(files) => {
                setValue(`images`, files, {
                  shouldValidate: true,
                })
              }}
              initialValue={data.images}
              type="update"
              sx={{ my: 2 }}
              isError={!!errors?.images?.message}
            />
            {errors?.images && <FormHelperText error>{errors?.images?.message}</FormHelperText>}
          </Grid>
        )}
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
      </Grid>

      <Box>
        {fields.map((field, index) => (
          <div key={field.id}>
            <ProductVariantField
              type={type}
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
