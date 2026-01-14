import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Box, Button, Stack, Typography } from "@mui/material"
import { optionCodeSchema } from "./schema"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import { usePOAddValue } from "@/service/product_option/mutation"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
function FormOptionValue({ closeModal, opt }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      code: opt.code,
      name: opt.name,
      optionValues: [{ code: "", value: "" }],
    },
    resolver: zodResolver(optionCodeSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "optionValues",
  })

  const mutation = usePOAddValue()

  const onFormSubmit = async (data) => {
    await mutation.mutateAsync(data)
    reset({})
    closeModal()
  }

  return (
    <div>
      <Box>
        <Typography
          variant="h6"
          my={2}
        >
          {opt.name}
        </Typography>
        <Typography>Giá trị hiện có : </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, my: 2 }}>
          {opt.value?.map((v) => (
            <div key={v.code}>{v.value}</div>
          ))}
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={2}>
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
    </div>
  )
}

export default FormOptionValue
