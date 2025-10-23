import { styled } from "@mui/material/styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { useCallback, useState } from "react"
import debounce from "lodash/debounce"
import { useOrderStatusCounts } from "@/service/order/queries"
import { usePurchaseFilters } from "../table/usePurchaseFilters"
import OrderNavTabs from "@/components/common/OrderNavTabs"

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
})

const AntTab = styled((props) => (
  <Tab
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    color: "#40a9ff",
  },
  "&.Mui-selected": {
    color: "#1890ff",
    // 👉 Giữ nguyên font-weight, chỉ đổi màu thôi
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const LabelStyled = styled(Box)(({ theme }) => ({
  padding: "4px 12px", // tương đương py: 0.5, px: 1.5
  backgroundColor: "#333",
  color: "#fff",
  borderRadius: "6px",
  fontSize: 13,
  display: "inline-block",
}))

export default function NavStatus({ onChangeValue, status = "all" }) {
  const [value, setValue] = useState(status)
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
      value: "all",
      inActiveColor: "#f3e5f5",
      activeColor: "#8e24aa",
    },
    {
      label: "Pending",
      count: 30,
      value: "pending",
      inActiveColor: "#e8f5e9",
      activeColor: "#388e3c",
    },
    {
      label: "Process",
      value: "process",
      inActiveColor: "#fff3e0",
      activeColor: "#ff9800",
    },
    {
      label: "Ready",
      value: "ready",
      inActiveColor: "#e0f7fa",
      activeColor: "#0097a7",
    },
    {
      label: "Done",
      value: "done",
      inActiveColor: "#e1f5fe",
      activeColor: "#0288d1",
    },
    {
      label: "Cancelled",
      value: "cancelled",
      inActiveColor: "#fbe9e7",
      activeColor: "#e64a19",
    },
    {
      label: "Return",
      value: "return",
      inActiveColor: "#e1e1e1ff",
      activeColor: "#333",
    },
  ]

  const countMap =
    data?.reduce((acc, item) => {
      // dùng toLowerCase() cho uniform
      acc[(item.status ?? "").toLowerCase()] = item.count
      return acc
    }, {}) || {}

  // Map count sang statusData, nếu k có thì = 0
  const updatedStatusData = statusData.map((item) => ({
    ...item,
    count:
      item.value === "all" ? data?.reduce((sum, i) => sum + i.count, 0) || 0 : countMap[item.value.toLowerCase()] || 0,
  }))
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "#fff" }}>
        <OrderNavTabs
          value={value}
          data={updatedStatusData}
          onChange={handleChange}
        />
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  )
}
