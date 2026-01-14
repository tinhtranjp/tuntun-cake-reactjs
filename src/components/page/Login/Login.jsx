import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import LoginForm from "./LoginForm"
import { useNavigate } from "react-router-dom"
import { useUserLogin } from "@/service/user/mutation"
import { setUser } from "@/store/UserStore"

function login() {
  const navigate = useNavigate()
  const loginMutation = useUserLogin()

  const handleLogin = async (loginData) => {
    const res = await loginMutation.mutateAsync(loginData)
    if (res) {
      setUser(res)
      navigate("/")
    }
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
        Đăng nhập
      </Typography>
      <LoginForm onLogin={handleLogin} />
    </Container>
  )
}

export default login
