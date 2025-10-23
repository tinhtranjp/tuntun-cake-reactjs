import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useOrderChangeStatus } from "@/service/order/mutation"

function RenderType({ type, id }) {
  const mutation = useOrderChangeStatus()
  const handleChange = async (event) => {
    try {
      const data = {
        type: event.target.value,
      }
      await mutation.mutateAsync({ data, id })
    } catch (error) {}
  }

  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <Select
        labelId={`type-${id}`}
        id={`type-${id}`}
        value={type.toLowerCase()}
        onChange={handleChange}
        size="small"
        readOnly={true}
        sx={{
          height: 30, // hoặc 28
          fontSize: 13,
          width: 120,
          p: 0,
          "& .MuiSelect-select": {
            py: 0.5,
            px: 1.5,
            minHeight: "unset",
          },
          color:
            type === "ADJUSTMENT"
              ? "#ff9800"
              : type === "UPDATE"
              ? "#1769aa"
              : type === "RETURN"
              ? "#4a148c"
              : "inherit",
        }}
      >
        <MenuItem
          value={"import"}
          sx={{ color: "inherit" }}
        >
          IMPORT
        </MenuItem>
        <MenuItem
          value={"adjustment"}
          sx={{ color: "#ff9800" }}
        >
          ADJUSTMENT
        </MenuItem>
        <MenuItem
          value={"update"}
          sx={{ color: "#1769aa" }}
        >
          UPDATE
        </MenuItem>
        <MenuItem
          value={"return"}
          sx={{ color: "#4a148c" }}
        >
          RETURN
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default RenderType
