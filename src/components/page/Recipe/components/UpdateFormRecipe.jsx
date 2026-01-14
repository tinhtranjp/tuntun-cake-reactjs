import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import InputFileUpload from "@/components/input-common/InputFileUpload"
import { useCategoryGetAll } from "@/service/category/queries"
import { useRecipeGetById } from "@/service/recipe/queries"
import TextFieldCustom from "@components/input-common/TextFieldCustom"
import { zodResolver } from "@hookform/resolvers/zod"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { schemaUpdate } from "./schema"

function UpdateFormRecipe({ onSubmit }) {
  const { id } = useParams()
  const { data } = useRecipeGetById(id)
  const { data: categories } = useCategoryGetAll()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schemaUpdate),
    mode: "onSubmit",
  })

  useEffect(() => {
    if (data) {
      reset({
        categoryIds: data.categories.map((c) => c.id) || [],
        content: data.content,
        title: data.title,
      })
    }
  }, [data])

  const onSubmitForm = async (formData) => {
    await onSubmit(id, formData)
  }

  if (!data) return null

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Stack
        spacing={3}
        gap={4}
      >
        <TextFieldCustom
          name="title"
          control={control}
          label="Tên công thức"
        />
        {categories && (
          <AutocompleteRHF
            control={control}
            label="Thể loại"
            name="categoryIds"
            options={categories?.map((c) => ({ value: c.id, label: c.name }))}
            multiple
          />
        )}
        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <CkeditorCustom
              folder="recipe"
              value={field.value}
              onChange={(value) => field.onChange(value)}
              label="Mô tả"
              messError={fieldState?.error?.message}
            />
          )}
        />
        <InputFileUpload
          control={control}
          name="file"
          imageUrl={data.imageUrl}
        />
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button
            variant="contained"
            type="submit"
            loading={isSubmitting}
            loadingIndicator="Loading…"
          >
            Cập nhật công thức
          </Button>
        </Box>
      </Stack>
    </form>
  )
}

export default UpdateFormRecipe
