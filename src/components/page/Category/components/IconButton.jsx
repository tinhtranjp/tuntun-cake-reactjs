import { Box } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"

export const IconButton = ({ isDeleted, onClick }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#666",
        backgroundColor: "white",
        position: "absolute",
        top: 4,
        right: 5,
        borderRadius: "50%",
        cursor: "pointer",
        "&:hover": {
          color: "white",
          backgroundColor: theme.palette.primary.main,
          transition: "all 0.3s ease",
        },
      })}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {isDeleted ? <AutoFixHighIcon sx={{ width: 20, height: 20 }} /> : <CancelIcon sx={{ width: 20, height: 20 }} />}
    </Box>
  )
}
