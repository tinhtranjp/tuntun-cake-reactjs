import { TableRow, TableCell, IconButton, Collapse, Box, Button, Checkbox, Chip } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import HtmlRender from "@/components/common/HtmlRender"
import { useState } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import TableImage from "@/components/table/TableImage"
import { renderBackGroundPrice } from "@/helper/variant"
export default function TableRowProduct({ row, isSelected, labelId, onClick, navigate, onOpenModal }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow
        hover
        onClick={(e) => onClick(e, row.id)}
        role="checkbox"
        aria-checked={isSelected}
        selected={isSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isSelected}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {row.id}
        </TableCell>
        <TableCell sx={{ width: 150 }}>
          <TableImage
            src={row.images[0].url}
            width={50}
            height={50}
          />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          <Chip
            label={`${row.basePrice.toLocaleString("vi-VN")} ₫`}
            color={renderBackGroundPrice(row.basePrice)}
          />
        </TableCell>
        <TableCell
          padding="none"
          sx={{ width: 200 }}
        >
          <Box>
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal?.(row.id)
              }}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ ml: 2 }}
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/product/${row.id}/update`)
              }}
            >
              Cập nhật
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: "40px 4px" }}>
              <HtmlRender htmlString={row.description} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
