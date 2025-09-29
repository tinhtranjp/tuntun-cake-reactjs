import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import { useController } from "react-hook-form"

function RadioGroupCustom({ label, options, row = false, ...props }) {
  const { field, fieldState } = useController({
    ...props,
    defaultValue: "",
  })

  return (
    <FormControl error={!!fieldState.error}>
      <FormLabel error={!!fieldState.error}>{label}</FormLabel>
      <RadioGroup
        row={row}
        {...field}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
      >
        {options.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio />}
            label={o.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  )
}

export default RadioGroupCustom
