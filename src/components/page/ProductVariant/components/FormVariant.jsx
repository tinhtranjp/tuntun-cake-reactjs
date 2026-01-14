import CustomModal from "@/components/common/CustomModal"
import { useCommonModal } from "@/hook/useCommonModal"
import { usePOGetOptions } from "@/service/product_option/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import AddIcon from "@mui/icons-material/Add"
import { Button, FormHelperText, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material"
import Divider from "@mui/material/Divider"
import { Controller, useForm } from "react-hook-form"

import ImageDnd from "@/components/dnd/img/ImageDnd"
import ReplyIcon from "@mui/icons-material/Reply"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormOption from "./FormOption"
import FormOptionValue from "./FormOptionValue"
import { variantSchema } from "./schema"
function FormVariant({ onSubmit, product }) {
  const { modal, setModal, closeModal } = useCommonModal()
  const { data: options = [] } = usePOGetOptions()
  const [keyImg, setKeyImg] = useState(1)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      costPrice: "",
      originalPrice: "",
      salePrice: "",
      options: {}, // 👈 map theo optionCode
    },
  })

  const onFormSubmit = async (data) => {
    // 👉 convert options object → array gửi BE
    const optionValues = Object.entries(data.options || {})
      .filter(([, value]) => value)
      .map(([optionCode, valueCode]) => ({
        optionCode,
        valueCode,
      }))

    const payload = {
      ...data,
      optionValues,
    }

    delete payload.options

    await onSubmit?.(payload)
    reset({})
    setKeyImg((prev) => prev + 1)
  }

  const handleOpenModal = () => {
    setModal({
      open: true,
      title: "Thêm Option",
      content: <FormOption closeModal={closeModal} />,
      actions: null,
    })
  }

  const openAddValueModal = (opt) => {
    setModal({
      open: true,
      title: "Thêm value",
      content: (
        <FormOptionValue
          closeModal={closeModal}
          opt={opt}
        />
      ),
      actions: null,
    })
  }
  const handleBackProductForm = () => {
    if (window.confirm("Bạn có muốn rời khỏi trang này không ?")) {
      navigate("/product/add")
    }
  }
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
      >
        {" "}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          sx={{ mb: 2 }}
        >
          Thêm option
        </Button>
        <Button
          variant="contained"
          startIcon={<ReplyIcon />}
          onClick={handleBackProductForm}
          sx={{ mb: 2 }}
        >
          Quay lại
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={2}>
          {/* OPTIONS */}
          {options.length > 0 && (
            <>
              <Typography fontWeight={600}>Tuỳ chọn</Typography>

              <Grid
                container
                spacing={2}
              >
                {options.map((opt) => (
                  <Grid
                    size={4}
                    key={opt.code}
                  >
                    <Controller
                      name={`options.${opt.code}`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label={opt.name}
                          value={field.value ?? ""}
                        >
                          {/* Không chọn */}
                          <MenuItem value="">Không chọn</MenuItem>

                          {/* Options */}
                          {opt.value.map((v) => (
                            <MenuItem
                              key={v.code}
                              value={v.code}
                            >
                              {v.value}
                            </MenuItem>
                          ))}

                          <Divider />

                          {/* Action */}
                          <MenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openAddValueModal(opt)
                            }}
                            sx={{
                              color: "primary.main",
                              fontSize: 14,
                              py: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <AddIcon fontSize="small" />
                            Thêm giá trị mới
                          </MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          <Grid
            size={12}
            key={keyImg}
          >
            <ImageDnd
              onChange={(files) => {
                setValue(`images`, files, {
                  shouldValidate: true,
                })
              }}
              type="add"
              sx={{ my: 2 }}
              isError={!!errors?.images?.message}
            />
            {errors?.images && <FormHelperText error>{errors?.images?.message}</FormHelperText>}
          </Grid>
          <div>
            <Button
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingIndicator="Loading…"
            >
              Lưu variant
            </Button>
          </div>
        </Stack>
      </form>

      <CustomModal
        modal={modal}
        setModal={setModal}
        maxWidth="md"
      />
    </>
  )
}

export default FormVariant
