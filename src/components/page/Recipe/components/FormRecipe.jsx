import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import AutocompleteRHF from "@/components/input-common/AutocompleteRHF"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { useCategoryGetAll } from "@/service/category/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Stack } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { schemaCreate } from "./schema"
import InputFileUpload from "@/components/input-common/InputFileUpload"

function FormRecipe({ onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schemaCreate),
    defaultValues: {
      categoryIds: [],
    },
  })

  const { data: categories } = useCategoryGetAll()

  const onSubmitForm = async (data) => await onSubmit(data)
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Stack
        spacing={3}
        gap={2}
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
              onChange={(value) => field.onChange(value)}
              label="Mô tả"
              messError={fieldState?.error?.message}
            />
          )}
        />
        <InputFileUpload
          control={control}
          name="file"
        />
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button
            variant="contained"
            type="submit"
            loading={isSubmitting}
            loadingIndicator="Loading…"
          >
            Thêm công thức
          </Button>
        </Box>
      </Stack>
    </form>
  )
}

export default FormRecipe
