import React, { useMemo, useEffect, useState, useRef } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment, TextField } from "@mui/material"
import debounce from "lodash/debounce"

export default function SearchInput({
  value, // ✅ Thêm value prop
  onChangeValue,
  width = "400px",
  paddingYCustom = "14px",
  ...props
}) {
  const [localValue, setLocalValue] = useState(value || "") // ✅ Local state
  const isExternalUpdate = useRef(false) // ✅ Track external updates

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        if (!isExternalUpdate.current) {
          // ✅ Chỉ call khi user input
          onChangeValue(value)
        }
        isExternalUpdate.current = false
      }, 300),
    [onChangeValue], // ✅ Thêm dependency
  )

  // ✅ Cleanup debounce
  useEffect(() => {
    return () => {
      handleSearch.cancel()
    }
  }, [handleSearch])

  // ✅ Sync với prop value (khi reset hoặc load initial)
  useEffect(() => {
    isExternalUpdate.current = true
    handleSearch.cancel() // ✅ Cancel pending debounce
    setLocalValue(value || "")
  }, [value, handleSearch])

  const handleChange = (e) => {
    const newValue = e.target.value
    isExternalUpdate.current = false // ✅ User input
    setLocalValue(newValue)
    handleSearch(newValue)
  }

  return (
    <TextField
      {...props}
      label="Tìm kiếm"
      variant="outlined"
      value={localValue} // ✅ Controlled component
      onChange={handleChange}
      sx={{
        width,
        "& .MuiInputBase-input": {
          py: paddingYCustom,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
