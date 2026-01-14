import SearchInput from "@/components/input-common/SearchInput"
import RangeDate from "@/components/table/RangeDate"
import RangePrice from "@/components/table/RangePrice"
import useSearchParamsFilters from "@/hook/useSearchParamsFilters"
import { useOrderGetSummary, useSearchOrders } from "@/service/order/queries"
import { usePurchaseStore } from "@/store/PurchaseStore"
import { Box, Button, Grid, Stack, Typography, Skeleton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import "dayjs/locale/vi"
import { useMemo, useState } from "react"
import EditableNoteModal from "../Variant/components/EditableNoteModal"
import ProductModal from "./components/ProductModal"
import DetailsTable from "./table/DetailsTable"
import { getPurchaseImportColumns } from "./table/purchaseImportColumns"
import { usePurchaseFilters } from "./table/usePurchaseFilters"
import NavStatus from "./components/NavStatus"
import { useOrderUpdateNote } from "@/service/order/mutation"

/* =======================
   Utils
======================= */
const formatVND = (value = 0) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value)

const MoneySkeleton = () => (
  <Skeleton
    variant="text"
    width={120}
    height={20}
    sx={{ ml: "auto" }}
  />
)

/* =======================
   Component
======================= */
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
    type,
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

  /* =======================
     Handlers
  ======================= */
  const handleChangeMin = (value) => {
    setOrRemoveParam("minPrice", value?.toString())
  }

  const handleChangeMax = (value) => {
    setOrRemoveParam("maxPrice", value?.toString())
  }

  const handleChangeDate = (key, value) => {
    const newParams = Object.fromEntries(searchParams.entries())
    if (value) newParams[key] = value.format("YYYY-MM-DD")
    else delete newParams[key]
    setSearchParams(newParams, { replace: true })
  }

  const handleChangeType = (value) => {
    setOrRemoveParam("type", value)
  }

  const handleChangePage = (page) => {
    updateParams({ page: page.page, limit: page.pageSize })
  }

  const handleSortChange = (newModel) => {
    setSortModel(newModel)

    if (newModel.length > 0) {
      const { field, sort } = newModel[0]
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev.entries()),
        sort: `${field}-${sort}`,
      }))
    } else {
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
    setModalDetails(true)
  }

  const getOrderDetails = (id) => data?.content.find((item) => item.id === id) || []

  const updateNoteMutation = useOrderUpdateNote()

  const handleUpdateNote = async (itemId, newNote) => {
    await updateNoteMutation.mutateAsync({
      id: itemId,
      data: { note: newNote },
    })
  }

  const columns = getPurchaseImportColumns({
    onSelectOrderId: handleSelectOrderId,
    onUpdateNote: handleUpdateNote,
  })

  /* =======================
     Render
  ======================= */
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "84vh" }}>
        {/* FILTER */}
        <Stack
          direction="row"
          gap={2}
          mb={4}
        >
          <Box flex={1}>
            <SearchInput
              value={code}
              onChangeValue={handleChangeCode}
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
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={(d) => handleChangeDate("startDate", d)}
            onChangeEndDate={(d) => handleChangeDate("endDate", d)}
          />
          <Button
            variant="outlined"
            onClick={resetSeachParams}
          >
            Reset
          </Button>
        </Stack>

        {/* STATUS + TOTAL */}
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={4}
        >
          <NavStatus
            type={type}
            onChangeValue={handleChangeType}
          />
        </Stack>

        {/* TABLE */}
        <Box flex={1}>
          {data && (
            <DataGrid
              rows={data.content}
              columns={columns}
              getRowId={(row) => row.id}
              paginationMode="server"
              sortingMode="server"
              rowCount={data.totalElements || 0}
              paginationModel={{ page, pageSize: limit }}
              onPaginationModelChange={handleChangePage}
              sortModel={sortModel}
              onSortModelChange={handleSortChange}
              pageSizeOptions={[10, 20, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          )}
        </Box>
      </Box>

      {/* MODALS */}
      <EditableNoteModal
        open={openModal}
        note={note}
        onClose={() => setOpenModal(false)}
        onSave={setNoteRow}
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
