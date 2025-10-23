import { Box, Button } from "@mui/material"
import NoteCell from "../components/NoteCell"
import TableImage from "@/components/table/TableImage"

export const getPurchaseReturnColummns = ({ handleDeleteRow, handleNoteUpdate }) => [
  { field: "itemId", headerName: "ID", flex: 0.5, editable: false },
  { field: "itemName", headerName: "Tên sản phẩm", flex: 1, editable: false },
  { field: "sku", headerName: "Mã sản phẩm", flex: 1, editable: false },
  // { field: "thumbnail", headerName: "Ảnh", flex: 0.5, editable: false },
  {
    field: "productImage",
    headerName: "Ảnh",
    sortable: false,
    flex: 1,
    editable: false,
    headerAlign: "center",
    align: "center", // ảnh hưởng text, nhưng với renderCell không đủ
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TableImage
          alt={params.row.sku}
          src={params.value}
          height={40}
          width={40}
        />
      </Box>
    ),
  },
  { field: "unit", headerName: "Đơn vị", flex: 0.5, editable: false },
  { field: "costPrice", headerName: "Giá nhập", type: "number", flex: 1, editable: false },
  { field: "basePrice", headerName: "Giá bán", type: "number", flex: 1, editable: false },
  { field: "quantity", headerName: "Số lượng", type: "number", flex: 1, editable: true },
  { field: "discountPercent", headerName: "% KM", type: "number", flex: 1, editable: false },
  { field: "discountAmount", headerName: "(amount) KM", type: "number", flex: 1, editable: false },
  {
    field: "note",
    headerName: "Ghi chú",
    sortable: false,
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <NoteCell
        value={params.value}
        row={params.row}
        onUpdate={handleNoteUpdate}
      />
    ),
  },
  {
    field: "actions",
    headerName: "Thao tác",
    sortable: false,
    flex: 0.5,
    align: "center",
    editable: false,
    headerAlign: "center",
    renderCell: (params) => (
      <Box>
        <Button
          color="error"
          onClick={() => handleDeleteRow(params.row.itemId)}
        >
          Xoá
        </Button>
      </Box>
    ),
  },
]
