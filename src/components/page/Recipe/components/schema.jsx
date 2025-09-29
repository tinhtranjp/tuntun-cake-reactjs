import z from "zod"

export const schemaCreate = z.object({
  title: z.string({ message: "Bạn hãy nhập thông tin vào đây" }).min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  content: z
    .string({ message: "Bạn hãy nhập thông tin vào đây" })
    .min(1, { message: "Bạn hãy nhập thông tin vào đây" }),
  file: z
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
  categoryIds: z
    .array(z.number({ message: "Bạn hãy nhập thông tin vào đây" }))
    .min(1, { message: "Phải chọn ít nhất 1 category" })
    .max(10, { message: "Chỉ được chọn tối đa 10 categories" }),
})

export const schemaUpdate = schemaCreate.omit({ file: true }).extend({
  file: z
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
