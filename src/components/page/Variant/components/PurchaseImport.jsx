import { usePurchaseStore, useResetType } from "@/store/PurchaseStore"
import DeleteIcon from "@mui/icons-material/Delete"
import { Box, Button, IconButton, Tooltip } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import InfoIcon from "@mui/icons-material/Info"
import React, { useState } from "react"
import { usePurchaseCreate } from "@/service/purchase-oder/mutation"
const columns = [
  { field: "itemId", headerName: "ID", sortable: false, flex: 0.5, editable: false },
  { field: "sku", headerName: "Mã sản phẩm", sortable: false, flex: 1, editable: false },
  { field: "unit", headerName: "Đơn vị", flex: 0.5, editable: true },
  { field: "costPrice", headerName: "Giá nhập", sortable: false, type: "number", flex: 1, editable: true },
  { field: "basePrice", headerName: "Giá bán", sortable: false, type: "number", flex: 1, editable: true },
  { field: "quantity", headerName: "Số lượng", sortable: false, type: "number", flex: 1, editable: true },
  { field: "discountPercent", headerName: "% KM", sortable: false, type: "number", flex: 1, editable: true },
  { field: "discountAmount", headerName: "(amount) KM", sortable: false, type: "number", flex: 1, editable: true },
  {
    field: "note",
    headerName: "Ghi chú",
    sortable: false,
    flex: 0.5,
    editable: false,
    renderCell: (params) => {
      if (!params.value) return null
      return (
        <Tooltip
          title={<div dangerouslySetInnerHTML={{ __html: params.value }} />}
          arrow
        >
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )
    },
  },
]
// {
//   field: "fullName",
//   headerName: "Full name",
//   description: "This column has a value getter and is not sortable.",
//   sortable: false,
//   width: 160,
//   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
// },

function PurchaseImport() {
  const [selectedIds, setSelectedIds] = useState([])
  const [rowsData, setRowsData] = useState([])
  const resetType = useResetType()

  const purchases = usePurchaseStore((state) => state.purchases)
  // memo để flatten items
  React.useEffect(() => {
    const listItem = purchases.filter((p) => p.type === "import").flatMap((p) => p.items)
    setRowsData(listItem)
  }, [purchases])

  const handleRowSelection = (selectionModel) => {
    let selectedIdsArray = []
    console.log(selectionModel.type)

    if (selectionModel.type == "exclude") {
      selectedIdsArray = rowsData.map((row) => row.itemId)
    } else {
      selectedIdsArray = [...selectionModel.ids]
    }
    setSelectedIds(selectedIdsArray)
  }

  // ✅ Hàm cập nhật row khi edit xong
  const handleProcessRowUpdate = (newRow, oldRow) => {
    // newRow là row sau khi edit
    setRowsData((prev) => prev.map((r) => (r.itemId === newRow.itemId ? newRow : r)))
    return newRow
  }

  const mutationCreate = usePurchaseCreate()
  const handleSubmit = async () => {
    if (window.confirm("Xác nhận gửi đơn hàng")) {
      try {
        const newData = {
          note: "abc",
          type: "import",
          details: rowsData,
        }
        await mutationCreate.mutateAsync(newData)
        resetType("import")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteSelected = () => {
    if (window.confirm("Bạn có muốn xóa các sản phẩm đang chọn.")) {
      setRowsData((prev) => prev.filter((r) => !selectedIds.includes(r.itemId)))
    }
  }
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </Box>
      <Box sx={{ position: "relative", display: "flex", flexDirection: "column", height: "70vh", width: "100%" }}>
        <DataGrid
          rows={rowsData}
          columns={columns}
          getRowId={(row) => row.itemId}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          sx={{ flex: 1 }}
        />
        {selectedIds.length > 0 && (
          <DeleteIcon
            sx={{
              position: "absolute",
              top: -40,
              right: 0,
              cursor: "pointer",
              color: "#444",
              fontSize: "30px",
              transition: "all 0.3s ease-in",
            }}
            onClick={handleDeleteSelected}
          />
        )}
      </Box>
    </Box>
  )
}

export default PurchaseImport
