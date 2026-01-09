import TableImage from "@/components/table/TableImage"
import { Badge, Box, Button, Checkbox, Chip, Stack, TableCell, TableRow } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { renderBackGroundCostPrice, renderBackGroundPrice, renderBackGroundQuantity } from "@/helper/variant"
import { useGetItemByTypeAndId } from "@/store/PurchaseStore"
export default function ImportRow({ row, isSelected, labelId, onClick, onOpenModal }) {
  const currentItem = useGetItemByTypeAndId("import", row.id)

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
        <TableCell sx={{ width: 100 }}>
          {currentItem?.basePrice > 0 && (
            <Stack
              flexDirection="row"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Chip
                label={`${currentItem?.basePrice?.toLocaleString("vi-VN")}  đ`}
                color={"warning"}
                size="small"
              />
            </Stack>
          )}
          {currentItem?.costPrice > 0 && (
            <Stack
              flexDirection="row"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Chip
                label={`${currentItem?.costPrice?.toLocaleString("vi-VN")}  đ`}
                color={"default"}
                size="small"
              />
            </Stack>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Badge
              badgeContent={currentItem && currentItem.quantity}
              color="primary"
              max={1000}
            >
              <TableImage
                src={row.thumbnail}
                width={50}
                height={50}
              />
            </Badge>
          </Box>
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
            label={`${row.costPrice?.toLocaleString("vi-VN")}  đ`}
            color={renderBackGroundCostPrice(row?.costPrice)}
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
