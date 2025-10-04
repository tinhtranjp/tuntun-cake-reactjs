import { Box, Typography } from "@mui/material"

export default function TableImage({ src, alt }) {
  return src ? (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = "/no_image.jpeg"
      }}
      sx={{
        width: 100,
        height: 100,
        borderRadius: 2,
        objectFit: "cover",
        boxShadow: 3,
      }}
    />
  ) : (
    <Box
      component="img"
      src="/no_image.jpeg"
      alt={alt}
      sx={{
        width: 100,
        height: 100,
        borderRadius: 2,
        objectFit: "cover",
        boxShadow: 3,
      }}
    />
  )
}
