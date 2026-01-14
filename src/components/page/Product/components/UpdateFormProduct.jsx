import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import ImageDnd from "@/components/dnd/img/ImageDnd"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { mappedStringToObj } from "@/helper/product"
import { useCategoryGetAll } from "@/service/category/queries"
import { useProductGetBeforeUpdate, useProductGetStatus, useProductGetType } from "@/service/product/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, FormHelperText, Grid } from "@mui/material"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { schemaUpdate } from "./schema"

function UpdateFormProduct({ onSubmit }) {
  const { id } = useParams()
  const { data: categories } = useCategoryGetAll()
  const { data: status } = useProductGetStatus()
  const { data: types } = useProductGetType()
  const { data } = useProductGetBeforeUpdate(id)

  const {
    handleSubmit,
    control,
    reset,
    setValue,
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

  useEffect(() => {
    if (data && status && types) {
      const { images, categories, description, name, status, productType } = data
      reset({
        name,
        description,
        images,
        status: status?.toLocaleUpperCase(),
        type: productType?.toLocaleUpperCase(),
        categoryIds: categories.map((c) => c.id) || [],
      })
    }
  }, [data, status, types])

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

export default UpdateFormProduct
