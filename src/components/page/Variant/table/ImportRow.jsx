import TableImage from "@/components/table/TableImage"
import { Badge, Box, Button, Checkbox, Chip, Grid, Stack, TableCell, TableRow, Typography } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { renderBackGroundCostPrice, renderBackGroundPrice, renderBackGroundQuantity } from "@/helper/variant"
import { useGetItemByTypeAndId } from "@/store/PurchaseStore"
import { getValue } from "@/helper/product"
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
        <TableCell>
          <Typography>{row.productName}</Typography>
          <Stack>
            {row.poDetails?.map((po) => (
              <Box key={po.id}>
                {po?.name} : {po?.povDetails[0]?.value}
              </Box>
            ))}
          </Stack>
        </TableCell>

        <TableCell>
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: 400 }}
          >
            <Grid size={3}>
              <Typography>Giá nhập</Typography>
            </Grid>
            <Grid size={9}>
              <Chip
                label={`${row.costPrice?.toLocaleString("vi-VN")}  đ`}
                color={renderBackGroundCostPrice(row.costPrice)}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Niêm yết</Typography>
            </Grid>
            <Grid size={9}>
              <Chip
                label={`${row.originalPrice?.toLocaleString("vi-VN")}  đ`}
                color={renderBackGroundPrice(row.originalPrice)}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Giá bán</Typography>
            </Grid>
            <Grid size={9}>
              <Chip
                label={`${row.salePrice?.toLocaleString("vi-VN")}  đ`}
                color={renderBackGroundPrice(row.salePrice)}
              />
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>
          <Chip
            label={row.quantity}
            color={renderBackGroundQuantity(row.quantity)}
          />
        </TableCell>
        <TableCell>
          {" "}
          <Chip
            label={getValue(row.status)}
            color={row.status === "ACTIVE" ? "success" : row.status === "OUT_OF_STOCK" ? "error" : "default"}
          />
        </TableCell>
        <TableCell>{getValue(row.productType)}</TableCell>
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
