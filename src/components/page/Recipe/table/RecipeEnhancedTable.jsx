import * as React from "react"
import { useNavigate, useSearchParams } from "react-router"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import SearchInput from "@/components/input-common/SearchInput"
import { useRecipeSoftDeletes, useRecipeToggle } from "@/service/recipe/mutation"
import { useRecipeSearch } from "@/service/recipe/queries"
import TableHeadCustom from "./TableHeadCustom"
import TableRowRecipe from "./TableRowRecipe"
import TableToolbarCustom from "./TableToolbarCustom"

export default function RecipeEnhancedTable() {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("id")
  const [selected, setSelected] = React.useState([])

  const [searchParams, setSearchParams] = useSearchParams()
  const title = searchParams.get("title") ?? ""
  const page = searchParams.get("page") ?? "0"
  const limit = searchParams.get("limit") ?? "5"
  const sort = searchParams.get("sort") ?? "id-desc"
  const isDeleted = searchParams.get("isDeleted") ?? "false"

  const navigate = useNavigate()

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

  const { data } = useRecipeSearch({ title, page: pageNumber, limit: limitNumber, sort, isDeleted })

  const handleChangePage = (event, newPage) => updateParams({ page: newPage })
  const handleChangeRowsPerPage = (event) => updateParams({ page: 0, limit: parseInt(event.target.value, 10) })
  const handleChangeTitle = (title) => updateParams({ title })
  const handleChangeStatus = (event) => {
    updateParams({ isDeleted: event.target.value })
  }

  const handleExpan = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    const sortValue = isAsc ? "desc" : "asc"

    setOrder(sortValue)
    setOrderBy(property)
    updateParams({ sort: `${property}-${sortValue}` })
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

  const deletesMutation = useRecipeSoftDeletes()
  const handleDeleteSelected = async () => {
    try {
      await deletesMutation.mutateAsync({ ids: selected })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleMutation = useRecipeToggle()
  const handleChangeActive = async (id) => {
    try {
      await toggleMutation.mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) return <div>loading...</div>

  return (
    <>
      <Typography
        variant="h5"
        sx={{ pt: 4, pb: 8 }}
      >
        Danh sách công thức
      </Typography>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <SearchInput onChangeValue={handleChangeTitle} />
        <FormControl
          sx={{ width: 180 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isDeleted}
            label="Status"
            onChange={handleChangeStatus}
          >
            <MenuItem value={true}>Tất cả</MenuItem>
            <MenuItem value={false}>Loại bỏ đã xóa</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableToolbarCustom
            numSelected={selected.length}
            onDelete={handleDeleteSelected}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750, tableLayout: isDeleted == "true" ? "fixed" : "layout" }}
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
                isShowDisplay={isDeleted}
              />
              <TableBody>
                {data.content.map((row, index) => {
                  const isItemSelected = selected.includes(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRowRecipe
                      isSelected={isItemSelected}
                      labelId={labelId}
                      navigate={navigate}
                      onClick={(event) => handleClick(event, row.id)}
                      onToggleActive={handleChangeActive}
                      row={row}
                      showDisplay={isDeleted}
                      key={row.id}
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
    </>
  )
}
