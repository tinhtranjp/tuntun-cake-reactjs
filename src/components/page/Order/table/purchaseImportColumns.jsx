// purchaseImportColumns.js
import { Box } from "@mui/material"
import RenderOrdersDetail from "./RenderOrdersDetail"
import { formatUtcToLocal } from "@/helper/common"
import NoteCell from "../../Variant/components/NoteCell"

export const getPurchaseImportColumns = ({ onSelectOrderId, onUpdateNote }) => [
  { field: "id", headerName: "ID", flex: 0.5, editable: false },
  { field: "code", headerName: "Mã order", flex: 1, sortable: false, editable: false },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    flex: 1,
    renderCell: (params) => {
      if (!params.value) return ""
      return <span className="text-gray-700 font-medium">{formatUtcToLocal(params.value)}</span>
    },
  },
  {
    field: "type",
    headerName: "Trạng thái",
    flex: 0.7,
  },
  {
    field: "note",
    headerName: "Ghi chú",
    sortable: false,
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <NoteCell
          value={params?.row?.note}
          row={params.row}
          onUpdateNoteOrder={onUpdateNote}
        />
      )
    },
  },
  {
    field: "totalPrice",
    headerName: "Tổng tiền",
    type: "number",
    flex: 1,
    renderCell: (params) => {
      if (params.value == null) return ""
      const total = `${params.value.toLocaleString("vi-VN")} ₫`
      return <Box>{total}</Box>
    },
  },
  // { field: "note", headerName: "Ghi chú", flex: 1, sortable: false, editable: false },
  {
    field: "actions",
    headerName: "Thao tác",
    sortable: false,
    flex: 0.5,
    align: "center",
    editable: false,
    headerAlign: "center",
    renderCell: (params) => (
      <RenderOrdersDetail
        params={params}
        onSelectOrderId={onSelectOrderId}
      />
    ),
  },
]
