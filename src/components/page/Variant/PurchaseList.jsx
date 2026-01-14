import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import PurchaseImport from "./components/PurchaseImport"
import { PurchaseReturn } from ".."
import { useSearchParams } from "react-router-dom"

export default function PurchaseList() {
  const [value, setValue] = React.useState("1")
  const [searchParams] = useSearchParams()

  const type = searchParams.get("p_type")

  React.useEffect(() => {
    if (type) {
      setValue("4")
    }
  }, [type])

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
            <Tab
              label="Trả hàng"
              value="4"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PurchaseImport type="import" />
        </TabPanel>
        <TabPanel value="2">
          <PurchaseImport type="adjustment" />
        </TabPanel>
        <TabPanel value="3">
          <PurchaseImport type="update" />
        </TabPanel>
        <TabPanel value="4">
          <PurchaseReturn type="return" />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
