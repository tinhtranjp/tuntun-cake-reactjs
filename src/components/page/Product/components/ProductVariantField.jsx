"use client"

import React from "react"
import { Box, Button, FormHelperText, Grid, Typography } from "@mui/material"
import TextFieldCustom from "@/components/input-common/TextFieldCustom"
import CheckBoxCustom from "@/components/input-common/CheckBoxCustom"
import ImageDnd from "@/components/dnd/img/ImageDnd"

export const ProductVariantField = ({
  index,
  control,
  setValue,
  trigger,
  errors,
  remove,
  isUpdate,
  type = "self_made",
}) => {
  const fieldErrors = errors.variants?.[index]

  const handleTrigger = (e) => {
    trigger("variants.variants")

    control._formValues.variants.forEach((v, i) => {
      if (i === index) {
        setValue(`variants.${i}.isDefault`, e)
      } else {
        setValue(`variants.${i}.isDefault`, false)
      }
    })
  }

  const initialImgs = control._formValues.variants?.[index]?.images || []

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#333", mt: 4, mb: 2 }}
      >
        Sản phẩm con {index + 1}
      </Typography>
      <Grid
        container
        spacing={2}
      >
        <Grid size={3}>
          <TextFieldCustom
            name={`variants.${index}.variantName`}
            control={control}
            label="Size"
            slotProps={{
              input: {
                readOnly: isUpdate ? true : false,
              },
            }}
          />
        </Grid>
      </Grid>
      {type !== "self_made" && (
        <ImageDnd
          onChange={(files) => {
            setValue(`variants.${index}.images`, files, {
              shouldValidate: true,
            })
          }}
          initialValue={initialImgs}
          sx={{ my: 2 }}
          isError={!!fieldErrors?.images?.message}
        />
      )}
      {fieldErrors?.images && <FormHelperText error>{fieldErrors?.images?.message}</FormHelperText>}
      <Box mt={2}>
        <CheckBoxCustom
          control={control}
          label="Đặt làm sản phẩm chính"
          name={`variants.${index}.isDefault`}
          onTrigger={handleTrigger}
        />
      </Box>
      {errors.variants?.variants?.message && (
        <FormHelperText error>{errors.variants?.variants?.message}</FormHelperText>
      )}
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="button"
          size="sm"
          variant="contained"
          color="error"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa bỏ item này không ?")) {
              remove(index)
            }
          }}
          sx={{ mt: 2 }}
        >
          Xoá item {index + 1}
        </Button>
      </Box>
    </Box>
  )
}
