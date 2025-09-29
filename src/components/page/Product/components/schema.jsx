import z from "zod"

export const productVariantsSchema = z.object({
  variantName: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  flavor: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  price: z.number().min(0, { message: "Giá phải lớn hơn hoặc bằng 0" }),
  stockQuantity: z.number().min(0, { message: "Số lượng phải lớn hơn hoặc bằng 0" }),
  isDefault: z.boolean().optional(),
  images: z.any().refine(
    (file) => {
      if (file instanceof File) return true
      if (file instanceof FileList) return file.length > 0
      if (Array.isArray(file)) return file.length > 0
      return false
    },
    { message: "Bạn phải chọn file" },
  ),
})

export const productSchema = z.object({
  name: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  description: z
    .string({ message: "Bạn hãy nhập thông tin vào đây" })
    .min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  basePrice: z
    .number({ message: "Bạn hãy nhập thông tin vào đây" })
    .min(0, { message: "Giá phải lớn hơn hoặc bằng 0" }),
  status: z
    .string({ message: "Hãy chọn một trong những giá trị này" })
    .min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  isHandMake: z.boolean().optional(),
  categoryId: z.coerce
    .number({ message: "Hãy chọn một trong những giá trị này" })
    .min(0, { message: "Bạn chọn thông tin này" }),
  // Mảng productVariants
  variants: z
    .array(productVariantsSchema)
    .min(1, {
      message: "Bạn phải thêm ít nhất 1 variant",
    })
    .superRefine((variants, ctx) => {
      const defaultVariants = variants.filter((variant) => variant.isDefault === true)

      if (defaultVariants.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bạn phải chọn một variant làm mặc định",
          path: ["variants"],
        })
      } else if (defaultVariants.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Chỉ được có đúng một variant được đặt làm mặc định",
          path: ["variants"],
        })
      }
    }),
})

const productVariantsSchemaWithUrls = productVariantsSchema.extend({
  images: z.array(z.string().url({ message: "Ảnh phải là URL hợp lệ" })),
  sku: z.string().optional(),
})

export const productUpdateSchema = productSchema.extend({
  variants: z
    .array(productVariantsSchemaWithUrls)
    .min(1, {
      message: "Bạn phải thêm ít nhất 1 variant",
    })
    .superRefine((variants, ctx) => {
      const defaultVariants = variants.filter((variant) => variant.isDefault === true)

      if (defaultVariants.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bạn phải chọn một variant làm mặc định",
          path: ["variants"],
        })
      } else if (defaultVariants.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Chỉ được có đúng một variant được đặt làm mặc định",
          path: ["variants"],
        })
      }
    }),
})
