import TableImage from "@/components/table/TableImage"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { Box, Modal, Stack, Typography } from "@mui/material"
import Tab from "@mui/material/Tab"
import React, { useEffect } from "react"
import AdjustmentContent from "./AdjustmentContent"
import ImportContent from "./ImportContent"
import UpdateContent from "./UpdateContent"
import ViewDetail from "./ViewDetail"
import { getValue } from "@/helper/product"

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "90%", // responsive cho mobile
  height: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2, // bo góc mềm mại
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // shadow mềm hơn
  p: 4,
  outline: "none", // loại bỏ viền khi focus
  display: "flex",
  flexDirection: "column",
  gap: 2, // khoảng cách giữa các thành phần

  overflowY: "auto", // ✅ Cho phép scroll dọc
  scrollbarWidth: "thin", // (optional) làm mảnh scrollbar
  scrollbarColor: "#ccc transparent", // (optional) màu scrollbar
}

function ImportView({ modal, onClose, row }) {
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (!modal.open) {
      setValue("1")
    }
  }, [modal.open])

  const isHidden = row?.sku?.split("-")[0] === "CAKE"

  if (!row) return null

  return (
    <Modal
      open={modal.open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        {modal.type == "view" ? (
          <ViewDetail row={row} />
        ) : (
          <>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={2}
                >
                  <TableImage
                    alt={row.name}
                    src={row.thumbnail}
                    height={50}
                    width={50}
                  />
                  <Box>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {row.productName}
                    </Typography>
                    {row.poDetails?.map((po) => (
                      <Box key={po.id}>
                        {po?.name} : {po?.povDetails[0]?.value}
                      </Box>
                    ))}
                    <Typography>{getValue(row.productType)}</Typography>
                  </Box>
                </Stack>
              </Box>
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
                    {!isHidden && (
                      <Tab
                        label="Tùy chỉnh"
                        value="2"
                      />
                    )}
                    <Tab
                      label="Cập nhật"
                      value="3"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ImportContent
                    onClose={onClose}
                    row={row}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <AdjustmentContent
                    onClose={onClose}
                    row={row}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <UpdateContent
                    onClose={onClose}
                    row={row}
                  />
                </TabPanel>
              </TabContext>
            </Box>
            <Stack
              flexDirection="row"
              flexWrap={"wrap"}
              justifyContent={"center"}
              gap={1}
            >
              {row.images?.map((i) => (
                <TableImage
                  src={i.url}
                  key={i.id}
                />
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default ImportView
