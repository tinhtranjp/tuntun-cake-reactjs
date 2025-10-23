import TextFieldCustom from "@components/input-common/TextFieldCustom"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
  name: z.string({ error: "Không được để trống." }),
})

function FormCategory({ onSubmit }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  const onSubmitForm = async (data) => {
    await onSubmit(data)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        <TextFieldCustom
          name="name"
          control={control}
          label="Tên thể loại"
        />
        <Button
          variant="contained"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default FormCategory
