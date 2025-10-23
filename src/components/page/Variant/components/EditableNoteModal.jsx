import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Stack,
  Box,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import TableImage from "@/components/table/TableImage"

const EditableNoteModal = ({ open, onClose, note, onSave, itemId, itemSku, isRow = true, row }) => {
  const [content, setContent] = useState(note || "")

  useEffect(() => {
    if (open) {
      setContent(note || "")
    }
  }, [open, note])

  const handleSave = () => {
    onSave(content)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableEnforceFocus // ← Important cho CKEditor
      PaperProps={{
        sx: { overflow: "visible" },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Typography variant="h6">Chỉnh sửa ghi chú</Typography>
          {isRow && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              mt={1}
            >
              <TableImage
                src={row.thumbnail}
                alt={itemSku}
                width={50}
                height={50}
              />
              <Box>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  ID: {itemId}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Sku: {itemSku}
                </Typography>
              </Box>
            </Stack>
          )}
        </div>
        <IconButton
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ overflow: "visible", minHeight: "300px" }}
      >
        <CkeditorCustom
          scrollable
          height="250px"
          folder="purchase-import"
          onChange={(value) => setContent(value)}
          value={content}
          label="Ghi chú"
        />
      </DialogContent>

      <DialogActions sx={{ py: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
          size="small"
        >
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          size="small"
        >
          Lưu ghi chú
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditableNoteModal
