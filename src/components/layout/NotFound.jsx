import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Gradient background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `linear-gradient(
            150deg,
            #B39DDB 0%,
            #D1C4E9 20%,
            #F3E5F5 40%,
            #FCE4EC 60%,
            #FFCDD2 80%,
            #FFAB91 100%
          )`,
        }}
      />

      {/* Nội dung */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        position="relative"
        zIndex={1}
        p={2}
      >
        <Box
          component="img"
          src="/404_NotFound.png"
          alt="not found"
          sx={{
            maxWidth: "100%",
            width: 400,
            mb: 4,
          }}
        />

        <Typography
          variant="h6"
          fontWeight="500"
          color="#333"
          gutterBottom
        >
          Bạn đang đi vào vùng cấm địa 🚫
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 3 }}
        >
          Quay lại
        </Button>
      </Box>
    </Box>
  )
}

export default NotFound
