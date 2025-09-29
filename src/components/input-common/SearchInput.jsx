import React, { useMemo } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment, TextField } from "@mui/material"
import debounce from "lodash/debounce"

export default function SearchInput({ onChangeValue, width = "400px" }) {
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        onChangeValue(value)
      }, 500),
    [],
  )

  const handleChange = (e) => {
    handleSearch(e.target.value)
  }

  return (
    <TextField
      label="Tìm kiếm"
      variant="outlined"
      onChange={handleChange}
      sx={{
        width,
        "& .MuiInputBase-input": {
          py: "14px", // padding top/bottom
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
