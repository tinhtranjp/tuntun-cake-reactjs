import { Box, Modal, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  border: "none",
  outline: "none",
  p: 3,
}
export default function ProductModal({ open, onClose, title, children, minWidth, maxWidth, ...props }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box sx={{ ...style, minWidth, maxWidth, width: "auto" }}>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography
              id="product-modal-title"
              variant="h6"
              fontWeight={600}
              {...props}
            >
              {title || "Chi tiết sản phẩm"}
            </Typography>
            <IconButton
              size="small"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            id="product-modal-description"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
