import { Box, IconButton, TextField } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"
import { useEffect, useState } from "react"
import TextNumber from "@/components/input-common/TextNumber"

export default function InputQuantity({
  value = 1,
  onChange,
  min = 1,
  max = 999,
  width = "50px",
  size = "medium", // "small" | "medium"
  isNumber = false,
  isDisable = false,
}) {
  const [quantity, setQuantity] = useState(value)

  useEffect(() => {
    setQuantity(value)
  }, [value])

  const handleChange = (newValue) => {
    const num = parseInt(newValue) || min
    const validValue = Math.max(min, Math.min(max, num))
    setQuantity(validValue)
    onChange?.(validValue)
  }

  const handleIncrement = () => {
    if (quantity < max) {
      handleChange(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > min) {
      handleChange(quantity - 1)
    }
  }

  const handleInputChange = (v) => {
    let val = isNumber ? v : v.target.value

    if (val === "") {
      setQuantity("")
      return
    }

    let num = parseInt(val)
    if (isNaN(num)) num = min
    if (num > max) num = max
    if (num < min) num = min

    setQuantity(num)
    onChange?.(num)
  }

  const handleBlur = () => {
    if (quantity === "" || quantity < min) {
      handleChange(min)
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        borderRadius: 1,
        width: "fit-content",
        gap: 1,
      }}
    >
      <IconButton
        size={size}
        onClick={handleDecrement}
        disabled={isDisable}
        sx={{
          borderRadius: 0,
          bgcolor: "action.hover", // màu background hover của MUI
          "&:hover": {
            bgcolor: "action.hover", // giữ hover không đổi
          },
        }}
      >
        <Remove fontSize={size} />
      </IconButton>

      {isNumber ? (
        <TextNumber
          onChangeValue={handleInputChange}
          value={quantity}
          onBlur={handleBlur}
          disabled={isDisable}
          inputProps={{
            style: {
              textAlign: "center",
              padding: size === "small" ? "4px 8px" : "8px 12px",
              width: width,
            },
            min,
            max,
          }}
        />
      ) : (
        <TextField
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isDisable}
          size={size}
          inputProps={{
            style: {
              textAlign: "center",
              padding: size === "small" ? "4px 8px" : "8px 12px",
              width: width,
            },
            min,
            max,
          }}
        />
      )}

      <IconButton
        size={size}
        disabled={isDisable}
        onClick={handleIncrement}
        sx={{
          borderRadius: 0,
          bgcolor: "action.hover", // màu background hover của MUI
          "&:hover": {
            bgcolor: "action.hover", // giữ hover không đổi
          },
        }}
      >
        <Add fontSize={size} />
      </IconButton>
    </Box>
  )
}
