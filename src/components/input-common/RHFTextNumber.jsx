import { Controller } from "react-hook-form"
import TextNumber from "./TextNumber"

export default function RHFTextNumber({ name, control, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextNumber
          fullWidth
          value={field.value || ""}
          onChangeValue={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...props}
        />
      )}
    />
  )
}
