import { IconButton, Stack } from "@mui/material"
import InputQuantity from "./InputQuantity"
import DeleteIcon from "@mui/icons-material/Delete"

function ActionQuantity({ changeQty, deleteItemById, currentQtt, id, width, max = 1000, ...props }) {
  return (
    <Stack
      {...props}
      direction="row"
      alignItems="center"
      gap={1}
    >
      <InputQuantity
        value={currentQtt}
        onChange={(newQty) => changeQty(id, newQty)}
        min={1}
        max={max}
        size="small"
        width={width}
      />
      <IconButton
        onClick={() => deleteItemById(id)}
        sx={{
          borderRadius: 0,
          padding: "3px",
        }}
      >
        <DeleteIcon
          sx={{
            color: "#797373ff",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </IconButton>
    </Stack>
  )
}

export default ActionQuantity
