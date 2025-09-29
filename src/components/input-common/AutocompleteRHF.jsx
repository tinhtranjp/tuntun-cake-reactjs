import React from "react"
import { Controller } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

export default function AutocompleteRHF({
  control,
  name,
  label,
  options,
  multiple = false,
  getOptionLabel = (option) => option.label || option.title,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Lấy giá trị hiện tại từ field.value
        const selectedOptions = multiple
          ? options.filter((opt) => field.value?.includes(opt.value))
          : options.find((opt) => opt.value === field.value) || null

        return (
          <Autocomplete
            multiple={multiple}
            options={options}
            getOptionLabel={getOptionLabel}
            value={selectedOptions}
            onChange={(_, newValue) => {
              if (multiple) {
                const values = newValue.map((item) => item.value)
                field.onChange(values)
              } else {
                field.onChange(newValue ? newValue.value : null)
              }
            }}
            renderInput={(params) => (
              <TextField
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...params}
                label={label}
              />
            )}
          />
        )
      }}
    />
  )
}
