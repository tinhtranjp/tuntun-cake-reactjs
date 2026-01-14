import { z } from "zod"

/**
 * =========================
 * OPTION SCHEMAS
 * =========================
 */

// Option + values (dùng khi tạo option)
export const optionCodeSchema = z.object({
  code: z.string().min(1, "Thiếu mã option"),
  name: z.string().min(1, "Thiếu tên option"),
  optionValues: z
    .array(
      z.object({
        code: z.string().min(1, "Thiếu mã giá trị"),
        value: z.string().min(1, "Thiếu tên giá trị"),
      }),
    )
    .min(1, "Phải có ít nhất 1 giá trị"),
})

/**
 * =========================
 * VARIANT FORM SCHEMAS
 * =========================
 */

// options trong form: { [optionCode]: valueCode }
export const optionsSchema = z
  .record(z.string(), z.string().optional())
  .refine((val) => Object.values(val).some(Boolean), {
    message: "Phải chọn ít nhất 1 option",
  })

/**
 * =========================
 * IMPORT PRODUCT
 * =========================
 */
export const variantSchema = z.object({
  options: optionsSchema,
  images: z.any().optional(),
})
