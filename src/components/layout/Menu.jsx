import { motion } from "framer-motion"
import React from "react"
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye"
import { useLocation, useNavigate } from "react-router"
import { Box, Stack } from "@mui/material"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

export default function Menu({ items, menuState, toggleMenu, depth = 0 }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  return (
    <ul style={{ paddingLeft: 0 }}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{ color: "#666", listStyle: "none" }}
        >
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => item.subMenu && toggleMenu(item.id)}
          >
            {item.href ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTopRightRadius: "999px",
                  borderBottomRightRadius: "999px",
                  py: 1,
                  my: 1,
                  backgroundColor: pathname === item.href ? "#e3f2fd" : "transparent",
                  color: pathname === item.href ? "#1e88e5" : "inherit",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    color: "#1e88e5",
                  },
                }}
                style={{ paddingLeft: `${depth * 24}px` }}
                onClick={() => navigate(item.href)}
              >
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                >
                  {item.Icon ? <item.Icon fontSize="small" /> : <PanoramaFishEyeIcon fontSize="10px" />}
                  <span style={{ fontSize: "14px" }}>{item.label}</span>
                </Stack>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  pr: 4,
                  gap: 2,
                  borderTopRightRadius: "999px",
                  borderBottomRightRadius: "999px",
                }}
                style={{ paddingLeft: `${depth * 24}px` }}
              >
                <Stack
                  flexDirection={"row"}
                  alignItems={"end"}
                  gap={2}
                >
                  {item.Icon ? (
                    <item.Icon style={{ fontSize: "25px", color: "#444" }} />
                  ) : (
                    <PanoramaFishEyeIcon style={{ fontSize: "25px" }} />
                  )}
                  {item.label}
                </Stack>
                <KeyboardArrowRightIcon
                  fontSize="small"
                  sx={{
                    color: "#666",
                    transition: "all 0.3s ease",
                    transform: menuState[item.id] ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </Box>
            )}
          </Box>
          {item.subMenu && (
            <motion.ul
              initial="collapsed"
              animate={menuState[item.id] ? "expanded" : "collapsed"}
              variants={{
                expanded: { height: "auto", opacity: 1 },
                collapsed: { height: 0, opacity: 0 },
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ overflow: "hidden", paddingLeft: 0 }}
            >
              <Menu
                items={item.subMenu}
                menuState={menuState}
                toggleMenu={toggleMenu}
                depth={depth + 1}
              />
            </motion.ul>
          )}
        </li>
      ))}
    </ul>
  )
}
