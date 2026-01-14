import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

export default function CustomModal({ modal, setModal, maxWidth = "lg" }) {
  const handleClose = () => {
    setModal({ ...modal, open: false })
  }

  return (
    <Dialog
      open={modal.open}
      onClose={handleClose}
      fullWidth
      maxWidth={maxWidth}
    >
      {modal.title && <DialogTitle sx={{ whiteSpace: "pre-line" }}>{modal.title}</DialogTitle>}

      <DialogContent dividers>{modal.content}</DialogContent>

      {modal.actions && (
        <DialogActions>
          {modal.actions.map((action, idx) => (
            <Button
              key={idx}
              onClick={() => {
                action.onClick?.()
                if (action.closeOnClick !== false) handleClose()
              }}
              color={action.color || "primary"}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  )
}
