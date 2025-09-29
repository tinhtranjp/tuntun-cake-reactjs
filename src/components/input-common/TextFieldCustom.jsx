import { TextField } from "@mui/material"
import { useController } from "react-hook-form"

function TextFieldCustom({ label, ...props }) {
  const { field, fieldState } = useController(props)

  return (
    <TextField
      {...field}
      label={label}
      variant="outlined"
      fullWidth
      value={field.value ?? ""}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      autoComplete="username"
      {...props}
    />
  )
}

export default TextFieldCustom
