import z from "zod"

export const productVariantsSchema = z.object({
  variantName: z.string().min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  isDefault: z.boolean().optional(),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File không được vượt quá 5MB",
        })
        .refine(
          (file) => {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
            return allowedTypes.includes(file.type)
          },
          {
            message: "Chỉ chấp nhận file JPG, PNG, GIF",
          },
        ),
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
  images: z.any(),
  categoryIds: z
    .array(z.number({ message: "Bạn hãy nhập thông tin vào đây" }))
    .min(1, { message: "Phải chọn ít nhất 1 category" })
    .max(10, { message: "Chỉ được chọn tối đa 10 categories" }),
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

export const schemaUpdate = productSchema.omit({ images: true }).extend({
  images: z.any().optional(),
})
