import { Box } from "@mui/material"
import ActionForm from "../components/ActionForm"

function UpdateContent({ row, onClose }) {
  return (
    <Box>
      <ActionForm
        variant={row}
        onClose={onClose}
        type="update"
      />
    </Box>
  )
}

export default UpdateContent
