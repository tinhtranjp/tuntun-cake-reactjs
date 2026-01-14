import PasswordCustom from "@/components/input-common/PasswordCustom"
import TextFieldCustom from "@components/input-common/TextFieldCustom"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import Link from "@mui/material/Link"
import { z } from "zod"
import EmailModal from "./EmailModal"

const schema = z.object({
  email: z.string({ error: "Không được để trống." }).email({ error: "Vui lòng điền email hợp lệ." }),
  password: z.string({ error: "Không được để trống." }).min(8, "Vui lòng nhập ít nhất 8 kí tự."),
})

function LoginForm({ onLogin }) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  const onSubmit = async (data) => await onLogin(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextFieldCustom
          name="email"
          control={control}
          label="Email"
        />
        <PasswordCustom
          control={control}
          name="password"
          label="Mật khẩu"
        />
        <Button
          variant="contained"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Loading…"
        >
          Đăng Nhập
        </Button>
      </Stack>
      <Stack
        direction="row"
        marginTop={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EmailModal />
        <Link
          component={RouterLink}
          to="/register"
          underline="none"
        >
          Đăng ký tại đây
        </Link>
      </Stack>
    </form>
  )
}

export default LoginForm
