import SearchInput from "@/components/input-common/SearchInput"
import TableHeadCustom from "@/components/table/TableHeadCustom"
import TableToolbarCustom from "@/components/table/TableToolbarCustom"
import { useProductSearch } from "@/service/product/queries"

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material"
import * as React from "react"
import { useNavigate, useSearchParams } from "react-router"
import TableRowProduct from "./TableRowProduct"
import { headCells } from "./headCells"
import TextInput from "@/components/input-common/TextInput"
import ViewModal from "./ViewModal"
import { useVariantToggle } from "@/service/variant/mutation"

export default function ProductEnhancedTable() {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("id")
  const [selected, setSelected] = React.useState([])
  const [modal, setModal] = React.useState({
    open: false,
    row: null,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get("name") ?? ""
  const page = searchParams.get("page") ?? "0"
  const limit = searchParams.get("limit") ?? "5"
  const sort = searchParams.get("sort") ?? "id-desc"
  const status = searchParams.get("status") ?? ""
  const type = searchParams.get("type") ?? ""
  const minPrice = searchParams.get("minPrice") ?? ""
  const maxPrice = searchParams.get("maxPrice") ?? ""
  const variantDeleted = searchParams.get("variantDeleted") ?? "false"

  const navigate = useNavigate()

  // Params

  const updateParams = (newParams) => {
    setSearchParams(
      (prev) => {
        const current = Object.fromEntries(prev.entries())
        return { ...current, ...newParams }
      },
      { replace: true },
    )
  }

  React.useEffect(() => {
    // Chỉ set default 1 lần nếu thiếu page hoặc limit
    if (!searchParams.has("page") || !searchParams.has("limit")) {
      updateParams({ page: "0", limit: "5" })
    }
  }, [])

  const pageNumber = parseInt(page)
  const limitNumber = parseInt(limit)

  const { data } = useProductSearch({
    name,
    page: pageNumber,
    limit: limitNumber,
    sort,
    status,
    type,
    minPrice,
    maxPrice,
    variantDeleted,
  })

  const handleChangePage = (event, newPage) => updateParams({ page: newPage })
  const handleChangeRowsPerPage = (event) => updateParams({ page: 0, limit: parseInt(event.target.value, 10) })
  const handleChangeName = (name) => updateParams({ name })

  const handleChangeStatus = (e) => setOrRemoveParam("status", e.target.value)
  const handleChangeType = (e) => setOrRemoveParam("type", e.target.value)

  const handleChangeMin = (value) => {
    setOrRemoveParam("minPrice", value.toString())
  }
  const handleChangeMax = (value) => {
    setOrRemoveParam("maxPrice", value.toString())
  }

  const setOrRemoveParam = (key, value) => {
    const newParams = Object.fromEntries(searchParams.entries())

    if (value === null || value === "") {
      delete newParams[key]
    } else {
      const newValue = Number(value)
      newParams[key] = !!newValue ? newValue : value
    }

    setSearchParams(newParams, { replace: true })
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    const sortValue = isAsc ? "desc" : "asc"

    setOrder(sortValue)
    setOrderBy(property)
    updateParams({ sort: `${property}-${sortValue}`, page: 0 })
  }

  // UI

  const handleOpen = (row) => {
    setModal({ open: true, row })
  }

  const handleClose = () => {
    setModal({ open: false, row: null })
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.content.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  React.useEffect(() => {
    setSelected([])
  }, [pageNumber, limitNumber, data])

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }
  const selectedRow = React.useMemo(() => {
    if (!data) return null
    return data.content.find((i) => i.id === modal.row)
  }, [data, modal.row])

  const toggleMutation = useVariantToggle()
  const handleToggleVariant = async (variantId) => {
    try {
      await toggleMutation.mutateAsync(variantId)
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) return <div>loading...</div>

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <SearchInput onChangeValue={handleChangeName} />
        <Stack
          alignItems="center"
          flexDirection="row"
          gap={2}
        >
          <TextInput
            onChangeValue={handleChangeMin}
            type="number"
            label="Giá thấp nhất"
            size="small"
          />
          <TextInput
            onChangeValue={handleChangeMax}
            type="number"
            label="Giá cao nhất"
            size="small"
          />
          <FormControl
            sx={{ width: 180 }}
            size="small"
          >
            <InputLabel id="status">Status</InputLabel>

            <Select
              labelId="status"
              id="demo-simple-status"
              value={status}
              label="Status"
              onChange={handleChangeStatus}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              <MenuItem value="OUT_OF_STOCK">OUT_OF_STOCK</MenuItem>
              <MenuItem value="DISCONTINUED">DISCONTINUED</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ width: 180 }}
            size="small"
          >
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="demo-simple-type"
              value={type}
              label="Type"
              onChange={handleChangeType}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="IMPORTED">IMPORTED</MenuItem>
              <MenuItem value="SELF_MADE">SELF_MADE</MenuItem>
              <MenuItem value="RAW_MATERIAL">RAW_MATERIAL</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableToolbarCustom
            numSelected={selected.length}
            title="Danh sách sản phẩm"
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750, tableLayout: "layout" }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHeadCustom
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.content.length}
                headCells={headCells}
              />
              <TableBody>
                {data.content.map((row, index) => {
                  const isItemSelected = selected.includes(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRowProduct
                      isSelected={isItemSelected}
                      labelId={labelId}
                      navigate={navigate}
                      onClick={(event) => handleClick(event, row.id)}
                      row={row}
                      key={row.id}
                      onOpenModal={handleOpen}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.totalElements}
            rowsPerPage={limitNumber}
            page={pageNumber}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang :"
          />
        </Paper>
      </Box>
      <ViewModal
        modal={modal}
        onClose={handleClose}
        row={selectedRow}
        onToggleVariant={handleToggleVariant}
        variantDeleted={variantDeleted}
      />
    </Box>
  )
}
