import { useState, useCallback } from "react"
import debounce from "lodash/debounce"
import { Box } from "@mui/material"
import { usePurchasedFilters } from "./usePurchasedFilters"
import { usePruchaseOrderTypeCounts } from "@/service/purchase-oder/queries"
import OrderNavTabs from "@/components/common/OrderNavTabs"

export default function NavType({ onChangeValue, status = "ALL" }) {
  const [value, setValue] = useState(status)
  const { startDate, endDate } = usePurchasedFilters()
  const { data } = usePruchaseOrderTypeCounts({ startDate, endDate })

  const debouncedChangeValue = useCallback(
    debounce((val) => onChangeValue?.(val), 200),
    [onChangeValue],
  )

  const handleChange = (event, newValue) => {
    setValue(newValue)
    debouncedChangeValue(newValue)
  }

  const statusData = [
    { label: "Tất cả", value: "ALL", inActiveColor: "#f3e5f5", activeColor: "#8e24aa" },
    { label: "Nhập hàng", value: "import", inActiveColor: "#e8f5e9", activeColor: "#388e3c" },
    { label: "Chỉnh sửa", value: "adjustment", inActiveColor: "#fff3e0", activeColor: "#ff9800" },
    { label: "Cập nhật", value: "update", inActiveColor: "#e1f5fe", activeColor: "#0288d1" },
    { label: "Trả hàng", value: "return", inActiveColor: "#e1e1e1ff", activeColor: "#333" },
  ]

  const countMap =
    data?.reduce((acc, item) => {
      acc[item.type.toLowerCase()] = item.count
      return acc
    }, {}) || {}

  const updatedStatusData = statusData.map((item) => ({
    ...item,
    count:
      item.value === "ALL" ? data?.reduce((sum, i) => sum + i.count, 0) || 0 : countMap[item.value.toLowerCase()] || 0,
  }))

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff" }}>
      <OrderNavTabs
        value={value}
        data={updatedStatusData}
        onChange={handleChange}
      />
      <Box sx={{ p: 3 }} />
    </Box>
  )
}
