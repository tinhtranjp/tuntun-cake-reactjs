import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material"
import { Controller } from "react-hook-form"

function CheckBoxCustom({ name, control, label, onTrigger }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value || false}
                onChange={(e) => {
                  field.onChange(e.target.checked)
                  onTrigger?.(e.target.checked)
                }}
              />
            }
            label={label}
          />
          {fieldState?.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
        </>
      )}
    />
  )
}

export default CheckBoxCustom
