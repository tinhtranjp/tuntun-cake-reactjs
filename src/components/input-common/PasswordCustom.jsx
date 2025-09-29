import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { FormHelperText } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import * as React from "react"
import { useController } from "react-hook-form"

export default function PasswordCustom({
  label = "Password",
  variant = "outlined",
  id = "outlined-adornment-password",
  position = "end",
  currentComplete,
  ...props
}) {
  const { field, fieldState } = useController(props)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event) => {
    event.preventDefault()
  }

  return (
    <FormControl
      variant={variant}
      error={!!fieldState.error}
    >
      <InputLabel
        error={fieldState.invalid}
        htmlFor={id}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        autoComplete={currentComplete ? "current-password" : "new-password"}
        id={id}
        type={showPassword ? "text" : "password"}
        {...field}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
        error={fieldState.invalid}
        endAdornment={
          <InputAdornment position={position}>
            <IconButton
              aria-label={showPassword ? "hide the password" : "display the password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge={position}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  )
}
