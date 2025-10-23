import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useOrderChangeStatus } from "@/service/order/mutation"

function RenderStatus({ status, id }) {
  const mutation = useOrderChangeStatus()
  const handleChange = async (event) => {
    try {
      const data = {
        status: event.target.value,
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
        labelId={`status-${id}`}
        id={`status-${id}`}
        value={status.toLowerCase()}
        onChange={handleChange}
        size="small"
        readOnly={status.toLowerCase() == "return"}
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
            status === "PENDING"
              ? "#333"
              : status === "PROCESS"
              ? "#ff9800"
              : status === "READY"
              ? "#1769aa"
              : status === "DONE"
              ? "#4caf50"
              : status === "CANCELLED"
              ? "#ab003c"
              : status === "RETURN"
              ? "#4a148c"
              : "inherit",
        }}
      >
        <MenuItem
          value={"pending"}
          sx={{ color: "#333" }}
        >
          PENDING
        </MenuItem>
        <MenuItem
          value={"process"}
          sx={{ color: "#ff9800" }}
        >
          PROCESS
        </MenuItem>
        <MenuItem
          value={"ready"}
          sx={{ color: "#1769aa" }}
        >
          READY
        </MenuItem>
        <MenuItem
          value={"done"}
          sx={{ color: "#4caf50" }}
        >
          DONE
        </MenuItem>
        <MenuItem
          sx={{ color: "#ab003c" }}
          value={"cancelled"}
        >
          CANCELLED
        </MenuItem>
        {status.toLowerCase() == "return" && (
          <MenuItem
            value={"return"}
            sx={{ color: "#4a148c" }}
          >
            RETURN
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default RenderStatus
