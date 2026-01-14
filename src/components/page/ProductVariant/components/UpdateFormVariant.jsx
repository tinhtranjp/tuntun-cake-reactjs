import ImageDnd from "@/components/dnd/img/ImageDnd"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, FormHelperText, Grid } from "@mui/material"
import { useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
  images: z.any().optional(),
})

function UpdateFormVariant({ onSubmit, images }) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      images,
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  })
  const watchedImages = watch("images")
  const onFormSubmit = async (data) => {
    await onSubmit?.(data)
  }
  const isDisable = isSubmitting || !Array.isArray(watchedImages) || watchedImages.length === 0

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid
        container
        spacing={2}
      >
        <Grid size={12}>
          <ImageDnd
            onChange={(files) => {
              setValue(`images`, files, {
                shouldValidate: true,
              })
            }}
            initialValue={images}
            type="update"
            sx={{ my: 2 }}
            isError={!!errors?.images?.message}
          />
          {errors?.images && <FormHelperText error>{errors?.images?.message}</FormHelperText>}
        </Grid>
      </Grid>
      <Box>
        <Button
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Loading…"
          disabled={isDisable}
        >
          Xác nhận
        </Button>
      </Box>
    </form>
  )
}

export default UpdateFormVariant
