import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Button, IconButton, Stack } from "@mui/material"
import { optionCodeSchema } from "./schema"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { usePOCreate } from "@/service/product_option/mutation"
import DeleteIcon from "@mui/icons-material/Delete"

function FormOption({ closeModal }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
      name: "",
      optionValues: [{ code: "", value: "" }],
    },
    resolver: zodResolver(optionCodeSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "optionValues",
  })

  const mutation = usePOCreate()

  const onFormSubmit = async (data) => {
    await mutation.mutateAsync(data)
    reset({})
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack spacing={2}>
        <TextFieldCustom
          label="Mã Option"
          name="code"
          control={control}
        />

        <TextFieldCustom
          label="Tên Option"
          name="name"
          control={control}
        />

        {fields.map((field, index) => (
          <Stack
            key={field.id}
            direction="row"
            spacing={2}
          >
            <TextFieldCustom
              label="Mã giá trị"
              name={`optionValues.${index}.code`}
              control={control}
            />

            <TextFieldCustom
              label="Tên giá trị"
              name={`optionValues.${index}.value`}
              control={control}
            />

            <Stack
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}

        <Button
          variant="outlined"
          onClick={() => append({ valueCode: "", valueName: "" })}
        >
          + Thêm giá trị
        </Button>

        <Button
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default FormOption
