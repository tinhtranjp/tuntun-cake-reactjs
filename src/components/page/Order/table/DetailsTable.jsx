import TableImage from "@/components/table/TableImage"
import { Stack, TableFooter, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import * as React from "react"
import { deepPurple, orange, deepOrange, lightGreen } from "@mui/material/colors"
function Row(props) {
  const { row } = props
  console.log(row)

  const discountColors = [
    { threshold: 80, color: deepPurple[500] },
    { threshold: 60, color: deepOrange[500] },
    { threshold: 30, color: orange[500] },
    { threshold: 1, color: lightGreen[500] },
  ]

  const getDiscoutColor = (percent) => {
    const match = discountColors.find((c) => percent >= c.threshold)
    return match ? match.color : "#333"
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.sku}</TableCell>
        <TableCell align="center">
          <TableImage
            alt={row.sku}
            src={row.productImage}
            height={50}
            width={50}
          />
        </TableCell>
        <TableCell align="left">{row.itemName}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.price.toLocaleString("vi-VN")} ₫</TableCell>
        <TableCell
          align="right"
          sx={{ color: getDiscoutColor((row.discountAmount / row.price) * 100) }}
        >
          {row.discountAmount.toLocaleString("vi-VN")} {row.discountAmount > 0 ? "₫" : ""}
        </TableCell>
        <TableCell
          align="right"
          sx={{ color: getDiscoutColor(row.discountPercent) }}
        >
          {row.discountPercent}%
        </TableCell>
        <TableCell align="right">{row.totalPrice.toLocaleString("vi-VN")} ₫</TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function DetailsTable({ order }) {
  return (
    <Box sx={{ maxHeight: "80vh", width: "60vw", overflowY: "auto", p: 1 }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 0 8px rgba(0,0,0,0.15)", // đều 4 hướng
          borderRadius: 2,
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Mã sản phẩm</TableCell>
              <TableCell align="center">Ảnh</TableCell>
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="right">KM (amout)</TableCell>
              <TableCell align="right">KM (%)</TableCell>
              <TableCell align="right">Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order &&
              order?.details?.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                />
              ))}
          </TableBody>
          <TableFooter>
            {/* ✅ Bọc row vào footer */}
            <TableRow>
              <TableCell colSpan={12}>
                <Stack
                  flexDirection="row"
                  justifyContent="end"
                  alignItems="center"
                  gap={2}
                >
                  <Typography color="#444">Tổng hóa đơn :</Typography>
                  <Typography
                    variant="h6"
                    color="#c92127"
                  >
                    {order.totalAmount.toLocaleString("vi-VN")} VNĐ
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}
