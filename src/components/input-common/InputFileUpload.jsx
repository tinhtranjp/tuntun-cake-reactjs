import * as React from "react"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { Box, Typography, IconButton } from "@mui/material"
import { useController } from "react-hook-form"
import CloseIcon from "@mui/icons-material/Close"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const PreviewImage = styled("img")({
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 4,
  border: "1px solid #ddd",
  marginRight: 8,
})

export default function InputFileUpload({ label = "Upload files", name, control, imageUrl, multiple = false }) {
  const { field, fieldState } = useController({ name, control })
  const inputRef = React.useRef(null)

  // Tạo previews từ field.value
  const previews = React.useMemo(() => {
    if (!field.value) return []
    if (multiple && Array.isArray(field.value)) {
      return field.value.map((file) => ({
        ...file,
        preview: file.preview || URL.createObjectURL(file),
      }))
    } else if (!multiple && field.value) {
      const file = field.value
      return [{ ...file, preview: file.preview || URL.createObjectURL(file) }]
    }
    return []
  }, [field.value, multiple])

  // Revoke object URL khi unmount hoặc value thay đổi
  React.useEffect(() => {
    return () => {
      previews.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
    }
  }, [previews])

  const handleChange = (e) => {
    const files = e.target.files
    if (!files) return

    if (multiple) {
      field.onChange(Array.from(files))
    } else {
      field.onChange(files[0])
    }

    if (inputRef.current) inputRef.current.value = ""
  }

  const handleRemoveFile = (index) => {
    if (multiple && Array.isArray(field.value)) {
      const updated = field.value.filter((_, i) => i !== index)
      field.onChange(updated)
    } else {
      field.onChange(null)
    }
  }

  return (
    <Box>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={(theme) => ({ background: fieldState.error?.message ? theme.palette.error.main : "" })}
      >
        {label}
        <VisuallyHiddenInput
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={handleChange}
        />
      </Button>
      <Typography sx={(theme) => ({ marginTop: 2, marginLeft: 2, color: theme.palette.error.light, fontSize: "12px" })}>
        {fieldState.error?.message}
      </Typography>
      <Box
        mt={2}
        display="flex"
        flexWrap="wrap"
        gap={1}
      >
        {imageUrl && (
          <Box
            display="flex"
            alignItems="center"
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            p={1}
            maxWidth={300}
          >
            <PreviewImage
              src={imageUrl}
              alt="main image"
            />
          </Box>
        )}
        {previews.map((file, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            p={1}
            maxWidth={300}
          >
            <PreviewImage
              src={file.preview}
              alt={file.name}
            />
            <Typography
              noWrap
              title={file.name}
              sx={{ mr: 1 }}
            >
              {file.name}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleRemoveFile(index)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
