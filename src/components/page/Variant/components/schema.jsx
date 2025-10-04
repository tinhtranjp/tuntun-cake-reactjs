import { z } from "zod"
// const numberSchema = (fieldName) =>
//   z.preprocess(
//     (val) => {
//       if (val === "" || val === undefined || val === null) return undefined
//       return val
//     },
//     z.coerce
//       .number({
//         required_error: `${fieldName} không được để trống.`,
//         invalid_type_error: `${fieldName} phải là số.`,
//       })
//       .nonnegative(`${fieldName} phải lớn hơn hoặc bằng 0.`),
//   )

export const ImportSchema = z.object({
  itemId: z.coerce
    .number({
      required_error: "ID sản phẩm không được để trống.",
      invalid_type_error: "ID sản phẩm phải là số.",
    })
    .positive("ID sản phẩm phải lớn hơn 0."),

  sku: z.string().min(1, "SKU không được để trống."),

  note: z.string().optional(),

  unit: z
    .string({ message: "Đơn vị tính không được để trống." })
    .min(1, { message: "Đơn vị tính không được để trống." }),
  // quantity: numberSchema("Số lượng"),
  quantity: z.coerce
    .number({ message: "Số lượng không được để trống." })
    .nonnegative("Số lượng phải lớn hơn hoặc bằng 0."),

  costPrice: z.coerce
    .number({ message: "Giá nhập không được để trống." })
    .nonnegative("Giá trên đơn vị phải lớn hơn hoặc bằng 0."),

  discountAmount: z.coerce.number().nonnegative().default(0),

  discountPercent: z.coerce.number().nonnegative().max(100, "Phần trăm giảm giá không được vượt quá 100%.").default(0),

  basePrice: z.coerce
    .number({ message: "Giá bán không được để trống." })
    .nonnegative("Giá bán phải lớn hơn hoặc bằng 0."),
})

export const AdjustmentSchema = z.object({
  itemId: z.coerce
    .number({
      required_error: "ID sản phẩm không được để trống.",
      invalid_type_error: "ID sản phẩm phải là số.",
    })
    .positive("ID sản phẩm phải lớn hơn 0."),

  sku: z.string().min(1, "SKU không được để trống."),

  note: z.string().optional(),

  unit: z.string({ message: "Đơn vị tính không được để trống." }).min(1, "Đơn vị tính không được để trống."),

  // Cho phép âm (trừ hàng) hoặc dương (cộng hàng)
  quantity: z.coerce.number({ message: "Số lượng không được để trống." }).refine((val) => val !== 0, {
    message: "Số lượng điều chỉnh không được bằng 0.",
  }),

  // costPrice cho phép âm (giảm giá trị) hoặc dương (tăng giá trị)
  costPrice: z.coerce.number({ message: "Số lượng không được để trống." }).refine((val) => val !== 0, {
    message: "Giá trên đơn vị không được bằng 0.",
  }),

  discountAmount: z.coerce.number().default(0),

  discountPercent: z.coerce.number().default(0),

  basePrice: z.coerce.number({ message: "Số lượng không được để trống." }).refine((val) => val >= 0, {
    message: "Giá bán phải lớn hơn hoặc bằng 0.",
  }),
})

export const updateSchema = z.object({
  itemId: z.coerce
    .number({
      required_error: "ID sản phẩm không được để trống.",
      invalid_type_error: "ID sản phẩm phải là số.",
    })
    .positive("ID sản phẩm phải lớn hơn 0."),

  sku: z.string().min(1, "SKU không được để trống."),

  note: z.string().optional(),

  unit: z.string({ message: "Đơn vị tính không được để trống." }).min(1, "Đơn vị tính không được để trống."),

  // Cho phép âm (trừ hàng) hoặc dương (cộng hàng)
  quantity: z.coerce.number({ message: "Số lượng không được để trống." }),
  // costPrice cho phép âm (giảm giá trị) hoặc dương (tăng giá trị)
  costPrice: z.coerce.number({ message: "Số lượng không được để trống." }),
  discountAmount: z.coerce.number().default(0),

  discountPercent: z.coerce.number().default(0),

  basePrice: z.coerce
    .number({ message: "Số lượng không được để trống." })
    .nonnegative("Giá bán phải lớn hơn hoặc bằng 0."),
})
