import { Box, Stack } from "@mui/material"

function Sale() {
  return (
    <Box className="min-h-screen w-full relative">
      {/* Radial Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Dashboard Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={"70vh"}
        >
          <img
            src="/banner.png"
            alt="Banner"
            style={{ witdh: "240px", height: "240px", borderRadius: "20px", border: "1px solid #d6d0d0" }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default Sale
