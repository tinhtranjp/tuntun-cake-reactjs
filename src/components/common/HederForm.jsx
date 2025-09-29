import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router"

function HeaderForm({ url, title, marginTop = 0, marginBottom = 4, isBack = false }) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop,
        marginBottom,
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          if (isBack) {
            navigate(-1)
          } else {
            navigate(url)
          }
        }}
      >
        Quay lại
      </Button>
    </Box>
  )
}

export default HeaderForm
