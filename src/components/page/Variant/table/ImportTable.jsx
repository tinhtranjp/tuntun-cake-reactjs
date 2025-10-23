import SearchInput from "@/components/input-common/SearchInput"
import TableHeadCustom from "@/components/table/TableHeadCustom"
import TableToolbarCustom from "@/components/table/TableToolbarCustom"

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
import TextInput from "@/components/input-common/TextInput"
import { useVariantSearch } from "@/service/variant/queries"
import ImportRow from "./ImportRow"
import { headCells } from "../helper/importHeaderCells"
import ImportView from "./ImportView"
import RangePrice from "@/components/table/RangePrice"
import { useImportFilters } from "../helper/useImportFilters"

export default function ImportTable() {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("id")
  const [selected, setSelected] = React.useState([])
  const [modal, setModal] = React.useState({
    open: false,
    row: null,
    type: null,
  })

  const { filters, pageNumber, limitNumber, name, sku, type, minPrice, maxPrice, updateParams, setOrRemoveParam } =
    useImportFilters()

  const { data } = useVariantSearch(filters)

  const handleChangePage = (event, newPage) => updateParams({ page: newPage })
  const handleChangeRowsPerPage = (event) => updateParams({ page: 0, limit: parseInt(event.target.value, 10) })
  const handleChangeName = (name) => updateParams({ name })
  const handleChangeSku = (sku) => updateParams({ sku })
  const handleChangeType = (e) => setOrRemoveParam("type", e.target.value)
  const handleChangeMin = (value) => {
    setOrRemoveParam("minPrice", value.toString())
  }
  const handleChangeMax = (value) => {
    setOrRemoveParam("maxPrice", value.toString())
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
    setModal({ open: true, row: row.id, type: row.type })
  }

  const handleClose = () => {
    setModal({ open: false, row: null, type: null })
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

  if (!data) return <div>loading...</div>

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <SearchInput
          onChangeValue={handleChangeName}
          value={name}
          paddingYCustom="8px"
        />
        <Stack
          alignItems="center"
          flexDirection="row"
          gap={2}
        >
          <TextInput
            onChangeValue={handleChangeSku}
            value={sku}
            size={"small"}
            label={"SKU"}
            paddingYCustom="8px"
          />
          <RangePrice
            minPrice={minPrice}
            maxPrice={maxPrice}
            handleChangeMin={handleChangeMin}
            handleChangeMax={handleChangeMax}
          />
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
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="imported">IMPORTED</MenuItem>
              <MenuItem value="self_made">SELF_MADE</MenuItem>
              <MenuItem value="raw_material">RAW_MATERIAL</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableToolbarCustom
            numSelected={selected.length}
            title="Danh sách sản phẩm"
            isShowAction={false}
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
                    <ImportRow
                      isSelected={isItemSelected}
                      labelId={labelId}
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
      <ImportView
        modal={modal}
        onClose={handleClose}
        row={selectedRow}
      />
    </Box>
  )
}
