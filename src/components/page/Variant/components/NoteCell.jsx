import { IconButton, Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import InfoIcon from "@mui/icons-material/Info"
import { useState } from "react"
import EditableNoteModal from "./EditableNoteModal"

const NoteCell = ({ value, row, onUpdate }) => {
  const [openModal, setOpenModal] = useState(false)
  const hasNote = value && value.trim() !== ""

  const handleSave = (newNote) => {
    if (onUpdate) {
      onUpdate(row.itemId, newNote)
    }
  }

  return (
    <>
      <Tooltip
        title={hasNote ? "Chỉnh sửa ghi chú" : "Thêm ghi chú"}
        arrow
      >
        <IconButton
          size="small"
          onClick={() => setOpenModal(true)}
          color={hasNote ? "primary" : "default"}
        >
          {hasNote ? <EditIcon fontSize="small" /> : <InfoIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <EditableNoteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        note={value}
        onSave={handleSave}
        itemId={row.itemId}
        itemSku={row.sku}
        row={row}
      />
    </>
  )
}

export default NoteCell
