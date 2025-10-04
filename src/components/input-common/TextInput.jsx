import { TextField } from "@mui/material"
import debounce from "lodash/debounce"
import { useMemo } from "react"

export default function TextInput({ onChangeValue, ...props }) {
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        onChangeValue(value)
      }, 300),
    [],
  )

  const handleChange = (e) => {
    handleSearch(e.target.value)
  }

  return (
    <TextField
      onChange={handleChange}
      {...props}
    />
  )
}
