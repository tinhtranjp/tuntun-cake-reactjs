import { usePurchaseCreate } from "@/service/purchase-oder/mutation"

import DeleteIcon from "@mui/icons-material/Delete"
import EditNoteIcon from "@mui/icons-material/EditNote"
import { Box, Button, IconButton, Stack } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { getPurchaseReturnColummns } from "../table/returnColumns"
import EditableNoteModal from "./EditableNoteModal"
import { toast } from "sonner"

function PurchaseReturn({ type = "return" }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [rowsData, setRowsData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [noteRow, setNoteRow] = useState("")

  const location = useLocation()
  const purchase = location.state?.purchase

  useEffect(() => {
    if (purchase) {
      setRowsData(purchase.details)
    }
  }, [purchase])

  const handleRowSelection = (selectionModel) => {
    let selectedIdsArray = []
    if (selectionModel.type == "exclude") {
      selectedIdsArray = rowsData.map((row) => row.itemId)
    } else {
      selectedIdsArray = [...selectionModel.ids]
    }
    setSelectedIds(selectedIdsArray)
  }

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setRowsData((prev) => prev.map((r) => (r.itemId === newRow.itemId ? newRow : r)))
    return newRow
  }

  const mutationCreate = usePurchaseCreate()
  const handleSubmit = async () => {
    if (window.confirm("Xác nhận trả đơn hàng")) {
      try {
        const newData = {
          note: noteRow,
          type: type.toLocaleUpperCase(),
          details: rowsData,
        }
        await mutationCreate.mutateAsync(newData)
        toast.success("Trả hàng thành công")
        setRowsData([])
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

  const handleNoteUpdate = (itemId, newNote) => {
    setRowsData((prev) => prev.map((row) => (row.itemId === itemId ? { ...row, note: newNote } : row)))
  }

  const handleChangeNoteParent = (newNote) => {
    setNoteRow(newNote)
  }

  const handleDeleteRow = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      setRowsData((prevRows) => prevRows.filter((row) => row.itemId !== id))
    }
  }

  const columns = getPurchaseReturnColummns({ handleDeleteRow, handleNoteUpdate })

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
          getRowId={(row) => row.variantId}
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
        note={noteRow}
        onClose={() => setOpenModal(false)}
        onSave={handleChangeNoteParent}
        open={openModal}
        isRow={false}
      />
    </Box>
  )
}

export default PurchaseReturn
