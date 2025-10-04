import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import PurchaseImport from "./components/PurchaseImport"
import PurchaseAdjustment from "./components/PurchaseAdjustment"
import PurchaseReturn from "./components/PurchaseReturn"

export default function PurchaseList() {
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Nhập Hàng"
              value="1"
            />
            <Tab
              label="Chỉnh Sửa"
              value="2"
            />
            <Tab
              label="Cập Nhật"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PurchaseImport />
        </TabPanel>
        <TabPanel value="2">
          <PurchaseAdjustment />
        </TabPanel>
        <TabPanel value="3">
          <PurchaseReturn />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
