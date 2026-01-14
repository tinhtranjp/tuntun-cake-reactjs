import { z } from "zod"

export const purchaseSchema = z.object({
  name: z.string().optional(),
  thumbnail: z.string().optional(),
  itemId: z.coerce
    .number({
      required_error: "ID sản phẩm không được để trống.",
      invalid_type_error: "ID sản phẩm phải là số.",
    })
    .positive("ID sản phẩm phải lớn hơn 0."),
  note: z.string().optional(),
  quantity: z.coerce.number({ message: "Số lượng không được để trống." }),
  costPrice: z.coerce.number({ message: "Giá nhập không được để trống." }),
  originalPrice: z.coerce.number({ message: "Giá nhập không được để trống." }),
  salePrice: z.coerce.number({ message: "Giá nhập không được để trống." }),
  discountAmount: z.coerce.number().nonnegative().default(0),
  discountPercent: z.coerce.number().nonnegative().max(100, "Phần trăm giảm giá không được vượt quá 100%.").default(0),
})
