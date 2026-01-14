import { useState, useEffect } from "react"
import Menu from "./Menu"
import { menuNavbarAdmin } from "./site"
import SpeedIcon from "@mui/icons-material/Speed"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import AutoGraphIcon from "@mui/icons-material/AutoGraph"
import { Box, Divider, Stack } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

function Navbar() {
  const [menuState, setMenuState] = useState({})
  const [isReady, setIsReady] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  // 🧩 Khi load lần đầu → đọc lại trạng thái từ localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("menuState")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          setMenuState(parsed)
        }
      }
    } catch (error) {
      console.error("Error loading menuState:", error)
    } finally {
      // Đảm bảo chỉ render Menu sau khi đọc xong localStorage
      setIsReady(true)
    }
  }, [])

  // 💾 Mỗi khi menuState thay đổi → lưu lại vào localStorage
  useEffect(() => {
    if (isReady) {
      try {
        localStorage.setItem("menuState", JSON.stringify(menuState))
      } catch (error) {
        console.error("Error saving menuState:", error)
      }
    }
  }, [menuState, isReady])

  // 🔄 Toggle trạng thái mở/đóng của menu con
  const toggleMenu = (id) => {
    setMenuState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 📊 Menu chính ở đầu navbar
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
        padding: "0 8px 8px",
      }}
    >
      {/* --- MENU CHÍNH --- */}
      <Box mt={2}>
        <Stack
          gap={2}
          mb={3}
        >
          {navData.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.link
            return (
              <Stack
                key={item.label}
                onClick={() => navigate(item.link)}
                flexDirection="row"
                alignItems="center"
                gap={2}
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  color: isActive ? "#1e88e5" : "#444",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    color: "#1e88e5",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Icon sx={{ fontSize: 20 }} />
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

      {/* --- MENU CÓ THỂ EXPAND/COLLAPSE --- */}
      {isReady && (
        <Menu
          items={menuNavbarAdmin}
          menuState={menuState}
          toggleMenu={toggleMenu}
        />
      )}
    </div>
  )
}

export default Navbar
