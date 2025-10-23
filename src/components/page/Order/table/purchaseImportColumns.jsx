// purchaseImportColumns.js
import { Box, Stack } from "@mui/material"
import dayjs from "dayjs"
import RenderStatus from "./RenderStatus"
import RenderOrdersDetail from "./RenderOrdersDetail"
import RenderPreOrder from "./RenderPreOrder"

export const getPurchaseImportColumns = ({ onSelectOrderId }) => [
  { field: "id", headerName: "ID", flex: 0.5, editable: false },
  { field: "code", headerName: "Mã order", flex: 1, sortable: false, editable: false },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    flex: 1,
    renderCell: (params) => {
      if (!params.value) return ""
      const date = dayjs(params.value.replace(" ", "T"))
      return (
        <span className="text-gray-700 font-medium">
          {date.isValid() ? date.format("DD-MM-YYYY HH:mm:ss") : params.value}
        </span>
      )
    },
  },
  {
    field: "preOrderFlag",
    headerName: "Pre order",
    headerAlign: "center",
    flex: 0.5,
    renderCell: (params) => {
      const isPreOrder = Boolean(params.value)
      return (
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <RenderPreOrder
            isPreOrder={isPreOrder}
            id={params.row.id}
          />
        </Stack>
      )
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 0.7,
    renderCell: (params) => {
      if (!params.value) return ""
      const status = params.value.toUpperCase()
      return (
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <RenderStatus
            status={status}
            id={params.row.id}
          />
        </Stack>
      )
    },
  },
  {
    field: "totalAmount",
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
