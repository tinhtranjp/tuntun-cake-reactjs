// purchaseImportColumns.js
import RenderOrdersDetail from "@/components/page/Order/table/RenderOrdersDetail"
import { Box, Button, Stack } from "@mui/material"
import dayjs from "dayjs"
import RenderType from "./RenderType"
import NoteCell from "./NoteCell"

export const getPurchaseOrderColumns = ({ onSelectOrderId, handleNoteUpdate, onSelectReturnId }) => [
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
    field: "type",
    headerName: "Kiểu",
    flex: 0.5,
    renderCell: (params) => {
      if (!params.value) return ""
      const type = params.value.toUpperCase()
      return (
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <RenderType
            type={type}
            id={params.row.id}
          />
        </Stack>
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
    disableColumnMenu: true,
    renderHeader: () => (
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
      >
        <span>Ghi chú</span> | <span>Chi tiết</span> | <span>Trả hàng</span>
      </Stack>
    ),
    sortable: false,
    flex: 1,
    align: "center",
    editable: false,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            justifyContent={"space-between"}
            gap={1}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box sx={{ flex: 1 }}>
              <NoteCell
                value={params?.row?.note}
                row={params.row}
                onUpdate={handleNoteUpdate}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <RenderOrdersDetail
                params={params}
                onSelectOrderId={onSelectOrderId}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Button
                sx={{ py: 0, textTransform: "none" }}
                variant="outlined"
                size="small"
                color="warning"
                disabled={params?.row?.type !== "IMPORT"}
                onClick={() => onSelectReturnId(params?.row?.id)}
              >
                Trả hàng
              </Button>
            </Box>
          </Stack>
        </Box>
      )
    },
  },
]
