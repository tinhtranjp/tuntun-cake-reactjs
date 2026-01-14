import SearchInput from "@/components/input-common/SearchInput"
import { Box, Card, Stack } from "@mui/material"
import NavOrder from "./components/NavOrder"
import ProductList from "./components/ProductList"
import TotalOrder from "./components/OrderTotal"
import useSearchParamsFilters from "@/hook/useSearchParamsFilters"

function Order() {
  const { updateParams, searchParams } = useSearchParamsFilters()
  const name = searchParams.get("name") ?? ""
  const handleChangeSearch = (name) => updateParams({ name })

  return (
    <Stack
      flexDirection={"row"}
      gap={4}
    >
      <Box flex={1}>
        <Box mt={1}>
          <SearchInput
            onChangeValue={handleChangeSearch}
            paddingYCustom={"10px"}
            value={name}
          />
        </Box>
        <NavOrder my={3} />
        <ProductList />
      </Box>
      <Card
        sx={{
          width: "clamp(250px, 30vw, 400px)",
          p: 2,
          position: "fixed",
          height: "100vh",
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 0, // nếu muốn dính hẳn vào cạnh
        }}
      >
        <Box
          sx={{
            minHeight: "calc(100vh - 128px)",
            margin: "10px 0",
            backgroundColor: "#f5f5f5",
            p: 2,
            mt: 10,
            borderRadius: "10px",
          }}
        >
          <TotalOrder />
        </Box>
      </Card>
    </Stack>
  )
}

export default Order
