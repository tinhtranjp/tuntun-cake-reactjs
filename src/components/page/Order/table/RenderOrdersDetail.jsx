import { Button } from "@mui/material"
function RenderOrdersDetail({ params, onSelectOrderId }) {
  return (
    <Button
      color="primary"
      variant="outlined"
      size="small"
      sx={{ py: 0, textTransform: "none" }}
      onClick={(e) => {
        onSelectOrderId(params.row.id)
      }}
    >
      Chi tiết
    </Button>
  )
}

export default RenderOrdersDetail
