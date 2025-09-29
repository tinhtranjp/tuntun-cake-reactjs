import PasswordCustom from "@/components/input-common/PasswordCustom"
import RadioGroupCustom from "@/components/input-common/RadioGroupCustom"
import { genderOptions } from "@/helper/optionsData"
import TextFieldCustom from "@components/input-common/TextFieldCustom"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z
  .object({
    name: z.string({ error: "Không được để trống." }).min(3, "Tên quá ngắn"),
    email: z.string({ error: "Không được để trống." }).email({ error: "Vui lòng điền email hợp lệ." }),
    gender: z.string().min(1, "Vui lòng chọn giới tính"),
    password: z.string({ error: "Không được để trống." }).min(10, "Vui lòng nhập ít nhất 10 kí tự."),
    confirmPassword: z.string({ error: "Không được để trống." }).min(10, "Vui lòng nhập ít nhất 10 kí tự."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp.",
        path: ["confirmPassword"],
      })
    }
  })

function RegisterForm({ onSubmitUser }) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  const onSubmit = async (data) => await onSubmitUser(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextFieldCustom
          name="name"
          control={control}
          label="Họ và tên"
        />
        <TextFieldCustom
          name="email"
          control={control}
          label="Email"
        />
        <RadioGroupCustom
          name="gender"
          label="Giới tính"
          control={control}
          options={genderOptions}
          row
        />
        <PasswordCustom
          control={control}
          name="password"
          label="Mật khẩu"
        />
        <PasswordCustom
          control={control}
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          id="confirm-password"
        />
        <Button
          variant="contained"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Đăng ký
        </Button>
      </Stack>
    </form>
  )
}

export default RegisterForm
