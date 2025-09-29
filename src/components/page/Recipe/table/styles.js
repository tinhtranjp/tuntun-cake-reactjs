import { styled } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import Checkbox from "@mui/material/Checkbox"

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#333",
    color: "#fff",
    "& .MuiTableSortLabel-root": {
      color: "#fff !important",
      "&:hover": {
        color: "#fff !important",
      },
      "&.Mui-active": {
        color: "#fff !important",
      },
    },
    "& .MuiTableSortLabel-icon": {
      color: "#fff !important",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const WhiteBorderCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#fff",
  "&.Mui-checked": {
    color: "#fff",
  },
}))
