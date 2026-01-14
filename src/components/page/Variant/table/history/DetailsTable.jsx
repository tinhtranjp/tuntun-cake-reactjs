import HtmlRender from "@/components/common/HtmlRender"
import TableImage from "@/components/table/TableImage"
import { Button, Collapse, IconButton, Stack, TableFooter, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import * as React from "react"
import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import { usePurchaseUpdateDetailNote } from "@/service/purchase-oder/mutation"

function Row(props) {
  const { row, type } = props

  const [open, setOpen] = React.useState(false)
  const [update, setUpdate] = React.useState(false)
  const [content, setContent] = React.useState(row?.note)

  const mutationUpdate = usePurchaseUpdateDetailNote()

  const handleSubmit = async () => {
    try {
      await mutationUpdate.mutateAsync({ id: row?.id, data: { note: content } })
      setUpdate(false)
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            color={row?.note ? "primary" : "default"}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <TableImage
            alt={row.productName}
            src={row.imgUrl}
            height={50}
            width={50}
          />
        </TableCell>
        <TableCell
          align="left"
          sx={{ maxWidth: 200 }}
        >
          {row.productName}
        </TableCell>
        <TableCell align="right">
          {type === "adjustment" && row.quantity > 0 ? `+${row.quantity}` : row.quantity}
        </TableCell>
        <TableCell align="right">{row.costPrice.toLocaleString("vi-VN")} ₫</TableCell>
        <TableCell align="right">{row.originalPrice.toLocaleString("vi-VN")} ₫</TableCell>
        <TableCell align="right">{row.salePrice.toLocaleString("vi-VN")} ₫</TableCell>
        <TableCell align="right">{row.totalPrice.toLocaleString("vi-VN")} ₫</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: "40px 4px" }}>
              {update ? (
                <>
                  <CkeditorCustom
                    folder="purchase-history/note"
                    onChange={(value) => setContent(value)}
                    value={content}
                    label=""
                  />

                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 4, cursor: "pointer" }}
                    onClick={handleSubmit}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 4, ml: 2, cursor: "pointer", minWidth: 90 }}
                    color="error"
                    onClick={() => setUpdate(false)}
                  >
                    Hủy
                  </Button>
                </>
              ) : (
                <Box>
                  {row?.note ? (
                    <HtmlRender htmlString={row.note} />
                  ) : (
                    <Typography color="#666">#Không có ghi chú nào</Typography>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 4, cursor: "pointer" }}
                    onClick={() => setUpdate(true)}
                  >
                    {row?.note ? "Chỉnh sửa" : "Thêm mới"}
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
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
              <TableCell align="left">Ghi chú</TableCell>
              <TableCell align="center">Ảnh</TableCell>
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá Nhập</TableCell>
              <TableCell align="right">Giá Niêm yết</TableCell>
              <TableCell align="right">Giá Bán</TableCell>
              <TableCell align="right">Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order &&
              order?.details?.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  type={order.type}
                />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                <Stack
                  flexDirection={"row"}
                  justifyContent={"end"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Typography color="#444">Tổng hóa đơn :</Typography>{" "}
                  <Typography
                    variant="h6"
                    color="#c92127"
                  >
                    {order.totalPrice.toLocaleString("vi-VN")} VNĐ
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
