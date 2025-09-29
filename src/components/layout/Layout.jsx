import { AppBar, Toolbar, Drawer, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { useNavigate } from "react-router"
import SidebarTree from "./SidebarTree"

const drawerWidth = 300

export default function Layout({ children }) {
  const navigate = useNavigate()

  const handleOnClick = (url) => {
    navigate(url)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ minHeight: 352, minWidth: 250, paddingY: 1 }}>
          <SidebarTree />
        </Box>
      </Drawer>

      {/* Main */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            color: "black",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderBottom: "1px solid rgba(0,0,0,0.1)", // viền mờ nhẹ
          }}
        >
          <Toolbar>
            <Typography variant="h6">Tun Tun Cake</Typography>
          </Toolbar>
        </AppBar>

        {/* Offset cho header */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
