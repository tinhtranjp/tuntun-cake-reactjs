import { Modal, Box, Typography, Chip, Stack, Button } from "@mui/material"
import { styleModal } from "@/components/table/styles"
import TableImage from "@/components/table/TableImage"
import { getDefaultImg } from "@/helper/common"
import { getValue } from "@/helper/product"
import { useNavigate } from "react-router"
import Grid from "@mui/material/Grid"
function ViewModal({ modal, onClose, row }) {
  const navigate = useNavigate()
  if (!row) return null

  return (
    <Modal
      open={modal.open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Stack
          direction={"row"}
          gap={2}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {row.name}
          </Typography>
          <Button onClick={() => navigate("/variant/reorder/" + row.id)}>Cập nhật vị trí</Button>
        </Stack>
        <Grid
          container
          spacing={4}
        >
          {row.pvDetails?.map((v) => (
            <Grid
              size={6}
              spacing={4}
              key={v.id}
            >
              <Stack
                flexDirection="row"
                flexWrap={"wrap"}
                gap={1}
              >
                {v.images?.map((i) => (
                  <TableImage
                    alt={v.sku + i.orderBy}
                    src={i.url}
                    key={i.id}
                  />
                ))}
              </Stack>
              {v.images?.length == 0 && <TableImage src={getDefaultImg(v?.images)} />}
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/variant/${v.id}/update`)}
                  sx={{ mt: 2 }}
                >
                  Cập nhật ảnh
                </Button>
              </Box>
              <Stack
                spacing={2}
                mt={2}
              >
                <Box>
                  Trạng thái :{" "}
                  <Chip
                    label={getValue(v?.status)}
                    size="small"
                    color={row.status === "ACTIVE" ? "success" : row.status === "OUT_OF_STOCK" ? "error" : "default"}
                  />{" "}
                </Box>
                <Stack gap={2}>
                  {v.poDetails?.map((po) => (
                    <Box
                      key={po.id}
                      sx={{ fontSize: 14 }}
                    >
                      {po.name} : {po?.povDetails[0]?.value}
                    </Box>
                  ))}
                </Stack>

                <Grid
                  container
                  columnSpacing={2}
                  rowSpacing={0.5}
                >
                  <Grid
                    item
                    xs={6}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                    >
                      Giá nhập: {v?.costPrice?.toLocaleString("vi-VN")} ₫
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                    >
                      Giá niêm yết: {v?.originalPrice?.toLocaleString("vi-VN")} ₫
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                    >
                      Giá bán: {v?.salePrice?.toLocaleString("vi-VN")} ₫
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                    >
                      Số lượng kho: {v?.stockQuantity ?? 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ViewModal
