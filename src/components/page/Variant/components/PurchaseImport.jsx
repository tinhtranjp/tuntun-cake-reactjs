import TableImage from "@/components/table/TableImage"
import { usePurchaseCreate } from "@/service/purchase-oder/mutation"
import {
  useDeleteItemsInType,
  usePurchaseStore,
  useResetType,
  useUpdateItemInType,
  useUpdateNoteInType,
} from "@/store/PurchaseStore"
import DeleteIcon from "@mui/icons-material/Delete"
import EditNoteIcon from "@mui/icons-material/EditNote"
import { Box, Button, IconButton, Stack } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import React, { useState } from "react"
import EditableNoteModal from "./EditableNoteModal"
import NoteCell from "./NoteCell"

function PurchaseImport({ type = "import" }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [rowsData, setRowsData] = useState([])
  const resetType = useResetType()
  const [openModal, setOpenModal] = useState(false)
  const [noteRow, setNoteRow] = useState("")

  const purchases = usePurchaseStore((state) => state.purchases)
  const note = usePurchaseStore((state) => state.purchases).find((p) => p.type === type)?.note
  const updateNote = useUpdateNoteInType()
  const useUpdateItem = useUpdateItemInType()
  const deleteItems = useDeleteItemsInType()

  // memo để flatten items
  React.useEffect(() => {
    const listItem = purchases.filter((p) => p.type === type).flatMap((p) => p.items)
    setRowsData(listItem)
  }, [purchases])

  const handleRowSelection = (selectionModel) => {
    let selectedIdsArray = []
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
    useUpdateItem(type, newRow.itemId, newRow)
    return newRow
  }

  const mutationCreate = usePurchaseCreate()
  const handleSubmit = async () => {
    if (window.confirm("Xác nhận gửi đơn hàng")) {
      try {
        const newData = {
          note: noteRow,
          type: type,
          details: rowsData,
        }
        await mutationCreate.mutateAsync(newData)
        resetType(type)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteSelected = () => {
    if (window.confirm("Bạn có muốn xóa các sản phẩm đang chọn.")) {
      const idsToDelete = selectedIds.map((id) => Number(id))
      setRowsData((prev) => prev.filter((r) => !selectedIds.includes(r.itemId)))
      deleteItems(type, idsToDelete)
    }
  }
  const handleNoteUpdate = (itemId, newNote) => {
    setRowsData((prev) => prev.map((row) => (row.itemId === itemId ? { ...row, note: newNote } : row)))
  }

  const handleChangeNoteParent = (newNote) => {
    updateNote(type, newNote)
    setNoteRow(newNote)
  }

  const handleDeleteRow = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      setRowsData((prevRows) => prevRows.filter((row) => row.itemId !== id))
      deleteItems(type, [id])
    }
  }
  const columns = [
    { field: "itemId", headerName: "ID", flex: 0.5, editable: false },
    { field: "name", headerName: "Tên sản phẩm", flex: 1, editable: false },
    { field: "sku", headerName: "Mã sản phẩm", flex: 1, editable: false },
    // { field: "thumbnail", headerName: "Ảnh", flex: 0.5, editable: false },
    {
      field: "thumbnail",
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
    { field: "unit", headerName: "Đơn vị", flex: 0.5, editable: true },
    { field: "costPrice", headerName: "Giá nhập", type: "number", flex: 1, editable: true },
    { field: "basePrice", headerName: "Giá bán", type: "number", flex: 1, editable: true },
    { field: "quantity", headerName: "Số lượng", type: "number", flex: 1, editable: true },
    { field: "discountPercent", headerName: "% KM", type: "number", flex: 1, editable: true },
    { field: "discountAmount", headerName: "(amount) KM", type: "number", flex: 1, editable: true },
    {
      field: "note",
      headerName: "Ghi chú",
      sortable: false,
      flex: 0.5,
      align: "center",
      editable: false,
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
  return (
    <Box sx={{ py: 2 }}>
      {rowsData.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Xác nhận
          </Button>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            {selectedIds.length > 0 && (
              <IconButton
                color="error"
                size="small"
                sx={{
                  bgcolor: "rgba(255,0,0,0.05)",
                  "&:hover": {
                    bgcolor: "rgba(255,0,0,0.15)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.25s ease",
                }}
                onClick={handleDeleteSelected}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
            <EditNoteIcon
              sx={{ fontSize: 40, color: "primary.main", cursor: "pointer" }}
              onClick={() => setOpenModal(true)}
            />
          </Stack>
        </Box>
      )}
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
          sx={{
            flex: 1,
          }}
        />
      </Box>
      <EditableNoteModal
        note={note}
        onClose={() => setOpenModal(false)}
        onSave={handleChangeNoteParent}
        open={openModal}
        isRow={false}
      />
    </Box>
  )
}

export default PurchaseImport
