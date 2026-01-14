import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import RegisterForm from "./RegisterForm"
import { useCreateUser } from "@/service/user/mutation"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const register = useCreateUser()

  const handleRegisterUser = async (user) => {
    await register.mutateAsync(user)
    navigate("/login")
  }
  return (
    <Container
      maxWidth="sm"
      sx={{ marginY: 10 }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2 }}
      >
        Đăng ký tài khoản
      </Typography>
      <RegisterForm onSubmitUser={handleRegisterUser} />
    </Container>
  )
}

export default Register
