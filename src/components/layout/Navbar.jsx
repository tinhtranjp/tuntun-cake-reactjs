import { useState } from "react"
import Menu from "./Menu"
import { menuNavbarAdmin } from "./site"
import SpeedIcon from "@mui/icons-material/Speed"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import AutoGraphIcon from "@mui/icons-material/AutoGraph"
import { Box, Divider, Stack } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
function Navbar() {
  const [menuState, setMenuState] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  console.log(pathname)

  const toggleMenu = (id) => {
    setMenuState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  const navData = [
    { label: "Tổng quát", link: "/overviews", icon: SpeedIcon },
    { label: "Thống kê", link: "/analytics", icon: AccountBalanceIcon },
    { label: "Doanh thu", link: "/sales", icon: AutoGraphIcon },
  ]

  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
        overflow: "auto",
        padding: "0 20px 14px",
      }}
    >
      <Box mt={2}>
        <Stack
          gap={2}
          mb={3}
        >
          {navData &&
            navData?.map((item) => {
              const Icon = item.icon
              return (
                <Stack
                  onClick={() => navigate(item.link)}
                  key={item.label}
                  flexDirection={"row"}
                  alignItems={"end"}
                  gap={2}
                  mx={-2}
                  color={"#444"}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: pathname === item.link ? "#e3f2fd" : "transparent",
                    color: pathname === item.link ? "#1e88e5" : "inherit",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                      color: "#1e88e5",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: "25px" }} />
                  {item.label}
                </Stack>
              )
            })}
        </Stack>
        <Divider
          orientation="horizontal"
          flexItem
        />
      </Box>
      <Menu
        items={menuNavbarAdmin}
        menuState={menuState}
        toggleMenu={toggleMenu}
      />
    </div>
  )
}

export default Navbar
