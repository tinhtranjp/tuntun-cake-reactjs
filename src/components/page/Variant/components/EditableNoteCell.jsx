import { IconButton, Tooltip } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import EditableNoteModal from "./EditableNoteModal"

const EditableNoteCell = ({ value, onUpdate, itemId, readOnly = false }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleSave = (newNote) => {
    if (onUpdate) {
      onUpdate(itemId, newNote)
    }
  }

  return (
    <>
      <Tooltip
        title={readOnly ? "Xem ghi chú" : "Chỉnh sửa ghi chú"}
        arrow
      >
        <IconButton
          size="small"
          onClick={() => setOpenModal(true)}
        >
          {readOnly ? <InfoIcon fontSize="small" /> : <EditIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <EditableNoteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        note={value}
        onSave={handleSave}
        readOnly={readOnly}
      />
    </>
  )
}

export default EditableNoteCell
