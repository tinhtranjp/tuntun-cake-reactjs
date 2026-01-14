import Box from "@mui/material/Box"
import { useCallback, useState } from "react"
import debounce from "lodash/debounce"
import { useOrderStatusCounts } from "@/service/order/queries"
import { usePurchaseFilters } from "../table/usePurchaseFilters"
import OrderNavTabs from "@/components/common/OrderNavTabs"

export default function NavStatus({ onChangeValue, type = "ALL" }) {
  const [value, setValue] = useState(type)

  const { startDate, endDate } = usePurchaseFilters()

  const { data } = useOrderStatusCounts({ startDate, endDate })

  const debouncedChangeValue = useCallback(
    debounce((val) => {
      onChangeValue?.(val)
    }, 200), // 100ms delay, tuỳ chỉnh
    [onChangeValue],
  )
  const handleChange = (event, newValue) => {
    setValue(newValue)
    debouncedChangeValue(newValue)
  }

  const statusData = [
    {
      label: "All",
      value: "ALL",
      inActiveColor: "#f3e5f5",
      activeColor: "#8e24aa",
    },
    {
      label: "Mua",
      value: "BUY",
      inActiveColor: "#e1f5fe",
      activeColor: "#0288d1",
    },

    {
      label: "Trả hàng",
      value: "RETURN",
      inActiveColor: "#e1e1e1ff",
      activeColor: "#333",
    },
  ]

  const countMap =
    data?.reduce((acc, item) => {
      // dùng toLowerCase() cho uniform
      acc[(item.type ?? "").toLowerCase()] = item.count
      return acc
    }, {}) || {}

  // Map count sang statusData, nếu k có thì = 0
  const updatedStatusData = statusData.map((item) => ({
    ...item,
    count:
      item.value === "ALL" ? data?.reduce((sum, i) => sum + i.count, 0) || 0 : countMap[item.value.toLowerCase()] || 0,
  }))
  return (
    <Box sx={{ bgcolor: "#fff", width: "100%" }}>
      <OrderNavTabs
        value={value}
        data={updatedStatusData}
        onChange={handleChange}
      />
    </Box>
  )
}
