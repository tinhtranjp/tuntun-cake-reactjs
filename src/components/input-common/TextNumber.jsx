import { TextField } from "@mui/material"
import debounce from "lodash/debounce"
import { useEffect, useMemo } from "react"
import { NumericFormat } from "react-number-format"
export default function TextNumber({ value, onChangeValue, ...props }) {
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        onChangeValue(value)
      }, 500),
    [onChangeValue],
  )

  useEffect(() => {
    return () => {
      handleSearch.cancel()
    }
  }, [handleSearch])

  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      value={value}
      onValueChange={(values) => {
        handleSearch(values.floatValue ?? "")
      }}
      {...props}
      customInput={TextField}
    />
  )
}
