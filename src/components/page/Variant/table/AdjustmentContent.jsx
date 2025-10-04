import { Box } from "@mui/material"
import ActionForm from "../components/ActionForm"

function AdjustmentContent({ row, onClose }) {
  return (
    <Box>
      <ActionForm
        variant={row}
        onClose={onClose}
        type="adjustment"
      />
    </Box>
  )
}

export default AdjustmentContent
