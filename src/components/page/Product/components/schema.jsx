import z from "zod"

export const productVariantsSchema = z.object({
  variantName: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  flavor: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  isDefault: z.boolean().optional(),
  images: z
    .any()
    .refine(
      (file) => {
        if (file instanceof File) return true
        if (file instanceof FileList) return file.length > 0
        if (Array.isArray(file)) return file.length > 0
        return false
      },
      { message: "Bạn phải chọn file" },
    )
    .optional(),
})

export const productSchema = z.object({
  name: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  description: z
    .string({ message: "Bạn hãy nhập thông tin vào đây" })
    .min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  status: z
    .string({ message: "Hãy chọn một trong những giá trị này" })
    .min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  type: z
    .string({ message: "Hãy chọn một trong những giá trị này" })
    .min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  thumbnail: z
    .instanceof(File, { message: "Vui lòng chọn file ảnh." })
    .refine((file) => file.size > 0, {
      message: "File không được rỗng",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB
      message: "File không được vượt quá 5MB",
    })
    .refine(
      (file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
        return allowedTypes.includes(file.type)
      },
      {
        message: "Chỉ chấp nhận file JPG, PNG, GIF",
      },
    ),
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
          code: "custom",
          message: "Bạn phải chọn một variant làm mặc định",
          path: ["variants"],
        })
      }
    }),
})

export const schemaUpdate = productSchema.omit({ thumbnail: true }).extend({
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File không được vượt quá 5MB",
    })
    .refine(
      (file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
        return allowedTypes.includes(file.type)
      },
      {
        message: "Chỉ chấp nhận file JPG, PNG, GIF",
      },
    )
    .optional(),
})
