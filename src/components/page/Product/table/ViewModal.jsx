import { Modal, Box, Typography, Chip, Grid, Stack, FormControlLabel } from "@mui/material"
import { styleModal } from "@/components/table/styles"
import TableImage from "@/components/table/TableImage"
import { IOSSwitch } from "@/assets/icon/IOSSwitch"

function ViewModal({ modal, onClose, row, onToggleVariant, variantDeleted }) {
  if (!row) return null
  return (
    <Modal
      open={modal.open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {row.name}
        </Typography>
        <Grid
          container
          spacing={2}
        >
          {row.variants?.map((v) => (
            <Grid
              size={6}
              spacing={10}
              key={v.id}
            >
              <Stack spacing={2}>
                <Stack
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Typography>Mã sản phẩm : </Typography>
                  <Chip
                    label={v.sku}
                    color="primary"
                  />
                </Stack>
                <Stack
                  flexDirection="row"
                  gap={2}
                >
                  <Stack
                    flexDirection="row"
                    gap={1}
                    alignItems="center"
                  >
                    <Typography>Size : </Typography>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.primary.main,
                      })}
                    >
                      {v.variantName}
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    gap={1}
                    alignItems="center"
                  >
                    <Typography>Hương vị : </Typography>
                    <Chip
                      label={v.flavor}
                      color="success"
                      size="small"
                    />
                  </Stack>
                </Stack>
                <Typography>Giá tiền : {v.price}</Typography>
                <Typography>Số lượng : {v.stockQuantity}</Typography>

                {variantDeleted == "false" && (
                  <Stack
                    flexDirection="row"
                    gap={1}
                    alignItems="center"
                  >
                    <Typography>Trạng thái : </Typography>
                    <FormControlLabel
                      onChange={() => onToggleVariant?.(v.id)}
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={!v.isDeleted}
                        />
                      }
                    />
                  </Stack>
                )}

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
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ViewModal
