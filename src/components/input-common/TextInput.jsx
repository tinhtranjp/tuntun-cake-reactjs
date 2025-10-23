// TextInput.jsx
import { TextField } from "@mui/material"
import debounce from "lodash/debounce"
import { useMemo, useEffect, useState } from "react"

export default function TextInput({ value, onChangeValue, ...props }) {
  const [localValue, setLocalValue] = useState(value) // ✅ Local state

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        onChangeValue(value)
      }, 300),
    [onChangeValue],
  )

  useEffect(() => {
    return () => {
      handleSearch.cancel()
    }
  }, [handleSearch])

  // ✅ Sync với prop value khi nó thay đổi từ bên ngoài (như reset)
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue) // ✅ Update UI ngay lập tức
    handleSearch(newValue) // ✅ Debounce khi gọi callback
  }

  return (
    <TextField
      value={localValue} // ✅ Controlled
      onChange={handleChange}
      {...props}
    />
  )
}
