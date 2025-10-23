import SearchInput from "@/components/input-common/SearchInput"
import RangeDate from "@/components/table/RangeDate"
import RangePrice from "@/components/table/RangePrice"
import useSearchParamsFilters from "@/hook/useSearchParamsFilters"
import { useSearchOrders } from "@/service/order/queries"
import { usePurchaseStore } from "@/store/PurchaseStore"
import { Box, Button, Stack } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import "dayjs/locale/vi"
import { useState } from "react"
import EditableNoteModal from "../Variant/components/EditableNoteModal"
import ProductModal from "./components/ProductModal"
import DetailsTable from "./table/DetailsTable"
import { getPurchaseImportColumns } from "./table/purchaseImportColumns"
import { usePurchaseFilters } from "./table/usePurchaseFilters"
import NavStatus from "./components/NavStatus"

function PurchaseImport() {
  const [openModal, setOpenModal] = useState(false)
  const [noteRow, setNoteRow] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [openModalDetails, setModalDetails] = useState(false)
  const note = usePurchaseStore((state) => state.purchases).find((p) => p.type === "import")?.note
  const { updateParams, setOrRemoveParam } = useSearchParamsFilters()
  const {
    filters,
    page,
    limit,
    code,
    status,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    sortModel,
    setSortModel,
    searchParams,
    setSearchParams,
  } = usePurchaseFilters()

  const { data } = useSearchOrders(filters)

  const handleChangeNoteParent = (newNote) => {
    setNoteRow(newNote)
  }

  const handleChangeMin = (value) => {
    setOrRemoveParam("minPrice", value.toString())
  }
  const handleChangeMax = (value) => {
    setOrRemoveParam("maxPrice", value.toString())
  }

  const handleChangeDate = (key, value) => {
    const newParams = Object.fromEntries(searchParams.entries())

    if (value) {
      newParams[key] = value.format("YYYY-MM-DD")
    } else {
      delete newParams[key]
    }

    setSearchParams(newParams, { replace: true })
  }

  const handleChangeStartDate = (date) => {
    handleChangeDate("startDate", date)
  }
  const handleChangeEndDate = (date) => {
    handleChangeDate("endDate", date)
  }

  const handleChangeStatus = (value) => {
    setOrRemoveParam("status", value)
  }

  const handleChangePage = (page) => {
    updateParams({ page: page.page, limit: page.pageSize })
  }

  const handleSortChange = (newModel) => {
    setSortModel(newModel)

    if (newModel.length > 0) {
      const { field, sort } = newModel[0]
      setSearchParams((prev) => {
        const current = Object.fromEntries(prev.entries())
        return { ...current, sort: `${field}-${sort}` }
      })
    } else {
      // xóa sort khi reset
      setSearchParams((prev) => {
        const current = Object.fromEntries(prev.entries())
        delete current.sort
        return current
      })
    }
  }

  const handleChangeCode = (code) => {
    setOrRemoveParam("code", code)
  }

  const resetSeachParams = () => {
    setSearchParams({})
  }

  const handleSelectOrderId = (id) => {
    setSelectedOrderId(id)
    setModalDetails(() => true)
  }

  const getOrderDetails = (id) => {
    return data?.content.filter((item) => item.id === id)[0] || []
  }

  const columns = getPurchaseImportColumns({ onSelectOrderId: handleSelectOrderId })

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ position: "relative", display: "flex", flexDirection: "column", height: "84vh", width: "100%" }}>
        <Stack
          alignItems="center"
          flexDirection="row"
          justifyContent={"end"}
          gap={2}
          mb={4}
        >
          <Box sx={{ flex: "1" }}>
            <SearchInput
              onChangeValue={handleChangeCode}
              value={code}
              paddingYCustom="8px"
            />
          </Box>
          <RangePrice
            minPrice={minPrice}
            maxPrice={maxPrice}
            handleChangeMin={handleChangeMin}
            handleChangeMax={handleChangeMax}
          />
          <RangeDate
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            startDate={startDate}
            endDate={endDate}
          />
          <Button
            variant="outlined"
            onClick={resetSeachParams}
          >
            Reset
          </Button>
        </Stack>
        <NavStatus
          onChangeValue={handleChangeStatus}
          status={status}
        />
        <Box sx={{ flex: 1 }}>
          {data && (
            <DataGrid
              rows={data.content}
              columns={columns}
              getRowId={(row) => row.id}
              paginationMode="server"
              sortingMode="server"
              rowCount={data?.totalElements || 0} // 🧩 tổng số dòng
              paginationModel={{ page, pageSize: limit }}
              onPaginationModelChange={handleChangePage}
              sortModel={sortModel}
              onSortModelChange={handleSortChange}
              pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              sx={{
                flex: 1,
              }}
            />
          )}
        </Box>
      </Box>
      <EditableNoteModal
        note={note}
        onClose={() => setOpenModal(false)}
        onSave={handleChangeNoteParent}
        open={openModal}
        isRow={false}
      />
      <ProductModal
        open={openModalDetails}
        onClose={() => setModalDetails(false)}
        title="Thông tin sản phẩm"
      >
        <DetailsTable order={getOrderDetails(selectedOrderId)} />
      </ProductModal>
    </Box>
  )
}

export default PurchaseImport
