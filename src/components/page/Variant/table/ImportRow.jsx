import TableImage from "@/components/table/TableImage"
import { Box, Button, Checkbox, Chip, TableCell, TableRow } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { renderBackGroundPrice, renderBackGroundQuantity } from "@/helper/variant"
export default function ImportRow({ row, isSelected, labelId, onClick, onOpenModal }) {
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
          <Chip
            label={row.sku}
            color="primary"
          />
        </TableCell>
        <TableCell sx={{ width: 150 }}>
          <TableImage src={row.thumbnail} />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell sx={{ width: 100 }}>{row.variantName}</TableCell>
        <TableCell>{row.flavor}</TableCell>
        <TableCell>
          <Chip
            label={row.stockQuantity}
            color={renderBackGroundQuantity(row.stockQuantity)}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          <Chip
            label={`${row.price?.toLocaleString("vi-VN")}  đ`}
            color={renderBackGroundPrice(row.price)}
          />
        </TableCell>
        <TableCell
          padding="none"
          sx={{ width: 200 }}
        >
          <Box>
            {/* view sau này thống kê sau */}
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal?.({ id: row.id, type: "action" })
              }}
            >
              Nhập hàng
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal?.({ id: row.id, type: "view" })
              }}
              sx={{ ml: 2 }}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  )
}
