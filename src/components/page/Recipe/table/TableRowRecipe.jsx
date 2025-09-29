import { TableRow, TableCell, IconButton, Collapse, Box, Button, Checkbox, FormControlLabel } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import HtmlRender from "@/components/common/HtmlRender"
import RecipeImage from "./RecipeImage"
import { IOSSwitch } from "@/assets/icon/IOSSwitch"
import { useState } from "react"

export default function TableRowRecipe({ row, isSelected, labelId, onClick, onToggleActive, showDisplay, navigate }) {
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
        <TableCell>{row.title}</TableCell>
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
        <TableCell>
          <RecipeImage
            src={row.imageUrl}
            alt={row.title}
          />
        </TableCell>
        {showDisplay === "true" && (
          <TableCell padding="none">
            <FormControlLabel
              onClick={(e) => e.stopPropagation()}
              onChange={() => onToggleActive(row.id)}
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={row.isDeleted}
                />
              }
            />
          </TableCell>
        )}
        <TableCell padding="none">
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/recipe/${row.id}/update`)
            }}
          >
            Cập nhật
          </Button>
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
              <HtmlRender htmlString={row.content} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
